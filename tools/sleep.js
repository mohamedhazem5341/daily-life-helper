// sleep.js
document.addEventListener('DOMContentLoaded', () => {
  const wakeInput = document.getElementById('wakeTime');
  const calc = document.getElementById('sleep-calc');
  const clear = document.getElementById('sleep-clear');
  const out = document.getElementById('sleep-result');

  calc.addEventListener('click', () => {
    const wake = wakeInput.value;
    if (!wake) { alert('Please enter a wake-up time.'); return; }

    const [h, m] = wake.split(':').map(Number);
    const wakeDate = new Date();
    wakeDate.setHours(h, m, 0, 0);

    // show times to go to bed for 6 cycles down to 1 cycle
    const results = [];
    for (let cycles = 6; cycles >= 1; cycles--) {
      // each cycle ~ 90 mins, add 15 min to fall asleep
      const minutesBack = cycles * 90 + 15;
      const sleepDate = new Date(wakeDate.getTime() - minutesBack * 60000);
      results.push({ cycles, time: formatTime(sleepDate) });
    }

    out.innerHTML = `<div>Recommended times to go to bed (cycles shown):</div>
      <ul style="margin-top:8px;">${results.map(r => `<li>${r.time} — ${r.cycles} cycle(s)</li>`).join('')}</ul>`;
  });

  clear.addEventListener('click', () => {
    wakeInput.value = '';
    out.textContent = '';
  });

  function formatTime(d){
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
});
