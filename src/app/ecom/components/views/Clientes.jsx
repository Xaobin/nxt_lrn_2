'use client';

const Clientes = () => {
  const clientes = [
    { id: 1, nome: 'João Silva', email: 'joao@email.com', telefone: '(11) 99999-9999', totalCompras: 5 },
    { id: 2, nome: 'Maria Santos', email: 'maria@email.com', telefone: '(11) 98888-8888', totalCompras: 3 },
    { id: 3, nome: 'Pedro Oliveira', email: 'pedro@email.com', telefone: '(11) 97777-7777', totalCompras: 8 },
    { id: 4, nome: 'Ana Costa', email: 'ana@email.com', telefone: '(11) 96666-6666', totalCompras: 2 },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Clientes</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          Adicionar Cliente
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clientes.map((cliente) => (
          <div key={cliente.id} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{cliente.nome}</h3>
              <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 text-xs font-medium px-2.5 py-0.5 rounded">
                {cliente.totalCompras} compras
              </span>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <span className="font-medium">Email:</span> {cliente.email}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <span className="font-medium">Telefone:</span> {cliente.telefone}
              </p>
            </div>
            <div className="mt-4 flex space-x-2">
              <button className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">Editar</button>
              <button className="text-sm text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300">Excluir</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Clientes; 