let print_score= function(){
    const guess_1 = document.getElementById('guess-1p');
    const guess_2 = document.getElementById('guess-2p');
    const guess_3 = document.getElementById('guess-3p');
    const guess_4 = document.getElementById('guess-4p');
    const guess_5 = document.getElementById('guess-5p');
    const guess_6 = document.getElementById('guess-6p');
  
    guess_1.innerHTML = Number(localStorage.getItem('bar-1p'));
    guess_2.innerHTML = Number(localStorage.getItem('bar-2p'));
    guess_3.innerHTML = Number(localStorage.getItem('bar-3p'));
    guess_4.innerHTML = Number(localStorage.getItem('bar-4p'));
    guess_5.innerHTML = Number(localStorage.getItem('bar-5p'));
    guess_6.innerHTML = Number(localStorage.getItem('bar-6p'));
  }
  
  let update_score= function(element){
  
   if(element==6){
    var scored = Number(localStorage.getItem('bar-1p'));
    localStorage.setItem('bar-1p',++scored);
   }else if(element==5){
    var scored = Number(localStorage.getItem('bar-2p'));
     localStorage.setItem('bar-2p',++scored);  
   }else if(element==4){
    var scored = Number(localStorage.getItem('bar-3p'));
     localStorage.setItem('bar-3p',++scored);  
   }else if(element==3){
    var scored = Number(localStorage.getItem('bar-4p'));
     localStorage.setItem('bar-4p',++scored);  
   }else if(element==2){
    var scored = Number(localStorage.getItem('bar-5p'));
     localStorage.setItem('bar-5p',++scored); 
   }else if(element==1){
    var scored = Number(localStorage.getItem('bar-6p'));
     localStorage.setItem('bar-6p',++scored); 
   }
}
let guess_distro = function(){
    const arr = [];
    for (let i = 0; i < 6; i++){
     arr[i] = Number(localStorage.getItem(`bar-${i+1}`+"p"));
    }
     console.log(arr);
    let max = Math.max(...arr);
    for (let i = 0; i < GUESSES; i++) {
      let len = (arr[i]/max)*100;
     // console.log(len);
      if (len > 7){
        if (len == 100){
          document.getElementById(`bar-${i+1}`+"p").style.width = `${len}%`;
          document.getElementById(`bar-${i+1}`+"p").style.backgroundColor = 'green';
        }else{
         document.getElementById(`bar-${i+1}`+"p").style.width = `${len}%`;
        }
      }else{
       document.getElementById(`bar-${i+1}`+"p").style.width = '7%'
      }
    }
    return;
  }
  const statistics = function(element){
    const winner = document.getElementById('winp');
    const played = document.getElementById('playedp');
    const curr_streak = document.getElementById('streakp');
    const max = document.getElementById('maxp');
    const reset = 0;
    var win = Number(localStorage.getItem('winsp'));
    var streak = Number(localStorage.getItem('streakp'));
    var loss = Number(localStorage.getItem('lossp'));
    //console.log(win,streak,loss);
    if(element){
      localStorage.setItem('winsp',++win);
      localStorage.setItem('streakp',++streak);
    }else{
      localStorage.setItem('streakp',reset)
      localStorage.setItem('lossp',++loss);
      }
    if (Number(localStorage.getItem('maxp'))<streak){
      localStorage.setItem('maxp',streak);
    }
  //  console.log(win,streak,loss);
    let total = win + loss;
   // console.log(total);
    played.innerHTML = `${total}`;
    winner.innerHTML = `${(win/total)*100}`;
    curr_streak.innerHTML = `${streak}`;
    max.innerHTML = localStorage.getItem('maxp');
  
  }
  const stats_init= function(){
    const winner = document.getElementById('winp');
    const played = document.getElementById('playedp');
    const curr_streak = document.getElementById('streakp');
    const max = document.getElementById('maxp');
    played.innerHTML = `${Number(localStorage.getItem('lossp'))+Number(localStorage.getItem('winsp'))}`;
    winner.innerHTML = `${(Number(localStorage.getItem('winsp'))/(Number(localStorage.getItem('lossp'))+Number(localStorage.getItem('winsp'))))*100}`;
    curr_streak.innerHTML = localStorage.getItem('maxp');
    max.innerHTML = localStorage.getItem('maxp');
    return;
  }