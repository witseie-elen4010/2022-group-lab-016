let content= document.querySelector('body');
let theme = document.getElementById('theme_mode');

theme.addEventListener('click', function(){
  theme.classList.toggle('day')
  content.classList.toggle('night')
})