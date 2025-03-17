"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { deleteSession } from "../actions/authActions";

export default function AuthError() {
    const router = useRouter();

    useEffect(() => {
        async function handleAuthError() {
            await deleteSession();
            router.push("/login");
        }
        handleAuthError();
    }, [router]);

    return null; // This component doesn't render anything
}
