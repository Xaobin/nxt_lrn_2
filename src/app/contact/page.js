import ContactForm from "./components/ContactForm";

export default function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-8">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">
                        Entre em Contato
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Tem alguma dúvida ou sugestão? Estamos aqui para ajudar!
                    </p>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-8">
                    <ContactForm />
                </div>
            </div>
        </div>
    );
}
