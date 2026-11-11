import './Header.css';

export default function Header() {
  return (
    <header className="header">
      <div className="container header-inner">
        <div className="header-logo" aria-hidden="true">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="32" height="32" rx="8" fill="#6c63ff" fillOpacity="0.15"/>
            <path d="M8 10h16M8 16h10M8 22h13" stroke="#6c63ff" strokeWidth="2.2" strokeLinecap="round"/>
            <circle cx="24" cy="22" r="4" fill="#6c63ff"/>
            <path d="M22.5 22l1 1 2-2" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div>
          <h1 className="header-title">Notice2Action</h1>
          <p className="header-subtitle">Turn lengthy college notices into clear action items.</p>
        </div>
      </div>
    </header>
  );
}
