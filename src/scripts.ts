// Getting form elements:
const form = document.querySelector('form') as HTMLFormElement;
const amount = document.getElementById('amount') as HTMLInputElement;
const expense = document.getElementById('expense') as HTMLInputElement;
const category = document.getElementById('category') as HTMLSelectElement;

interface Expense {
  id: number;
  expense: string;
  category_id: string;
  category_name: string;
  amount: string;
  created_at: Date;
}

function expenseAdd(newExpense: Expense) {
  try {
  } catch (error) {
    alert('Não foi possível atualizar a lista de despesas.');
    console.log(error);
  }
}

if (form && amount && expense && category) {
  form.onsubmit = (event) => {
    event.preventDefault();

    const newExpense: Expense = {
      id: new Date().getTime(),
      expense: expense.value,
      category_id: category.value,
      category_name: category.options[category.selectedIndex].text,
      amount: amount.value,
      created_at: new Date(),
    };

    expenseAdd(newExpense);
  };

  amount.oninput = () => {
    // Get input value and remove non-numeric characters
    let value = amount.value.replace(/\D/g, '');

    // Transform the value with cents (example: 150/100 = 1.5 equivalent to R$ 1,50)
    let valueWithCents = Number(value) / 100;

    amount.value = formatCurrencyBRL(valueWithCents);
  };
} else {
  console.error('One or more elements were not found!');
}

function formatCurrencyBRL(value: number): string {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}
