"use strict"
let worker1 = new Worker('worker1.js');
let worker2 = new Worker('worker2.js');
let worker3 = new Worker('worker3.js');
let worker4 = new Worker('worker4.js');
let input = document.getElementById("file");


input.onchange = async function() {
  let tiff = await GeoTIFF.fromBlob(input.files[0]);
  let image = await tiff.getImage();
  let dane = await image.readRasters({interleave: true});
  let szerokosc = image.getWidth();
  
  let sharedBuffer = new SharedArrayBuffer(Float32Array.BYTES_PER_ELEMENT * dane.length)
  let sharedArray = new Float32Array(sharedBuffer);

  let sharedBuffer2 = new SharedArrayBuffer(Float32Array.BYTES_PER_ELEMENT * dane.length)
  let sharedArray2 = new Float32Array(sharedBuffer2);
  
  for(let i = 0; i<dane.length; i++){
    sharedArray[i]=dane[i];
  }

  console.time('czas');
  worker1.postMessage(sharedBuffer);
  worker1.postMessage(sharedBuffer2);

  worker2.postMessage(sharedBuffer);
  worker2.postMessage(sharedBuffer2);

  worker3.postMessage(sharedBuffer);
  worker3.postMessage(sharedBuffer2);

  worker4.postMessage(sharedBuffer);
  worker4.postMessage(sharedBuffer2);

  let liczbaOdpowiedzi=0;
  
  worker1.addEventListener('message',  (event)=>{
    liczbaOdpowiedzi=liczbaOdpowiedzi+1
    if(liczbaOdpowiedzi===4){
      console.log(sharedArray2);
      console.timeEnd('czas');
    };
  });

  worker2.addEventListener('message',  (event)=>{
    liczbaOdpowiedzi=liczbaOdpowiedzi+1
    if(liczbaOdpowiedzi===4){
      console.log(sharedArray2);
      console.timeEnd('czas');
    };
  });

  worker3.addEventListener('message',  (event)=>{
    liczbaOdpowiedzi=liczbaOdpowiedzi+1
    if(liczbaOdpowiedzi===4){
      console.log(sharedArray2);
      console.timeEnd('czas');
    };
  });

  worker4.addEventListener('message',  (event)=>{
    liczbaOdpowiedzi=liczbaOdpowiedzi+1
    if(liczbaOdpowiedzi===4){
      console.log(sharedArray2);
      console.timeEnd('czas');
    };
  });
};
