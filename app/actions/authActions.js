"use server";

import { cookies } from "next/headers";
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut as firebaseSignOut,
} from "firebase/auth";
import { auth } from "../firebase/config";
import { adminAuth } from "../firebase/admin";

export async function login(formData) {
    try {
        const email = formData.get("email");
        const password = formData.get("password");

        // Sign in with Firebase Auth
        const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );

        // Get the ID token
        const idToken = await userCredential.user.getIdToken(true);

        // Create session cookie. Note: maxAge must be in milliseconds
        const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days

        // Create session cookie using admin SDK
        const sessionCookie = await adminAuth.createSessionCookie(idToken, {
            expiresIn: expiresIn,
        });

        // Set cookie in the browser
        const cookieStore = await cookies();
        await cookieStore.set("session", sessionCookie, {
            maxAge: expiresIn / 1000, // Convert to seconds for cookie setting
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            path: "/",
            sameSite: "strict",
        });

        return { success: true };
    } catch (error) {
        console.error("Login error:", error);
        return { error: error.message };
    }
}

export async function signup(formData) {
    try {
        const email = formData.get("email");
        const password = formData.get("password");

        // Create user with Firebase Auth
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );

        // Get the ID token
        const idToken = await userCredential.user.getIdToken(true);

        // Create session cookie. Note: maxAge must be in milliseconds
        const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days

        // Create session cookie using admin SDK
        const sessionCookie = await adminAuth.createSessionCookie(idToken, {
            expiresIn: expiresIn,
        });

        // Set cookie in the browser
        const cookieStore = await cookies();
        await cookieStore.set("session", sessionCookie, {
            maxAge: expiresIn / 1000, // Convert to seconds for cookie setting
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            path: "/",
            sameSite: "strict",
        });

        return { success: true };
    } catch (error) {
        console.error("Signup error:", error);
        return { error: error.message };
    }
}

export async function logout() {
    try {
        // Get the session cookie
        const cookieStore = await cookies();
        const sessionCookie = cookieStore.get("session");

        if (sessionCookie) {
            try {
                // Verify the session first to get the user ID
                const decodedClaims = await adminAuth.verifySessionCookie(
                    sessionCookie.value
                );
                // Revoke refresh tokens for the user ID
                await adminAuth.revokeRefreshTokens(decodedClaims.uid);
            } catch (verifyError) {
                console.error(
                    "Session verification failed during logout:",
                    verifyError
                );
            }
        }

        // Sign out from Firebase client
        await firebaseSignOut(auth);

        // Delete the session cookie
        await cookieStore.delete("session");

        return { success: true };
    } catch (error) {
        console.error("Logout error:", error);
        return { error: error.message };
    }
}

export async function deleteSession() {
    const cookieStore = await cookies();
    await cookieStore.delete("session");
    return { success: true };
}
