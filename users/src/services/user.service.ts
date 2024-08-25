// services/user.service.ts
import { IUserRequest } from '../entities/user.interface';
import { UserRepository } from '../repositories/user.repository';
import { Auth } from '../models/auth.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class UserService {
	constructor(private userRepository: UserRepository) { }

	async getAllUser() {

		try {
			const getAllUser = await this.userRepository.getAll()
			if (!getAllUser) throw new Error("user not found");

			return getAllUser;

		} catch (err) {
			console.error("user service error", err)
		}
	}

	async registerUser(username: string, email: string, password: string) {

		// register validation
		if (username.length === 0) throw new Error("please input your name");

		if (!email || password.length < 8) throw new Error("email should be valid and password should min 8 characters");

		const hashedPassword = await bcrypt.hash(password, 10);
		return this.userRepository.register({ username, email, password: hashedPassword });
	}

	async updateUser(userId: string, request: IUserRequest) {
		const update = await this.userRepository.update(userId, request);

		if (!update) {
			throw new Error("user service error")
		}

		return update;
	}

	async deleteUser(userId: string) {
		const deleteUser = await this.userRepository.delete(userId);
		if (!deleteUser) throw new Error("service error");

		return deleteUser;
	}

	async loginUser(request: Omit<IUserRequest, "username">) {
		const { email, password } = request;

		const user = await this.userRepository.login({ email, password });

		if (!user) throw new Error("user not found")

		const isPasswordValid = await bcrypt.compare(password, user.password as string);

		if (!isPasswordValid) throw new Error("invalid Password")

		const payload = {
			id: user.id,
			name: user.username,
			email: user.email,
		}

		const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_TOKEN as string, { expiresIn: 200 });

		const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_TOKEN as string, { expiresIn: "1d" });

		const newRefreshToken = new Auth({ userId: user.id, refreshToken });

		await newRefreshToken.save();

		return { accessToken, refreshToken };
	}

	async logoutUser(token: string) {
		const user = await this.userRepository.logout(token);
		if (!user) {
			throw new Error('Invalid token');
		}

		return user;
	}
}
