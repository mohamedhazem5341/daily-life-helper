document.addEventListener('DOMContentLoaded', () => {
  const unitSelect = document.getElementById('unit');
  const metricInputs = document.getElementById('metric-inputs');
  const imperialInputs = document.getElementById('imperial-inputs');
  const calcBtn = document.getElementById('calc-btn');
  const clearBtn = document.getElementById('clear-btn');
  const resultP = document.getElementById('bmi-result');
  const infoP = document.getElementById('bmi-info');

  unitSelect.addEventListener('change', () => {
    if (unitSelect.value === 'metric') {
      metricInputs.style.display = '';
      imperialInputs.style.display = 'none';
    } else {
      metricInputs.style.display = 'none';
      imperialInputs.style.display = '';
    }
    clearOutput();
  });

  calcBtn.addEventListener('click', () => {
    clearOutput();
    if (unitSelect.value === 'metric') {
      const weightKg = parseFloat(document.getElementById('weight-kg').value);
      const heightCm = parseFloat(document.getElementById('height-cm').value);
      if (!isValidNumber(weightKg) || !isValidNumber(heightCm)) {
        resultP.textContent = 'Please enter valid weight and height.';
        return;
      }
      const heightM = heightCm / 100;
      const bmi = weightKg / (heightM * heightM);
      showBMI(bmi, weightKg, heightM);
    } else {
      const weightLb = parseFloat(document.getElementById('weight-lb').value);
      const heightIn = parseFloat(document.getElementById('height-in').value);
      if (!isValidNumber(weightLb) || !isValidNumber(heightIn)) {
        resultP.textContent = 'Please enter valid weight and height.';
        return;
      }
      const weightKg = weightLb * 0.45359237;
      const heightM = heightIn * 0.0254;
      const bmi = weightKg / (heightM * heightM);
      showBMI(bmi, weightKg, heightM);
    }
  });

  clearBtn.addEventListener('click', () => {
    document.querySelectorAll('input[type="number"]').forEach(i => i.value = '');
    clearOutput();
  });

  function isValidNumber(n) {
    return typeof n === 'number' && !isNaN(n) && n > 0;
  }

  function showBMI(bmiValue, weightKg, heightM) {
    const bmi = Math.round(bmiValue * 10) / 10;
    const category = bmiCategory(bmi);
    resultP.textContent = `Your BMI: ${bmi} — ${category}`;

    const minHealthyKg = 18.5 * (heightM * heightM);
    const maxHealthyKg = 24.9 * (heightM * heightM);

    const minKg = Math.round(minHealthyKg * 10) / 10;
    const maxKg = Math.round(maxHealthyKg * 10) / 10;

    infoP.innerHTML =
      `Healthy weight range for your height: ${minKg} kg — ${maxKg} kg.<br>` +
      `Current weight used in calculation: ${Math.round(weightKg * 10) / 10} kg.` +
      `<br><small>Note: BMI is a simple screening tool and doesn't replace medical advice.</small>`;
  }

  function bmiCategory(bmi) {
    if (bmi < 16) return 'Severe Thinness';
    if (bmi >= 16 && bmi < 17) return 'Moderate Thinness';
    if (bmi >= 17 && bmi < 18.5) return 'Mild Thinness';
    if (bmi >= 18.5 && bmi < 25) return 'Normal';
    if (bmi >= 25 && bmi < 30) return 'Overweight';
    if (bmi >= 30 && bmi < 35) return 'Obese Class I';
    if (bmi >= 35 && bmi < 40) return 'Obese Class II';
    return 'Obese Class III';
  }

  function clearOutput() {
    resultP.textContent = '';
    infoP.textContent = '';
  }
});
