
import mongoose from "mongoose";

const connectDB = async () => {

    try {
        if (mongoose.connection.readyState === 0) {

          await mongoose.connect(process.env.MONGODB_URL);
           console.log("db connected");
        }
    } catch (error) {
        console.log(error);
    }
};

export default connectDB;


/**
Esse código é uma função para conectar-se a um banco de dados MongoDB usando Mongoose, uma biblioteca Node.js que facilita o trabalho com MongoDB, fornecendo uma interface baseada em esquemas.

.............Importação do Mongoose.............
import mongoose from "mongoose";
Aqui, a biblioteca Mongoose é importada, permitindo o uso de suas funcionalidades, como conexão e definição de esquemas para o banco de dados.

.............Definição da Função connectDB.............
const connectDB = async () => { ... }
Uma função assíncrona é declarada para lidar com operações assíncronas (como a conexão ao banco de dados). Usar async/await ajuda a tornar o código mais legível e fácil de depurar.

.............Checando a Conexão com o Banco de Dados.............
if (mongoose.connection.readyState === 0) {
Aqui, verifica-se se o estado da conexão é 0, o que significa que nenhuma conexão foi estabelecida ainda. Os estados possíveis são:
0: Desconectado
1: Conectado
2: Conectando
3: Desconectando
Isso evita múltiplas tentativas de conexão desnecessárias caso o banco já esteja conectado.

.............Conexão ao MongoDB.............
await mongoose.connect(process.env.MONGODB_URL);
O método mongoose.connect() tenta estabelecer uma conexão com o banco de dados.
A URL do banco de dados é obtida de uma variável de ambiente chamada MONGODB_URL. Isso é útil para proteger informações sensíveis como credenciais.
Se a conexão for bem-sucedida, a mensagem "db connected" será exibida no console:
console.log("db connected");

.............Tratamento de Erros.............
} catch (error) {
    console.log(error);
}
Caso ocorra algum erro durante a tentativa de conexão, ele será capturado pelo bloco catch e exibido no console.

.............Exportação da Função.............
export default connectDB;
A função connectDB é exportada como padrão para ser reutilizada em outros arquivos do projeto.

.........................................
 Esse código é projetado para ser modular e seguro. Ele verifica o estado da conexão antes de tentar se conectar ao MongoDB, utiliza variáveis de ambiente para proteger as informações sensíveis e trata erros de maneira apropriada. É uma abordagem recomendada para configurar conexões com banco de dados em aplicações Node.js..

 */
