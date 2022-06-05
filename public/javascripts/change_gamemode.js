const select = document.getElementById('gameMode');
let CURRENT_MODE = select.options[select.selectedIndex].value;

document.getElementById('switchMode').addEventListener('click', () =>{
  const SELECTED_MODE = select.options[select.selectedIndex].value
  let url = ''
  if(SELECTED_MODE === 'MultiPlayerMode' && CURRENT_MODE !== SELECTED_MODE){
     url = 'http://localhost:3000/multiplayer#'
     window.open(url, '_self') 
  }
  else if(SELECTED_MODE === 'SinglePlayerMode' && CURRENT_MODE !== SELECTED_MODE){
     url = 'http://localhost:3000/screen' 
     window.open(url, '_self')
  }
  CURRENT_MODE = SELECTED_MODE;
})
