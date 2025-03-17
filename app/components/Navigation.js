"use client";

import Link from "next/link";
import { logout } from "../actions/authActions";
import { useRouter } from "next/navigation";

export default function Navigation() {
    const router = useRouter();

    async function handleLogout() {
        const result = await logout();
        if (result.success) {
            router.push("/login");
            router.refresh();
        } else {
            alert(result.error);
        }
    }

    return (
        <nav className='bg-white shadow-lg'>
            <div className='max-w-6xl mx-auto px-4'>
                <div className='flex justify-between'>
                    <div className='flex space-x-7'>
                        <Link href='/dashboard' className='py-4 px-2'>
                            Dashboard
                        </Link>
                    </div>

                    <div className='flex items-center space-x-3'>
                        <button
                            onClick={handleLogout}
                            className='py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600'
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}
