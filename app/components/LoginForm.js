"use client";

import { useFormStatus } from "react-dom";
import { login } from "../actions/authActions";
import { useRouter } from "next/navigation";

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <button
            type='submit'
            disabled={pending}
            className='w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-blue-300'
        >
            {pending ? "Logging in..." : "Login"}
        </button>
    );
}

export default function LoginForm() {
    const router = useRouter();

    async function handleSubmit(formData) {
        const result = await login(formData);
        if (result.success) {
            router.push("/dashboard"); // Redirect to dashboard after login
            router.refresh(); // Refresh the page to update server components
        } else {
            alert(result.error);
        }
    }

    return (
        <form action={handleSubmit} className='space-y-4 max-w-md mx-auto mt-8'>
            <div>
                <label
                    htmlFor='email'
                    className='block text-sm font-medium text-gray-700'
                >
                    Email
                </label>
                <input
                    type='email'
                    id='email'
                    name='email'
                    required
                    className='mt-1 block w-full rounded border-gray-300 shadow-sm text-gray-700'
                />
            </div>

            <div>
                <label
                    htmlFor='password'
                    className='block text-sm font-medium text-gray-700'
                >
                    Password
                </label>
                <input
                    type='password'
                    id='password'
                    name='password'
                    required
                    className='mt-1 block w-full rounded border-gray-300 shadow-sm text-gray-700'
                />
            </div>

            <SubmitButton />
        </form>
    );
}
