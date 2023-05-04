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
    window.innerWidth
    for(let i=0;i<10;i++){
        const content = document.createElement("div");
        content.className="cell"
        content.appendChild(document.createElement("p"))
        cell_cont.appendChild(content);
    }
}
var x = 0;
function myFunction() {
  var txt = x += 1;
  document.getElementById("demo").innerHTML = txt;
}
window.onmousemove=e=>{
    fn(e.clientX);
        follow(e.clientX,e.clientY)
    }
    window.addEventListener("resize",generateCells);
