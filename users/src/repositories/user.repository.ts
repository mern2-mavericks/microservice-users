import { IUserRequest } from "../entities/user.interface";
import { Auth } from "../models/auth.model";
import { User } from "../models/user.model";

export class UserRepository {

	async getAll() {
		return await User.find();
	}

	async register(request: IUserRequest) {
		const user = new User(request)
		user.save();
		return user;
	}

	async update(userId: string, request: IUserRequest) {
		const update = await User.findByIdAndUpdate(userId, request);
		return update;

	}

	async delete(userId: string) {
		return await User.findByIdAndDelete(userId)
	}

	async login(request: Omit<IUserRequest, "username">) {
		const { email } = request;

		return await User.findOne({ email });
	}

	async logout(token: string) {
		const removeToken = await Auth.findOneAndDelete({ token });

		return removeToken;
	}

}
