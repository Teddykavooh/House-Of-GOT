"use client";
import React from "react";
import { useRouter } from "next/navigation";
import signIn from "../../firebase/auth/signin";
import styles from "../page.module.css";
import persistAuth from "@/firebase/auth/signinpersistence";

function Page() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const router = useRouter();
    const [status, setStatus] = React.useState(false);

    const handleForm = async event => {
        event.preventDefault();
        const { result, myError } = await signIn(email, password);
        if (myError) {
            alert("Sign-In unsuccessfull; wrong email or password");
            return console.log(myError);
        }
        // console.log(result, status);
        persistAuth(status);
        alert("Sign-In successfull");
        return router.push("/admin");
    };

    const handleCheckboxChange = event => {
        const newStatus = event.target.checked;
        setStatus(newStatus);
        // console.log("Status should change to new: ", newStatus);
        // console.log("Status1: ", status);
        // console.log("Status2: ", status);
        // console.log("Status3: ", status);
        // console.log("Status4: ", status);
        // console.log("Status5: ", status);
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.formWrapper}>
                <h1 className={`${styles.mt60} ${styles.mb30} ${styles.title}`}>
                    Sign In
                </h1>
                <form onSubmit={handleForm} className={styles.form}>
                    <label htmlFor="email" className={styles.formLabel}>
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
                    <label htmlFor="password" className={styles.formLabel}>
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
                    <button type="submit" className={styles.submitButton}>
                        SignIn
                    </button>
                    <label htmlFor="checker" className={styles.customCheckbox}>
                        <input
                            type="checkbox"
                            // className={styles.checkbox}
                            id="checker"
                            onChange={handleCheckboxChange}
                            checked={status}
                        />
                        {/* <span className={styles.checkmark}></span> */}
                        <p>Remember me</p>
                    </label>
                </form>
            </div>
        </div>
    );
}

export default Page;
