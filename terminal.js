/**
 * Interactive Hacker-Style CLI Terminal Engine
 */

class TerminalEngine {
  constructor() {
    this.container = document.getElementById('terminal-body');
    this.input = document.getElementById('terminal-input');
    this.form = document.getElementById('terminal-form');
    this.history = [];
    this.historyIndex = -1;

    if (!this.container || !this.input || !this.form) return;

    this.init();
  }

  init() {
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      const command = this.input.value.trim();
      if (command) {
        this.executeCommand(command);
        this.history.push(command);
        this.historyIndex = this.history.length;
        this.input.value = '';
      }
    });

    this.input.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowUp') {
        if (this.historyIndex > 0) {
          this.historyIndex--;
          this.input.value = this.history[this.historyIndex];
        }
      } else if (e.key === 'ArrowDown') {
        if (this.historyIndex < this.history.length - 1) {
          this.historyIndex++;
          this.input.value = this.history[this.historyIndex];
        } else {
          this.historyIndex = this.history.length;
          this.input.value = '';
        }
      }
    });

    // Auto-scroll to bottom of terminal
    const observer = new MutationObserver(() => {
      this.container.scrollTop = this.container.scrollHeight;
    });
    observer.observe(this.container, { childList: true, subtree: true });

    // Print welcome banner
    this.printLine('<span class="term-system">[SYSTEM READY] Type <span class="term-highlight">help</span> to view available terminal commands.</span>');
  }

  printLine(htmlContent) {
    const line = document.createElement('div');
    line.className = 'terminal-line';
    line.innerHTML = htmlContent;
    this.container.insertBefore(line, this.form);
  }

  executeCommand(cmdRaw) {
    const args = cmdRaw.trim().split(/\s+/);
    const cmd = args[0].toLowerCase();
    const param = args[1] ? args[1].toLowerCase() : '';

    // Log user input line
    this.printLine(`<span class="term-prompt">pranav@vjti-mumbai:~$</span> <span class="term-cmd">${this.escapeHtml(cmdRaw)}</span>`);

    switch (cmd) {
      case 'help':
        this.printLine(`
<div class="term-output">
  <p><span class="term-highlight">AVAILABLE COMMANDS:</span></p>
  <table class="term-table">
    <tr><td><span class="term-cmd">about</span></td><td>Display bio and VJTI education info</td></tr>
    <tr><td><span class="term-cmd">skills</span></td><td>List all technical skills and CS fundamentals</td></tr>
    <tr><td><span class="term-cmd">projects</span></td><td>Showcase featured projects (EventSync, AskAway &amp; Churn Dashboard)</td></tr>
    <tr><td><span class="term-cmd">stats</span></td><td>View Competitive Programming stats (LeetCode, Codeforces, CodeChef)</td></tr>
    <tr><td><span class="term-cmd">education</span></td><td>Details about B.Tech IT at VJTI & MHT-CET Rank</td></tr>
    <tr><td><span class="term-cmd">contact</span></td><td>Display email, phone, GitHub, and LinkedIn</td></tr>
    <tr><td><span class="term-cmd">bg &lt;mode&gt;</span></td><td>Change canvas background: <span class="term-highlight">particles</span> | <span class="term-highlight">matrix</span> | <span class="term-grid">grid</span></td></tr>
    <tr><td><span class="term-cmd">sudo hire</span></td><td>Special command to access candidate contact info</td></tr>
    <tr><td><span class="term-cmd">clear</span></td><td>Clear terminal screen output</td></tr>
  </table>
</div>
        `);
        break;

      case 'about':
        this.printLine(`
<div class="term-output">
  <p><span class="term-highlight">PRANAV JADHAV</span> - Final-year IT Student at VJTI Mumbai</p>
  <p>Backend & Full-Stack Developer specializing in Next.js, Node.js, TypeScript, PostgreSQL, and Cloud Architectures.</p>
  <p>🚀 MHT-CET 2023 Rank: &lt;700 out of 3 Lakh+ candidates.</p>
  <p>💡 Solved 600+ algorithmic problems across LeetCode & Codeforces.</p>
</div>
        `);
        this.scrollToSection('about');
        break;

      case 'skills':
        this.printLine(`
<div class="term-output">
  <p><span class="term-highlight">TECHNICAL SKILLS MATRIX:</span></p>
  <p><span class="term-cyan">Languages:</span> C++, JavaScript, TypeScript, Python, HTML/CSS, SQL</p>
  <p><span class="term-cyan">Frontend:</span> React.js, Next.js (App Router), Tailwind CSS</p>
  <p><span class="term-cyan">Backend:</span> Node.js, Express.js, REST APIs, GraphQL, Prisma ORM</p>
  <p><span class="term-cyan">Databases:</span> PostgreSQL, NeonDB, MongoDB, Redis, DuckDB</p>
  <p><span class="term-cyan">Data &amp; ML:</span> Scikit-learn, Pandas, NumPy, Plotly, Streamlit, Feature Engineering</p>
  <p><span class="term-cyan">Tools &amp; Cloud:</span> Git, GitHub, Docker, Vercel, Postman, CI/CD (GitHub Actions), AWS, Appwrite, Clerk</p>
</div>
        `);
        this.scrollToSection('skills');
        break;

      case 'projects':
        this.printLine(`
<div class="term-output">
  <p><span class="term-highlight">FEATURED PROJECTS:</span></p>
  <p>1. <span class="term-cyan">EventSync</span> - Multi-Tenant Event Management SaaS (Next.js, TS, Clerk, Prisma, Upstash Redis)</p>
  <p>2. <span class="term-cyan">AskAway</span> - Developer QnA Platform (Next.js SSR, Appwrite Webhooks, Tailwind CSS)</p>
  <p>3. <span class="term-cyan">Customer Churn &amp; Retention Dashboard</span> - Telecom Analytics &amp; ML Dashboard (Python, Streamlit, DuckDB, Scikit-learn | ROC-AUC: 0.841)</p>
  <p><a href="https://github.com/DevPranavJad700/customer-churn-retention-dashboard" target="_blank" class="term-link">→ github.com/DevPranavJad700/customer-churn-retention-dashboard</a></p>
</div>
        `);
        this.scrollToSection('projects');
        break;

      case 'stats':
        this.printLine(`
<div class="term-output">
  <p><span class="term-highlight">COMPETITIVE PROGRAMMING STATS:</span></p>
  <p>🔥 <span class="term-cyan">LeetCode:</span> 400+ Problems Solved | Contest Rating: 1768 (Top 10%)</p>
  <p>⚡ <span class="term-cyan">Codeforces:</span> 200+ Problems Solved</p>
  <p>⭐ <span class="term-cyan">CodeChef:</span> 3-Star Coder | Max Rating: 1697</p>
</div>
        `);
        this.scrollToSection('stats');
        break;

      case 'education':
        this.printLine(`
<div class="term-output">
  <p><span class="term-highlight">EDUCATION DETAILS:</span></p>
  <p>🏛️ <span class="term-cyan">Veermata Jijabai Technological Institute (VJTI Mumbai)</span></p>
  <p>Bachelor of Technology in Information Technology (Aug 2023 - May 2027)</p>
  <p>CGPA: 7.57 / 10 | State Rank: &lt;700 in MHT-CET 2023 (Top 0.2%)</p>
</div>
        `);
        this.scrollToSection('education');
        break;

      case 'contact':
      case 'sudo':
        if (cmd === 'sudo' && param !== 'hire') {
          this.printLine(`<p class="term-error">Permission denied: try 'sudo hire'</p>`);
          break;
        }
        this.printLine(`
<div class="term-output">
  <p><span class="term-highlight">CONTACT DIRECTORY:</span></p>
  <p>📧 Email: <a href="mailto:pranavjadhav532@gmail.com" class="term-link">pranavjadhav532@gmail.com</a></p>
  <p>💻 GitHub: <a href="https://github.com/DevPranavJad700" target="_blank" class="term-link">DevPranavJad700</a></p>
  <p>🔗 LinkedIn: <a href="https://www.linkedin.com/in/pranav-jadhav-4853441b3/" target="_blank" class="term-link">pranav-jadhav-4853441b3</a></p>
</div>
        `);
        this.scrollToSection('contact');
        break;

      case 'bg':
        if (['particles', 'matrix', 'grid'].includes(param)) {
          if (window.bgEngine) {
            window.bgEngine.setMode(param);
            this.printLine(`<p class="term-success">Canvas background switched to: <span class="term-highlight">${param}</span></p>`);
            // Sync UI background selector buttons
            document.querySelectorAll('.bg-btn').forEach(btn => {
              btn.classList.toggle('active', btn.dataset.mode === param);
            });
          }
        } else {
          this.printLine(`<p class="term-error">Usage: bg &lt;particles | matrix | grid&gt;</p>`);
        }
        break;

      case 'clear':
        // Keep input form, remove earlier lines
        const lines = this.container.querySelectorAll('.terminal-line');
        lines.forEach(line => line.remove());
        break;

      default:
        this.printLine(`<p class="term-error">Command not found: '${this.escapeHtml(cmdRaw)}'. Type <span class="term-highlight">help</span> for commands.</p>`);
        break;
    }
  }

  scrollToSection(id) {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  escapeHtml(str) {
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
}

window.addEventListener('DOMContentLoaded', () => {
  window.terminalEngine = new TerminalEngine();
});
