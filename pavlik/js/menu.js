const menu = document.querySelector('.main-nav');
      const menuButton = document.querySelector('.menu-toggle-button');
      const main = document.querySelector('main');
      const footer = document.querySelector('footer');
      const logo = document.querySelector('.logo');

      menuButton.addEventListener('click', toggle);

      function toggle() {
        main.classList.toggle('blured');
        footer.classList.toggle('blured');
        logo.classList.toggle('blured');

        menu.classList.toggle('opened-menu');
        menuButton.classList.toggle('change');
      }