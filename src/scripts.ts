// Getting form elements:
const form = document.querySelector('form') as HTMLFormElement;
const amount = document.getElementById('amount') as HTMLInputElement;
const expense = document.getElementById('expense') as HTMLInputElement;
const category = document.getElementById('category') as HTMLSelectElement;
const expenseList = document.querySelector('ul') as HTMLUListElement;

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
    // <li class="expense">
    //   <img src="./img/food.svg" alt="Ícone de tipo da despesa" />

    //   <div class="expense-info">
    //     <strong>Almoço</strong>
    //     <span>Alimentação</span>
    //   </div>

    //   <span class="expense-amount">
    //     <small>R$</small>1.420,57
    //   </span>

    //   <img src="./img/remove.svg" alt="remover" class="remove-icon" />
    // </li>;

    // Creating the item (li) to add in the list (ul)
    const expenseItem = document.createElement('li');
    expenseItem.classList.add('expense');

    // Creating category icon
    const expenseIcon = document.createElement('img');
    expenseIcon.setAttribute('src', `img/${newExpense.category_id}.svg`);
    expenseIcon.setAttribute('alt', newExpense.category_name);

    // Creating expense info
    const expenseInfo = document.createElement('div');
    expenseInfo.classList.add('expense-info');

    // Creating expense name
    const expenseName = document.createElement('strong');
    expenseName.textContent = newExpense.expense;

    // Creating expense category
    const expenseCategory = document.createElement('span');
    expenseCategory.textContent = newExpense.category_name;

    // Adiciona o nome e a categoria na div das informações da despesa
    expenseInfo.append(expenseName, expenseCategory);

    // Adding item information
    expenseItem.append(expenseIcon, expenseInfo);

    // Adding the item in the list
    expenseList && expenseList.append(expenseItem);
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
