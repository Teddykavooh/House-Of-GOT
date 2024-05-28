"use client";
import React from "react";
import signUp from "../../firebase/auth/signup";
import { useRouter } from "next/navigation";
import styles from "../page.module.css";

function Page() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const router = useRouter();

    const handleForm = async event => {
        event.preventDefault();
        const { result, myError } = await signUp(email, password);
        if (myError) {
            alert("Sign-Up unsuccessfull");
            return console.log(myError);
        }
        console.log(result);
        alert("Sign-Up successfull");
        router.push("/admin");
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.formWrapper}>
                <h1 className={`${styles.mt60} ${styles.mb30} ${styles.title}`}>
                    Sign Up
                </h1>
                <form onSubmit={handleForm} className={styles.form}>
                    <label className={styles.formLabel} htmlFor="email">
                        <p className={styles.labelText}>Email</p>
                        <input
                            onChange={e => setEmail(e.target.value)}
                            required
                            type="email"
                            name="email"
                            id="email"
                            placeholder="example@mail.com"
                            className={styles.inputField}
                        />
                    </label>
                    <label className={styles.formLabel} htmlFor="password">
                        <p className={styles.labelText}>Password</p>
                        <input
                            onChange={e => setPassword(e.target.value)}
                            required
                            type="password"
                            name="password"
                            id="password"
                            placeholder="your password"
                            className={styles.inputField}
                        />
                    </label>
                    <button className={styles.submitButton} type="submit">
                        SignUp
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Page;
