
// import { eleId } from "./helper";
// const helper = require( "./helper");
// requi
// const eleId = helper.eleId;
function eleId(id){
    return document.getElementById(id)
}





// Bubble Code
const bub= eleId("bub-wrap");
const clr=['red','blue','green','yellow','cyan','pink'];
let i=0;
let count=0

const fn=e=>{
    const di=document.createElement("div");
    if(i>=clr.length)i=0;
    di.className="bub";
    di.style.background=clr[i++];
    di.style.left=`${e-100}px`;
    bub.appendChild(di);
    setTimeout(()=>bub.removeChild(di),2000);
}

const generateCells= ()=>{
    console.log("hello there")
    const cell_cont=eleId("cell-cont");
    cell_cont.innerHTML='';
    
    for(let i=0;i<=(window.innerWidth/50)*9;i++){
        const content = document.createElement("div");
        content.className="cell"
        // content.innerHTML=i;
        content.appendChild(document.createElement("p"))
        cell_cont.appendChild(content);
    }
}
// window.addEventListener("resize",generateCells);

// --- Bubble code end ----

let scrambleFlag = false;
let runningFlag = false;
let stopFlag;
let watchInterval = [];
let alarmFlag = false;
let min_timer_value;
let seconds = 0;

const alarmSound  = new Audio("ringtone-126505.mp3");
alarmSound.loop= true;


const follow = (x,y)=>{
    let blob=eleId("blob")
    if(document.title=="Stop Watch"){
        blob.style.background = "linear-gradient(120deg,rgb(21, 255, 0),#008932)"
    }
    if(blob){
        blob.animate({
            left: `${x}px`,
            top: `${y}px`
        },{duration: 3000, fill:"forwards"})
    }
}
window.onmousemove=e=>{
    follow(e.clientX,e.clientY)
}
function changeHeading(){
    if(scrambleFlag || runningFlag || !eleId("heading")) return;
    const arr=['Hello Welcome', 'my name is amal k ajith','Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum '
,'frontend dev','js','java','react','angular','node'];
    eleId('heading').dataset.value=arr[count%arr.length].toUpperCase();
    runningFlag = true
    scramble();
    count++;
}

function scramble(){
    const letters="ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    let ite=0;
    const heading=eleId('heading');
    let int=setInterval(()=>{
        heading.innerHTML=heading.dataset.value.split('').map(
            (_letter,index)=>{
            if(index<ite)return heading.dataset.value[index];
            return letters[Math.floor(Math.random()*26)]
        }).join("");
        if(ite>heading.dataset.value.length){
            setTimeout(changeHeading,1000);
            clearInterval(int);
            runningFlag = false;
        }
        ite+=1/3;
    },50)
}
if(eleId('heading')){
    eleId('heading').onmouseleave=event=>{
        scrambleFlag=false;
        changeHeading();
    }    
    eleId('heading').onmouseover=event=>{
        scrambleFlag=true;
    }
}

function startWatch(stop = false) {
    stopFlag = stop;
    let min = eleId("min");
    let sec = eleId("sec");
    let milli_sec = eleId("milli_sec");
    let click = eleId("play_child");
    let click_parent = eleId("play_parent");
    let stopId = eleId("stop_child");
    let stopId_parent = eleId("stop_parent");
    if (!stop) {
        click.style.display = "none";
        click_parent.style.display = "none";
        stopId.style.display = "block";
        stopId_parent.style.display = "block";
    }
    else {
        stopId.style.display = "none";
        stopId_parent.style.display = "none";
        click.style.display = "block";
        click_parent.style.display = "block";
    }
    
    if (stopFlag) {
        watchInterval.forEach(clearInterval);
        return;
    }
    watchInterval.push(setInterval(() => {
        if (Number(min.innerHTML) >= min_timer_value && min_timer_value > 0) {
            playSound();
            let stop_sound = eleId("stop_sound");
            stop_sound.style.display = "block";
            stopFlag = true
            watchInterval.forEach(clearInterval);
            return
        }
        seconds = ++seconds;
        if (milli_sec.innerHTML >= 99 && sec.innerHTML >= 59) {
            min.innerHTML = formatNumber(Number(min.innerHTML) + ((sec.innerHTML % 59) + 1));
        }
        if (milli_sec.innerHTML >= 99) {
            sec.innerHTML = formatNumber((Number(sec.innerHTML) + 1) % 60);
        }
        milli_sec.innerHTML = formatNumber(seconds % 100);
    }, 10))
}

function setTimer() {
    let timer_value = eleId("timer").value;
}

function setTimerMin (sign){
    let min_ele = eleId("timer_min");
    if(min_ele.innerHTML<='0' && sign=='-')return;
    if(sign === '-')min_ele.innerHTML=(+min_ele.innerHTML)-1;
    if(sign === '+')min_ele.innerHTML=(+min_ele.innerHTML)+1;
    min_timer_value = +min_ele.innerHTML;
}

function playSound() {
    if (!alarmFlag) {
        alarmSound.play();
        alarmFlag = true;
    }
    else{
        alarmSound.pause();
        let stop_sound= eleId("stop_sound");
        stop_sound.style.display="none";
        resetWatch()
        alarmFlag=false;
    } 
}

function resetWatch(){
    let min = eleId("min");
    let sec = eleId("sec");
    min.innerHTML="00";
    sec.innerHTML="00";
    seconds=0;

    let click = eleId("play_child");
    let click_parent = eleId("play_parent");
    let stopId = eleId("stop_child");
    let stopId_parent = eleId("stop_parent");
    
    stopId.style.display = "none";
    stopId_parent.style.display = "none";
    click.style.display = "block";
    click_parent.style.display = "block";
    
}


function formatNumber(number){
    return number<=9 ? "0"+number :number
}

window.onload = (event) =>{
     (changeHeading)()
}