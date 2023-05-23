const bub= document.getElementById("bub-wrap");
const clr=['red','blue','green','yellow','cyan','pink'];
let i=0;
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
window.onmousemove=e=>{
    // fn(e.clientX);
    follow(e.clientX,e.clientY)
}
// window.addEventListener("resize",generateCells);

document.getElementById('heading').onmouseover=event=>{
    const letters="ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    let ite=0;
    let int=setInterval(()=>{
        event.target.innerHTML=event.target.innerHTML.split('').map(
            (letter,index)=>{
            if(index<ite)return event.target.dataset.value[index];
            return letters[Math.floor(Math.random()*26)]
        }).join("");
        if(ite>event.target.dataset.value.length)clearInterval(int);
        ite+=1/3;
    },50)
}
