import connectDB from "@/app/contact/lib/mongodb";
import Contact from "@/app/contact/models/contact";
import { NextResponse } from "next/server";
import mongoose from "mongoose";



export async function POST(req) {
    const { fullname, email, message } = await req.json();

    try {
        await connectDB();
        await Contact.create({ fullname, email, message });

        return NextResponse.json({
            msg: ["Message sent successfully"],
            success: true,
        });
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            let errorList = [];
            for (let e in error.errors) {
                errorList.push(error.errors[e].message);
            }
            console.log(errorList);
            return NextResponse.json({ msg: errorList });
        } else {
            return NextResponse.json({
                msg: ["Unable to send message."]
            });
        }
    }
}


/*
Basicamente é o recebimento da requisição
Pode ser chamado de Controller
Uso do Model - Contact,  uso da conexao ao DB - connectDB
As variaveis recebidas - fullname,email...
Por meio deste model contact, usa-se o create -
Sendo assim: Contact.Create seria um método do Mongoose

NextResponse é um módulo do NextJS que extende a Web Response API
https://nextjs.org/docs/app/api-reference/functions/next-response

O tratamento de erros  (catch) usa o ValidationErros do Mongoose
Retornando uma lista de erros
*/
