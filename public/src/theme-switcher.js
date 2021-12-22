let bodyContainer = document.querySelector('body');
let themeButton = document.querySelector('.theme-button');

themeButton.onclick = function() {
	bodyContainer.classList.toggle('dark-theme');
};