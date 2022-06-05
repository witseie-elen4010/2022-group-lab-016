const SELECT = document.getElementById('gameMode');

document.getElementById('switchMode').addEventListener('click', () =>{
   
  if(confirm('You will loose your current progress, change mode ?')){
    const select_mode = SELECT.options[SELECT.selectedIndex].value;
    let url = '';
    if(select_mode === 'MultiPlayerMode'){
         url = 'http://localhost:3000/multiplayer';
        window.open(url, '_self'); 
    }
    else if(select_mode === 'SinglePlayerMode'){
        url = 'http://localhost:3000/screen';
        window.open(url, '_self');
    }
  }
})
