"use client";
import React from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import styles from "../page.module.css";
import { getAuth, signOut } from "firebase/auth";

function Page() {
    const { user, loading } = useAuthContext();
    const router = useRouter();

    // React.useEffect (() => {
    //     if (!loading && user == null) {
    //         console.log("I got reached");
    //         router.push("/");
    //     }
    // }, [loading, router, user]);

    const logOut = async () => {
        const auth = getAuth();
        try {
            await signOut(auth);
            router.push("/home");
        } catch (error) {
            console.error("Error signing out: ", error);
        }
    };

    return (
        <main className={styles.main}>
            <h1>Only logged-in users should be in this page</h1>
            <h2>Add Data:</h2>
            <a href="/addData" className={styles.c_link}>
                Add Gamers ...
            </a>
            {user && (
                <button onClick={logOut} className={styles.logoutButton}>
                    Log Out
                </button>
            )}
        </main>
    );
}

export default Page;
