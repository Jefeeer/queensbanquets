import { useEffect, useState } from 'react';
import {
  clearAdminToken,
  fetchAdminAnalytics,
  fetchAdminInquiries,
  fetchCurrentAdmin,
  getStoredAdminToken,
  loginAdmin,
  storeAdminToken,
} from '../api/admin.js';
import { isApiEnabled } from '../api/content.js';
import { useLandingContent } from '../content/LandingContentContext.jsx';
import AdminPhotoField from './AdminPhotoField.jsx';
import AdminToastStack from './AdminToast.jsx';
import ConfirmDialog from './ConfirmDialog.jsx';
import InquiriesPanel from './InquiriesPanel.jsx';
import { formatRelativeDate, getStatusMeta } from './inquiryStatus.js';
import './admin.css';
import {
  BarChart3,
  BriefcaseBusiness,
  Eye,
  FileText,
  Inbox,
  LayoutDashboard,
  LogIn,
  LogOut,
  Menu,
  MessageSquareQuote,
  Package,
  Plus,
  RotateCcw,
  Save,
  Settings,
  Star,
  Trash2,
  UserRound,
  X,
} from 'lucide-react';

const ADMIN_SESSION_KEY = 'queens-banquet-admin-session';
const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL ?? 'queensbanquet07@gmail.com';
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD ?? 'marou-admin';

const sidebarItems = [
  { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'experience', label: 'Events', icon: FileText },
  { id: 'contact', label: 'Clients', icon: UserRound },
  { id: 'inquiries', label: 'Bookings', icon: Inbox },
  { id: 'services', label: 'Services', icon: BriefcaseBusiness },
  { id: 'packages', label: 'Packages', icon: Package },
  { id: 'testimonials', label: 'Testimonials', icon: MessageSquareQuote },
  { id: 'brand', label: 'Settings', icon: Settings },
];

function AdminApp() {
  const { content, setContent, resetContent } = useLandingContent();
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => window.localStorage.getItem(ADMIN_SESSION_KEY) === 'active',
  );
  const [activeSection, setActiveSection] = useState('overview');
  const [draft, setDraft] = useState(content);
  const [toasts, setToasts] = useState([]);
  const [confirmDialog, setConfirmDialog] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  function pushToast(type, message) {
    const id = crypto.randomUUID();
    setToasts((current) => [...current, { id, type, message }]);
    window.setTimeout(() => dismissToast(id), 5000);
  }

  function dismissToast(id) {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }

  function requestConfirm(dialog) {
    setConfirmDialog(dialog);
  }

  useEffect(() => {
    setDraft(content);
  }, [content]);

  useEffect(() => {
    if (!isApiEnabled()) {
      return undefined;
    }

    const token = getStoredAdminToken();

    if (!token) {
      return undefined;
    }

    let cancelled = false;

    fetchCurrentAdmin(token)
      .then(() => {
        if (!cancelled) {
          window.localStorage.setItem(ADMIN_SESSION_KEY, 'active');
          setIsAuthenticated(true);
        }
      })
      .catch(() => {
        clearAdminToken();
        window.localStorage.removeItem(ADMIN_SESSION_KEY);
        setIsAuthenticated(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!sidebarOpen) {
      return undefined;
    }

    function handleEscape(event) {
      if (event.key === 'Escape') {
        setSidebarOpen(false);
      }
    }

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [sidebarOpen]);

  function selectSection(sectionId) {
    setActiveSection(sectionId);
    setSidebarOpen(false);
  }

  function handleLoginSuccess() {
    window.localStorage.setItem(ADMIN_SESSION_KEY, 'active');
    setIsAuthenticated(true);
  }

  function handleLogout() {
    window.localStorage.removeItem(ADMIN_SESSION_KEY);
    clearAdminToken();
    setIsAuthenticated(false);
  }

  function updateDraft(updater) {
    setDraft((current) => {
      const nextDraft = structuredClone(current);
      updater(nextDraft);
      return nextDraft;
    });
  }

  async function saveChanges() {
    setIsSaving(true);

    try {
      await setContent(draft);
      pushToast(
        'success',
        isApiEnabled() && getStoredAdminToken()
          ? 'Saved to the database. Open landing pages update automatically while npm run dev is running.'
          : 'Saved locally. Open landing pages update automatically while npm run dev is running.',
      );
    } catch (error) {
      pushToast('error', error.message ?? 'Unable to save changes right now.');
    } finally {
      setIsSaving(false);
    }
  }

  async function handleReset() {
    requestConfirm({
      title: 'Reset all content?',
      message: 'This restores every landing page section to its default text and images. This cannot be undone.',
      confirmLabel: 'Reset content',
      onConfirm: async () => {
        try {
          const defaultContent = await resetContent();
          setDraft(defaultContent);
          pushToast(
            'success',
            isApiEnabled() && getStoredAdminToken()
              ? 'Content was reset in the database and on open landing pages.'
              : 'Local content was reset and open landing pages updated automatically.',
          );
        } catch (error) {
          pushToast('error', error.message ?? 'Unable to reset content right now.');
        }
      },
    });
  }

  if (!isAuthenticated) {
    return <AdminLogin onLoginSuccess={handleLoginSuccess} brand={content.brand} />;
  }

  const activeItem = sidebarItems.find((item) => item.id === activeSection);

  return (
    <>
    <div className="admin-shell">
      <aside className={`admin-sidebar theme-dark${sidebarOpen ? ' is-open' : ''}`} id="admin-sidebar">
        <div className="admin-brand ele-admin-brand">
          <div className="ele-brand-text">
            <span className="ele-brand-main">QUEEN'S</span>
            <span className="ele-brand-sub">BANQUET EVENTS</span>
          </div>
          <button
            className="admin-sidebar-close"
            type="button"
            aria-label="Close admin menu"
            onClick={() => setSidebarOpen(false)}
          >
            <X aria-hidden="true" size={18} strokeWidth={1.7} />
          </button>
        </div>

        <nav className="admin-nav" aria-label="Admin sections">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                className={activeSection === item.id ? 'active' : ''}
                key={item.id}
                type="button"
                onClick={() => selectSection(item.id)}
              >
                <Icon aria-hidden="true" size={16} strokeWidth={1.6} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="admin-user-profile" onClick={handleLogout} title="Click to Logout">
          <img src="/testimonial-bride-1.svg" className="admin-user-avatar" alt="Alex Carter" />
          <div className="admin-user-info">
            <span className="admin-user-name">Alex Carter</span>
            <span className="admin-user-role">Admin</span>
          </div>
          <svg className="admin-user-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
      </aside>

      {sidebarOpen ? (
        <button
          className="admin-sidebar-backdrop"
          type="button"
          aria-label="Close admin menu"
          onClick={() => setSidebarOpen(false)}
        />
      ) : null}

      <main className="admin-main">
        <div className="admin-mobile-bar">
          <button
            className="admin-menu-toggle"
            type="button"
            aria-expanded={sidebarOpen}
            aria-controls="admin-sidebar"
            aria-label={sidebarOpen ? 'Close admin menu' : 'Open admin menu'}
            onClick={() => setSidebarOpen((current) => !current)}
          >
            <Menu aria-hidden="true" size={20} strokeWidth={1.7} />
          </button>
          <strong>{draft.brand.name}</strong>
        </div>

        <header className="admin-topbar">
          <div>
            <p className="admin-breadcrumb">
              <span>Admin</span>
              <span>/</span>
              <span>{activeItem?.label ?? 'Dashboard'}</span>
            </p>
            <h1>Landing Page Manager</h1>
          </div>
          <div className="admin-actions">
            <a className="admin-secondary-button" href="/">
              <Eye aria-hidden="true" size={18} strokeWidth={1.6} />
              View Site
            </a>
            <button className="admin-secondary-button" type="button" onClick={handleReset}>
              <RotateCcw aria-hidden="true" size={18} strokeWidth={1.6} />
              Reset Content
            </button>
            <button className="admin-primary-button" type="button" onClick={saveChanges} disabled={isSaving}>
              <Save aria-hidden="true" size={18} strokeWidth={1.6} />
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </header>

        {activeSection === 'overview' ? <Overview content={draft} /> : null}
        {activeSection === 'inquiries' ? <InquiriesPanel pushToast={pushToast} /> : null}
        {activeSection === 'brand' ? <BrandHeroEditor draft={draft} updateDraft={updateDraft} /> : null}
        {activeSection === 'experience' ? (
          <ExperienceEditor draft={draft} updateDraft={updateDraft} requestConfirm={requestConfirm} />
        ) : null}
        {activeSection === 'contact' ? (
          <ContactEditor draft={draft} updateDraft={updateDraft} requestConfirm={requestConfirm} />
        ) : null}
        {activeSection === 'services' ? (
          <ServicesEditor draft={draft} updateDraft={updateDraft} requestConfirm={requestConfirm} />
        ) : null}
        {activeSection === 'packages' ? (
          <PackagesEditor draft={draft} updateDraft={updateDraft} requestConfirm={requestConfirm} />
        ) : null}
        {activeSection === 'testimonials' ? (
          <TestimonialsEditor draft={draft} updateDraft={updateDraft} requestConfirm={requestConfirm} />
        ) : null}
      </main>
    </div>
    <AdminToastStack toasts={toasts} onDismiss={dismissToast} />
    <ConfirmDialog dialog={confirmDialog} onCancel={() => setConfirmDialog(null)} />
    </>
  );
}

function AdminLogin({ onLoginSuccess, brand }) {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setCredentials((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      if (isApiEnabled()) {
        const result = await loginAdmin(credentials);
        storeAdminToken(result.token);
        onLoginSuccess();
        return;
      }

      if (credentials.email === ADMIN_EMAIL && credentials.password === ADMIN_PASSWORD) {
        onLoginSuccess();
        return;
      }

      setError('Invalid admin email or password.');
    } catch (loginError) {
      setError(loginError.message ?? 'Invalid admin email or password.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="admin-login-page">
      <section className="admin-login-brand theme-dark">
        <img src={brand?.logo ?? '/queens-banquet-logo.svg'} alt="" />
        <p>Queen's Banquet Events</p>
        <h1>Admin Dashboard</h1>
        <span>
          Manage your landing page content and booking inquiries in one calm,
          organized place.
        </span>
      </section>

      <form className="admin-login-card" onSubmit={handleSubmit}>
        <p>Restricted access</p>
        <h1>Sign in</h1>
        <label>
          Admin email
          <input
            name="email"
            type="email"
            value={credentials.email}
            onChange={handleChange}
            placeholder="queensbanquet07@gmail.com"
            required
          />
        </label>
        <label>
          Password
          <input
            name="password"
            type="password"
            value={credentials.password}
            onChange={handleChange}
            placeholder="Enter admin password"
            required
          />
        </label>
        <button className="admin-primary-button" type="submit" disabled={isSubmitting}>
          <LogIn aria-hidden="true" size={18} strokeWidth={1.6} />
          {isSubmitting ? 'Signing in...' : 'Login'}
        </button>
        {error ? <span className="admin-login-error">{error}</span> : null}
        <small>
          {isApiEnabled()
            ? 'Sign in with your admin account stored in PostgreSQL.'
            : 'Temporary local login until the API and database are connected.'}
        </small>
      </form>
    </main>
  );
}

function Overview({ content }) {
  const [inquiries, setInquiries] = useState(null);
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    if (!isApiEnabled()) {
      return undefined;
    }

    const token = getStoredAdminToken();

    if (!token) {
      return undefined;
    }

    let cancelled = false;

    Promise.all([
      fetchAdminInquiries(token).catch(() => null),
      fetchAdminAnalytics(token).catch(() => null)
    ]).then(([inquiriesData, analyticsData]) => {
      if (!cancelled) {
        setInquiries(inquiriesData);
        setAnalytics(analyticsData);
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  const statsCards = [
    { label: 'Total Events', value: '142', change: '+15%', color: '#22c55e' },
    { label: 'Upcoming', value: '38', change: '+8%', color: '#22c55e' },
    { label: 'Clients', value: '98', change: '+12%', color: '#22c55e' },
    { label: 'Revenue', value: '$2.1M', change: '+24%', color: '#22c55e' },
  ];

  const bookingsData = [
    { date: 'Jan 15', name: 'Alex Carter', role: 'Admin', event: 'Met Gala Tribute', avatar: '/testimonial-bride-1.svg' },
    { date: 'Dec 23', name: 'Mari Eenn', role: 'Femiter', event: 'Vogue Gala', avatar: '/testimonial-couple-1.svg' },
    { date: 'Dec 29', name: 'John Carter', role: 'Admin', event: 'Luxury Wedding', avatar: '/testimonial-family-1.svg' },
    { date: 'Jan 23', name: 'Juta Dev', role: 'Femiter', event: 'Vogue Gala', avatar: '/testimonial-bride-1.svg' },
    { date: 'Nov 25', name: 'Maa Bana', role: 'Admin', event: 'Vogue Gala', avatar: '/testimonial-couple-1.svg' },
    { date: 'Dec 26', name: 'Alex Carter', role: 'Admin', event: 'Luxury Wedding', avatar: '/testimonial-family-1.svg' },
    { date: 'Jan 27', name: 'John Carter', role: 'Admin', event: 'Luxury Wedding', avatar: '/testimonial-bride-1.svg' },
  ];

  return (
    <div className="ele-admin-dashboard">
      <div className="admin-stat-grid ele-stat-grid">
        {statsCards.map((card, idx) => (
          <article key={card.label} className="ele-stat-card">
            <div className="ele-stat-card-header">
              <span className="ele-stat-label">{card.label}</span>
              <span className="ele-stat-icon-wrapper">
                {idx === 0 && <FileText size={16} />}
                {idx === 1 && <Inbox size={16} />}
                {idx === 2 && <UserRound size={16} />}
                {idx === 3 && <Package size={16} />}
              </span>
            </div>
            <div className="ele-stat-card-body">
              <strong className="ele-stat-value">{card.value}</strong>
              <div className="ele-stat-sparkline">
                <span className="ele-stat-change">{card.change}</span>
                <svg width="50" height="20" viewBox="0 0 50 20" style={{ overflow: 'visible' }}>
                  <path d="M0,15 Q12.5,2 25,12 T50,5" fill="none" stroke="#22c55e" strokeWidth="1.8" strokeLinecap="round" />
                  <path d="M0,15 Q12.5,2 25,12 T50,5 L50,20 L0,20 Z" fill="rgba(34, 197, 94, 0.08)" />
                </svg>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="ele-dashboard-main-grid">
        {/* Recent Bookings Card */}
        <section className="ele-dashboard-panel ele-recent-bookings-card">
          <div className="ele-panel-header">
            <h3>Recent Bookings</h3>
            <button className="ele-panel-more-btn" type="button" aria-label="More options">•••</button>
          </div>
          <div className="ele-bookings-table-wrapper">
            <table className="ele-bookings-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Name</th>
                  <th>Event</th>
                </tr>
              </thead>
              <tbody>
                {bookingsData.map((row, idx) => (
                  <tr key={idx}>
                    <td className="ele-booking-date">
                      <span className="ele-date-main">{row.date}</span>
                      <span className="ele-date-sub">21-Aug</span>
                    </td>
                    <td className="ele-booking-name-cell">
                      <img src={row.avatar} alt={row.name} className="ele-booking-avatar" />
                      <div className="ele-booking-name-info">
                        <span className="ele-name-text">{row.name}</span>
                        <span className="ele-role-text">{row.role}</span>
                      </div>
                    </td>
                    <td className="ele-booking-event">{row.event}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Charts and Venues Columns */}
        <div className="ele-dashboard-right-col">
          <div className="ele-charts-row">
            {/* Event Status & Revenue Doughnut Chart */}
            <section className="ele-dashboard-panel ele-doughnut-card">
              <div className="ele-panel-header">
                <h3>Event Status & Revenue</h3>
                <span className="ele-panel-subtitle">Doughnut Chart</span>
              </div>
              <div className="ele-doughnut-content">
                <div className="ele-doughnut-svg-container">
                  <svg width="110" height="110" viewBox="0 0 100 100" style={{ transform: 'rotate(-90deg)' }}>
                    <circle cx="50" cy="50" r="35" fill="transparent" stroke="var(--gold)" strokeWidth="10" strokeDasharray="88 132" strokeDashoffset="0" />
                    <circle cx="50" cy="50" r="35" fill="transparent" stroke="#f97316" strokeWidth="10" strokeDasharray="55 165" strokeDashoffset="-88" />
                    <circle cx="50" cy="50" r="35" fill="transparent" stroke="#22c55e" strokeWidth="10" strokeDasharray="44 176" strokeDashoffset="-143" />
                    <circle cx="50" cy="50" r="35" fill="transparent" stroke="#ef4444" strokeWidth="10" strokeDasharray="33 187" strokeDashoffset="-187" />
                  </svg>
                  <div className="ele-doughnut-center-hole">
                    <span>Events</span>
                  </div>
                </div>
                <ul className="ele-doughnut-legends">
                  <li><span className="legend-dot" style={{ backgroundColor: 'var(--gold)' }}></span>Planning</li>
                  <li><span className="legend-dot" style={{ backgroundColor: '#f97316' }}></span>Confirmed</li>
                  <li><span className="legend-dot" style={{ backgroundColor: '#22c55e' }}></span>Completed</li>
                  <li><span className="legend-dot" style={{ backgroundColor: '#ef4444' }}></span>Cancelled</li>
                </ul>
              </div>
            </section>

            {/* Client Engagement Bar Chart */}
            <section className="ele-dashboard-panel ele-bar-card">
              <div className="ele-panel-header">
                <h3>Client Engagement</h3>
                <span className="ele-panel-subtitle">Bar Chart</span>
              </div>
              <div className="ele-bar-chart-container">
                <div className="ele-bars-wrapper">
                  {[12, 18, 14, 22, 19, 15].map((height, i) => (
                    <div key={i} className="ele-bar-col">
                      <div className="ele-bar" style={{ height: `${height * 3}px` }}></div>
                      <span className="ele-bar-label">
                        {i === 0 && 'Jan'}
                        {i === 1 && 'Feb'}
                        {i === 2 && 'Sep'}
                        {i === 3 && 'Oct'}
                        {i === 4 && 'Nov'}
                        {i === 5 && 'Dec'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>

          <div className="ele-charts-bottom-row">
            {/* Monthly Revenue Growth Area Chart */}
            <section className="ele-dashboard-panel ele-area-card">
              <div className="ele-panel-header">
                <h3>Monthly Revenue Growth</h3>
                <span className="ele-panel-subtitle">Smooth Area Chart</span>
              </div>
              <div className="ele-area-chart-container">
                <svg viewBox="0 0 320 100" className="ele-area-svg" style={{ overflow: 'visible' }}>
                  <defs>
                    <linearGradient id="ele-area-grad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--gold)" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="var(--gold)" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path d="M 0,85 C 40,80 80,50 120,60 C 165,70 200,30 240,25 C 280,20 320,5 320,5 L 320,100 L 0,100 Z" fill="url(#ele-area-grad)" />
                  <path d="M 0,85 C 40,80 80,50 120,60 C 165,70 200,30 240,25 C 280,20 320,5 320,5" fill="none" stroke="var(--gold)" strokeWidth="2" />
                  <circle cx="240" cy="25" r="4" fill="var(--gold)" />
                  <text x="240" y="15" fill="var(--gold-light)" fontSize="8" textAnchor="middle" fontWeight="bold">$3,150</text>
                </svg>
                <div className="ele-area-labels">
                  <span>Jan</span>
                  <span>Feb</span>
                  <span>Mar</span>
                  <span>Apr</span>
                  <span>May</span>
                  <span>Jun</span>
                  <span>Jul</span>
                  <span>Aug</span>
                  <span>Sep</span>
                  <span>Oct</span>
                  <span>Nov</span>
                  <span>Dec</span>
                </div>
              </div>
            </section>

            {/* Top Venues Card */}
            <section className="ele-dashboard-panel ele-venues-card">
              <div className="ele-panel-header">
                <h3>Top Venues</h3>
              </div>
              <div className="ele-venues-list">
                <div className="ele-venue-item">
                  <img src="/hero_banquet_visual.png" alt="Ritz-Carlton" className="ele-venue-thumb" />
                  <div className="ele-venue-info">
                    <span className="ele-venue-name">Ritz-Carlton</span>
                    <span className="ele-venue-sub">Ritz-Carlton</span>
                  </div>
                </div>
                <div className="ele-venue-item">
                  <img src="/hero_banquet_visual.png" alt="Plaza Hotel" className="ele-venue-thumb" />
                  <div className="ele-venue-info">
                    <span className="ele-venue-name">Plaza Hotel</span>
                    <span className="ele-venue-sub">Plaza Hotel</span>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      <div className="admin-note ele-admin-note">
        <h3>Admin access</h3>
        <p>
          This page is intentionally hidden from the landing page. Marou can open it by typing
          <code> http://localhost:5174/admin </code>
          while the local dev server is running.
        </p>
      </div>
    </div>
  );
}

function BrandHeroEditor({ draft, updateDraft }) {
  return (
    <section className="admin-panel">
      <EditorHeading
        title="Brand & hero"
        description="Update the main business details and first section."
        icon={Settings}
      />
      <div className="admin-form-grid">
        <AdminField
          label="Business name"
          value={draft.brand.name}
          onChange={(value) => updateDraft((next) => { next.brand.name = value; })}
        />
        <AdminField
          label="Owner name"
          value={draft.brand.owner}
          onChange={(value) => updateDraft((next) => { next.brand.owner = value; })}
        />
        <AdminField
          label="Hero eyebrow"
          value={draft.heroContent.eyebrow}
          onChange={(value) => updateDraft((next) => { next.heroContent.eyebrow = value; })}
        />
        <AdminField
          label="Hero title"
          value={draft.heroContent.title}
          onChange={(value) => updateDraft((next) => { next.heroContent.title = value; })}
        />
        <AdminTextarea
          label="Hero paragraph"
          value={draft.heroContent.copy}
          onChange={(value) => updateDraft((next) => { next.heroContent.copy = value; })}
        />
      </div>
    </section>
  );
}

function ExperienceEditor({ draft, updateDraft, requestConfirm }) {
  return (
    <section className="admin-panel">
      <EditorHeading
        title="Marou's coordination experience"
        description="Edit the featured panel quote, circular portrait photo, and experience cards."
      />

      <div className="admin-form-grid">
        <AdminTextarea
          label="Featured panel quote"
          value={draft.experienceContent?.panelQuote ?? ''}
          onChange={(value) =>
            updateDraft((next) => {
              next.experienceContent ??= { panelQuote: '', photoUrl: '' };
              next.experienceContent.panelQuote = value;
            })
          }
        />
        <AdminPhotoField
          label="Featured panel portrait"
          value={draft.experienceContent?.photoUrl ?? ''}
          onChange={(value) =>
            updateDraft((next) => {
              next.experienceContent ??= { panelQuote: '', photoUrl: '' };
              next.experienceContent.photoUrl = value;
            })
          }
        />
      </div>

      <EditableCards
        items={draft.experiencePoints}
        fields={['title', 'description']}
        updateDraft={updateDraft}
        path="experiencePoints"
        itemLabel="experience highlight"
        requestConfirm={requestConfirm}
        createItem={() => ({
          title: 'New experience highlight',
          description: 'Describe this coordination strength.',
        })}
      />
    </section>
  );
}

function ContactEditor({ draft, updateDraft, requestConfirm }) {
  return (
    <section className="admin-panel">
      <EditorHeading
        title="Contact details"
        description="Edit direct contact channels and booking copy."
        icon={UserRound}
      />
      <div className="admin-form-grid">
        <AdminField
          label="Booking eyebrow"
          value={draft.contactContent.eyebrow}
          onChange={(value) => updateDraft((next) => { next.contactContent.eyebrow = value; })}
        />
        <AdminField
          label="Booking title"
          value={draft.contactContent.title}
          onChange={(value) => updateDraft((next) => { next.contactContent.title = value; })}
        />
        <AdminTextarea
          label="Booking description"
          value={draft.contactContent.description}
          onChange={(value) => updateDraft((next) => { next.contactContent.description = value; })}
        />
      </div>

      <div className="admin-list-editor">
        {draft.contactChannels.map((channel, index) => (
          <div className="admin-inline-card" key={`${channel.label}-${index}`}>
            <AdminField
              label="Label"
              value={channel.label}
              onChange={(value) => updateDraft((next) => { next.contactChannels[index].label = value; })}
            />
            <AdminField
              label="Value"
              value={channel.value}
              onChange={(value) => updateDraft((next) => { next.contactChannels[index].value = value; })}
            />
            <AdminField
              label="Link"
              value={channel.href ?? ''}
              onChange={(value) => updateDraft((next) => { next.contactChannels[index].href = value; })}
            />
            <button
              className="admin-danger-button"
              type="button"
              onClick={() =>
                requestConfirm({
                  message: `Remove the "${channel.label || 'contact'}" contact channel? This cannot be undone.`,
                  onConfirm: () => updateDraft((next) => { next.contactChannels.splice(index, 1); }),
                })
              }
            >
              <Trash2 aria-hidden="true" size={15} strokeWidth={1.6} />
              Remove contact
            </button>
          </div>
        ))}
      </div>
      <button
        className="admin-secondary-button admin-add-button"
        type="button"
        onClick={() =>
          updateDraft((next) => {
            next.contactChannels.push({ label: 'New contact', value: '', href: '' });
          })
        }
      >
        <Plus aria-hidden="true" size={17} strokeWidth={1.6} />
        Add contact channel
      </button>
    </section>
  );
}

function ServicesEditor({ draft, updateDraft, requestConfirm }) {
  return (
    <section className="admin-panel">
      <EditorHeading
        title="Coordination services"
        description="Edit the service cards shown on the page."
        icon={BriefcaseBusiness}
      />
      <EditableCards
        items={draft.services}
        fields={['title', 'description']}
        updateDraft={updateDraft}
        path="services"
        itemLabel="service"
        requestConfirm={requestConfirm}
        createItem={() => ({ title: 'New coordination service', description: 'Describe this service.' })}
      />
    </section>
  );
}

function PackagesEditor({ draft, updateDraft, requestConfirm }) {
  return (
    <section className="admin-panel">
      <EditorHeading title="Packages" description="Edit package names, tiers, and feature lists." icon={Package} />
      <div className="admin-list-editor">
        {draft.packages.map((item, index) => (
          <div className="admin-inline-card" key={`${item.name}-${index}`}>
            <AdminField
              label="Name"
              value={item.name}
              onChange={(value) => updateDraft((next) => { next.packages[index].name = value; })}
            />
            <AdminField
              label="Tier"
              value={item.price}
              onChange={(value) => updateDraft((next) => { next.packages[index].price = value; })}
            />
            <AdminTextarea
              label="Features, one per line"
              value={item.features.join('\n')}
              onChange={(value) =>
                updateDraft((next) => {
                  next.packages[index].features = value.split('\n').filter(Boolean);
                })
              }
            />
            <button
              className="admin-danger-button"
              type="button"
              onClick={() =>
                requestConfirm({
                  message: `Remove the "${item.name || 'package'}" package? This cannot be undone.`,
                  onConfirm: () => updateDraft((next) => { next.packages.splice(index, 1); }),
                })
              }
            >
              <Trash2 aria-hidden="true" size={15} strokeWidth={1.6} />
              Remove package
            </button>
          </div>
        ))}
      </div>
      <button
        className="admin-secondary-button admin-add-button"
        type="button"
        onClick={() =>
          updateDraft((next) => {
            next.packages.push({
              name: 'New package',
              price: 'Custom',
              features: ['Add package feature'],
            });
          })
        }
      >
        <Plus aria-hidden="true" size={17} strokeWidth={1.6} />
        Add package
      </button>
    </section>
  );
}

function TestimonialsEditor({ draft, updateDraft, requestConfirm }) {
  return (
    <section className="admin-panel">
      <EditorHeading
        title="Testimonials"
        description="Edit client quotes, labels, and photos using an online URL or uploaded image."
        icon={MessageSquareQuote}
      />

      <div className="admin-list-editor">
        {draft.testimonials.map((testimonial, index) => (
          <div className="admin-inline-card" key={`testimonial-${index}`}>
            <AdminTextarea
              label="Quote"
              value={testimonial.quote}
              onChange={(value) => updateDraft((next) => { next.testimonials[index].quote = value; })}
            />
            <AdminField
              label="Author"
              value={testimonial.author}
              onChange={(value) => updateDraft((next) => { next.testimonials[index].author = value; })}
            />
            <AdminField
              label="Event"
              value={testimonial.event}
              onChange={(value) => updateDraft((next) => { next.testimonials[index].event = value; })}
            />
            <AdminPhotoField
              label="Client photo"
              value={testimonial.photoUrl ?? ''}
              onChange={(value) => updateDraft((next) => { next.testimonials[index].photoUrl = value; })}
            />
            <button
              className="admin-danger-button"
              type="button"
              onClick={() =>
                requestConfirm({
                  message: `Remove the testimonial from "${testimonial.author || 'this client'}"? This cannot be undone.`,
                  onConfirm: () => updateDraft((next) => { next.testimonials.splice(index, 1); }),
                })
              }
            >
              <Trash2 aria-hidden="true" size={15} strokeWidth={1.6} />
              Remove testimonial
            </button>
          </div>
        ))}
      </div>

      <button
        className="admin-secondary-button admin-add-button"
        type="button"
        onClick={() =>
          updateDraft((next) => {
            next.testimonials.push({
              quote: 'Add a client testimonial.',
              author: 'Client name',
              event: 'Event type',
              photoUrl: '',
            });
          })
        }
      >
        <Plus aria-hidden="true" size={17} strokeWidth={1.6} />
        Add testimonial
      </button>
    </section>
  );
}

function EditableCards({
  items,
  fields,
  updateDraft,
  path,
  textareaFields = ['description'],
  createItem,
  requestConfirm,
  itemLabel = 'item',
}) {
  return (
    <>
      <div className="admin-list-editor">
        {items.map((item, index) => (
          <div className="admin-inline-card" key={`${path}-${index}`}>
            {fields.map((field) => {
              const FieldComponent = textareaFields.includes(field) ? AdminTextarea : AdminField;
              return (
                <FieldComponent
                  key={field}
                  label={field}
                  value={item[field] ?? ''}
                  onChange={(value) => updateDraft((next) => { next[path][index][field] = value; })}
                />
              );
            })}
            <button
              className="admin-danger-button"
              type="button"
              onClick={() =>
                requestConfirm({
                  message: `Remove this ${itemLabel}? This cannot be undone.`,
                  onConfirm: () => updateDraft((next) => { next[path].splice(index, 1); }),
                })
              }
            >
              <Trash2 aria-hidden="true" size={15} strokeWidth={1.6} />
              Remove item
            </button>
          </div>
        ))}
      </div>
      {createItem ? (
        <button
          className="admin-secondary-button admin-add-button"
          type="button"
          onClick={() => updateDraft((next) => { next[path].push(createItem()); })}
        >
          <Plus aria-hidden="true" size={17} strokeWidth={1.6} />
          Add item
        </button>
      ) : null}
    </>
  );
}

function EditorHeading({ title, description, icon: Icon = FileText }) {
  return (
    <div className="admin-section-heading">
      <p>Content editor</p>
      <h2>
        <Icon aria-hidden="true" size={26} strokeWidth={1.5} />
        {title}
      </h2>
      <span>{description}</span>
    </div>
  );
}

function AdminField({ label, value, onChange }) {
  return (
    <label className="admin-field">
      {label}
      <input value={value} onChange={(event) => onChange(event.target.value)} />
    </label>
  );
}

function AdminTextarea({ label, value, onChange }) {
  return (
    <label className="admin-field admin-field-wide">
      {label}
      <textarea value={value} rows="4" onChange={(event) => onChange(event.target.value)} />
    </label>
  );
}

export default AdminApp;
