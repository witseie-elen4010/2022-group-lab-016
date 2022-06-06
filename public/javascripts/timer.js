const timer = document.getElementById('timer');


function updateCountdown() {
  const current_date = new Date();
  const diff_hours = 23 - current_date.getHours();
  const diff_minutes = 59 - current_date.getMinutes();
  const diff_seconds = 59 - current_date.getSeconds();
  const h = diff_hours;
  const m = diff_minutes;
  const s = diff_seconds;
  const hour = diff_hours < 10 ? '0' + h : h;
  const minute = diff_minutes < 10 ? '0' + m : m;
  const second = diff_seconds < 10 ? '0' + s : s;
  // Add values to DOM
  timer.innerHTML = hour + ":" + minute + ":" + second;
}

setInterval(updateCountdown, 1000);
