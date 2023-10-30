// Bubble Code
const bub= document.getElementById("bub-wrap");
const clr=['red','blue','green','yellow','cyan','pink'];
let i=0;
let count=0
const follow = (x,y)=>{
    let blob=document.getElementById("blob")
    blob.animate({
        left: `${x}px`,
        top: `${y}px`
    },{duration: 3000, fill:"forwards"})
}
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
    const cell_cont=document.getElementById("cell-cont");
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

let scrambleFlag=false;
let stopFlag;
window.onmousemove=e=>{
    follow(e.clientX,e.clientY)
}
function changeHeading(){
    if(scrambleFlag)return;
    const arr=['Hello Welcome', 'welcome to the site','frontend dev','js','java','react','angular','node'];
    document.getElementById('heading').dataset.value=arr[count%arr.length].toUpperCase();
    scramble();
    count++;
}

function scramble(){
    const letters="ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    let ite=0;
    const heading=document.getElementById('heading');
    let int=setInterval(()=>{
        heading.innerHTML=heading.dataset.value.split('').map(
            (_letter,index)=>{
            if(index<ite)return heading.dataset.value[index];
            return letters[Math.floor(Math.random()*26)]
        }).join("");
        if(ite>heading.dataset.value.length){
            setTimeout(changeHeading,1000);
            clearInterval(int);
        }
        ite+=1/3;
    },50)
}
document.getElementById('heading').onmouseleave=event=>{
    scrambleFlag=false;
    changeHeading();
}    
document.getElementById('heading').onmouseover=event=>{
    scrambleFlag=true;
}
(changeHeading)()

function startWatch(stop=false){
 stopFlag = stop;
 let min = document.getElementById("min");
 let sec = document.getElementById("sec");
 let click = document.getElementById("click_me");
 let stopId = document.getElementById("stop");
 if(!stop){
     click.style.display = "none";
     stopId.style.display = "block";
    } 
else {
    stopId.style.display = "none";
    click.style.display = "block";
 }
 let seconds=0;
 let interval = setInterval(() => {
     if(stopFlag){
        clearInterval(interval);
        return
     }
    seconds = +sec.innerHTML + 1;
    if(sec.innerHTML>=59)min.innerHTML= formatNumber((seconds%60)+1);
    sec.innerHTML= formatNumber(seconds%60);
 },1000)
}

function formatNumber(number){
    return number<=9 ? "0"+number :number
}