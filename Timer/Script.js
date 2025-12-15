let totalSecs = 0;
let timer = null;

let hrs;
let min;
let sec;

function updateTime(total) {
  let h = Math.floor(total / 3600);
  let m = Math.floor((total % 3600) / 60);
  let s = Math.floor(total % 60);

  document.querySelector("#hr").innerHTML = h < 10 ? "0" + h : h;
  document.querySelector("#min").innerHTML = m < 10 ? "0" + m : m;
  document.querySelector("#sec").innerHTML = s < 10 ? "0" + s : s;
}

function start() {
  let hrCount;
  let minCount;
  let secCount;

  if (timer == null) {
    hrCount = parseInt(document.querySelector(".hrs").value, 10) || 0;
    minCount = parseInt(document.querySelector(".mins").value, 10) || 0;
    secCount = parseInt(document.querySelector(".secs").value, 10) || 0;
  } else {
    hrCount = parseInt(document.querySelector("#hr").innerHTML, 10) || 0;
    minCount = parseInt(document.querySelector("#min").innerHTML, 10) || 0;
    secCount = parseInt(document.querySelector("#sec").innerHTML, 10) || 0;
  }

  totalSecs = hrCount * 3600 + minCount * 60 + secCount;

  if (totalSecs <= 0) {
    alert("Enter a Time !");
    return;
  }
  updateTime(totalSecs);

  timer = setInterval(() => {
    totalSecs--;
    if (totalSecs <= 0) {
      updateTime(0);
      stop();
      alert("Time's Up!");
      return;
    }
    updateTime(totalSecs);
  }, 1000);
}

function stop() {
  clearInterval(timer);
}

function reset() {
  stop();
  document.querySelector("#hr").innerHTML = "00";
  document.querySelector("#min").innerHTML = "00";
  document.querySelector("#sec").innerHTML = "00";

  document.querySelector(".hrs").value = "";
  document.querySelector(".mins").value = "";
  document.querySelector(".secs").value = "";
}
