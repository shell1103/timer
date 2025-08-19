document.addEventListener('DOMContentLoaded', function() {
  const workInput = document.getElementById('workTime');
  const restInput = document.getElementById('restTime');
  const roundsInput = document.getElementById('rounds');
  const startButton = document.getElementById('startButton');
  const phaseDisplay = document.getElementById('phase');
  const timeDisplay = document.getElementById('time');
  const currentRoundDisplay = document.getElementById('currentRound');

  let timer;
  let currentRound = 0;
  let totalRounds = 0;
  let workTime = 0;
  let restTime = 0;
  let remainingTime = 0;
  let isWorkPhase = true;

  function formatTime(seconds) {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  }

  function startTimer() {
    workTime = parseInt(workInput.value);
    restTime = parseInt(restInput.value);
    totalRounds = parseInt(roundsInput.value);

    if (isNaN(workTime) || isNaN(restTime) || isNaN(totalRounds) || workTime <=0 || restTime <=0 || totalRounds <=0) {
      alert('正しい数値を入力してください');
      return;
    }

    currentRound = 1;
    isWorkPhase = true;
    remainingTime = workTime;
    updateDisplay();

    clearInterval(timer);
    timer = setInterval(tick, 1000);
  }

  function tick() {
    remainingTime -= 1;
    if (remainingTime <= 0) {
      if (isWorkPhase) {
        isWorkPhase = false;
        remainingTime = restTime;
      } else {
        if (currentRound < totalRounds) {
          currentRound++;
          isWorkPhase = true;
          remainingTime = workTime;
        } else {
          clearInterval(timer);
          phaseDisplay.textContent = '終了！';
          timeDisplay.textContent = '00:00';
          currentRoundDisplay.textContent = `ラウンド: ${totalRounds} / ${totalRounds}`;
          return;
        }
      }
    }
    updateDisplay();
  }

  function updateDisplay() {
    phaseDisplay.textContent = isWorkPhase ? 'ワーク中' : '休憩中';
    timeDisplay.textContent = formatTime(Math.max(remainingTime,0));
    currentRoundDisplay.textContent = `ラウンド: ${currentRound} / ${totalRounds}`;
  }

  startButton.addEventListener('click', startTimer);
});
