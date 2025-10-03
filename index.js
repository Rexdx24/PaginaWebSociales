// reproducir sonido
function playSound(id) {
  const el=document.getElementById(id);
  if(el){ el.currentTime=0; el.play().catch(()=>{}); }
}

// sonido al iniciar
window.addEventListener("load", ()=>{ playSound("sound-start"); });

// reloj
function updateClock(){
  const d=new Date();
  const h=String(d.getHours()).padStart(2,'0');
  const m=String(d.getMinutes()).padStart(2,'0');
  document.getElementById('clock').textContent = h+':'+m;
}
updateClock(); setInterval(updateClock,1000*30);

// draggable
function makeDraggable(win){
  const title=win.querySelector('.titlebar');
  let offsetX=0,offsetY=0,dragging=false;
  title.addEventListener('mousedown',(e)=>{dragging=true; offsetX=e.clientX-win.offsetLeft; offsetY=e.clientY-win.offsetTop; win.style.zIndex=Date.now();});
  document.addEventListener('mousemove',(e)=>{ if(!dragging) return; win.style.left=(e.clientX-offsetX)+'px'; win.style.top=(e.clientY-offsetY)+'px'; });
  document.addEventListener('mouseup',()=>{dragging=false});
}
document.querySelectorAll('.window').forEach(makeDraggable);

// abrir ventana
document.querySelectorAll('.icon').forEach(ic=>{
  ic.addEventListener('dblclick',()=>{
    const app=ic.dataset.app;
    const w=document.getElementById('win-'+app);
    if(w){
      w.style.display='block';
      w.style.zIndex=Date.now();
      playSound("sound-click");
    }
  });
});

// cerrar ventana
function attachCloseButtons(){
  const closeButtons=document.querySelectorAll('.btn.close');
  closeButtons.forEach(btn=>{
    btn.onclick=(e)=>{
      const win=e.target.closest('.window');
      if(win){ win.style.display='none'; playSound("sound-close"); }
    }
  });
}
attachCloseButtons();
