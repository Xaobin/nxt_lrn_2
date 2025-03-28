// Filename - models/contact.js

import mongoose, { Schema } from "mongoose";

const contactSchema = new Schema({
    fullname: {
        type: String,
        required: [true, "Name is required."],
        trim: true,
        minLength: [2, "Name must be larger than 2 characters"],
        maxLength: [50, "Name must be lesser than 50 characters"],
    },

    email: {
        type: String,
        required: [true, "Email is required."],
        match: [/^[\w.%+-]+@[\w.-]+\.[A-Za-z]{2,}$/i,
            "Invalid email address"],
    },

    message: {
        type: String,
        required: [true, "Message is required."],
    },

    date: {
        type: Date,
        default: Date.now,
    },
});

const Contact =
    mongoose.models.Contact || mongoose.model("Contact",
        contactSchema);

export default Contact;


/*
start /D "%cd%" C:\progra~1\Git\git-bash.exe
Explicação do Código
........................
Criação do Esquema (Schema)

const contactSchema = new Schema({ ... });
Aqui, um esquema (schema) é definido usando o construtor Schema fornecido pelo Mongoose.

O schema serve como um "molde" para o que será armazenado no banco de dados, ou seja, define a estrutura dos documentos que estarão na coleção correspondente.

........................
Definição ou Recuperação do Modelo (Model)
const Contact =
    mongoose.models.Contact || mongoose.model("Contact", contactSchema);
Esse trecho é responsável por criar ou reaproveitar o modelo Contact.

mongoose.models.Contact: Verifica se o modelo chamado "Contact" já foi registrado em mongoose.models. Isso é útil em ambientes como o desenvolvimento local, onde o mesmo modelo pode ser importado várias vezes, evitando duplicação de registros.

mongoose.model("Contact", contactSchema): Se o modelo ainda não existir, ele será criado com base no esquema definido (contactSchema) e associado à coleção "contacts" no MongoDB. O nome da coleção é automaticamente pluralizado (ex.: "Contact" → "contacts"), mas é possível personalizar isso, se necessário.

........................
Resultado Final
No final, a constante Contact será o modelo usado para interagir com os documentos na coleção "contacts" do banco de dados.
Esse modelo fornece métodos úteis, como create(), find(), updateOne(), etc., permitindo que você insira, leia, atualize ou exclua documentos.
........................
Resumo
Esse código é uma abordagem inteligente para lidar com o registro e reutilização de modelos no Mongoose. Ele evita erros comuns, como registrar o mesmo modelo mais de uma vez, e prepara o modelo Contact para ser usado em operações com a coleção correspondente no MongoDB.

*/
