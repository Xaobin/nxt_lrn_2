"use client";

import { useState } from "react";

export default function ContactForm() {
    const [fullname, setFullname] = useState("John Connor");
    const [email, setEmail] = useState("john@terminator.com");
    const [message, setMessage] = useState("Olá, eu estou aqui, obrigado por enviar!");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [stateCon,setStateCon]=useState(-1);

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

        const { msg, success, stateCon } = await res.json();
        setError(msg);
        setSuccess(success);
        setStateCon(stateCon);

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
              State Con: {stateCon}
                <div>
                    <label htmlFor="fullname">Full Name</label>
                    <input
                        onChange={(e) => setFullname(e.target.value)}
                        value={fullname}
                        type="text"
                        id="fullname"

                    />
                </div>

                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        type="text"
                        id="email"

                    />
                </div>

                <div>
                    <label htmlFor="message">Your Message</label>
                    <textarea
                        onChange={(e) => setMessage(e.target.value)}
                        value={message}
                        className="h-32"
                        id="message"

                    ></textarea>
                </div>

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
