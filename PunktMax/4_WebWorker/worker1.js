self.onmessage = ({data: buffer}) => {
    let tablica = new Float32Array(buffer);
    let max = tablica[0];
    for(i=0; i<(tablica.length)/4;i++){
        if(tablica[i]>max){
            max = tablica[i];
        }
    }
    postMessage(max);
  };