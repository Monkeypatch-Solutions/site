// let currentSection = 0;
let lastScrollTop = 0;

// TODO:
// Overflow on header over scroll bar
// Add and talk about the copy from discord
// Potentially update link verbage and appearance
// Add a contact us button that will send an email to our work accounts
// Also, we have to make sure that we are WCAGG 2.1 AA compliant
// nav menu doesn't close when you click nav link
//  tried to do it but then the setHide in shouldShowNav in the scroll listener kept it open sometimes
//  then i noticed that the scroll listener will close it sometimes

const body = document.getElementsByTagName('body')[0];
if (body) {
  // Interface elements
  const scrollBtn = document.getElementById('scroll-btn');

  // Container elements
  const hero = document.getElementById('hero');
  const header = body.getElementsByTagName('header')[0];
  const sections = body.getElementsByTagName('section');
  const nav = body.getElementsByTagName('nav')[0];
  const navBtn = document.getElementById('nav-btn');

  const scrolledDownThePageThreshold = body.clientHeight - (body.clientHeight / 2);

  const setHide = (element, status) => {
    element.hidden = status;
    if (status) {
      element.classList.add('hide');
    } else {
      element.classList.remove('hide');
    }
  }

  const shouldShowNav = () => {
    if (body.scrollTop >= scrolledDownThePageThreshold) {
      setHide(nav, false);
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
      if (nav.classList.contains('hide') || !navBtn.classList.contains('show')) {
        nav.style.top = `-${nav.clientHeight}px`;
      }
    } else { // desktop
      nav.style.top = `${header.clientHeight}px`;
    }
  });

  // If page loads on a section show header immediately
  if (body.scrollTop >= body.clientHeight) {
    body.getElementsByTagName('header')[0].classList.add('scrolled');
  }

  // Key Mappings
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault();
      const direction = e.key === 'ArrowUp' ? -1 : 1;
      body.scrollBy({ top: direction * window.innerHeight, behavior: 'smooth' });
    }
  });

  // Scroll #accessibility into view on `V` button click
  scrollBtn.addEventListener('click', () => {
    document.getElementById('accessibility').scrollIntoView({ behavior: 'smooth' });
  })

  body.addEventListener('scroll', () => {
    // Show or hide the header depending on scroll position
    if (body.scrollTop > lastScrollTop) { // Scrolling down
      if (body.scrollTop >= scrolledDownThePageThreshold) {
        hero.classList.add('scrolled');
        scrollBtn.classList.add('scrolled');
        header.classList.add('scrolled', 'transition');
        header.classList.remove('quick');
        setHide(nav, false);
      }
    } else if (body.scrollTop < lastScrollTop) { // Scrolling up
      if (body.scrollTop <= scrolledDownThePageThreshold) {
        hero.classList.remove('scrolled');
        scrollBtn.classList.remove('scrolled');
        header.classList.remove('scrolled', 'transition');
        header.classList.add('quick');
        setHide(nav, true);
      }
    }

    // Update location hash based on scroll position
    if (body.scrollTop === 0) {
      location.hash = '';
    } else if (body.scrollTop === body.clientHeight) {
      location.hash = sections[1].id;
    } else if (body.scrollTop === body.clientHeight * 2) {
      location.hash = sections[2].id;
    } else if (body.scrollTop === body.clientHeight * 3) {
      location.hash = sections[3].id;
    }

    // // Keep track of current section
    // if (body.scrollTop >= body.clientHeight * 3) {
    //   currentSection = 3;
    // } else if (body.scrollTop >= body.clientHeight * 2) {
    //   currentSection = 2;
    // } else if (body.scrollTop >= body.clientHeight) {
    //   currentSection = 1
    // } else if (body.scrollTop === 0) {
    //   currentSection = 0;
    // }

    // Update last scroll position
    lastScrollTop = body.scrollTop <= 0 ? 0 : body.scrollTop;
  }, { passive: true });

  // Toggle mobile nav
  navBtn.addEventListener('click', () => {
    const headerHeight = header.clientHeight;
    const navHeight = nav.clientHeight;
    if (navBtn.classList.contains('show')) {
      navBtn.classList.remove('show');
      nav.style.top = `-${navHeight}px`;
      nav.hidden = true;
    } else {
      navBtn.classList.add('show');
      nav.style.top = `${headerHeight}px`;
      nav.hidden = false;
    }
  }, false);

  // Add click events to nav bar buttons
  [...body.getElementsByTagName('button')].forEach((button) => {
    button.addEventListener('click', () => {
      if (button.name) {
        document.getElementById(button.name).scrollIntoView({ behavior: 'smooth' });
        navBtn.classList.remove('show');
        // nav.classList.remove('show');
        setHide(nav, true);
      }
    });
  });
}
