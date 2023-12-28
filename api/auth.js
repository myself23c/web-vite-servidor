/*import axios from "axios"

const API = "http://localhost:3000/api"

export const registerRequest = user => axios.post(API + "/register", user)
*/

// Dentro de tu archivo ../api/auth.js

const API = import.meta.env.VITE_BACKEND_API

import axios from "./axios.js";

export const registerRequest = async (user) => {
    try {
        const response = await fetch(API + "/register", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error en la solicitud:", error);
        return null;
    }
}


export const loginRequest = (user)=> axios.post("/login", user)

export const verifyTokenRequest = async () => axios.get(`/verify`);