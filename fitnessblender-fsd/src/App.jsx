import './App.css'

const navItems = ['Workouts', 'Programs', 'Healthy Living', 'Community', 'Membership']

const avatars = [
  {
    src: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    alt: 'Man portrait',
    className: 'avatar-one',
  },
  {
    src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
    alt: 'Woman portrait',
    className: 'avatar-two',
  },
  {
    src: 'https://images.unsplash.com/photo-1521119989659-a83eee488004?auto=format&fit=crop&w=400&q=80',
    alt: 'Woman portrait',
    className: 'avatar-three',
  },
  {
    src: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=400&q=80',
    alt: 'Woman portrait',
    className: 'avatar-four',
  },
  // {
  //   src: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
  //   alt: 'Man portrait',
  //   className: 'avatar-five',
  // },
  {
    src: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    alt: 'Woman portrait',
    className: 'avatar-six',
  },
  {
    src: 'https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=400&q=80',
    alt: 'Man portrait',
    className: 'avatar-seven',
  },
]

const contentCards = [
  {
    kind: 'trainer',
    title: 'Trainer Series',
    description: 'Exercise with your favorite trainer in our new Trainer Series programs.',
    button: 'View Series',
    image:
      'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=80',
  },
  {
    kind: 'premium',
    title: 'Earn a Free Plus Membership',
    description: 'Share your referral code and every sign up earns rewards to put toward your membership.',
    button: 'Learn About Rewards',
    image:
      'https://images.unsplash.com/photo-1541534401786-2077eed87a74?auto=format&fit=crop&w=900&q=80',
    gradient: 'purple',
  },
  {
    kind: 'weights',
    title: 'Small Footprint\nBig Gains',
    description: 'The perfect dumbbells for any space. Use discount code FORBES to save $20 on a select set of weights.',
    button: 'Shop PowerBlock',
    image:
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=900&q=80',
  },
  {
    kind: 'specialty',
    title: 'Specialty Content',
    description: 'Pilot programs provide special content tailored to smaller audiences, conditions, or life events.',
    button: 'Browse Pilot Programs',
    image:
      'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=900&q=80',
    gradient: 'green',
  },
  {
    kind: 'videos',
    title: 'Workout Videos',
    description: 'Exercise with certified personal trainers whether you’re at home or on the road.',
    button: 'Find a Workout',
    image:
      'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1200&q=80',
  },
  {
    kind: 'community',
    title: 'Supportive Community',
    description: 'Stay motivated and engaged with a little help from a supportive community of other members.',
    button: 'Visit Community',
    image:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=900&q=80',
    gradient: 'stone',
  },
]

const footerGroups = {
  WORKOUTS: ['Workout Videos', 'Custom Workouts', 'Programs', 'Workout Programs', 'Meal Plans', 'Pilot Programs', 'Routines'],
  'HEALTHY LIVING': ['Healthy Living', 'Healthy Recipes', 'Fitness', 'Health', 'Nutrition', 'Experts', 'Meal Plans'],
  ABOUT: ['About', 'Careers', 'Tutorials', 'Our Team', 'FAQ', 'Store'],
  MEMBERSHIP: ['Membership', 'FB Plus', 'Community', 'Referral Program', 'Blog', 'Contact Us'],
}

function App() {
  return (
    <div className="page-shell">
      <div className="promo-bar">
        <span className="promo-badge">🔥</span>
        <span className="promo-text">
          Ready for Week 4? <a href="https://www.fitnessblender.com/">Take a peek at the lineup and get ready to hit play!</a>
        </span>
        <button type="button" aria-label="Close promo" className="close-button">
          ×
        </button>
      </div>

      <header className="topbar">
        <div className="brand" aria-label="Fitness Blender home">
          <div className="brand-mark" aria-hidden="true">
            <span className="brand-circle" />
            <span className="brand-play" />
          </div>
          <div className="brand-wordmark">
            <span>fitness</span>
            <small>BLENDER</small>
          </div>
        </div>

        <nav className="main-nav" aria-label="Main navigation">
          {navItems.map((item) => (
            <a key={item} href="#" className="nav-link">
              {item}
            </a>
          ))}
        </nav>

        <div className="header-actions" aria-label="Account and menu controls">
          <button type="button" className="icon-button user-button" aria-label="Account">
            <span className="user-icon" />
          </button>
          <button type="button" className="icon-button menu-button" aria-label="Menu">
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      <main>
        <section className="hero-section">
          <div className="hero-inner">
            <div className="hero-copy">
              <h1>
                Feel Great.
                <br />
                Body and Mind.
              </h1>

              <p>
                Choose from hundreds of workouts,
                <br />
                healthy recipes, relaxing meditations and
                <br />
                expert articles, for a whole body and
                <br />
                mind approach to feeling great.
              </p>

              <button type="button" className="join-button">
                Join Now
              </button>
            </div>

            <div className="avatar-stack" aria-label="Featured Fitness Blender community members">
              {avatars.map((avatar) => (
                <div key={avatar.alt + avatar.className} className={`avatar ${avatar.className}`}>
                  <img src={avatar.src} alt={avatar.alt} />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="start-section">
          <h2>Not sure where to start?</h2>
          <div className="card-grid">
            {contentCards.map((card) => (
              <article key={card.title} className={`content-card ${card.kind} ${card.gradient ? `gradient-${card.gradient}` : ''}`}>
                <div className="card-copy">
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                  <button type="button">{card.button}</button>
                </div>
                <div className="card-visual">
                  <img src={card.image} alt={card.title} />
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-inner">
          <div className="footer-brand-wrap">
            <div className="footer-brand">
              <div className="brand-mark small" aria-hidden="true">
                <span className="brand-circle" />
                <span className="brand-play" />
              </div>
              <div className="brand-wordmark">
                <span>fitness</span>
                <small>BLENDER</small>
              </div>
            </div>
          </div>

          <div className="footer-links">
            {Object.entries(footerGroups).map(([group, links]) => (
              <div key={group} className="footer-column">
                <h4>{group}</h4>
                <ul>
                  {links.map((link) => (
                    <li key={link}><a href="#">{link}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="footer-bottom">
          <p>Copyright © 2026 Fitness Blender. All rights reserved.</p>
          <div className="legal-links">
            <a href="#">Terms of Use</a>
            <a href="#">Privacy Policy</a>
          </div>
          <div className="socials">
            <span>◌</span>
            <span>f</span>
            <span>◎</span>
            <span>𝕏</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
