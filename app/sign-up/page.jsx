"use client";

import { useState } from "react";
import { auth } from "../firebase/config";
import { useRouter } from "next/navigation";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useAuthRedirect } from "../hooks/useAuthRedirect";

export default function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const router = useRouter();

    const loading = useAuthRedirect(false);

    const [createUserWithEmailAndPassword] =
        useCreateUserWithEmailAndPassword(auth);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await createUserWithEmailAndPassword(email, password);
            console.log("res: ", res);
            setEmail("");
            setPassword("");
            sessionStorage.setItem("user", true);
            router.push("/");
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) {
        return null;
    }

    return (
        <div className='min-h-screen bg-gray-900 flex items-center justify-center'>
            <div className='max-w-md w-full space-y-8 p-8 bg-gray-800 rounded-lg shadow-lg'>
                <div>
                    <h2 className='mt-6 text-center text-3xl font-extrabold text-white'>
                        Create your account
                    </h2>
                </div>
                <form className='mt-8 space-y-6' onSubmit={handleSubmit}>
                    {error && (
                        <div className='text-red-500 text-sm text-center'>
                            {error}
                        </div>
                    )}
                    <div className='rounded-md shadow-sm space-y-4'>
                        <div>
                            <label htmlFor='email' className='sr-only'>
                                Email address
                            </label>
                            <input
                                id='email'
                                name='email'
                                type='email'
                                required
                                className='appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-white bg-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                                placeholder='Email address'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor='password' className='sr-only'>
                                Password
                            </label>
                            <input
                                id='password'
                                name='password'
                                type='password'
                                required
                                className='appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-white bg-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                                placeholder='Password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type='submit'
                            className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                        >
                            Sign Up
                        </button>
                        <button
                            type='button'
                            onClick={() => router.push("/sign-in")}
                            className='mt-4 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                        >
                            Sign In your account
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
