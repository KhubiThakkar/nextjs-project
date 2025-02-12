import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";

export function useAuthRedirect(shouldBeAuthenticated = true) {
    const router = useRouter();
    const [user] = useAuthState(auth);
    const [loading, setLoading] = useState(true);
    const userSession =
        typeof window !== "undefined" ? sessionStorage.getItem("user") : null;

    useEffect(() => {
        if (shouldBeAuthenticated) {
            // For protected routes (home page)
            if (!user && !userSession) {
                router.push("/sign-in");
            } else {
                setLoading(false);
            }
        } else {
            // For auth routes (sign-in/sign-up)
            if (user || userSession) {
                router.push("/");
            } else {
                setLoading(false);
            }
        }
    }, [user, userSession, router, shouldBeAuthenticated]);

    return loading;
}
