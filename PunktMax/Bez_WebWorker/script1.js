"use strict"

let input = document.getElementById("file");

input.onchange = async function() {
  let tiff = await GeoTIFF.fromBlob(input.files[0]);
  let image = await tiff.getImage();
  let dane = await image.readRasters({interleave: true});
  let PunktMax = dane[0];
  
  console.time('czas');
  for(let i=1;i<dane.length;i++){
      if(PunktMax<dane[i]){
        PunktMax=dane[i];
      }
  }
  console.log(PunktMax);
  console.timeEnd('czas');
};