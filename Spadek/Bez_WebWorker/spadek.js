"use strict"

let input = document.getElementById("file");

input.onchange = async function() {
  let tiff = await GeoTIFF.fromBlob(input.files[0]);
  let image = await tiff.getImage();
  let dane = await image.readRasters({interleave: true});
  let szerokosc = image.getWidth();
  let wynik = new Float32Array(dane.length);
  
  console.time('czas');
  for (let i=0; i<dane.length-1; i++){
    if(i%szerokosc==0 || i%(szerokosc)==szerokosc-1 || i<(szerokosc-1) || i>=(dane.length-(szerokosc+1))){
      wynik[i]=0;
    }else{
    wynik[i] = Math.tan(((dane[i+szerokosc-1]+(2*dane[i+szerokosc])+dane[i+szerokosc+1])-(dane[i-szerokosc-1]+(2*dane[i-szerokosc])+dane[i-szerokosc+1]))/((dane[i-szerokosc-1]+(2*dane[i-1])+dane[i+szerokosc-1])-(dane[i-szerokosc+1]+(2*dane[i+1])+dane[i+szerokosc+1])));
    }
  }
  console.log(wynik);
  console.timeEnd('czas');
};