"use client";
import addData from "@/firebase/firestore/addData";
import React from "react";
import styles from "../page.module.css";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/AuthContext";

export default function AddData() {
    const [name, setName] = React.useState("");
    const [house, setHouse] = React.useState("");
    const { user, loading } = useAuthContext();
    const router = useRouter();

    React.useEffect (() => {
        if (!loading && user == null) {
            console.log("I got reached,addData");
            alert("Sign-In to continue");
            router.push("/signin");
        }
    }, [loading, router, user]);

    const handleForm = async event => {
        event.preventDefault();
        const data = {
            name: name,
            house: house
        };
        const { result, error } = await addData("houseofgot", data);
        if (error) {
            return console.log(error);
        }
        alert("Data set.", result);
        router.push("/home");
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.formWrapper}>
                <h1 className={`${styles.mt60} ${styles.mb30} ${styles.title}`}>Add Gamers ...</h1>
                <form onSubmit={handleForm} className={styles.form}>
                    <label htmlFor="name" className={styles.formLabel}>
                        <p className={styles.labelText}>Name:</p>
                        <input id="name" placeholder="John" required onChange={e => setName(e.target.value)} className={styles.inputField}/>
                    </label>
                    <label htmlFor="house" className={styles.formLabel}>
                        <p className={styles.labelText}>House:</p>
                        <input id="house" placeholder="Stark" required onChange={e => setHouse(e.target.value)} className={styles.inputField}/>
                    </label>
                    <button type="submit" className={styles.submitButton}>Submit</button>
                </form>
            </div>
        </div>
    );
}