"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { auth } from "./firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { useAuthRedirect } from "./hooks/useAuthRedirect";

export default function Home() {
    const router = useRouter();
    const [user] = useAuthState(auth);
    const userSession =
        typeof window !== "undefined" ? sessionStorage.getItem("user") : null;

    const loading = useAuthRedirect(true);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            sessionStorage.removeItem("user");
            router.push("/sign-in");
        } catch (error) {
            console.error("Error signing out: ", error);
        }
    };

    if (loading) {
        return null;
    }

    return (
        <div className='min-h-screen bg-gray-900'>
            {/* Header */}
            <header className='bg-gray-800 shadow-sm'>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4'>
                    <div className='flex justify-between items-center'>
                        <h1 className='text-2xl font-bold text-white'>
                            Dummy Dashboard
                        </h1>
                        <div className='flex items-center gap-4'>
                            <span className='text-sm text-gray-300'>
                                {user?.email}
                            </span>
                            <button
                                onClick={handleLogout}
                                className='rounded-lg bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700 transition-colors'
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Dashboard Content */}
            <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
                {/* Stats Overview */}
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
                    <div className='bg-gray-800 rounded-lg shadow p-6'>
                        <h3 className='text-gray-400 text-sm font-medium'>
                            Total Users
                        </h3>
                        <p className='text-3xl font-bold text-white mt-2'>
                            12,345
                        </p>
                        <span className='text-green-600 text-sm'>
                            ↑ 12% from last month
                        </span>
                    </div>
                    <div className='bg-gray-800 rounded-lg shadow p-6'>
                        <h3 className='text-gray-400 text-sm font-medium'>
                            Revenue
                        </h3>
                        <p className='text-3xl font-bold text-white mt-2'>
                            $34,567
                        </p>
                        <span className='text-green-600 text-sm'>
                            ↑ 8% from last month
                        </span>
                    </div>
                    <div className='bg-gray-800 rounded-lg shadow p-6'>
                        <h3 className='text-gray-400 text-sm font-medium'>
                            Active Sessions
                        </h3>
                        <p className='text-3xl font-bold text-white mt-2'>
                            1,234
                        </p>
                        <span className='text-red-600 text-sm'>
                            ↓ 3% from last month
                        </span>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className='bg-gray-800 rounded-lg shadow'>
                    <div className='p-6'>
                        <h2 className='text-lg font-medium text-white mb-4'>
                            Recent Activity
                        </h2>
                        <div className='space-y-4'>
                            {[1, 2, 3, 4, 5].map((item) => (
                                <div
                                    key={item}
                                    className='flex items-center justify-between border-b border-gray-700 pb-4'
                                >
                                    <div>
                                        <p className='text-sm font-medium text-white'>
                                            User Action #{item}
                                        </p>
                                        <p className='text-sm text-gray-400'>
                                            Description of the activity
                                        </p>
                                    </div>
                                    <span className='text-sm text-gray-400'>
                                        {item}h ago
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
