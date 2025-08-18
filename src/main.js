// let currentSection = 0;
let lastScrollTop = 0;

const main = document.getElementsByTagName('main')[0];
if (main) {
  // If page loads on a section show header immediately
  if (main.scrollTop >= main.clientHeight) {
    main.getElementsByTagName('header')[0].classList.add('scrolled');
  }

  const sections = main.getElementsByTagName("section");
  main.addEventListener('scroll', () => {
    // Show or hide the header depending on scroll position
    if (main.scrollTop > lastScrollTop) { // Scrolling down
      if (main.scrollTop >= 10) {
        main.getElementsByTagName('header')[0].classList.add('scrolled', 'transition');
        main.getElementsByTagName('header')[0].classList.remove('quick');
      }
    } else if (main.scrollTop < lastScrollTop) { // Scrolling up
      if (main.scrollTop <= main.clientHeight - 10) {
        main.getElementsByTagName('header')[0].classList.remove('scrolled', 'transition');
        main.getElementsByTagName('header')[0].classList.add('quick');
      }
    }

    // Update location hash based on scroll position
    if (main.scrollTop === 0) {
      location.hash = '';
    } else if (main.scrollTop === main.clientHeight) {
      location.hash = sections[1].id;
    } else if (main.scrollTop === main.clientHeight * 2) {
      location.hash = sections[2].id;
    } else if (main.scrollTop === main.clientHeight * 3) {
      location.hash = sections[3].id;
    }

    // // Keep track of current section
    // if (main.scrollTop >= main.clientHeight * 3) {
    //   currentSection = 3;
    // } else if (main.scrollTop >= main.clientHeight * 2) {
    //   currentSection = 2;
    // } else if (main.scrollTop >= main.clientHeight) {
    //   currentSection = 1
    // } else if (main.scrollTop === 0) {
    //   currentSection = 0;
    // }

    // Update last scroll position
    lastScrollTop = main.scrollTop <= 0 ? 0 : main.scrollTop;
  }, { passive: true });

  // Add click events to nav bar buttons
  [...main.getElementsByTagName('button')].forEach((button) => {
    button.addEventListener('click', () => {
      document.getElementById(button.name).scrollIntoView({ behavior: 'smooth' });
    });
  });
}
