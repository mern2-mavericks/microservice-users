// controllers/user.controller.ts
import { Request, Response } from 'express';
import { UserService } from '../services/user.service';

export class UserController {
	constructor(private userService: UserService) { }

	async getAll(_req: Request, res: Response) {
		try {
			const allUsers = await this.userService.getAllUser();
			res.status(200).json({ message: 'get all users', data: allUsers });
		} catch (error) {
			res.status(400).json({ message: "Error get users", error });
		}
	}

	async register(req: Request, res: Response) {
		try {
			const { username, email, password } = req.body;
			const user = await this.userService.registerUser(username, email, password);
			res.status(201).json({ message: 'User registered successfully', user });
		} catch (error) {
			res.status(400).json({ message: 'Error registering user', error });
		}
	}

	async update(req: Request, res: Response) {
		try {
			const userId = req.params.id;
			const { username, email, password } = req.body;

			await this.userService.updateUser(userId, { username, email, password });
			res.status(200).json({ message: "success update user" })
		} catch (error) {
			res.status(401).json({ message: "update failed", error })
		}
	}

	async delete(req: Request, res: Response) {
		try {
			const userId = req.params.id;
			await this.userService.deleteUser(userId);
			res.status(200).json({ message: "delete succesfully" });
		} catch (err) {
			res.status(401).json({ message: "delete failed", err });
		}
	}

	async login(req: Request, res: Response) {
		try {
			const { email, password } = req.body;
			const { accessToken, refreshToken } = await this.userService.loginUser({ email, password });
			res.cookie('accessToken', accessToken, { httpOnly: true }).cookie('refreshToken', refreshToken, { httpOnly: true });
			res.status(200).json({ message: 'Logged in successfully', });
		} catch (error) {
			res.status(401).json({ message: 'Invalid username or password', error });
		}
	}

	async logout(req: Request, res: Response,) {
		try {
			const token = req.cookies.token;
			await this.userService.logoutUser(token);
			res.clearCookie('token');
			res.status(200).json({ message: 'Logged out successfully' });
		} catch (error) {
			res.status(400).json({ message: 'Error logging out', error });
		}
	}

}

