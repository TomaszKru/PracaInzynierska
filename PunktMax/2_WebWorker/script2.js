"use strict"
let worker1 = new Worker('worker2.js');
let worker2 = new Worker('worker1.js');
let input = document.getElementById("file");

input.onchange = async function() {
  let tiff = await GeoTIFF.fromBlob(input.files[0]);
  let image = await tiff.getImage();
  let dane = await image.readRasters({interleave: true});
  
  let sharedBuffer = new SharedArrayBuffer(Float32Array.BYTES_PER_ELEMENT * dane.length)
  let sharedArray = new Float32Array(sharedBuffer)
  
  for(let i = 0; i<dane.length; i++){
      sharedArray[i]=dane[i];
  };
  
  console.time('czas');
  worker1.postMessage(sharedBuffer);
  worker2.postMessage(sharedBuffer);

  let punktMax;
  let liczbaOdpowiedzi = 0;
  
  worker1.addEventListener('message',  (event)=>{
    let wartosc= event.data;
    if(liczbaOdpowiedzi===0 || punktMax<wartosc) {
      punktMax=wartosc;
    };
    liczbaOdpowiedzi=liczbaOdpowiedzi+1;
    if (liczbaOdpowiedzi===2){
      console.log(punktMax);
      console.timeEnd('czas');
    };
  });
  
  worker2.addEventListener('message', (event)=>{
    let wartosc= event.data;
    if(liczbaOdpowiedzi===0 || punktMax<wartosc) {
      punktMax=wartosc;
    };
    liczbaOdpowiedzi=liczbaOdpowiedzi+1;
    if (liczbaOdpowiedzi===2){
      console.log(punktMax);
      console.timeEnd('czas');
    };
  });
};