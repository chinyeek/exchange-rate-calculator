const currencyEl_1 = document.getElementById('currency-one');
const amountEl_1 = document.getElementById('amount-one');
const currencyEl_2 = document.getElementById('currency-two');
const amountEl_2 = document.getElementById('amount-two');

const rateEl = document.getElementById('rate');
const swap = document.getElementById('swap');

// Fetch exchange rate and update the DOM
function calculate() {
  const currency_one = currencyEl_1.value;
  const currency_two = currencyEl_2.value;
  
  fetch(`https://v6.exchangerate-api.com/v6/6a478b13973bcaebe27cb269/latest/${currency_one}`)
    .then(res => res.json())
    .then(data => {
      const rate = data.conversion_rates[currency_two];
      rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;
      amountEl_2.value = (amountEl_1.value * rate).toFixed(2);
    });
}

function swapCurrency() {
  const temp = currencyEl_1.value;
  currencyEl_1.value = currencyEl_2.value;
  currencyEl_2.value = temp;
  calculate();
}

// Event listeners
currencyEl_1.addEventListener('change', calculate);
amountEl_1.addEventListener('input', calculate);
currencyEl_2.addEventListener('change', calculate);
amountEl_2.addEventListener('input', calculate);
swap.addEventListener('click', swapCurrency);

calculate();

