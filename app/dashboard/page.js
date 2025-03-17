import { cookies } from "next/headers";
import Navigation from "../components/Navigation";

// This is a server component that fetches user data
async function getUserData() {
    const cookieStore = cookies();
    const session = cookieStore.get("session");

    if (!session) {
        return null;
    }

    // You can add Firebase Admin SDK verification here
    // For now, we'll just return a simple user object
    return {
        email: "user@example.com",
        lastLogin: new Date().toLocaleDateString(),
    };
}

export default async function DashboardPage() {
    const userData = await getUserData();

    return (
        <div className='min-h-screen bg-gray-50'>
            <Navigation />

            <main className='max-w-7xl mx-auto py-6 sm:px-6 lg:px-8'>
                <div className='px-4 py-6 sm:px-0'>
                    <div className='bg-white shadow rounded-lg p-6'>
                        <h1 className='text-2xl font-semibold text-gray-900 mb-4'>
                            Welcome to your Dashboard
                        </h1>

                        {userData && (
                            <div className='space-y-4'>
                                <div className='border-b pb-4'>
                                    <p className='text-gray-600'>
                                        Email: {userData.email}
                                    </p>
                                    <p className='text-gray-600'>
                                        Last Login: {userData.lastLogin}
                                    </p>
                                </div>

                                <div className='space-y-4'>
                                    <h2 className='text-xl font-medium text-gray-900'>
                                        Your Activity
                                    </h2>
                                    <div className='bg-gray-50 p-4 rounded-lg'>
                                        <p className='text-gray-600'>
                                            This is a protected dashboard page.
                                            You can only see this if you&apos;re
                                            logged in.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
