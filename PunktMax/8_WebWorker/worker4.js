self.onmessage = ({data: buffer}) => {
    let tablica = new Float32Array(buffer);
    let max = tablica[0];
    for(i=i=Math.floor(tablica.length/8-1)*3; i<(tablica.length/8)*4;i++){
        if(tablica[i]>max){
            max = tablica[i];
        };
    };
    postMessage(max);
  };