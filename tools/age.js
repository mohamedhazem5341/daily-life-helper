// age.js
document.addEventListener('DOMContentLoaded', () => {
  const birthEl = document.getElementById('birthdate');
  const btn = document.getElementById('age-btn');
  const clear = document.getElementById('age-clear');
  const out = document.getElementById('age-result');

  btn.addEventListener('click', () => {
    const val = birthEl.value;
    if (!val) { out.textContent = 'Please select a birthdate.'; return; }
    const b = new Date(val);
    const now = new Date();
    if (b > now) { out.textContent = 'Birthdate cannot be in the future.'; return; }

    let years = now.getFullYear() - b.getFullYear();
    let months = now.getMonth() - b.getMonth();
    let days = now.getDate() - b.getDate();

    if (days < 0) {
      months -= 1;
      const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
      days += prevMonth.getDate();
    }
    if (months < 0) {
      years -= 1;
      months += 12;
    }

    out.textContent = `Age: ${years} year(s), ${months} month(s), ${days} day(s).`;
  });

  clear.addEventListener('click', () => {
    birthEl.value = '';
    out.textContent = '';
  });
});
