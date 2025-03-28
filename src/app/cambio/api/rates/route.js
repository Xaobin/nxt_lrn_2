import { BASE_URL } from '../../config/api';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const from = searchParams.get('from') || 'USD';

  try {
    const response = await fetch(`${BASE_URL}/${from}`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Erro ao buscar taxas de câmbio');
    }

    return Response.json(data);
  } catch (error) {
    return Response.json(
      { error: error.message || 'Erro ao buscar taxas de câmbio' },
      { status: 500 }
    );
  }
} 