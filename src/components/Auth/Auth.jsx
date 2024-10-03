import objStyle from "./Auth.module.css";
import { useState } from "react";
import { auth, googleProvider } from "../../config/firebase";
import {
    createUserWithEmailAndPassword,
    signInWithPopup,
    signOut,
} from "firebase/auth";
export const Auth = ({}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // console.log(auth?.currentUser?.email);

    const signIn = async (e) => {
        try {
            e.preventDefault();
            await createUserWithEmailAndPassword(auth, email, password);
            setEmail("");
            setPassword("");
        } catch (error) {
            console.error(error.message);
        }
    };
    const logOut = async (e) => {
        try {
            e.preventDefault();
            await signOut(auth);
        } catch (error) {
            console.error(error.message);
        }
    };
    const signInWithGoogle = async (e) => {
        try {
            e.preventDefault();
            await signInWithPopup(auth, googleProvider);
        } catch (error) {
            console.error(error.message);
        }
    };
    return (
        <>
            {auth.currentUser ? (
                <div>
                    <h1>hello: {auth.currentUser.email}</h1>
                    <form
                        className={objStyle.formAuth}
                        action=""
                        onSubmit={(e) => signIn(e)}
                    >
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            className={objStyle.formAuth__email}
                            type="email"
                            placeholder="E-mail"
                            name=""
                        />
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={objStyle.formAuth__password}
                            type="password"
                            placeholder="Password"
                            name=""
                        />
                        <button className={objStyle.formAuth__sign}>
                            Sign In
                        </button>
                        <button onClick={(e) => logOut(e)}>logout</button>
                    </form>
                </div>
            ) : (
                <div>
                    <form
                        className={objStyle.formAuth}
                        action=""
                        onSubmit={(e) => signIn(e)}
                    >
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            className={objStyle.formAuth__email}
                            type="email"
                            placeholder="E-mail"
                            name=""
                        />
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={objStyle.formAuth__password}
                            type="password"
                            placeholder="Password"
                            name=""
                        />
                        <button className={objStyle.formAuth__sign}>
                            Sign In
                        </button>
                        <button onClick={(e) => signInWithGoogle(e)}>
                            Sign On With Google
                        </button>
                    </form>
                </div>
            )}
        </>
    );
};
