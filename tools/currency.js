// currency.js - static rates example (update rates or plug an API)
document.addEventListener('DOMContentLoaded', () => {
  const rates = {
    // base USD: approximate sample rates (update before publishing)
    USD: { USD: 1, EUR: 0.92, EGP: 48.19, GBP: 0.79 },
    EUR: { USD: 1.09, EUR: 1, EGP: 34.3, GBP: 0.86 },
    EGP: { USD: 0.0317, EUR: 0.029, EGP: 1, GBP: 0.025 },
    GBP: { USD: 1.26, EUR: 1.16, EGP: 39.9, GBP: 1 }
  };

  const v = id => document.getElementById(id);
  document.getElementById('cur-convert').addEventListener('click', () => {
    const amount = parseFloat(v('cur-value').value);
    const from = v('cur-from').value;
    const to = v('cur-to').value;
    if (isNaN(amount)) { v('cur-result').textContent = 'Enter a valid amount.'; return; }
    if (!rates[from] || rates[from][to] === undefined) { v('cur-result').textContent = 'Rate not available.'; return; }
    const out = amount * rates[from][to];
    v('cur-result').textContent = `${amount} ${from} = ${out.toFixed(4)} ${to}`;
  });

  document.getElementById('cur-clear').addEventListener('click', () => {
    v('cur-value').value = '1';
    v('cur-result').textContent = '';
  });
});
