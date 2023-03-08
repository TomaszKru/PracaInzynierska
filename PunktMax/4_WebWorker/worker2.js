self.onmessage = ({data: buffer}) => {
    let tablica = new Float32Array(buffer);
    let max = tablica[0];
    for(i=Math.floor(tablica.length/4-1); i<(tablica.length/4)*2;i++){
        if(tablica[i]>max){
            max = tablica[i];
        }
    }
    postMessage(max);
  };