"use server";

import { cookies } from "next/headers";
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut as firebaseSignOut,
} from "firebase/auth";
import { auth } from "../firebase/config";

export async function login(formData) {
    try {
        const email = formData.get("email");
        const password = formData.get("password");

        const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );
        const user = userCredential.user;

        // Set session cookie
        const cookieStore = cookies();
        cookieStore.set("session", await user.getIdToken(), {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60 * 24 * 7, // 1 week
        });

        return { success: true };
    } catch (error) {
        return { error: error.message };
    }
}

export async function signup(formData) {
    try {
        const email = formData.get("email");
        const password = formData.get("password");

        const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );
        const user = userCredential.user;

        // Set session cookie
        const cookieStore = cookies();
        cookieStore.set("session", await user.getIdToken(), {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60 * 24 * 7, // 1 week
        });

        return { success: true };
    } catch (error) {
        return { error: error.message };
    }
}

export async function logout() {
    try {
        await firebaseSignOut(auth);

        // Remove session cookie
        const cookieStore = cookies();
        cookieStore.delete("session");

        return { success: true };
    } catch (error) {
        return { error: error.message };
    }
}
