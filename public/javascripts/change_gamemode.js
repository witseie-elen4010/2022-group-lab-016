const SELECT = document.getElementById('gameMode');

document.getElementById('switchMode').addEventListener('click', () =>{
   
  if(confirm('You will loose your current progress, change mode ?')){
    const select_mode = SELECT.options[SELECT.selectedIndex].value;
    let url = '';
    if(select_mode === 'MultiPlayerMode'){
         url = 'https://wordleeeee.azurewebsites.net/multiplayer';
        window.open(url, '_self'); 
    }
    else if(select_mode === 'SinglePlayerMode'){
        url = 'https://wordleeeee.azurewebsites.net/screen';
        window.open(url, '_self');
    }
  }
})
