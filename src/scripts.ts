// Getting form elements:
const amount = document.getElementById('amount') as HTMLInputElement;

if (amount) {
  amount.oninput = () => {
    let value = amount.value.replace(/\D/g, '');

    amount.value = value;
  };
} else {
  console.error('Um ou mais elementos não foram encontrados.');
}
