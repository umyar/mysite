let body = document.querySelector('body');
let themeButton = document.querySelector('.theme-button');

themeButton.onclick = function() {
	body.classList.toggle('dark-theme');
};