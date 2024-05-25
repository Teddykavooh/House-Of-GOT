"use client";
import React, { useEffect, useState } from "react";
import getDocuments from "@/firebase/firestore/getAllData";
import styles from "../page.module.css";

export default function Page() {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const { result, error } = await getDocuments("houseofgot");
            if (error) {
                setError(error);
            } else {
                setData(result);
                console.log("My data: ", result);
            }
        };

        fetchData();
    }, []);

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (data.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <main className={styles.main}>
            <h1>GOT Gamers ...</h1>
            <div className={styles.c_grid}>
                {data.map(doc => (
                    <div key={doc.id} className={styles.c_card}>
                        <p>Name: {doc.name}</p>
                        <p>House: {doc.house}</p>
                    </div>
                ))}
            </div>
            <div className={styles.grid}>
                <a href="/addData" className={styles.c_link}>Add more gamers ...</a>
                <a href="/signup" className={styles.c_link}>Sign Up ...</a>
                <a href="/signin" className={styles.c_link}>Sign In ...</a>
                <a href="/" className={styles.c_link}>Default ...</a>
            </div>
        </main>
    );
}
