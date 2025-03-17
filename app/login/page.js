import LoginForm from "../components/LoginForm";

export default function LoginPage() {
    return (
        <div className='min-h-screen bg-gray-50 flex flex-col justify-center'>
            <div className='sm:mx-auto sm:w-full sm:max-w-md'>
                <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
                    Sign in to your account
                </h2>
            </div>

            <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
                <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
                    <LoginForm />

                    <div className='mt-6'>
                        <div className='relative'>
                            <div className='relative flex justify-center text-sm'>
                                <span className='px-2 bg-white text-gray-500'>
                                    Don't have an account?{" "}
                                    <a
                                        href='/signup'
                                        className='font-medium text-blue-600 hover:text-blue-500'
                                    >
                                        Sign up
                                    </a>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
