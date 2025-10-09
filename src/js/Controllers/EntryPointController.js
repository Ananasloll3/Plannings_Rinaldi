import { Controllers } from "./Controllers.js";


export class EntryPointController extends Controllers {

    static async login({ email, password }) {
        let url = `http://localhost:3000/auth/login?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`;
        let data = await this.sendGet(url);
        
        return data;
    }


    static async sendGet(url) {
        let resp = await fetch(url, {
            method: "GET"
        });

        if (!resp.ok) {
            throw new Error("Erreur API: " + resp.status);
        }

        return resp.json(); // conversion de la réponse en JSON
    }


    static async sendPost(url, body) {
        let resp = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body) // transformation en JSON
        });

        if (!resp.ok) {
            throw new Error("Erreur API: " + resp.status);
        }
        
        return resp.json(); // conversion de la réponse en JSON
    }
}