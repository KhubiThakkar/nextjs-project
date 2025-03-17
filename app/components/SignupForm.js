"use client";

import { signup } from "../actions/authActions";
import { useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <button
            type='submit'
            disabled={pending}
            className='w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-blue-300'
        >
            {pending ? "Creating account..." : "Sign Up"}
        </button>
    );
}

export default function SignupForm() {
    const router = useRouter();

    async function handleSubmit(formData) {
        const result = await signup(formData);
        if (result.success) {
            router.push("/dashboard");
            router.refresh();
        } else {
            alert(result.error);
        }
    }

    return (
        <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
            <form action={handleSubmit} className='space-y-6'>
                <div>
                    <label
                        htmlFor='email'
                        className='block text-sm font-medium text-gray-700'
                    >
                        Email address
                    </label>
                    <div className='mt-1'>
                        <input
                            id='email'
                            name='email'
                            type='email'
                            autoComplete='email'
                            required
                            className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-700'
                        />
                    </div>
                </div>

                <div>
                    <label
                        htmlFor='password'
                        className='block text-sm font-medium text-gray-700'
                    >
                        Password
                    </label>
                    <div className='mt-1'>
                        <input
                            id='password'
                            name='password'
                            type='password'
                            autoComplete='new-password'
                            required
                            className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-700'
                        />
                    </div>
                </div>

                <SubmitButton />
            </form>

            <div className='mt-6'>
                <div className='relative'>
                    <div className='relative flex justify-center text-sm'>
                        <span className='px-2 bg-white text-gray-500'>
                            Already have an account?{" "}
                            <a
                                href='/login'
                                className='font-medium text-blue-600 hover:text-blue-500'
                            >
                                Sign in
                            </a>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
