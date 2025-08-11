// unit.js - unit converter for lengths, weights, temperature
document.addEventListener('DOMContentLoaded', () => {
  const v = id => document.getElementById(id);
  const convertBtn = v('convert-btn');
  const clearBtn = v('convert-clear');
  const resultP = v('convert-result');

  convertBtn.addEventListener('click', () => {
    const value = parseFloat(v('value').value);
    const from = v('from').value;
    const to = v('to').value;
    if (isNaN(value)) { resultP.textContent = 'Enter a valid number.'; return; }

    // Temperature
    if (from === 'c' && to === 'f') {
      resultP.textContent = `${value} °C = ${(value * 9/5 + 32).toFixed(2)} °F`;
      return;
    }
    if (from === 'f' && to === 'c') {
      resultP.textContent = `${value} °F = ${((value - 32) * 5/9).toFixed(2)} °C`;
      return;
    }
    if (from === to) {
      resultP.textContent = `Result: ${value} (${to})`;
      return;
    }

    // Normalize to base units for length (m) and weight (kg)
    const lengthToMeters = {
      m: 1, km: 1000, cm: 0.01, mm: 0.001
    };
    const weightToKg = {
      kg: 1, g: 0.001, lb: 0.45359237, oz: 0.0283495231
    };

    if (lengthToMeters[from] !== undefined && lengthToMeters[to] !== undefined) {
      const meters = value * lengthToMeters[from];
      const out = meters / lengthToMeters[to];
      resultP.textContent = `${value} ${from} = ${parseFloat(out.toFixed(6))} ${to}`;
      return;
    }

    if (weightToKg[from] !== undefined && weightToKg[to] !== undefined) {
      const kg = value * weightToKg[from];
      const out = kg / weightToKg[to];
      resultP.textContent = `${value} ${from} = ${parseFloat(out.toFixed(6))} ${to}`;
      return;
    }

    resultP.textContent = 'Conversion not supported (mismatched types).';
  });

  clearBtn.addEventListener('click', () => {
    v('value').value = '';
    v('from').selectedIndex = 0;
    v('to').selectedIndex = 0;
    resultP.textContent = '';
  });
});
