import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

const NAV = [
  ['Home', 'home'],
  ['About', 'about'],
  ['Experience', 'experience'],
  ['Skills & Stack', 'skills'],
  ['Projects', 'projects'],
  ['Contact', 'contact'],
];

// Keep proficiency qualitative unless the owner has verified measurements.
const SKILLS = [
  { name: 'JavaScript', group: 'Core focus', level: 'Primary learning focus', focus: 68, color: '#f7df1e', note: 'Problem solving, application logic and modern JavaScript fundamentals' },
  { name: 'TypeScript', group: 'Core focus', level: 'Actively learning', focus: 60, color: '#3178c6', note: 'Types, safer data contracts and maintainable code' },
  { name: 'React', group: 'Core focus', level: 'Hands-on practice', focus: 65, color: '#61dafb', note: 'Components, props, state and data-driven UI' },
  { name: 'Next.js', group: 'Core focus', level: 'Actively building', focus: 60, color: '#e5e7eb', note: 'App structure, routing and full-stack workflows' },
  { name: 'Node.js', group: 'Full stack', level: 'Learning by building', focus: 58, color: '#68a063', note: 'Server-side JavaScript and APIs' },
  { name: 'Express.js', group: 'Full stack', level: 'Learning by building', focus: 52, color: '#b8b8c5', note: 'Routing, middleware and API structure' },
  { name: 'MongoDB', group: 'Database', level: 'Project practice', focus: 55, color: '#47a248', note: 'Documents, collections and Atlas setup' },
  { name: 'MySQL / SQL', group: 'Database', level: 'Working knowledge', focus: 62, color: '#4f91c7', note: 'Relational data, joins and query fundamentals' },
  { name: 'HTML & CSS', group: 'Foundation', level: 'Comfortable foundation', focus: 70, color: '#e34f26', note: 'Semantic markup and responsive layouts' },
  { name: 'PHP & Laravel', group: 'Foundation', level: 'Previous hands-on experience', focus: 60, color: '#8892bf', note: 'Backend fundamentals and MVC applications' },
    { name: 'Java', group: 'Foundation', level: 'Previous hands-on experience', focus: 48, color: '#bf88bd', note: 'Backend fundamentals and MVC applications' },

  { name: 'Git & GitHub', group: 'Tools', level: 'Project workflow', focus: 62, color: '#f97316', note: 'Version control and repository workflow' },
];


const PROJECTS = [
  {
    name: 'BazarDor',
    kind: 'Next.js · Full stack learning project',
    summary:
      'A marketplace-style application exploring product browsing, category data, authentication and API integration.',
    stack: [
      'Next.js',
      'React',
      'Better Auth',
      'MongoDB Atlas',
      'API integration',
    ],
    color: '#60a5fa',
    mark: 'BD',
    image: '/bazardor.png',
    repoUrl: 'https://github.com/nazifa-buildscodes/BazarDor-as7-ph',
    liveUrl: 'https://bazar-dor-as7-ph-zzjl.vercel.app/',
    details: 'Worked on environment configuration, MongoDB Atlas setup, Better Auth flows and product/category API integration.',

  challenges: [
    'Configuring environment variables and MongoDB Atlas.',
    'Integrating authentication and product/category APIs.',
  ],

  improvements: [
    'Improve loading and error states.',
    'Expand testing and strengthen authentication flows.',
  ],
  },
  {
    name: 'Dev Stack Builder',
    kind: 'React · Interactive UI',
    summary:
      'An interactive interface for exploring technology cards and managing selected stack items.',
    stack: ['React', 'JavaScript', 'CSS', 'JSON data'],
    color: '#34d399',
    mark: 'DS',
    image: '/dev-stack.png',
    repoUrl:
      'https://github.com/nazifa-buildscodes/dev-stack-react-assignment-5',
    liveUrl: 'https://dev-stack-react-assignment-5.vercel.app/',
    details: 'Built an interactive technology explorer with reusable cards, data-driven rendering, and add/remove interactions for managing selected technology stack items.',
  challenges: [
    'Rendering technology cards dynamically from structured data.',
    'Managing selected items and keeping the interface synchronized with user interactions.',
    'Maintaining a consistent layout across different screen sizes.',
  ],
  improvements: [
    'Add search and filtering to help users find technologies faster.',
    'Allow users to save or export their selected technology stack.',
    'Improve accessibility and add more interaction feedback.',
  ],
  },
  {
    name: 'DevConf 2026',
    kind: 'Frontend · Design implementation',
    summary:
      'A conference landing page based on a Figma reference, including speakers, pricing and hackathon sections.',
    stack: ['HTML', 'CSS', 'Responsive UI'],
    color: '#a78bfa',
    mark: 'DC',
    image: '/devconf.png',
    repoUrl: 'https://github.com/Ahona-001/nazifa_b14_ph_as1',
    liveUrl: 'https://ahona-001.github.io/nazifa_b14_ph_as1/',
    details: 'Implemented a conference landing page based on a Figma design, focusing on layout accuracy, typography, spacing, and responsive sections.',
  challenges: [
    'Translating the Figma reference into a structured webpage.',
    'Matching spacing, typography, and section layouts to the design.',
    'Making the page adapt to different screen sizes.',
  ],
  improvements: [
    'Improve responsive layouts for smaller mobile screens.',
    'Add subtle animations and interactions where appropriate.',
    'Improve accessibility and optimize image loading.',
  ],
  },
  {
    name: 'FitLog',
    kind: 'Fitness · Gym & Exercise',
    summary:
      'A fitness-focused web application designed to help users explore gym exercises and support their workout journey.',
    stack: ['Next.js', 'React', 'JavaScript', 'Fitness UI'],
    color: '#f472b6',
    mark: 'FL',
    image: '/fitlog.png',
    repoUrl: 'https://github.com/nazifa-buildscodes/fitlog-nextjs-phasgn',
    liveUrl: 'https://fitlog-nextjs-phasgn.vercel.app/',
   details: 'Developed a fitness-focused web experience using Next.js and React, with an interface centered on gym exercises and workout-related content.',
  challenges: [
    'Organizing fitness-related content into a clear and easy-to-explore interface.',
    'Maintaining a consistent visual hierarchy across the page.',
    'Ensuring the interface remains usable on different screen sizes.',
  ],
  improvements: [
    'Add personalized workout plans and progress tracking.',
    'Introduce exercise search and filtering options.',
    'Improve accessibility, performance, and mobile usability.',
  ],
  },
];


const CERTIFICATES = []; // Add verified certificate records here; never add invented credentials.

const EXPERIENCE = [
  { date: 'Current training', role: 'AI-Driven Full Stack Web Engineer', org: 'Programming Hero', type: 'Training', note: 'Project-based learning in TypeScript, JavaScript, React, Next.js, Node.js, Express, MongoDB and AI-assisted development.' },
  { date: 'Jan 2026 – Mar 2026', role: 'PHP & Laravel Developer', org: 'Sohojx', type: 'Employment', note: 'PHP and Laravel development role.' },
  { date: 'Earlier training', role: 'Professional Web Application Development', org: 'ISDB-BISEW IT Scholarship Programme', type: 'Training', note: 'Professional web application development training.' },
  { date: 'Jun 2024 – Apr 2025', role: 'Software Engineer', org: 'Dot BD Solutions Ltd.', type: 'Employment', note: 'Software development role.' },
];

const EDUCATION = [
  { date: 'Currently pursuing', role: 'B.Sc. in Computer Science & Engineering', org: 'Prime University', note: 'Undergraduate study in CSE.' },
  { date: 'Completed 2024', role: 'Diploma in Computer Science & Technology', org: 'Feni Government Computer Institute', note: 'CGPA 3.80 / 4.00.' },
  { date: 'SSC · 2020', role: 'Secondary School Certificate · Science', org: 'Feni Government Girls’ High School', note: 'GPA 4.83 / 5.00.' },
];

const REACT_CONCEPTS = [
  { id: 'components', title: 'Components', code: 'function SkillCard({ skill }) {\n  return <article>{skill.name}</article>;\n}', what: 'A component packages a piece of interface into a reusable function.', why: 'Reusable sections and cards are easier to maintain than one enormous JSX tree.', used: 'This portfolio uses components such as Navbar, Hero, About, Skills, Projects and Contact. Skill and project cards are rendered from data arrays.' },
  { id: 'props', title: 'Props', code: '<SectionHeader title="My skills" eyebrow="04 — SKILLS" />', what: 'Props pass configuration or data from a parent component to a child.', why: 'A shared component can display different content without duplicating markup.', used: 'SectionHeader receives its title, eyebrow and optional supporting copy as props.' },
  { id: 'state', title: 'useState', code: 'const [filter, setFilter] = useState("All");', what: 'State stores values that change over time and affect the rendered UI.', why: 'React can re-render the relevant component when a user changes a filter, opens a menu or selects a detail view.', used: 'The skill filter, mobile navigation and certificate/project detail views are natural examples of interactive state.' },
  { id: 'effect', title: 'useEffect', code: 'useEffect(() => {\n  window.addEventListener("scroll", onScroll);\n  return () => window.removeEventListener("scroll", onScroll);\n}, []);', what: 'Effects synchronize React with external systems such as browser events.', why: 'Listeners and observers must be registered and cleaned up to avoid stale handlers or leaks.', used: 'Scroll progress, active-section detection, reveal observers and typewriter timing rely on browser effects.' },
  { id: 'memo', title: 'useMemo', code: 'const visible = useMemo(\n  () => items.filter(matchesFilter),\n  [items, matchesFilter]\n);', what: 'useMemo caches a calculated value between renders while its dependencies stay the same.', why: 'It can help when a derived calculation is expensive or when stable references matter; it is not needed for every expression.', used: 'A category-filtered list is a straightforward example. Keep it only where it improves clarity or avoids meaningful repeated work.' },
  { id: 'callbacks', title: 'useCallback', code: 'const goTo = useCallback((id) => {\n  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });\n}, []);', what: 'useCallback preserves a function reference until dependencies change.', why: 'Useful when stable callback identity matters to memoized children or effect dependencies—not a default for every function.', used: 'A shared navigation handler can be passed to navbar and footer controls without duplicating scroll logic.' },
  { id: 'lists', title: 'Lists & keys', code: '{projects.map((project) => (\n  <ProjectCard key={project.name} project={project} />\n))}', what: 'map() turns an array of data into UI elements. A stable key helps React identify each item.', why: 'Data-driven rendering keeps repeated cards consistent and easy to update.', used: 'Navigation items, skills, journey entries and projects can all be rendered from arrays.' },
  { id: 'conditional', title: 'Conditional UI', code: '{menuOpen && <MobileMenu />}\n{selectedProject ? <ProjectDialog /> : null}', what: 'Conditional rendering shows UI only when a condition is true.', why: 'It keeps menus, modals and empty states relevant to the current interaction.', used: 'Mobile navigation and detail dialogs are useful examples of state-dependent UI.' },
];

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node || !('IntersectionObserver' in window)) { setVisible(true); return; }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); observer.disconnect(); }
    }, { threshold: 0.12 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return [ref, visible];
}

function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(max > 0 ? (window.scrollY / max) * 100 : 0);
      });
    };
    window.addEventListener('scroll', update, { passive: true });
    update();
    return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', update); };
  }, []);
  return <div className="scroll-progress" style={{ width: `${progress}%` }} aria-hidden="true" />;
}

function AmbientBackground() {
  return <div className="ambient" aria-hidden="true"><div className="ambient-orb orb-a" /><div className="ambient-orb orb-b" /><div className="ambient-orb orb-c" /><div className="ambient-grid" /></div>;
}

function SectionHeader({ eyebrow, title, copy, centered = false }) {
  return <header className={`section-header ${centered ? 'centered' : ''}`}><div><span className="eyebrow">{eyebrow}</span><h2>{title}</h2></div>{copy && <p>{copy}</p>}</header>;
}

function Navbar({ active, onNav, theme, onToggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return <nav className={`navbar ${scrolled ? 'is-scrolled' : ''}`} aria-label="Main navigation">
    <div className="nav-inner">
      <button className="brand" onClick={() => onNav('home')} aria-label="Go to home"><span>NN</span><i>.</i></button>
      <div className="desktop-nav">{NAV.map(([label, id]) => <button key={id} className={active === id ? 'active' : ''} onClick={() => onNav(id)}>{label}</button>)}</div>
      <div className="nav-actions"><button className="theme-toggle" onClick={onToggleTheme} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`} title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>{theme === 'dark' ? '☼' : '☾'} <span>{theme === 'dark' ? 'Light' : 'Dark'}</span></button><a className="nav-cv" href="/NazifaNowsin-cv.pdf" download="NazifaNowsin-cv.pdf">Download CV <span>↗</span></a></div>
      <button className={`menu-toggle ${open ? 'open' : ''}`} onClick={() => setOpen(v => !v)} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="mobile-nav"><span /><span /></button>
    </div>
    <div id="mobile-nav" className={`mobile-nav ${open ? 'open' : ''}`}>
      {NAV.map(([label, id]) => <button key={id} className={active === id ? 'active' : ''} onClick={() => { onNav(id); setOpen(false); }}>{label}<span>↗</span></button>)}
      <a href="/NazifaNowsin-cv.pdf" download="NazifaNowsin-cv.pdf" onClick={() => setOpen(false)}>Download CV ↗</a>
    </div>
  </nav>;
}

function Hero({ onNav }) {
  return <section id="home" className="hero section-anchor">
    <div className="hero-halo halo-one" aria-hidden="true" /><div className="hero-halo halo-two" aria-hidden="true" />
    <div className="hero-content">
      <div className="availability"><span /> ASPIRING DEVELOPER <b>·</b> OPEN TO OPPORTUNITIES</div>
      <p className="hero-kicker">AI-DRIVEN FULL STACK WEB ENGINEER</p>
      <h1>Building my future<br /><span>in Full Stack Development.</span></h1>
      <p className="hero-description">I’m an aspiring AI-Driven Full Stack Web Engineer, learning by building real applications. I’m confident in my ability to learn, ready to contribute, and focused on JavaScript, TypeScript, React, Next.js, Node.js and AI-assisted development.</p>
      <div className="hero-stack" aria-label="Primary technology focus">{['JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js', 'Express', 'MongoDB'].map((x, i) => <span key={x} className={`stack-pill pill-${i}`}>{x}</span>)}</div>
      <div className="hero-actions"><button className="btn btn-primary" onClick={() => onNav('projects')}>Explore my projects <span>↗</span></button><a className="btn btn-ghost" href="/NazifaNowsin-cv.pdf" download="NazifaNowsin-cv.pdf">Download CV <span>↓</span></a></div>
      <div className="hero-socials"><a href="https://github.com/nazifa-buildscodes" target="_blank" rel="noreferrer">GitHub ↗</a><a href="https://www.linkedin.com/in/nazifa-nowsin-7b7459243/" target="_blank" rel="noreferrer">LinkedIn ↗</a><a href="mailto:nazifanowsin2021@gmail.com">Email ↗</a></div>
      <a className="scroll-cue" href="#about" aria-label="Scroll to about section"><span /> Scroll to explore</a>
    </div>
  
  </section>;
}

function About() {
  const [ref, visible] = useReveal();
  return <section className="section section-anchor"><div className="wrap" ref={ref}>
    <div className={`about-grid reveal ${visible ? 'visible' : ''}`}>
      <div className="portrait-stage"><div className="portrait-glow" /><div className="portrait-frame"><img src="/profile3.png" alt="Portrait of Nazifa Nowsin" loading="lazy" /></div><div className="portrait-label"><strong>Nazifa Nowsin</strong><span>ASPIRING FULL STACK DEVELOPER</span></div><div className="portrait-orbit orbit-a" /><div className="portrait-orbit orbit-b" /></div>
      <div className="about-copy about-code-side">
        <p className="lead">Building with curiosity. Improving with every project.</p>
        <p>I’m an aspiring full-stack developer focused on JavaScript, TypeScript, React, Next.js and Node.js—with a foundation in PHP and Laravel.</p>
        <div className="about-code-window" aria-label="Developer profile code example">
          <div className="about-code-top"><span className="code-dots"><i></i><i></i><i></i></span><span>developer.ts</span><span className="code-live"><i></i> learning & building</span></div>
          <pre><code><span className="code-keyword">const</span> developer = {'{'}
  name: <span className="code-string">"Nazifa Nowsin"</span>,
  role: <span className="code-string">"Aspiring Full Stack Developer"</span>,
  focus: [<span className="code-string">"JavaScript"</span>, <span className="code-string">"TypeScript"</span>,
          <span className="code-string">"React"</span>, <span className="code-string">"Next.js"</span>, <span className="code-string">"Node.js"</span>],
  mindset: <span className="code-string">"Learn · Build · Improve"</span>,
  openTo: <span className="code-string">"Real-world opportunities"</span>
{'}'};</code></pre>
          <div className="about-code-footer"><span>01</span><span>Curious by nature. Focused on progress.</span><span>TS</span></div>
        </div>
        <div className="about-quick-tags"><span>AI-assisted workflow</span><span>Problem solving</span><span>Team learning</span></div>
      </div>
    </div>
  </div></section>;
}

function Journey() {
  return <section id="experience" className="section section-soft section-anchor"><div className="wrap">
    <div className="background-columns">
      <div className="background-column"><div className="column-heading"><span>01</span><h3>Education</h3></div>{EDUCATION.map((item) => <article className="background-item" key={item.org}><time>{item.date}</time><h4>{item.role}</h4><strong>{item.org}</strong><p>{item.note}</p></article>)}<a className="btn btn-ghost education-cv" href="/NazifaNowsin-cv.pdf" target="_blank" rel="noreferrer">Show CV <span>↗</span></a></div>
      <div className="background-column"><div className="column-heading"><span>02</span><h3>Experience & training</h3></div>{EXPERIENCE.map((item) => <article className="background-item" key={`${item.org}-${item.role}`}><div className="background-meta"><time>{item.date}</time><span className={item.type === 'Training' ? 'type-training' : ''}>{item.type}</span></div><h4>{item.role}</h4><strong>{item.org}</strong><p>{item.note}</p></article>)}</div>
    </div>
  </div></section>;
}

function Mindset() {
  const steps = [['01', 'Think', 'Understand the problem before coding.'], ['02', 'Analyze', 'Break it into smaller decisions.'], ['03', 'Build', 'Create a clear, useful first version.'], ['04', 'Review', 'Test behavior and welcome feedback.'], ['05', 'Improve', 'Refine accessibility, performance and code quality.']];
}

function Skills() {
  const [ref, visible] = useReveal();
  const [filter, setFilter] = useState('All');
  const groups = ['All', 'Core focus', 'Full stack', 'Database', 'Foundation', 'Tools'];
  const filtered = useMemo(() => filter === 'All' ? SKILLS : SKILLS.filter(s => s.group === filter), [filter]);
  return <section className="section section-soft section-anchor"><div className="wrap" ref={ref}>
    <SectionHeader title="Skills & technology focus" copy="." />
    <div className="skill-filters" role="group" aria-label="Filter skills">{groups.map(group => <button key={group} className={filter === group ? 'active' : ''} onClick={() => setFilter(group)}>{group}</button>)}</div>
    <div className="skills-grid">{filtered.map((skill, i) => <article className={`skill-card show ${visible ? 'visible' : ''}`} key={skill.name} style={{'--skill-color':skill.color,'--delay':`${i * 45}ms`}}>
      <div className="skill-top"><span className="skill-dot"/><b>{skill.name}</b><small>{skill.group}</small></div>
      <p>{skill.note}</p>
      <div className="skill-percentage"><div><span>{skill.level}</span><strong>{skill.focus ?? 65}%</strong></div><div className="skill-track"><i style={{width:`${skill.focus ?? 65}%`}}/></div></div>
    </article>)}</div>
    <p className="skill-disclaimer">Percentages represent my current learning focus, not a tested proficiency score.</p>
  </div></section>;
}

function StackPlaybook() {
 const [active,setActive]=useState('JavaScript');
 const topics=[
 {name:'JavaScript',color:'#f7df1e',level:'Primary language focus',concepts:['Variables, scope & functions','Array methods: map, filter, find','Async/await and promises','Events and application logic'],used:'Portfolio source: data arrays, filtering, event handlers, callbacks and derived UI. Other practice: interactive stack builder and ecommerce interactions.'},
 {name:'TypeScript',color:'#3178c6',level:'Actively learning',concepts:['Types and interfaces','Union types and narrowing','Typed function parameters','Safer API data contracts'],used:'Learning/project focus. This portfolio is JavaScript JSX, not TypeScript, so TypeScript is not claimed as implemented in this site.'},
 {name:'React',color:'#61dafb',level:'Hands-on practice',concepts:['Reusable components and props','useState and controlled UI','useEffect + cleanup','Lists, keys and conditional rendering'],used:'This portfolio: section components, skill filters, theme state, mobile menu, project detail dialog, concept tabs, scroll observers and data-driven lists.'},
 {name:'Next.js',color:'#d1d5db',level:'Actively building',concepts:['App Router fundamentals','Layouts and route structure','Server/client component concepts','Environment variables and API integration'],used:'Project practice: BazarDor, including sign-in/sign-up UI, API integration, category/product data and MongoDB Atlas/Better Auth configuration work.'},
 {name:'Node.js + Express',color:'#68a063',level:'Growing full-stack focus',concepts:['HTTP request/response','REST API routes','Middleware and validation','Error handling and environment config'],used:'Core backend learning path. This portfolio itself does not run a Node/Express backend; add a concrete API repository when available.'},
 {name:'MongoDB',color:'#47a248',level:'Project practice',concepts:['Documents and collections','CRUD operations','Connection strings and environment variables','Data modeling basics'],used:'BazarDor learning/configuration work includes MongoDB Atlas. This portfolio site itself does not store its content in MongoDB.'},
 {name:'SQL / MySQL',color:'#4f91c7',level:'Working knowledge',concepts:['SELECT, WHERE and ORDER BY','Primary and foreign keys','JOIN and relationships','INSERT, UPDATE and DELETE'],used:'Database concepts are demonstrated in the SQL lab. This static portfolio does not connect to a live SQL database.'}
 ];
 const current=topics.find(t=>t.name===active)||topics[0];
 return <section className="section section-soft" id="stack-playbook"><div className="wrap"><SectionHeader eyebrow="05 — MY DEVELOPER PLAYBOOK" title="What I’m learning, what I use, and where." copy="Explore the concepts and tools I’m currently building with."/><div className="playbook"><div className="playbook-tabs" role="tablist" aria-label="Technology playbook">{topics.map(t=><button key={t.name} role="tab" aria-selected={active===t.name} className={active===t.name?'active':''} onClick={()=>setActive(t.name)} style={{'--topic-color':t.color}}>{t.name}</button>)}</div><article className="playbook-content" role="tabpanel"><div className="playbook-title"><span className="topic-orb" style={{background:current.color}}/><div><span className="eyebrow">{current.level}</span><h3>{current.name}</h3></div></div><div className="playbook-concepts">{current.concepts.map((c,i)=><div key={c}><span>{String(i+1).padStart(2,'0')}</span><strong>{c}</strong></div>)}</div><div className="used-note"><span>WHERE IT FITS</span><p>{current.used}</p></div></article></div></div></section>;
}

function MernStack() {
  const [selected, setSelected] = useState('React');
  const layers = [
    { name: 'React / Next.js', key: 'React', role: 'Frontend', detail: 'Build the interface, compose components and manage UI state.' },
    { name: 'Node.js + Express', key: 'Node.js', role: 'Server / API', detail: 'Receive requests, validate input, apply business logic and return responses.' },
    { name: 'MongoDB', key: 'MongoDB', role: 'Document database', detail: 'Store and retrieve application data as documents in collections.' },
  ];
  const current = layers.find(x => x.key === selected) || layers[0];
  return <section className="section"><div className="wrap"><div className="mern-panel"><div className="mern-copy"><span className="eyebrow">05 — MODERN STACK</span><h2>One request.<br /><span>A connected system.</span></h2><p>MERN connects a React interface, a Node/Express API and a MongoDB database. Next.js can also provide a React-based application framework in the same broader JavaScript ecosystem.</p><div className="mern-detail" aria-live="polite"><span>{current.role}</span><strong>{current.name}</strong><p>{current.detail}</p></div></div><div className="architecture"><div className="arch-client">Browser / User</div><div className="arch-arrow">request ↓ · response ↑</div><div className="arch-node-grid">{layers.map((layer, i) => <button key={layer.key} className={`arch-node arch-${i} ${selected === layer.key ? 'selected' : ''}`} onClick={() => setSelected(layer.key)} aria-pressed={selected === layer.key}><span>{['01', '02', '03'][i]}</span><strong>{layer.name}</strong><small>{layer.role}</small></button>)}</div><div className="arch-caption">Select a layer to explore its responsibility</div></div></div><div className="stack-note"><span>NOTE</span><p>SQL/MySQL is a relational database option and is shown separately below; it is not one of the four technologies in the MERN acronym.</p></div></div></section>;
}


function Projects() {
  const [ref, visible] = useReveal();
  const [selected, setSelected] = useState(null);

  return (
    <section className="section section-anchor">
      <div className="wrap" ref={ref}>
        <SectionHeader
          title="Selected projects"
          copy="A selection of practical work and learning projects."
        />

        <div className="projects-grid">
          {PROJECTS.map((project, i) => (
            <article
              className={`project-card ${visible ? 'show' : ''}`}
              key={project.name}
              style={{
                '--project-color': project.color,
                '--delay': `${i * 60}ms`,
              }}
            >
              <button
                type="button"
                className="project-open"
                onClick={() => setSelected(project)}
                aria-label={`View details for ${project.name}`}
              >
                <div className="project-visual">
                  {project.image ? (
                    <img
                      className="project-image"
                      src={project.image}
                      alt={`${project.name} website screenshot`}
                      loading="lazy"
                    />
                  ) : (
                    <span style={{ color: project.color }}>
                      {project.mark}
                    </span>
                  )}
                </div>

                <div className="project-body">
                  <span className="project-kind">{project.kind}</span>
                  <h3>{project.name}</h3>
                  <p>{project.summary}</p>

                  <div className="project-tags">
                    {project.stack.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                </div>
              </button>

              <div className="project-links">
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    GitHub ↗
                  </a>
                )}

                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Live demo ↗
                  </a>
                )}

                <button
                  type="button"
                  onClick={() => setSelected(project)}
                >
                  View Details ↗
                </button>
              </div>
            </article>
          ))}
        </div>

        {selected && (
          <ProjectDialog
            project={selected}
            onClose={() => setSelected(null)}
          />
        )}
      </div>
    </section>
  );
}

function ProjectDialog({ project, onClose }) {
  const closeRef = useRef(null);

  useEffect(() => {
    closeRef.current?.focus();

    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', onKey);

    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div
      className="modal-backdrop"
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <section
        className="detail-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-dialog-title"
      >
        <button
          ref={closeRef}
          type="button"
          className="modal-close"
          onClick={onClose}
          aria-label="Close project details"
        >
          ×
        </button>

        {project.image && (
          <img
            className="project-detail-image"
            src={project.image}
            alt={`${project.name} project screenshot`}
          />
        )}

        <span className="eyebrow">PROJECT DETAILS</span>

        <h2 id="project-dialog-title">{project.name}</h2>

        <p>{project.summary}</p>

        <h3>Main Technology Stack</h3>
        <div className="project-tags">
          {project.stack.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>

        <h3>Project Overview</h3>
        <p>{project.details}</p>

        {project.challenges?.length > 0 && (
          <>
            <h3>Challenges Faced</h3>
            <ul>
              {project.challenges.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </>
        )}

        {project.improvements?.length > 0 && (
          <>
            <h3>Future Improvements</h3>
            <ul>
              {project.improvements.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </>
        )}

        <div className="project-modal-links">
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer"
            >
              Open GitHub Repository ↗
            </a>
          )}

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
            >
              Open Live Demo ↗
            </a>
          )}
        </div>
      </section>
    </div>
  );
}

function ReactLab() {
  const [active, setActive] = useState('components');
  const concept = REACT_CONCEPTS.find(x => x.id === active) || REACT_CONCEPTS[0];
  return <section className="section section-anchor"><div className="wrap"><SectionHeader eyebrow="07 — REACT LAB" title="What I use in React—and why." copy="A portfolio should explain the implementation, not just list framework names. Select a concept to read the purpose and a representative example." /><div className="react-lab"><div className="concept-tabs" role="tablist" aria-label="React concepts">{REACT_CONCEPTS.map(c => <button key={c.id} role="tab" aria-selected={active === c.id} className={active === c.id ? 'active' : ''} onClick={() => setActive(c.id)}>{c.title}</button>)}</div><article className="concept-detail" role="tabpanel"><div className="concept-heading"><span>REACT CONCEPT</span><h3>{concept.title}</h3></div><div className="concept-explain"><div><h4>What it is</h4><p>{concept.what}</p></div><div><h4>Why it matters</h4><p>{concept.why}</p></div><div><h4>Where it fits</h4><p>{concept.used}</p></div></div><pre className="code-sample"><code>{concept.code}</code><button onClick={() => navigator.clipboard?.writeText(concept.code)} aria-label={`Copy ${concept.title} code example`}>Copy example</button></pre></article></div></div></section>;
}

function DatabaseSection() {
  const [tab, setTab] = useState('select');
  const examples = {
    select: { label: 'SELECT + WHERE', code: 'SELECT name, email\nFROM users\nWHERE is_active = 1\nORDER BY name ASC;', note: 'Read selected columns, filter the rows and sort the result.' },
    join: { label: 'JOIN', code: 'SELECT users.name, orders.total\nFROM users\nJOIN orders ON orders.user_id = users.id;', note: 'Combine related records through a key relationship.' },
    insert: { label: 'INSERT', code: 'INSERT INTO users (name, email)\nVALUES (\'Nazifa\', \'nazifa@example.com\');', note: 'Insert a row into a table. Use parameterized queries in real applications.' },
  };
  const current = examples[tab];
  return <section id="database" className="section section-soft section-anchor"><div className="wrap"><SectionHeader eyebrow="08 — DATABASE THINKING" title="SQL belongs in the full-stack picture." copy="Alongside MongoDB, I’m strengthening relational database understanding: tables, keys, relationships and queries." /><div className="database-grid"><div className="database-copy"><div className="db-pill">RELATIONAL DATABASE · MYSQL</div><h3>Model the data.<br /><span>Query it clearly.</span></h3><p>SQL is used to read and change structured data. Understanding relationships and query behavior helps build more reliable backend features.</p><ul><li>Tables, rows and columns</li><li>Primary keys and foreign keys</li><li>WHERE, ORDER BY and GROUP BY</li><li>INNER JOIN and relationships</li><li>INSERT, UPDATE and DELETE</li></ul></div><div className="sql-console"><div className="console-top"><span /><span /><span /><b>example.sql</b></div><div className="sql-tabs">{Object.entries(examples).map(([key, item]) => <button key={key} className={tab === key ? 'active' : ''} onClick={() => setTab(key)}>{item.label}</button>)}</div><pre><code>{current.code}</code></pre><p>{current.note}</p><small>Illustrative sample · Use real schema and safe parameterized queries in applications.</small></div></div></div></section>;
}

function BuildNotes() {
  const items = [
    ['Component architecture', 'UI is split into focused React components so sections and repeated cards can be updated independently.'],
    ['State & interaction', 'useState is suitable for menu, filters and selected detail views; derived lists should follow the selected filter.'],
    ['Effects & browser APIs', 'useEffect handles listeners and timers with cleanup; IntersectionObserver supports scroll-triggered reveal without polling.'],
    ['Data-driven UI', 'Arrays plus map() keep repeated project, skill and navigation elements consistent. Stable keys help React track list items.'],
    ['CSS system', 'CSS variables, responsive grids, fluid typography, focus states and reduced-motion rules keep the visual language consistent.'],
    ['Performance & accessibility', 'Lazy-load below-the-fold imagery, avoid a global mousemove-driven custom cursor, use semantic controls and keep keyboard interactions available.'],
  ];
  return <section className="section"><div className="wrap"><SectionHeader eyebrow="09 — UNDER THE HOOD" title="How this portfolio is put together." copy="A quick tour of the React structure, interaction patterns and design decisions behind this site." /><div className="build-notes"><div className="file-tree"><span className="tree-root">nazifa-portfolio/</span><span>├─ index.html <small>SEO metadata</small></span><span>├─ src/</span><span>│  ├─ main.jsx <small>React entry</small></span><span>│  ├─ App.jsx <small>components & data</small></span><span>│  └─ index.css <small>design system</small></span><span>└─ public/ <small>static assets / CV</small></span></div><div className="build-notes-list">{items.map(([title, text], i) => <article key={title}><span>{String(i + 1).padStart(2, '0')}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></div></div></section>;
}

function Certificates() {
  const [items, setItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem('nazifa-portfolio-credentials') || '[]'); }
    catch { return []; }
  });
  const [formOpen, setFormOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [notice, setNotice] = useState('');
  const [form, setForm] = useState({ title: '', issuer: '', year: '', type: 'Certificate', description: '', image: '' });
  const closeRef = useRef(null);

  useEffect(() => {
    try { localStorage.setItem('nazifa-portfolio-credentials', JSON.stringify(items)); }
    catch { setNotice('Storage is full. Try a smaller certificate image (under 1 MB).'); }
  }, [items]);

  useEffect(() => {
    if (!selected) return undefined;
    closeRef.current?.focus();
    const onKey = event => { if (event.key === 'Escape') setSelected(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selected]);

  const update = (key, value) => setForm(current => ({ ...current, [key]: value }));
  const onImage = event => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) { setNotice('Please select an image file.'); return; }
    if (file.size > 1024 * 1024) { setNotice('Please choose an image under 1 MB so it can be saved in this browser.'); return; }
    const reader = new FileReader();
    reader.onload = () => { update('image', String(reader.result)); setNotice(''); };
    reader.onerror = () => setNotice('Could not read that image. Please try another file.');
    reader.readAsDataURL(file);
  };
  const addItem = event => {
    event.preventDefault();
    if (!form.title.trim() || !form.description.trim()) { setNotice('Please add a title and description.'); return; }
    const next = { ...form, title: form.title.trim(), issuer: form.issuer.trim(), year: form.year.trim(), description: form.description.trim(), id: `${Date.now()}-${Math.random().toString(16).slice(2)}` };
    const updated = [next, ...items];
    try {
      localStorage.setItem('nazifa-portfolio-credentials', JSON.stringify(updated));
      setItems(updated);
      setForm({ title: '', issuer: '', year: '', type: 'Certificate', description: '', image: '' });
      setFormOpen(false);
      setNotice('Added successfully. This item is saved in this browser.');
    } catch {
      setNotice('Could not save this item. Use a smaller image (under 1 MB) or remove an older item.');
    }
  };
  const removeItem = id => {
    const updated = items.filter(item => item.id !== id);
    setItems(updated);
    setSelected(null);
    setNotice('Item removed.');
  };

return false && (
  <section id="certificates" className="section section-soft section-anchor"><div className="wrap">    <SectionHeader title="Certificates, education & training" copy="." />
    <div className="certificate-toolbar"><p>Images Of Certifications</p><button className="btn btn-primary" onClick={() => { setFormOpen(value => !value); setNotice(''); }}>{formOpen ? 'Cancel' : '+ Add a record'}</button></div>
    {notice && <p className="credential-notice" role="status">{notice}</p>}
    {formOpen && <form className="credential-form" onSubmit={addItem}>
      <label>Record type<select value={form.type} onChange={e => update('type', e.target.value)}><option>Certificate</option><option>Education</option><option>Training</option></select></label>
      <label>Title *<input value={form.title} onChange={e => update('title', e.target.value)} placeholder="e.g. React Development Course" required /></label>
      <label>Issuer / institution<input value={form.issuer} onChange={e => update('issuer', e.target.value)} placeholder="e.g. Programming Hero" /></label>
      <label>Year / period<input value={form.year} onChange={e => update('year', e.target.value)} placeholder="e.g. 2026" /></label>
      <label className="credential-wide">Description *<textarea value={form.description} onChange={e => update('description', e.target.value)} placeholder="What did you complete or learn?" rows="3" required /></label>
      <label className="credential-wide">Image (optional, max 1 MB)<input type="file" accept="image/*" onChange={onImage} /><small>Choose a JPG, PNG or WebP image. The image is stored locally in this browser.</small></label>
      {form.image && <div className="credential-upload-preview"><img src={form.image} alt="Selected record preview" /><button type="button" className="btn btn-ghost" onClick={() => update('image', '')}>Remove image</button></div>}
      <div className="credential-wide"><button className="btn btn-primary" type="submit">Save record</button></div>
    </form>}
    {items.length ? <div className="certificate-grid">{items.map(item => <article className="certificate-card-wrap" key={item.id}>
      <button className="certificate-card" onClick={() => setSelected(item)} aria-label={`View ${item.title}`}>
        {item.image ? <img src={item.image} alt={`${item.title} preview`} loading="lazy" /> : <div className="certificate-placeholder"><span>{item.type === 'Education' ? 'EDU' : item.type === 'Training' ? 'TRN' : 'CERT'}</span></div>}
        <strong>{item.title}</strong><span>{[item.type, item.issuer, item.year].filter(Boolean).join(' · ')}</span><p>{item.description}</p>
      </button>
      <button className="credential-remove" onClick={() => removeItem(item.id)} aria-label={`Remove ${item.title}`}>Remove</button>
    </article>)}</div> : <div className="empty-credentials"><span>＋</span><div><h3>Your records will appear here</h3><p>Click “Add a record” to add certificates, education or training. Add an image and description whenever you want. Records are stored in this browser, not automatically synced to another device.</p></div></div>}
</div>{selected && <div className="modal-backdrop" role="presentation" onMouseDown={event => { if (event.target === event.currentTarget) setSelected(null); }}><section className="certificate-modal" role="dialog" aria-modal="true" aria-label={`${selected.title} record`}><button ref={closeRef} className="modal-close" onClick={() => setSelected(null)} aria-label="Close record preview">×</button>{selected.image && <img src={selected.image} alt={`${selected.title} certificate`} />}<span className="eyebrow">{selected.type}</span><h3>{selected.title}</h3><p>{[selected.issuer, selected.year].filter(Boolean).join(' · ')}</p><p>{selected.description}</p></section></div>}</section>
);}

function Contact() {
  const [ref, visible] = useReveal();
  return <section id="contact" className="section contact-section section-anchor"><div className="wrap" ref={ref}><div className={`contact-card reveal ${visible ? 'visible' : ''}`}><span className="eyebrow">10 — CONTACT</span><h2>Let’s build something<br /><span>worth learning from.</span></h2><p>I’m interested in opportunities where I can contribute with my current skills, learn from a team and grow through real-world development.</p><div className="contact-actions"><a className="btn btn-primary" href="mailto:nazifanowsin2021@gmail.com">Start a conversation ↗</a><a className="btn btn-ghost" href="https://github.com/nazifa-buildscodes" target="_blank" rel="noreferrer">GitHub ↗</a><a className="btn btn-ghost" href="https://www.linkedin.com/in/nazifa-nowsin-7b7459243/" target="_blank" rel="noreferrer">LinkedIn ↗</a></div><a className="contact-email" href="mailto:nazifanowsin2021@gmail.com">nazifanowsin2021@gmail.com</a></div></div></section>;
}

function Footer({ onNav }) {
  return <footer><div className="footer-inner"><a className="footer-brand" href="#home">NN<span>.</span></a><div className="footer-links">{NAV.map(([label, id]) => <button key={id} onClick={() => onNav(id)}>{label}</button>)}</div><p>Designed & built by Nazifa Nowsin · {new Date().getFullYear()}</p></div></footer>;
}

export default function App() {
  const [active, setActive] = useState('home');
  const [theme, setTheme] = useState(() => { try { return localStorage.getItem('nazifa-portfolio-theme') || 'dark'; } catch { return 'dark'; } });
  const [showTop, setShowTop] = useState(false);
  useEffect(() => { document.documentElement.dataset.theme = theme; try { localStorage.setItem('nazifa-portfolio-theme', theme); } catch {} }, [theme]);
  const scrollTo = useCallback((id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
    setActive(id);
  }, []);
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
    const sections = NAV.map(([, id]) => document.getElementById(id)).filter(Boolean);
    if (!('IntersectionObserver' in window)) return () => window.removeEventListener('scroll', onScroll);
    const observer = new IntersectionObserver(entries => {
      const current = entries.filter(e => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (current) setActive(current.target.id);
    }, { rootMargin: '-20% 0px -65% 0px', threshold: [0, .15, .35] });
    sections.forEach(s => observer.observe(s));
    return () => { window.removeEventListener('scroll', onScroll); observer.disconnect(); };
  }, []);
  return <><a className="skip-link" href="#main">Skip to content</a><ScrollProgress /><AmbientBackground /><Navbar active={active} onNav={scrollTo} theme={theme} onToggleTheme={() => setTheme(v => v === "dark" ? "light" : "dark")} /><main id="main">
    <div id="home-group"><Hero onNav={scrollTo} /></div>
    <div id="about" className="section-group section-anchor"><About /><Mindset /></div><Journey />
    <div id="skills" className="section-group section-anchor"><Skills /></div>
    <div id="projects" className="section-group section-anchor"><Projects /></div>
    
    <div id="contact-group" className="section-group section-anchor"><Contact /></div>
  </main><Footer onNav={scrollTo} /><button className={`to-top ${showTop ? 'show' : ''}`} onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })} aria-label="Scroll to top">↑</button></>;
}
