self.onmessage = ({data: buffer}) => {
    let tablica = new Float32Array(buffer);
    let max = tablica[0];
    for(i=Math.floor(tablica.length/4-1)*3; i<tablica.length-1;i++){
        if(tablica[i]>max){
            max = tablica[i];
        }
    }
    postMessage(max);
  };