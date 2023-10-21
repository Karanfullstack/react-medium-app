import {Client, Account, ID} from "appwrite";
import environment from "../environment/environment";

class AuthService {
	client = new Client();
	account;

	// settings
	constructor() {
		this.client
			.setEndpoint(environment.appwriteUrl)
			.setProject(environment.appwriteProjectId);
		this.account = new Account(this.client);
	}

	// Create Account
	async createAccount({email, password, name}) {
		try {
			const user = await this.account.create(
				ID.unique(),
				email,
				password,
				name
			);
			return user;
		} catch (error) {
			throw error;
		}
	}

	// Login Account
	async login({email, password}) {
		try {
			return await this.account.createEmailSession(email, password);
		} catch (error) {
			throw error;
		}
	}

	// Current User
	async currentUser() {
		try {
			const userAccount = await this.account.get();
			if (userAccount) return userAccount;
			else return null;
		} catch (error) {
			throw error;
		}
	}

	// Logout User
	async logout() {
		try {
			return await this.account.deleteSessions();
		} catch (error) {
			throw error;
		}
	}
}

const authService = new AuthService();
export default authService;
