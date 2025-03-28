
//import Items from "./comps/Items";
//import Todo from "./comps/Todo";
import ContactForm from "./components/ContactForm";
import AvaConn from "./components/AvaConn";

export default function Home() {
    return (
        <div className="p-4 max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold">
                Contact Us
            </h1>
            <p>Please fill in the form below</p>

            <AvaConn />
        </div>
    );
}
