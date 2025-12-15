let minCount = 0;
let secCount = 0;
let msCount = 0;

let timer;


function start() {
    if (timer != null) return;
    // let flag = true;
    timer = setInterval(() => {
        // flag && console.log(Date.now());
        msCount++;
        document.querySelector('#ms').innerHTML = msCount < 10 ? '0' + msCount : msCount == 100 ? "00" : msCount;
        if (msCount >= 100) {
            secCount++;
            document.querySelector('#sec').innerHTML = secCount < 10 ? '0' + secCount : secCount == 60 ? "00" : secCount;
            msCount = 0;
        }
        if (secCount >= 60) {
            minCount++;
            document.querySelector('#min').innerHTML = minCount < 10 ? '0' + minCount : minCount == 60 ? "00" : minCount;
            secCount = 0;
        }
    }, 10);
}

function stop() {
    clearInterval(timer);
    // flag = false;
    timer = null;
}

function reset() {
    minCount = 0;
    secCount = 0;
    msCount = 0;

    stop();

    document.querySelector('#min').innerHTML = "00";
    document.querySelector('#sec').innerHTML = "00";
    document.querySelector('#ms').innerHTML = "00";
}
