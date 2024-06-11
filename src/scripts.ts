// Getting form elements:
const form = document.querySelector('form') as HTMLFormElement;
const amount = document.getElementById('amount') as HTMLInputElement;
const expense = document.getElementById('expense') as HTMLInputElement;
const category = document.getElementById('category') as HTMLSelectElement;
const expenseList = document.querySelector('ul') as HTMLUListElement;
const expenseQuantity = document.querySelector(
  'aside header p span'
) as HTMLSpanElement;
const expensesTotal = document.querySelector(
  'aside header h2'
) as HTMLHeadingElement;

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

    // Creating expense amount
    const expenseAmount = document.createElement('span');
    expenseAmount.classList.add('expense-amount');
    expenseAmount.innerHTML = `<small>R$</small>${newExpense.amount
      .toUpperCase()
      .replace('R$', '')}`;

    // Creating remove icon
    const removeIcon = document.createElement('img');
    removeIcon.classList.add('remove-icon');
    removeIcon.setAttribute('src', 'img/remove.svg');
    removeIcon.setAttribute('alt', 'remover');

    // Adding item information
    expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removeIcon);

    // Adding the item in the list
    expenseList && expenseList.append(expenseItem);

    // Update expense items quantity
    updateTotals();
  } catch (error) {
    alert('Não foi possível atualizar a lista de despesas.');
    console.log(error);
  }
}

function updateTotals() {
  try {
    // Recupera todos os itens (li) da lista (ul)
    const items = expenseList.children;

    // Atualiza a quantidade de itens da lista
    expenseQuantity &&
      (expenseQuantity.textContent = `${items.length} ${
        items.length > 1 || items.length === 0 ? 'despesas' : 'despesa'
      }`);

    let totalInCents = 0; // Initializes the total in cents to zero

    for (let item = 0; item < items.length; item++) {
      const itemAmount = items[item].querySelector('.expense-amount');
      let valueString = '0';
      let valueInCents = 0;

      if (itemAmount && itemAmount.textContent) {
        // Remove non-numeric characters and replaces comma with dot
        valueString = itemAmount.textContent
          .replace(/[^\d,]/g, '')
          .replace(',', '.');

        // Converts the value to cents (integer)
        valueInCents = Math.round(parseFloat(valueString) * 100); // Rounds to avoid precision issues

        // Checks if it's a valid number
        if (isNaN(valueInCents)) {
          return alert(
            'Não foi possível calcular o total. O valor não parece ser um número.'
          );
        }

        // Increments the total in cents
        totalInCents += valueInCents;
      }
    }

    // Converts the total from cents for display
    const total = totalInCents / 100;

    // Adding expense total
    // Creates the span to add the formatted R$
    const symbolBRL = document.createElement('small');
    symbolBRL.textContent = 'R$';
    // Formats the value and removes the R$ to be displayed by the small with a custom style
    let totalString = formatCurrencyBRL(total).toUpperCase().replace('R$', '');
    // Clears the content of the element
    expensesTotal.innerHTML = '';
    // Adds the currency symbol and the formatted total value
    expensesTotal.append(symbolBRL, totalString);
  } catch (error) {
    alert('Não foi possível atualizar os totais.');
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

// Event that captures the click on the list items
expenseList &&
  expenseList.addEventListener('click', function (event) {
    // Check if the clicked element is the remove icon
    if (
      event.target instanceof Element &&
      event.target.classList.contains('remove-icon')
    ) {
      // Gets the parent li of the clicked element
      const item = event.target.closest('.expense');

      // Removes the item from the list
      item?.remove();

      // Updates the totals
      updateTotals();
    }
  });
