import { NextResponse } from 'next/server';

interface PasswordOptions {
  length: number;
  includeUppercase: boolean;
  includeLowercase: boolean;
  includeNumbers: boolean;
  includeSymbols: boolean;
}

function generatePassword(options: PasswordOptions): string {
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';

  let chars = '';
  if (options.includeUppercase) chars += uppercase;
  if (options.includeLowercase) chars += lowercase;
  if (options.includeNumbers) chars += numbers;
  if (options.includeSymbols) chars += symbols;

  // Garante que pelo menos um caractere de cada tipo selecionado seja incluído
  let password = '';
  if (options.includeUppercase) password += uppercase[Math.floor(Math.random() * uppercase.length)];
  if (options.includeLowercase) password += lowercase[Math.floor(Math.random() * lowercase.length)];
  if (options.includeNumbers) password += numbers[Math.floor(Math.random() * numbers.length)];
  if (options.includeSymbols) password += symbols[Math.floor(Math.random() * symbols.length)];

  // Preenche o resto da senha com caracteres aleatórios
  const remainingLength = options.length - password.length;
  for (let i = 0; i < remainingLength; i++) {
    password += chars[Math.floor(Math.random() * chars.length)];
  }

  // Embaralha a senha
  return password.split('').sort(() => Math.random() - 0.5).join('');
}

export async function POST(request: Request) {
  try {
    const options: PasswordOptions = await request.json();
    
    // Validações
    if (options.length < 8 || options.length > 32) {
      return NextResponse.json(
        { error: 'O tamanho da senha deve estar entre 8 e 32 caracteres' },
        { status: 400 }
      );
    }

    if (!options.includeUppercase && !options.includeLowercase && 
        !options.includeNumbers && !options.includeSymbols) {
      return NextResponse.json(
        { error: 'Selecione pelo menos um tipo de caractere' },
        { status: 400 }
      );
    }

    const password = generatePassword(options);
    return NextResponse.json({ password });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao gerar senha' },
      { status: 500 }
    );
  }
} 