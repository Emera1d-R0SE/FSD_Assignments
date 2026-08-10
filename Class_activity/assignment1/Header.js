import "../styles/Header.css";

function Header() {
  return (
    <header className="header">

      <div className="logo">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png"
          alt="Netflix"
        />
      </div>

      <div className="right-section">

        <select className="language">
          <option>🌐 English</option>
          <option>हिन्दी</option>
        </select>

        <button className="signin-btn">
          Sign In
        </button>

      </div>

    </header>
  );
}

export default Header;
