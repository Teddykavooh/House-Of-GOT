"use client";
import { React } from "react";
import signUp from "../../firebase/auth/signup";
import { useRouter } from "next/navigation";

function Page() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const router = useRouter();

    const handleForm = async event => {
        event.preventDefault();
        const { result, myError } = await signUp(email, password);
        if (myError) {
            return console.log(myError);
        }
        console.log(result);
        return router.push("/admin");
    };

    return (
        <div className="wrapper">
            <div className="form-wrapper">
                <h1 className="mt-60 mb-30">Sign Up</h1>
                <form onSubmit={handleForm} className="form">
                    <label htmlFor="email">
                        <p>Email</p>
                        <input
                            onChange={e => setEmail(e.target.value)}
                            required
                            type="email"
                            name="email"
                            id="email"
                            placeholder="example@mail.com"
                        />
                    </label>
                    <label htmlFor="password">
                        <p>Password</p>
                        <input
                            onChange={e => setPassword(e.target.value)}
                            required
                            type="password"
                            name="password"
                            id="password"
                            placeholder="your password"
                        />
                    </label>
                    <button type="submit">SignUp</button>
                </form>
            </div>
        </div>
    );
}

export default Page;
