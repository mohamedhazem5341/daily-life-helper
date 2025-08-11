// password.js
document.addEventListener('DOMContentLoaded', () => {
  const lengthInput = document.getElementById('length');
  const uppercaseCheckbox = document.getElementById('uppercase');
  const numbersCheckbox = document.getElementById('numbers');
  const symbolsCheckbox = document.getElementById('symbols');
  const generateBtn = document.getElementById('generate-btn');
  const passwordOutput = document.getElementById('password-output');
  const copyBtn = document.getElementById('copy-btn');

  const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
  const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numberChars = '0123456789';
  const symbolChars = '!@#$%^&*()_+[]{}|;:,.<>?/';

  generateBtn.addEventListener('click', () => {
    const length = parseInt(lengthInput.value, 10) || 12;
    if (length < 4 || length > 50) {
      passwordOutput.textContent = 'Choose length between 4 and 50.';
      copyBtn.style.display = 'none';
      return;
    }
    let charset = lowercaseChars;
    if (uppercaseCheckbox.checked) charset += uppercaseChars;
    if (numbersCheckbox.checked) charset += numberChars;
    if (symbolsCheckbox.checked) charset += symbolChars;

    let pass = '';
    for (let i = 0; i < length; i++) {
      pass += charset.charAt(Math.floor(Math.random() * charset.length));
    }

    passwordOutput.textContent = pass;
    copyBtn.style.display = 'inline-block';
  });

  copyBtn.addEventListener('click', () => {
    const text = passwordOutput.textContent;
    navigator.clipboard.writeText(text).then(() => {
      copyBtn.textContent = 'Copied!';
      setTimeout(() => copyBtn.textContent = 'Copy', 1400);
    }).catch(()=> alert('Copy failed — try manual copy.'));
  });
});
