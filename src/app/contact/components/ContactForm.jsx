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
                className="flex flex-col gap-6"
            >
                <div className="space-y-2">
                    <label htmlFor="fullname" className="block text-sm font-medium text-gray-700">
                        Nome Completo
                    </label>
                    <input
                        onChange={(e) => setFullname(e.target.value)}
                        value={fullname}
                        type="text"
                        id="fullname"
                        placeholder="Joana Carreras"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        E-mail
                    </label>
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        type="email"
                        id="email"
                        placeholder="joana@gmail.com"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                        Sua Mensagem
                    </label>
                    <textarea
                        onChange={(e) => setMessage(e.target.value)}
                        value={message}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors h-32 resize-none"
                        id="message"
                        placeholder="Coloque sua mensagem aqui..."
                    ></textarea>
                </div>

                <button 
                    type="submit"
                    className="w-full bg-blue-600 text-white font-semibold py-3 px-6 rounded-md hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    Enviar Mensagem
                </button>
            </form>

            {error && (
                <div
                    className={`mt-4 p-4 rounded-md ${
                        success 
                            ? "bg-green-50 text-green-800 border border-green-200" 
                            : "bg-red-50 text-red-800 border border-red-200"
                    }`}
                >
                    {error}
                </div>
            )}
        </>
    );
}
