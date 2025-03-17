import { cookies } from "next/headers";
import { adminAuth } from "../firebase/admin";
import Navigation from "../components/Navigation";
import AuthError from "../components/AuthError";

// This is a server component that fetches user data
async function getUserData() {
    try {
        const sessionCookie = await cookies().get("session");

        if (!sessionCookie || !sessionCookie.value) {
            return { error: "No session" };
        }

        try {
            // Verify the session cookie
            const decodedClaims = await adminAuth.verifySessionCookie(
                sessionCookie.value,
                true // Check if cookie is revoked
            );

            // Get the user data
            const user = await adminAuth.getUser(decodedClaims.uid);

            return {
                email: user.email,
                displayName: user.displayName || "User",
                lastLogin: new Date(
                    user.metadata.lastSignInTime
                ).toLocaleDateString(),
                emailVerified: user.emailVerified,
                createdAt: new Date(
                    user.metadata.creationTime
                ).toLocaleDateString(),
                photoURL: user.photoURL,
                uid: user.uid,
            };
        } catch (verifyError) {
            console.error("Session verification failed:", verifyError);
            return { error: "Invalid session" };
        }
    } catch (error) {
        console.error("Error fetching user data:", error);
        return { error: "Server error" };
    }
}

export default async function DashboardPage() {
    const userData = await getUserData();

    // If there's an error, render the AuthError component
    if ("error" in userData) {
        return <AuthError />;
    }

    return (
        <div className='min-h-screen bg-gray-50'>
            <Navigation />

            <main className='max-w-7xl mx-auto py-6 sm:px-6 lg:px-8'>
                <div className='px-4 py-6 sm:px-0'>
                    <div className='bg-white shadow rounded-lg p-6'>
                        <h1 className='text-2xl font-semibold text-gray-900 mb-4'>
                            Welcome, {userData.displayName}!
                        </h1>

                        <div className='space-y-4'>
                            <div className='border-b pb-4'>
                                <p className='text-gray-600'>
                                    Email: {userData.email}
                                </p>
                                <p className='text-gray-600'>
                                    Last Login: {userData.lastLogin}
                                </p>
                                <p className='text-gray-600'>
                                    Account Created: {userData.createdAt}
                                </p>
                                {userData.emailVerified && (
                                    <p className='text-green-600'>
                                        ✓ Email verified
                                    </p>
                                )}
                            </div>

                            <div className='space-y-4'>
                                <h2 className='text-xl font-medium text-gray-900'>
                                    Your Activity
                                </h2>
                                <div className='bg-gray-50 p-4 rounded-lg'>
                                    <p className='text-gray-600'>
                                        This is a protected dashboard page. You
                                        can only see this if you&apos;re logged
                                        in.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
