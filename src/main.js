import monkeypatchLogo from './images/logo_01_full.png';

import './styles/style.css';

document.querySelector('#app').innerHTML = `
  <a href="mailto:monkeypatchsolutions@purelymail.com">
    <img src="${monkeypatchLogo}" class="logo" alt="Monkeypatch Solutions" />
  </a>
`;
