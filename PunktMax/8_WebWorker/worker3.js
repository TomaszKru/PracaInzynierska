self.onmessage = ({data: buffer}) => {
    let tablica = new Float32Array(buffer);
    let max = tablica[0];
    for(i=Math.floor(tablica.length/8-1)*2; i<(tablica.length/8)*3;i++){
        if(tablica[i]>max){
            max = tablica[i];
        };
    };
    postMessage(max);
  };