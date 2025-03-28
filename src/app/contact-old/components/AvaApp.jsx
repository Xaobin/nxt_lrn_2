"use client";

import { useState } from "react";

export default function AvaApp() {
    const [fullname, setFullname] = useState("John Connor");
    const [email, setEmail] = useState("john@terminator.com");
    const [message, setMessage] = useState("Olá, eu estou aqui! Como vão vocês?");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("Full name: ", fullname);
        console.log("Email: ", email);
        console.log("Message: ", message);

        const res = await fetch("contact/api/contact", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                fullname,
                email,
                message,
            }),
        });

        const { msg, success } = await res.json();
        setError(msg);
        setSuccess(success);

        if (success) {
            setFullname("");
            setEmail("");
            setMessage("");
        }
    };

    return (
        <>
            <form
                onSubmit={handleSubmit}
                className="py-4 mt-4 border-t flex flex-col gap-5"
            >

                <button className="bg-green-700 p-3 text-white font-bold"
                    type="submit">
                    Send
                </button>
            </form>

            <div className="bg-slate-100 flex flex-col">
                {error && (
                    <div
                        className={`${success ? "text-green-800" : "text-red-600"
                            } px-5 py-2`}
                    >
                        {error}
                    </div>
                )}
            </div>
        </>
    );
}
