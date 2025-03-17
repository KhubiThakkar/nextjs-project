import admin from "firebase-admin";

// Check if there's any Firebase apps initialized
if (!admin.apps.length) {
    try {
        // Make sure to check if all required environment variables exist
        if (
            !process.env.PRIVATE_FIREBASE_PROJECT_ID ||
            !process.env.PRIVATE_FIREBASE_CLIENT_EMAIL ||
            !process.env.PRIVATE_FIREBASE_PRIVATE_KEY
        ) {
            throw new Error("Firebase admin environment variables are missing");
        }

        const serviceAccount = {
            projectId: process.env.PRIVATE_FIREBASE_PROJECT_ID,
            clientEmail: process.env.PRIVATE_FIREBASE_CLIENT_EMAIL,
            // Make sure to replace \n with actual newlines
            privateKey: process.env.PRIVATE_FIREBASE_PRIVATE_KEY.replace(
                /\\n/g,
                "\n"
            ),
        };

        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
        });
        console.log("Firebase Admin initialized successfully");
    } catch (error) {
        console.error("Firebase admin initialization error", error);
        throw error; // Re-throw the error to prevent silent failures
    }
}

const adminAuth = admin.auth();
export { adminAuth };
