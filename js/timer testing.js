
        // Timer

//Creating Timer
let hour = 0;
let minutes = 0;
let seconds = 0;

//create timer variable
let timer;
timeText.innerText = formatTime();
// start timer function 
function startTimer() {
    timer = setInterval(function(){
        seconds++;
        if(seconds == 60) {
            minutes ++;
            seconds = 0;
        }
        //console.log(formatTime());
    }, 1000);
    
}

//stop timer fuction
function stopTimer(){
    clearInterval(timer);
    console.log(formatTime());
}

function formatTime() {
    let sec = seconds > 9 ? String(seconds) : '0' + String(seconds);
    let min = minutes > 9 ? String(minutes) : '0' + String(minutes);
    return min + ':' + sec;
}
