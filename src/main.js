// let currentSection = 0;
let lastScrollTop = 0;

// TODO:
// Overflow on header over scroll bar
// Add and talk about the copy from discord
// Potentially update link verbage and appearance
// Add a contact us button that will send an email to our work accounts
// Also, we have to make sure that we are WCAGG 2.1 AA compliant

const main = document.getElementsByTagName('main')[0];
if (main) {
  // Interface elements
  const scrollBtn = document.getElementById('scroll-btn');

  // Container elements
  const hero = document.getElementById('hero');
  const header = main.getElementsByTagName('header')[0];
  const sections = main.getElementsByTagName('section');
  const nav = main.getElementsByTagName('nav')[0];
  const navBtn = document.getElementById('nav-btn');

  const scrolledDownThePageThreshold = main.clientHeight - (main.clientHeight / 2);

  const shouldShowNav = () => {
    if (main.scrollTop >= scrolledDownThePageThreshold) {
      nav.classList.remove('hide');
    }
  }

  shouldShowNav();
  if (window.innerWidth < 769) { // mobile
    nav.style.top = `-${nav.clientHeight}px`;
  } else { // desktop
    nav.style.top = `${header.clientHeight}px`;
  }
  addEventListener("resize", () => {
    shouldShowNav();
    if (window.innerWidth < 769) { // mobile
      if (nav.classList.contains('hide')) {
        nav.style.top = `-${nav.clientHeight}px`;
      }
    } else { // desktop
      nav.style.top = `${header.clientHeight}px`;
    }
  });

  // If page loads on a section show header immediately
  if (main.scrollTop >= main.clientHeight) {
    main.getElementsByTagName('header')[0].classList.add('scrolled');
  }

  // Key Mappings
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault();
      const direction = e.key === 'ArrowUp' ? -1 : 1;
      main.scrollBy({ top: direction * window.innerHeight, behavior: 'smooth' });
    }
  });

  // Scroll #accessibility into view on `V` button click
  scrollBtn.addEventListener('click', () => {
    document.getElementById('accessibility').scrollIntoView({ behavior: 'smooth' });
  })

  main.addEventListener('scroll', () => {
    // Show or hide the header depending on scroll position
    if (main.scrollTop > lastScrollTop) { // Scrolling down
      if (main.scrollTop >= scrolledDownThePageThreshold) {
        hero.classList.add('scrolled');
        scrollBtn.classList.add('scrolled');
        header.classList.add('scrolled', 'transition');
        header.classList.remove('quick');
        nav.classList.remove('hide');
      }
    } else if (main.scrollTop < lastScrollTop) { // Scrolling up
      if (main.scrollTop <= scrolledDownThePageThreshold) {
        hero.classList.remove('scrolled');
        scrollBtn.classList.remove('scrolled');
        header.classList.remove('scrolled', 'transition');
        header.classList.add('quick');
        nav.classList.add('hide');
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

  // Toggle mobile nav
  navBtn.addEventListener('click', () => {
    const headerHeight = header.clientHeight;
    const navHeight = nav.clientHeight;
    if (navBtn.classList.contains('show')) {
      navBtn.classList.remove('show');
      nav.style.top = `-${navHeight}px`;
    } else {
      navBtn.classList.add('show');
      nav.style.top = `${headerHeight}px`;
    }
  }, false);

  // Add click events to nav bar buttons
  [...main.getElementsByTagName('button')].forEach((button) => {
    button.addEventListener('click', () => {
      if (button.name) {
        document.getElementById(button.name).scrollIntoView({ behavior: 'smooth' });
        navBtn.classList.remove('show');
        nav.classList.remove('show');
      }
    });
  });
}
