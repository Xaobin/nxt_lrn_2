'use client';

const Relatorios = () => {
  const relatorios = [
    {
      titulo: 'Vendas por Período',
      descricao: 'Análise de vendas nos últimos 30 dias',
      data: '2024-03-09',
      tipo: 'Vendas'
    },
    {
      titulo: 'Produtos Mais Vendidos',
      descricao: 'Top 10 produtos com maior volume de vendas',
      data: '2024-03-09',
      tipo: 'Produtos'
    },
    {
      titulo: 'Análise de Clientes',
      descricao: 'Perfil e comportamento dos clientes',
      data: '2024-03-08',
      tipo: 'Clientes'
    },
    {
      titulo: 'Relatório Financeiro',
      descricao: 'Balanço financeiro mensal',
      data: '2024-03-07',
      tipo: 'Financeiro'
    }
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Relatórios</h2>
        <div className="flex space-x-4">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Gerar Novo Relatório
          </button>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
            Exportar Todos
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {relatorios.map((relatorio, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{relatorio.titulo}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{relatorio.descricao}</p>
              </div>
              <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 text-xs font-medium px-2.5 py-0.5 rounded">
                {relatorio.tipo}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500 dark:text-gray-400">Gerado em: {relatorio.data}</span>
              <div className="flex space-x-2">
                <button className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">Visualizar</button>
                <button className="text-sm text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300">Download</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Relatorios; 