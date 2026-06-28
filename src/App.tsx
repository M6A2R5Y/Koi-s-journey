import { useState, useEffect } from 'react';
import { 
  Home, 
  Briefcase, 
  Cpu, 
  BarChart3, 
  Moon, 
  Sun, 
  ArrowRight, 
  CheckCircle, 
  Mail, 
  Award,
  Terminal,
  Compass,
  Menu,
  X
} from 'lucide-react';

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  const closeSidebar = () => setSidebarOpen(false);
  const navigateTo = (tabId: string) => { setActiveTab(tabId); closeSidebar(); };

  // Dark/Light Theme Handler
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // NFC Visualizer States
  const [nfcStep, setNfcStep] = useState<number>(0);
  const [nfcLogs, setNfcLogs] = useState<string[]>(['System Ready. Standby for NFC signal...']);
  const [nfcScanning, setNfcScanning] = useState<boolean>(false);

  // Math/Algorithm Visualizer States
  const [mathArray, setMathArray] = useState<number[]>([45, 12, 89, 34, 67, 23, 76, 5]);
  const [sortingSteps, setSortingSteps] = useState<{ array: number[]; activeIndices: number[] }[]>([]);
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(-1);
  const [isSorting, setIsSorting] = useState<boolean>(false);

  // Trigger NFC tag scan simulation
  const startNfcScan = () => {
    if (nfcScanning) return;
    setNfcScanning(true);
    setNfcStep(1);
    setNfcLogs(['[NFC] Starting NFC antenna scan...', '[NFC] Searching for 13.56 MHz RFID/NFC signal...']);

    const steps = [
      { log: '[RFID] Tag Detected! UID: 04:A3:F2:8B:11:5C:80', step: 2 },
      { log: '[DECRYPT] Decrypting Secure Sector A (DESFire EV2)... Status: OK', step: 3 },
      { log: '[DATABASE] Record Match: Food For Education ID: #78392. Updating ledger...', step: 4 },
      { log: '[LEDGER] Audit logged successfully. NFC Tag Activation Complete.', step: 5 }
    ];

    steps.forEach((s, idx) => {
      setTimeout(() => {
        setNfcStep(s.step);
        setNfcLogs(prev => [...prev, s.log]);
        if (idx === steps.length - 1) {
          setNfcScanning(false);
        }
      }, (idx + 1) * 1500);
    });
  };

  const resetNfcScan = () => {
    setNfcStep(0);
    setNfcLogs(['System Ready. Standby for NFC signal...']);
    setNfcScanning(false);
  };

  // Math Sort Simulation (Bubble Sort Visualizer)
  const generateSortSteps = () => {
    const arr = [...mathArray];
    const stepsList: { array: number[]; activeIndices: number[] }[] = [];
    stepsList.push({ array: [...arr], activeIndices: [] });

    let n = arr.length;
    let swapped;
    do {
      swapped = false;
      for (let i = 0; i < n - 1; i++) {
        // Log comparison step
        stepsList.push({ array: [...arr], activeIndices: [i, i + 1] });
        if (arr[i] > arr[i + 1]) {
          let temp = arr[i];
          arr[i] = arr[i + 1];
          arr[i + 1] = temp;
          swapped = true;
          // Log swap step
          stepsList.push({ array: [...arr], activeIndices: [i, i + 1] });
        }
      }
      n--;
    } while (swapped);

    setSortingSteps(stepsList);
    setCurrentStepIdx(0);
  };

  useEffect(() => {
    if (currentStepIdx >= 0 && currentStepIdx < sortingSteps.length && isSorting) {
      const timer = setTimeout(() => {
        setCurrentStepIdx(prev => prev + 1);
      }, 400);
      return () => clearTimeout(timer);
    } else if (currentStepIdx >= sortingSteps.length) {
      setIsSorting(false);
    }
  }, [currentStepIdx, isSorting, sortingSteps]);

  const runSorting = () => {
    if (sortingSteps.length === 0) {
      generateSortSteps();
    }
    setIsSorting(true);
  };

  const resetSorting = () => {
    setIsSorting(false);
    setCurrentStepIdx(-1);
    setSortingSteps([]);
    setMathArray([45, 12, 89, 34, 67, 23, 76, 5]);
  };

  const currentArray = currentStepIdx >= 0 && currentStepIdx < sortingSteps.length 
    ? sortingSteps[currentStepIdx].array 
    : mathArray;

  const activeIndices = currentStepIdx >= 0 && currentStepIdx < sortingSteps.length 
    ? sortingSteps[currentStepIdx].activeIndices 
    : [];

  return (
    <div className="app-shell">

      {/* Mobile sidebar backdrop */}
      <div
        className={`sidebar-backdrop glass-panel${sidebarOpen ? ' backdrop-visible' : ''}`}
        onClick={closeSidebar}
        aria-hidden="true"
        style={{ borderRadius: 0, border: 'none', boxShadow: 'none', backdropFilter: 'none' }}
      />

      {/* Sidebar Navigation */}
      <aside className={`glass-panel sidebar${sidebarOpen ? ' sidebar-open' : ''}`}>
        <div>
          <h2 className="gradient-text" style={{ fontSize: '1.6rem', fontWeight: '800', letterSpacing: '-0.5px' }}>
            MARY K.
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '0.2rem' }}>
            B.Sc. Mathematics & CS
          </p>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
          {[
            { id: 'dashboard', label: 'Overview', icon: <Home size={18} /> },
            { id: 'experience', label: 'Work Experience', icon: <Briefcase size={18} /> },
            { id: 'nfc', label: 'NFC Flow Demo', icon: <Cpu size={18} /> },
            { id: 'math', label: 'Algorithms Visualizer', icon: <BarChart3 size={18} /> },
            { id: 'skills', label: 'Skills & Profile', icon: <Award size={18} /> },
          ].map(tab => (
            <button 
              key={tab.id}
              onClick={() => navigateTo(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem 1rem',
                borderRadius: '0.5rem',
                border: 'none',
                background: activeTab === tab.id ? 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%)' : 'transparent',
                color: activeTab === tab.id ? '#ffffff' : 'var(--text-secondary)',
                cursor: 'pointer',
                textAlign: 'left',
                fontWeight: activeTab === tab.id ? '600' : '400',
                transition: 'all 0.2s ease'
              }}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Theme Switcher & Contact info in Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <button 
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              padding: '0.6rem',
              borderRadius: '0.5rem',
              border: '1px solid var(--border-color)',
              background: 'var(--bg-secondary)',
              color: 'var(--text-primary)',
              cursor: 'pointer'
            }}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            {theme === 'dark' ? 'Light Theme' : 'Dark Theme'}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="main-content">
        
        {/* Header */}
        <header className="page-header">
          {/* Hamburger – mobile only */}
          <button
            className="hamburger-btn"
            onClick={() => setSidebarOpen(o => !o)}
            aria-label="Toggle navigation"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: '2rem', fontWeight: '700', letterSpacing: '-0.5px' }}>
              {activeTab === 'dashboard' && 'Welcome to the Control Center'}
              {activeTab === 'experience' && 'Professional Career Track'}
              {activeTab === 'nfc' && 'NFC Flow Simulator'}
              {activeTab === 'math' && 'Mathematics & Algorithms visualizer'}
              {activeTab === 'skills' && 'Professional Profile & Contacts'}
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
              {activeTab === 'dashboard' && 'Academic highlights and work telemetry overview.'}
              {activeTab === 'experience' && 'Timeline of customer service and administrative operations.'}
              {activeTab === 'nfc' && 'Simulate and inspect NFC data exchange mechanics.'}
              {activeTab === 'math' && 'Interact with core computational mathematics.'}
              {activeTab === 'skills' && 'Mary\'s core strengths, software engineering tools, and contact info.'}
            </p>
          </div>
        </header>

        {/* Dashboard Tab Content */}
        {activeTab === 'dashboard' && (
          <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Quick Stats Grid */}
            <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
              <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: '600' }}>ACADEMICS</span>
                <span style={{ fontSize: '1.4rem', fontWeight: '700' }}>B.Sc. Math & Comp Sci</span>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Technical University of Mombasa</p>
              </div>

              <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: '600' }}>CAREER CORE</span>
                <span style={{ fontSize: '1.4rem', fontWeight: '700' }}>Operations & Support</span>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Customer care & record management</p>
              </div>

              <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: '600' }}>INTEREST AREA</span>
                <span style={{ fontSize: '1.4rem', fontWeight: '700' }}>Cybersecurity & Dev</span>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Securing user data and building applications</p>
              </div>
            </div>

            {/* Profile Intro */}
            <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600' }}>About Mary Kinyanjui</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                I am a professional with over 1 year of experience in customer care and operations support, backed by a strong academic foundation in Mathematics and Computer Science. I combine creative problem-solving, digital record management, and technical troubleshooting to build efficient service flows and secure systems.
              </p>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                <button 
                  onClick={() => setActiveTab('experience')}
                  className="gradient-border"
                  style={{
                    border: 'none',
                    cursor: 'pointer',
                    color: 'inherit'
                  }}
                >
                  <div className="gradient-border-inner" style={{ padding: '0.6rem 1.2rem', fontWeight: '600', fontSize: '0.9rem' }}>
                    View Work Track <ArrowRight size={14} style={{ marginLeft: '4px', verticalAlign: 'middle' }} />
                  </div>
                </button>
                <button 
                  onClick={() => setActiveTab('nfc')}
                  style={{
                    padding: '0.6rem 1.2rem',
                    borderRadius: '1rem',
                    border: '1px solid var(--border-color)',
                    background: 'var(--bg-secondary)',
                    color: 'var(--text-primary)',
                    fontWeight: '600',
                    fontSize: '0.9rem',
                    cursor: 'pointer'
                  }}
                >
                  Test NFC Demo
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Experience Tab Content */}
        {activeTab === 'experience' && (
          <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {[
              {
                role: 'Customer Expert',
                company: 'Teleperformance EPZ MAJOREL',
                period: 'Feb 2026 - Present',
                bullets: [
                  'Managed high-volume inbound customer calls and emails, ensuring professional and courteous service delivery.',
                  'Responded to customer inquiries, complaints, and requests while maintaining accuracy and compliance with service guidelines.'
                ]
              },
              {
                role: 'School Lead',
                company: 'Bridge Talent; Food For Education',
                period: 'Oct 2025 - Jan 2026',
                bullets: [
                  'Managed and maintained student and parent records through accurate data entry and updates.',
                  'Responded to parent and student inquiries, providing first-line customer support and issue resolution.',
                  'Managed NFC tag activation, verification, and screening processes for service operations.'
                ]
              },
              {
                role: 'Freelance Administrative & Operations Assistant',
                company: 'Remote',
                period: 'Mar 2023 - Aug 2024',
                bullets: [
                  'Provided administrative and operational support remotely.',
                  'Performed data entry, verification, and record management.'
                ]
              }
            ].map((exp, idx) => (
              <div key={idx} className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div className="exp-header">
                  <h3 style={{ fontWeight: '700', fontSize: '1.15rem' }}>{exp.role}</h3>
                  <span style={{ color: 'var(--accent-primary)', fontWeight: '600', fontSize: '0.85rem' }}>{exp.period}</span>
                </div>
                <h4 style={{ color: 'var(--text-secondary)', fontWeight: '500', fontSize: '0.95rem' }}>{exp.company}</h4>
                <ul style={{ paddingLeft: '1.25rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.9rem' }}>
                  {exp.bullets.map((b, bIdx) => <li key={bIdx}>{b}</li>)}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* NFC Tab Content */}
        {activeTab === 'nfc' && (
          <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <h3 style={{ fontWeight: '600' }}>What is NFC Verification?</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.5 }}>
                In her School Lead role, Mary managed **Near Field Communication (NFC)** tags for student check-ins. 
                NFC allows two electronic devices to communicate when they are within 4 cm of each other. 
                When a tag is tapped, it initiates a secure key authentication, sends a payload, and logs the user record into the database.
              </p>
            </div>

            <div className="nfc-grid">
              {/* Animation Graphic Panel */}
              <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '300px', gap: '1.5rem' }}>
                {/* SVG Visualizing the flow */}
                <div className="nfc-svg-wrapper" style={{ width: '100%', maxWidth: '300px' }}>
                <svg width="280" height="120" viewBox="0 0 280 120" style={{ overflow: 'visible', width: '100%', height: 'auto' }}>
                  {/* Tag Node */}
                  <g transform="translate(40, 60)">
                    <circle r="30" fill={nfcStep >= 2 ? 'var(--accent-primary)' : 'var(--bg-tertiary)'} stroke="var(--border-color)" strokeWidth="2" style={{ transition: 'all 0.3s' }} />
                    <text textAnchor="middle" y="5" fill={nfcStep >= 2 ? '#ffffff' : 'var(--text-secondary)'} fontSize="11" fontWeight="bold">NFC Tag</text>
                  </g>

                  {/* Flow line 1 */}
                  <path d="M 70 60 L 140 60" fill="none" stroke={nfcStep >= 2 ? 'var(--accent-primary)' : 'var(--border-color)'} strokeWidth="3" className={nfcStep === 1 ? 'flow-animate' : ''} />

                  {/* Reader Node */}
                  <g transform="translate(140, 60)">
                    <circle r="30" fill={nfcStep >= 3 ? 'var(--accent-secondary)' : 'var(--bg-tertiary)'} stroke="var(--border-color)" strokeWidth="2" style={{ transition: 'all 0.3s' }} />
                    <text textAnchor="middle" y="5" fill={nfcStep >= 3 ? '#ffffff' : 'var(--text-secondary)'} fontSize="11" fontWeight="bold">Reader</text>
                  </g>

                  {/* Flow line 2 */}
                  <path d="M 170 60 L 240 60" fill="none" stroke={nfcStep >= 4 ? 'var(--accent-blue)' : 'var(--border-color)'} strokeWidth="3" className={nfcStep === 3 ? 'flow-animate' : ''} />

                  {/* DB Node */}
                  <g transform="translate(240, 60)">
                    <circle r="30" fill={nfcStep >= 4 ? 'var(--accent-emerald)' : 'var(--bg-tertiary)'} stroke="var(--border-color)" strokeWidth="2" style={{ transition: 'all 0.3s' }} />
                    <text textAnchor="middle" y="5" fill={nfcStep >= 4 ? '#ffffff' : 'var(--text-secondary)'} fontSize="11" fontWeight="bold">Database</text>
                  </g>
                </svg>
                </div>

                {/* Status Indicator */}
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  {nfcStep === 0 && <span style={{ color: 'var(--text-muted)' }}>Waiting for signal...</span>}
                  {nfcStep === 1 && <span style={{ color: 'var(--accent-primary)', fontWeight: '600' }} className="animate-pulse-ring">Scanning tag...</span>}
                  {nfcStep === 2 && <span style={{ color: 'var(--accent-secondary)', fontWeight: '600' }}>Tag Authenticating...</span>}
                  {nfcStep === 3 && <span style={{ color: 'var(--accent-blue)', fontWeight: '600' }}>Logging Transaction...</span>}
                  {nfcStep >= 4 && (
                    <span style={{ color: 'var(--accent-emerald)', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <CheckCircle size={16} /> Access Logged Successfully
                    </span>
                  )}
                </div>

                {/* Control Action buttons */}
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <button 
                    onClick={startNfcScan}
                    disabled={nfcScanning}
                    style={{
                      padding: '0.5rem 1rem',
                      borderRadius: '0.5rem',
                      border: 'none',
                      background: 'var(--accent-primary)',
                      color: '#ffffff',
                      fontWeight: '600',
                      cursor: nfcScanning ? 'not-allowed' : 'pointer',
                      opacity: nfcScanning ? 0.7 : 1
                    }}
                  >
                    Tap NFC Tag
                  </button>
                  <button 
                    onClick={resetNfcScan}
                    style={{
                      padding: '0.5rem 1rem',
                      borderRadius: '0.5rem',
                      border: '1px solid var(--border-color)',
                      background: 'var(--bg-secondary)',
                      color: 'var(--text-primary)',
                      cursor: 'pointer'
                    }}
                  >
                    Reset Demo
                  </button>
                </div>
              </div>

              {/* Secure Log Console Panel */}
              <div className="glass-panel" style={{ 
                padding: '1.25rem', 
                background: '#090d16', 
                color: '#34d399', 
                borderRadius: '1rem', 
                minHeight: '300px',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.8)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #1f2937', paddingBottom: '0.5rem', marginBottom: '0.75rem' }}>
                  <span style={{ fontSize: '0.8rem', color: '#6b7280', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Terminal size={14} /> SECURE LOG TELEMETRY
                  </span>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: nfcScanning ? '#f59e0b' : '#10b981' }}></span>
                </div>
                <div style={{ flex: 1, fontSize: '0.8rem', fontFamily: 'monospace', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.4rem', lineHeight: 1.4 }}>
                  {nfcLogs.map((log, idx) => (
                    <div key={idx}>{log}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Math/Algorithms Tab Content */}
        {activeTab === 'math' && (
          <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="glass-panel" style={{ padding: '1.5rem' }}>
              <h3 style={{ fontWeight: '600', marginBottom: '0.5rem' }}>The Mathematics of Sorting Algorithms</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.5 }}>
                Bubble sort is an algorithm that compares adjacent values and swaps them if they are in the wrong order. 
                This visualizer demonstrates sorting mathematics in action. Click **Run Sorting** to watch the computer sort numbers from shortest to tallest!
              </p>
            </div>

            <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
              {/* Bars Visualisation */}
              <div style={{ display: 'flex', gap: '1rem', height: '180px', alignItems: 'flex-end', justifyContent: 'center', width: '100%', maxWidth: '500px' }}>
                {currentArray.map((val, idx) => (
                  <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', flex: 1 }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: '600', color: activeIndices.includes(idx) ? 'var(--accent-secondary)' : 'var(--text-secondary)' }}>{val}</span>
                    <div style={{
                      width: '100%',
                      height: `${val * 1.5}px`,
                      background: activeIndices.includes(idx) ? 'linear-gradient(to top, var(--accent-secondary), var(--accent-rose))' : 'linear-gradient(to top, var(--accent-primary), var(--accent-blue))',
                      borderRadius: '4px 4px 0 0',
                      transition: 'height 0.3s ease, background 0.2s'
                    }}></div>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button 
                  onClick={runSorting}
                  disabled={isSorting}
                  style={{
                    padding: '0.5rem 1rem',
                    borderRadius: '0.5rem',
                    border: 'none',
                    background: 'var(--accent-primary)',
                    color: '#ffffff',
                    fontWeight: '600',
                    cursor: isSorting ? 'not-allowed' : 'pointer',
                    opacity: isSorting ? 0.7 : 1
                  }}
                >
                  Run Sorting
                </button>
                <button 
                  onClick={resetSorting}
                  style={{
                    padding: '0.5rem 1rem',
                    borderRadius: '0.5rem',
                    border: '1px solid var(--border-color)',
                    background: 'var(--bg-secondary)',
                    color: 'var(--text-primary)',
                    cursor: 'pointer'
                  }}
                >
                  Reset Array
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Skills Tab Content */}
        {activeTab === 'skills' && (
          <div className="animate-fade-in skills-grid">
            {/* Left side: Skills breakdown */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div className="glass-panel" style={{ padding: '1.5rem' }}>
                <h3 style={{ fontWeight: '600', marginBottom: '1rem' }}>Expertise & Capabilities</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {[
                    'Customer support- Phone & Email',
                    'Data Entry & Accurate Documentation',
                    'CRM & Digital Record Management',
                    'Microsoft Word & Excel',
                    'Active Listening & Communication',
                    'Multitasking & Time Management',
                    'Team Collaboration',
                    'Administrative & Operations Support'
                  ].map((skill, idx) => (
                    <span key={idx} style={{
                      padding: '0.4rem 0.8rem',
                      borderRadius: '0.5rem',
                      background: 'var(--bg-tertiary)',
                      color: 'var(--text-secondary)',
                      fontSize: '0.85rem',
                      fontWeight: '500',
                      border: '1px solid var(--border-color)'
                    }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="glass-panel" style={{ padding: '1.5rem' }}>
                <h3 style={{ fontWeight: '600', marginBottom: '1rem' }}>Education</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontWeight: '700' }}>B.Sc. Mathematics & Computer Science</span>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Sep 2020 - Dec 2024</span>
                  </div>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Technical University of Mombasa</span>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.5rem' }}>
                    Coursework included advanced mathematics, data analysis, database systems, computer programming, and networking structures.
                  </p>
                </div>
              </div>
            </div>

            {/* Right side: Contacts & Referees */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <h3 style={{ fontWeight: '600' }}>Contact Info</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Mail size={16} style={{ color: 'var(--accent-primary)' }} />
                    <a href="mailto:kinyanjuimary516@gmail.com" style={{ color: 'inherit', textDecoration: 'none' }}>kinyanjuimary516@gmail.com</a>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
                    <Compass size={16} style={{ color: 'var(--accent-secondary)' }} />
                    <span>Mombasa, Kenya</span>
                  </div>
                </div>
              </div>

              <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <h3 style={{ fontWeight: '600' }}>Referees</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.85rem' }}>
                  <div>
                    <div style={{ fontWeight: '700' }}>David Muriuki</div>
                    <div style={{ color: 'var(--text-secondary)' }}>Teleperformance EPZ MAJOREL</div>
                    <a href="mailto:david.muriuki@mj.teleperformance.com" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>david.muriuki@mj.teleperformance.com</a>
                  </div>
                  <div>
                    <div style={{ fontWeight: '700' }}>Jimmy Gitau</div>
                    <div style={{ color: 'var(--text-secondary)' }}>Bridge Talent Group</div>
                    <a href="mailto:jimmy@bridgetalentgroup.com" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>jimmy@bridgetalentgroup.com</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
