self.onmessage = ({data: buffer}) => {
    let dane = new Float32Array(buffer);
    self.onmessage = ({data: buffer2}) => {
        let wyniki = new Float32Array(buffer2);
        let szerokosc=1738; //Wartość wprowadzona ręcznie z getWidth
        
        for (let i=Math.floor(dane.length/4-1)*2; i<(dane.length/4)*3; i++){
            if(i%szerokosc==0 || i%(szerokosc)==szerokosc-1 || i<(szerokosc-1) || i>=(dane.length-(szerokosc+1))){
                wyniki[i]=0;
            }else{
                wyniki[i] = Math.tan(((dane[i+szerokosc-1]+(2*dane[i+szerokosc])+dane[i+szerokosc+1])-(dane[i-szerokosc-1]+(2*dane[i-szerokosc])+dane[i-szerokosc+1]))/((dane[i-szerokosc-1]+(2*dane[i-1])+dane[i+szerokosc-1])-(dane[i-szerokosc+1]+(2*dane[i+1])+dane[i+szerokosc+1])));
            }
        };
        postMessage('Wykonano');
    };
};