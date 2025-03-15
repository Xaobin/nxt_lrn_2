"use client";

import { useState } from "react";

export default function ContactForm() {
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
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
                <div>
                    <label htmlFor="fullname">Nome Completo</label>
                    <input
                        onChange={(e) => setFullname(e.target.value)}
                        value={fullname}
                        type="text"
                        id="fullname"
                        placeholder="Joana Carreras"
                    />
                </div>

                <div>
                    <label htmlFor="email">E-mail</label>
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        type="text"
                        id="email"
                        placeholder="joana@gmail.com"
                    />
                </div>

                <div>
                    <label htmlFor="message">Sua Mensagem</label>
                    <textarea
                        onChange={(e) => setMessage(e.target.value)}
                        value={message}
                        className="h-32"
                        id="message"
                        placeholder="Coloque sua mensagem aqui..."
                    ></textarea>
                </div>

                <button className="bg-blue-600 p-3 text-white font-bold"
                    type="submit">
                    Send
                </button>
            </form>

            <div className="bg-slate-100 flex flex-col">
                {error && (
                    <div
                        className={`${success ? "text-blue-800" : "text-red-600"
                            } px-5 py-2`}
                    >
                        {error}
                    </div>
                )}
            </div>
        </>
    );
}
