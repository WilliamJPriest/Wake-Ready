

//Traverse the Dom
const clock= document.querySelector("#clock")
const todaysDate= document.querySelector("#date-info")
const liTag=document.getElementsByTagName("li")
const hourSelect= document.querySelector("#hour-select")
const liTagHour= hourSelect.getElementsByTagName("li");//might have to change it
const minuteSelect= document.querySelector("#minute-select")
const liTagMinute= minuteSelect.getElementsByTagName("li")
const amPmSelect = document.querySelector("#am-pm-select")
const liTagAmPm= amPmSelect.getElementsByTagName("li")
const allAlarms= document.querySelector("#all-alarms")
const modalBG= document.querySelector("#modal-bg")
const alarmChallengeModal = document.querySelector("#alarm-challenge-modal")
const solveChallengeModal = document.querySelector("#solve-challenge-modal-container")
const solveChallenge= document.querySelector("#solve-challenge")
const inputValue= document.querySelector("#input-value"); 

//Time Variables and Postioning
let keepHourCount=0;
let keepMinuteCount=0;
let keepAmPmCount=0;
let hourValue=0;
let size= liTag[0].clientHeight


//Btns
const hourBTNTop= document.querySelector("#hour-btn-top")
const hourBTNBottom= document.querySelector("#hour-btn-bottom")
const minuteBTNTop= document.querySelector("#minute-btn-top")
const minuteBTNBottom= document.querySelector("#minute-btn-bottom")
const amPmBTNTop= document.querySelector("#am-pm-btn-top")
const amPmBTNBottom= document.querySelector("#am-pm-btn-bottom")
const selectChallengeBTN=document.querySelectorAll("#select-challenge-container button")
const exitModalBTN= document.querySelector("#exit-modal-btn")
const openModalBTN= document.querySelector("#open-modal-btn")
const setAlarm= document.querySelector("#set-alarm")

//Challenges
const challenges= [3,4,15,9,7,10] //firstValue+secondValue=result
let challengeSelected= false;
let challengeType="None";

let clockPaused=false;
let alarmOn = true;
let alarmCount=0;

const clockParaTag= document.createElement("p")
clock.append(clockParaTag)
const dateParaTag= document.createElement("p")
todaysDate.append(dateParaTag)

let alarmsArray=[];
let audio = new Audio(`mp3/alarm.mp3`)

function clockFace(){
    if (clockPaused ===false){
        let amPm = "Am"
        let currentTime= new Date();
        let seconds= currentTime.getSeconds()
        let minutes= currentTime.getMinutes()
        let hours= currentTime.getHours()
        days= currentTime.getDate()
        months= currentTime.getUTCMonth()+1
        years= currentTime.getUTCFullYear()
        if(hours>12){
            hours= hours-12;
            amPm ="Pm"
        }
        ///Ternary Operator, if a digit is less than 10 
        //it adds a zero in front for aesthics
        hours= hours<10 ? `0${hours}`:hours
        minutes= minutes<10 ? `0${minutes}`:minutes
        seconds= seconds<10 ? `0${seconds}`:seconds
        days= days<10 ? `0${days}`:days
        months= months<10 ? `0${months}`:months

        clockParaTag.textContent=`${hours}:${minutes}:${seconds} ${amPm}`
        dateParaTag.textContent=`${years}/${months}/${days}`
        clockValue= `${hours}:${minutes}:${seconds} ${amPm}`
        alarmCheck()
        window.requestAnimationFrame(clockFace)
    }
    if(clockPaused===true){
        challengeModal()
    }
        
}

requestAnimationFrame(clockFace)

function alarmCheck(){
    alarmsArray.forEach(checkAlarms => {
        if(checkAlarms.time==clockValue ){
            clockPaused=true;
            audio.play()
            audio.loop=true
        }
    })
    //double equality becaus user don't type the input so "0"==0 is the same and easy to use in this case
}

function challengeModal(){
    modalBG.style.visibility="visible"
    solveChallengeModal.style.visibility="visible"
    let challengePara= document.querySelector("#challenge-problem")
    alarmsArray.forEach(alarmAndChallenge => {
        if(alarmAndChallenge.time==clockValue&&alarmAndChallenge.challenge=="Easy"){
            challengePara.innerText=`${firstValue}+${secondValue} =`
            inputValue.style.visibility="visible"
        }

        if(alarmAndChallenge.time==clockValue&&alarmAndChallenge.challenge=="None"||undefined){
            inputValue.style.visibility="hidden"
            
    }
    })
}

hourBTNTop.addEventListener("click",()=>{
    if(keepHourCount===0){
        hourSelect.style.transition = "None";
        liTagHour[keepHourCount].classList.remove("active")
        hourSelect.style.transform=`translateY(${-size*11}px)`
        keepHourCount=11;
        liTagHour[keepHourCount].classList.add("active")
        return 
    }
    hourSelect.style.transition = "transform 0.4s ease-in-out";
    liTagHour[keepHourCount].classList.remove("active")
    keepHourCount--
    liTagHour[keepHourCount].classList.add("active")
    hourSelect.style.transform=`translateY(${-size*keepHourCount}px)`
    //the negative -size keeps it from adding up and going off the screen
    //moves too much, I want it to be center screen
})


hourBTNBottom.addEventListener("click",()=>{
    // centering=1;
    if(keepHourCount===12){
         //sudden gold transtion
        hourSelect.style.transition = "None";
        liTagHour[keepHourCount].classList.remove("active")
        hourSelect.style.transform=`translateY(${-size*0}px)`
        keepHourCount=0;
        liTagHour[keepHourCount].classList.add("active")
        return
    }
    hourSelect.style.transition = "transform 0.4s ease-in-out";
    liTagHour[keepHourCount].classList.remove("active")
    keepHourCount++
    liTagHour[keepHourCount].classList.add("active")
    hourSelect.style.transform=`translateY(${-size*keepHourCount}px)`
})

minuteBTNTop.addEventListener("click",()=>{
    if(keepMinuteCount===0){
        minuteSelect.style.transition = "None";
        liTagMinute[keepMinuteCount].classList.remove("active")
        minuteSelect.style.transform=`translateY(${-size*59}px)`
        keepMinuteCount=59;
        liTagMinute[keepMinuteCount].classList.add("active")
        return 
    }
    minuteSelect.style.transition = "transform 0.4s ease-in-out";
    liTagMinute[keepMinuteCount].classList.remove("active")
    keepMinuteCount--
    liTagMinute[keepMinuteCount].classList.add("active")
    minuteSelect.style.transform=`translateY(${-size*keepMinuteCount}px)`
    //the negative -size keeps it from adding up and going off the screen
    //moves too much, I want it to be center screen
})


minuteBTNBottom.addEventListener("click",()=>{
    // centering=1;
    if(keepMinuteCount===59){
         //sudden gold transtion
        minuteSelect.style.transition = "None";
        liTagMinute[keepMinuteCount].classList.remove("active")
        minuteSelect.style.transform=`translateY(${-size*0}px)`
        keepMinuteCount=0;
        liTagMinute[keepMinuteCount].classList.add("active")
        return
    }
    minuteSelect.style.transition = "transform 0.4s ease-in-out";
    liTagMinute[keepMinuteCount].classList.remove("active")
    keepMinuteCount++
    liTagMinute[keepMinuteCount].classList.add("active")
    minuteSelect.style.transform=`translateY(${-size*keepMinuteCount}px)`
})
amPmBTNTop.addEventListener("click",()=>{
    if(keepAmPmCount===0){
        amPmSelect.style.transition = "None";
        liTagAmPm[keepAmPmCount].classList.remove("active")
        amPmSelect.style.transform=`translateY(${-size*1}px)`
        keepAmPmCount=1;
        liTagAmPm[keepAmPmCount].classList.add("active")
        return 
    }
    amPmSelect.style.transition = "transform 0.4s ease-in-out";
    liTagAmPm[keepAmPmCount].classList.remove("active")
    keepAmPmCount--
    liTagAmPm[keepAmPmCount].classList.add("active")
    amPmSelect.style.transform=`translateY(${-size*keepAmPmCount}px)`
    //the negative -size keeps it from adding up and going off the screen
    //moves too much, I want it to be center screen
})


amPmBTNBottom.addEventListener("click",()=>{
    // centering=1;
    if(keepAmPmCount===1){
         //sudden gold transtion
        amPmSelect.style.transition = "None";
        liTagAmPm[keepAmPmCount].classList.remove("active")
        amPmSelect.style.transform=`translateY(${-size*0}px)`
        keepAmPmCount=0;
        liTagAmPm[keepAmPmCount].classList.add("active")
        return
    }
    amPmSelect.style.transition = "transform 0.4s ease-in-out";
    liTagAmPm[keepAmPmCount].classList.remove("active")
    keepAmPmCount++
    liTagAmPm[keepAmPmCount].classList.add("active")
    amPmSelect.style.transform=`translateY(${-size*keepAmPmCount}px)`
})


for(let i=0; i<selectChallengeBTN.length;i++){
    selectChallengeBTN[i].addEventListener("click",(e)=>{
        if(selectChallengeBTN[i].innerText==="Easy"){
            firstValue = challenges[Math.floor(Math.random()*challenges.length)];
            secondValue= challenges[Math.floor(Math.random()*challenges.length)]
            challengeType="Easy";
            inputValue.style.visibility="hidden"
        }else{
            challengeType="None";
            inputValue.style.visibility="hidden" 
        }
        
    })
}

exitModalBTN.addEventListener("click",()=>{
    modalBG.style.visibility="hidden"
    alarmChallengeModal.style.visibility="hidden"
})

openModalBTN.addEventListener("click",()=>{
    modalBG.style.visibility="visible"
    alarmChallengeModal.style.visibility="visible"
})

setAlarm.addEventListener("click",(e)=>{
    alarmCount++
    hourValue= liTagHour[keepHourCount].innerText;
    minuteValue= liTagMinute[keepMinuteCount].innerText;
    amPmValue= liTagAmPm[keepAmPmCount].innerText;
    let newAlarm= document.createElement("div")
    newAlarm.classList.add("alarm-container")
    alarmValue= `${hourValue}:${minuteValue}:00 ${amPmValue}`
    newAlarm.innerHTML+= 
    `
    <div class="alarm-info">
        <h4 "> <span class="alarm-time">${alarmValue.slice(0,5)+alarmValue.slice(8)}</span></h4>
        <p>${challengeType}</p>
        <button value="${alarmCount}"class="delete-alarm-btn">Delete Alarm</button>
    </div>
    `
    allAlarms.append(newAlarm)
    alarmsArray.push({
            time:alarmValue,
            id: alarmCount,
            challenge: challengeType
    })

    modalBG.style.visibility="hidden"
    alarmChallengeModal.style.visibility="hidden"
    challengeType;
    
})

document.addEventListener("click",e=>{
    //using event delegation/bubbling i'm able to add an event listener to an event
    // that doesn't yet exist by bubbling up to the dom then looking for a certain class.
        if(e.target.classList.contains('delete-alarm-btn')){
            let checkedID=e.target.value
            alarmsArray = alarmsArray.filter(alarm => alarm.id != checkedID)
            e.target.parentNode.parentNode.remove()
        }
})

document.querySelector("#user-input").addEventListener("click",(e)=>{
    e.preventDefault()
    if(challengeType==="Easy" && firstValue+secondValue==inputValue.value  ){
        clockPaused=false
        audio.loop=false
        modalBG.style.visibility="hidden"
        solveChallengeModal.style.visibility="hidden"
        inputValue.style.visibility="hidden"
        inputValue.value=null
        clockFace()       
    }
    if(challengeType==="None"){
        clockPaused=false
        audio.loop=false
        modalBG.style.visibility="hidden"
        solveChallengeModal.style.visibility="hidden"
        inputValue.style.visibility="hidden"
        clockFace()
    }


})

