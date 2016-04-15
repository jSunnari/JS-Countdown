/**
 * Created by Jonas on 2016-04-06.
 */

//Find the next friday and set time to 00:00:00
function nextDay(x){
    var now = new Date();
    now.setDate(now.getDate() + (x+(7-now.getDay())) % 7);
    now.setHours(0);
    now.setMinutes(0);
    now.setSeconds(0);
    return now;
}

//Get remaining time:
function getTimeRemaining(endtime){
    var totalTimeLeft = endtime - new Date();
    var seconds = Math.floor( (totalTimeLeft/1000) % 60 );
    var minutes = Math.floor( (totalTimeLeft/1000/60) % 60 );
    var hours = Math.floor( (totalTimeLeft/(1000*60*60)) % 24 );
    var days = Math.floor( totalTimeLeft/(1000*60*60*24) );
    return {
        'total': totalTimeLeft, //milliseconds
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
    };
}

//Get what day it is:
function getToday() {
    var date = new Date();
    var weekday = new Array(7);
    weekday[0]=  "sunday";
    weekday[1] = "monday";
    weekday[2] = "tuesday";
    weekday[3] = "wednesday";
    weekday[4] = "thursday";
    weekday[5] = "friday";
    weekday[6] = "saturday";

    return weekday[date.getDay()];
}

//If it's friday:
function onFriday() {

    //When it's friday

}

//Init the HTML:
function initializeClock(id, day){
    var header = document.getElementById("header");
    header.innerHTML = ("Sorry, it's only " + getToday() + "..");

    var clock = document.getElementById(id);
    var daysSpan = clock.querySelector('.days');
    var hoursSpan = clock.querySelector('.hours');
    var minutesSpan = clock.querySelector('.minutes');
    var secondsSpan = clock.querySelector('.seconds');

    function updateClock(){
        var timeleft = getTimeRemaining(day);
        daysSpan.innerHTML = ('0' + timeleft.days).slice(-2);
        hoursSpan.innerHTML = ('0' + timeleft.hours).slice(-2);
        minutesSpan.innerHTML = ('0' + timeleft.minutes).slice(-2);
        secondsSpan.innerHTML = ('0' + timeleft.seconds).slice(-2);

        //When countdown is done:
        if(timeleft.total<=0){
            clearInterval(timeinterval);
            onFriday();
        }
    }
    updateClock(); // run function once at first to avoid delay
    var timeinterval = setInterval(updateClock,1000);
}

var friday = nextDay(5);
var today = new Date();

if (today.getDay() != 5) {
    initializeClock('clockdiv', friday);
}
else {
    onFriday();
}

