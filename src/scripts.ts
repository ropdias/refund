// Getting form elements:
const amount = document.getElementById('amount') as HTMLInputElement;

if (amount) {
  amount.oninput = () => {
    // Get input value and remove non-numeric characters
    let value = amount.value.replace(/\D/g, '');

    // Transform the value with cents (example: 150/100 = 1.5 equivalent to R$ 1,50)
    let valueWithCents = Number(value) / 100;

    amount.value = formatCurrencyBRL(valueWithCents);
  };
} else {
  console.error('Um ou mais elementos não foram encontrados.');
}

function formatCurrencyBRL(value: number): string {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}
