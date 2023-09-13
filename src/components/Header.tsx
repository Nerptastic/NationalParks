import logo from '../assets/logo.svg';

function Header() {
  return (
      <header>
          <img src={logo} alt="National Park Service Logo" />
          <h1>National Park Service</h1>
      </header>
  );
}

export default Header;