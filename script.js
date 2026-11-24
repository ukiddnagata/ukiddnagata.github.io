const root = document.documentElement;
const themeButton = document.querySelector('#theme');
function applyTheme(theme) {
  root.dataset.theme = theme;
  themeButton.textContent = theme === 'dark' ? '☀' : '☾';
  themeButton.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
}
let savedTheme;
try { savedTheme = localStorage.getItem('ukidd-theme'); } catch {}
applyTheme(savedTheme === 'light' ? 'light' : 'dark');
themeButton.addEventListener('click', () => {
  const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  try { localStorage.setItem('ukidd-theme', next); } catch {}
});
document.querySelector('#year').textContent = new Date().getFullYear();
const avatar = document.querySelector('#avatar');
avatar.addEventListener('error', () => { avatar.hidden = true; });
