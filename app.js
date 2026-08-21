/**
 * Main Application Logic & Interactivity
 */

document.addEventListener('DOMContentLoaded', () => {
  initSkillsFilter();
  initBackgroundControls();
  initThemeToggle();
  initDiagnostics();
  initSmoothScroll();
  initCounterAnimations();
});

// --- Skills Filtering ---
const skillsData = {
  languages: [
    { name: 'C++', icon: 'fa-solid fa-code' },
    { name: 'TypeScript', icon: 'fa-brands fa-js' },
    { name: 'JavaScript', icon: 'fa-brands fa-square-js' },
    { name: 'Python', icon: 'fa-brands fa-python' },
    { name: 'SQL', icon: 'fa-solid fa-database' },
    { name: 'HTML/CSS', icon: 'fa-brands fa-html5' }
  ],
  frontend: [
    { name: 'React.js', icon: 'fa-brands fa-react' },
    { name: 'Next.js (App Router)', icon: 'fa-solid fa-server' },
    { name: 'Tailwind CSS', icon: 'fa-solid fa-wind' }
  ],
  backend: [
    { name: 'Node.js', icon: 'fa-brands fa-node-js' },
    { name: 'Express.js', icon: 'fa-solid fa-network-wired' },
    { name: 'REST APIs', icon: 'fa-solid fa-cloud-arrow-up' },
    { name: 'GraphQL', icon: 'fa-solid fa-diagram-project' },
    { name: 'Prisma ORM', icon: 'fa-solid fa-layer-group' }
  ],
  databases: [
    { name: 'PostgreSQL', icon: 'fa-solid fa-database' },
    { name: 'NeonDB', icon: 'fa-solid fa-bolt' },
    { name: 'MongoDB', icon: 'fa-solid fa-leaf' },
    { name: 'Redis', icon: 'fa-solid fa-memory' }
  ],
  tools: [
    { name: 'Docker', icon: 'fa-brands fa-docker' },
    { name: 'Git & GitHub', icon: 'fa-brands fa-github' },
    { name: 'CI/CD (GitHub Actions)', icon: 'fa-solid fa-gears' },
    { name: 'AWS', icon: 'fa-brands fa-aws' },
    { name: 'Vercel', icon: 'fa-solid fa-globe' },
    { name: 'Postman', icon: 'fa-solid fa-paper-plane' },
    { name: 'Appwrite', icon: 'fa-solid fa-fire' },
    { name: 'Clerk Auth', icon: 'fa-solid fa-key' },
    { name: 'Streamlit', icon: 'fa-solid fa-chart-bar' },
    { name: 'DuckDB', icon: 'fa-solid fa-database' },
    { name: 'Plotly', icon: 'fa-solid fa-chart-line' }
  ],
  data: [
    { name: 'Machine Learning', icon: 'fa-solid fa-brain' },
    { name: 'Scikit-learn', icon: 'fa-solid fa-robot' },
    { name: 'Pandas', icon: 'fa-solid fa-table-cells' },
    { name: 'NumPy', icon: 'fa-solid fa-calculator' },
    { name: 'Data Visualization', icon: 'fa-solid fa-chart-pie' },
    { name: 'DuckDB', icon: 'fa-solid fa-database' },
    { name: 'Feature Engineering', icon: 'fa-solid fa-sliders' },
    { name: 'EDA (Exploratory Data Analysis)', icon: 'fa-solid fa-magnifying-glass-chart' }
  ],
  cs: [
    { name: 'Data Structures & Algorithms', icon: 'fa-solid fa-microchip' },
    { name: 'Object-Oriented Programming', icon: 'fa-solid fa-cubes' },
    { name: 'Operating Systems', icon: 'fa-solid fa-terminal' },
    { name: 'DBMS', icon: 'fa-solid fa-table-cells' }
  ]
};

function renderSkills(category = 'all') {
  const container = document.getElementById('skills-container');
  if (!container) return;

  container.innerHTML = '';

  let listToRender = [];
  if (category === 'all') {
    Object.values(skillsData).forEach(arr => listToRender.push(...arr));
  } else if (skillsData[category]) {
    listToRender = skillsData[category];
  }

  listToRender.forEach(skill => {
    const chip = document.createElement('div');
    chip.className = 'skill-chip glass-panel';
    chip.innerHTML = `
      <i class="${skill.icon} skill-icon"></i>
      <span>${skill.name}</span>
    `;
    container.appendChild(chip);
  });
}

function initSkillsFilter() {
  renderSkills('all');

  const tabs = document.querySelectorAll('.tab-btn');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const category = tab.dataset.category;
      renderSkills(category);
    });
  });
}

// --- Background Controls ---
function initBackgroundControls() {
  const btns = document.querySelectorAll('.bg-btn');
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const mode = btn.dataset.mode;
      if (window.bgEngine) {
        window.bgEngine.setMode(mode);
      }
    });
  });
}

// --- Theme Toggle ---
function initThemeToggle() {
  const toggleBtn = document.getElementById('theme-toggle');
  if (!toggleBtn) return;

  toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    const isLight = document.body.classList.contains('light-theme');
    toggleBtn.innerHTML = isLight ? '<i class="fa-solid fa-moon"></i>' : '<i class="fa-solid fa-sun"></i>';
  });
}

// --- Live Diagnostics Bar Update ---
function initDiagnostics() {
  const pingEl = document.getElementById('diag-ping');
  if (!pingEl) return;

  setInterval(() => {
    const ping = Math.floor(Math.random() * 8) + 12; // 12-20ms simulation
    pingEl.textContent = `${ping}ms`;
  }, 3000);
}

// --- Smooth Scrolling & Active Link Highlighting ---
function initSmoothScroll() {
  const links = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('section');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    links.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

// --- Number Counter Animation ---
function initCounterAnimations() {
  const counters = document.querySelectorAll('.counter-val');
  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        counters.forEach(counter => {
          const target = parseInt(counter.dataset.target, 10);
          if (isNaN(target)) return;

          let count = 0;
          const step = Math.ceil(target / 40);
          const timer = setInterval(() => {
            count += step;
            if (count >= target) {
              counter.textContent = target + (counter.dataset.suffix || '');
              clearInterval(timer);
            } else {
              counter.textContent = count + (counter.dataset.suffix || '');
            }
          }, 30);
        });
      }
    });
  }, { threshold: 0.3 });

  const cpSection = document.getElementById('stats');
  if (cpSection) observer.observe(cpSection);
}
