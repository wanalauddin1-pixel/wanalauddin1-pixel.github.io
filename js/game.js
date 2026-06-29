document.addEventListener('DOMContentLoaded', function () {
  const box = document.getElementById('reactionBox');
  const resultDisplay = document.getElementById('result');
  const bestDisplay = document.getElementById('best');
  const attemptsDisplay = document.getElementById('attempts');
  const resetBtn = document.getElementById('resetBtn');

  if (!box) return;

  let state = 'idle';
  let timerStart = 0;
  let timeoutId = null;
  let best = Infinity;
  let attempts = [];

  function getRandomDelay() {
    return Math.floor(Math.random() * 4000) + 1000;
  }

  function formatTime(ms) {
    return ms.toFixed(0) + ' ms';
  }

  function updateStats() {
    if (best === Infinity) {
      bestDisplay.textContent = '--';
    } else {
      bestDisplay.textContent = formatTime(best);
    }
    attemptsDisplay.textContent = attempts.length;
  }

  function setBox(mode, text) {
    box.className = 'reaction-box ' + mode;
    box.textContent = text;
  }

  function startWaiting() {
    state = 'waiting';
    setBox('waiting', 'Wait for green...');
    if (resultDisplay) resultDisplay.textContent = '--';

    const delay = getRandomDelay();
    timeoutId = setTimeout(function () {
      if (state === 'waiting') {
        state = 'ready';
        timerStart = performance.now();
        setBox('ready', 'CLICK NOW!');
      }
    }, delay);
  }

  box.addEventListener('click', function () {
    if (state === 'idle') {
      startWaiting();
    } else if (state === 'waiting') {
      clearTimeout(timeoutId);
      state = 'early';
      setBox('early', 'Too early!');
      if (resultDisplay) resultDisplay.textContent = 'Too early!';
    } else if (state === 'ready') {
      const reactionTime = performance.now() - timerStart;
      attempts.push(reactionTime);
      if (resultDisplay) resultDisplay.textContent = formatTime(reactionTime);

      if (reactionTime < best) {
        best = reactionTime;
      }

      updateStats();
      state = 'idle';
      setBox('idle', 'Click to start');
    } else if (state === 'early') {
      startWaiting();
    }
  });

  if (resetBtn) {
    resetBtn.addEventListener('click', function () {
      clearTimeout(timeoutId);
      state = 'idle';
      best = Infinity;
      attempts = [];
      setBox('idle', 'Click to start');
      if (resultDisplay) resultDisplay.textContent = '--';
      updateStats();
    });
  }

  setBox('idle', 'Click to start');
  updateStats();
});
