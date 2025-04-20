import { Client, Account, ID } from "appwrite";
import conf from "../conf/conf.js";

// const client = new Client()
//     .setProject('<PROJECT_ID>'); // Your project ID

// const account = new Account(client);

// const promise = account.create('[USER_ID]', 'email@example.com', '');

// promise.then(function (response) {
//     console.log(response); // Success
// }, function (error) {
//     console.log(error); // Failure
// });


export class AuthServices {
    client = new Client();
    account;
    constructor() {
        this.client
            .setEndpoint(conf.APPWRITE_URL)
            .setProject(conf.PROJECT_ID)

        this.account = new Account(this.client);
    }
    //signup
    async createAccount({ email, password, name }) {
        try {
            const user = await this.account.create(ID.unique(), email, password, name);
            if (user) {
                //login the user if succefully sign-up-ed
                return this.login({ email, password });
            } else return null;


        } catch (error) {
            throw error;
        }

    }
    //login
    async login({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            throw error;
        }
    }
    //get account
    async getAccount() {
        try {
            return await this.account.get()
        } catch (error) {
            console.log("appwrit error", error)
            throw error;
        }
        return null;
    }
    //logout 
    async logout() {
        try {
            await this.account.deleteSessions()

        } catch (error) {
            console.log("appwrit error", error)
            throw error;
        }
    }

    async accountRecovery({ email }) {
        try {
            await this.account.createRecovery(email, "http://app/blog/recover")
        } catch (error) {
            console.log(error)
        }
    }

    async updateUserPassword({ password }) {
        try {
            const params = new URLSearchParams(window.location.search);
            const userId = params.get('userId');
            const secret = params.get('secret');

            if (!userId || !secret) {
                throw new Error("Invalid or missing recovery token.");
            }
            await this.account.updateRecovery(userId, secret, password)
            
        } catch (error) {
            console.log(error)
        }
    }
}
const authService = new AuthServices();
export default authService;