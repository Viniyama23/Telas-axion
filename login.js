// Scatter decorative dots/marks across the left stage, echoing the reference layout.
(function buildDots(){
  const field = document.getElementById('dots');
  if(!field) return;
  const marks = ['dot','dot','dot','dot','plus','dot','dot','square'];
  const COUNT = 46;
  let html = '';
  for(let i=0;i<COUNT;i++){
    const kind = marks[Math.floor(Math.random()*marks.length)];
    const top = Math.random()*100;
    const left = Math.random()*38; // keep clustered on the left/lower portion
    const size = kind === 'dot' ? (Math.random()*2.4+1.4) : (Math.random()*7+7);
    const op = (Math.random()*0.45+0.15).toFixed(2);
    if(kind === 'plus'){
      html += `<span style="position:absolute;top:${top}%;left:${left}%;font-size:${size}px;color:#8c8d97;opacity:${op};line-height:1;font-family:monospace">+</span>`;
    } else if(kind === 'square'){
      html += `<span style="position:absolute;top:${top}%;left:${left}%;width:${size*0.5}px;height:${size*0.5}px;border:1px solid #8c8d97;opacity:${op}"></span>`;
    } else {
      html += `<span style="position:absolute;top:${top}%;left:${left}%;width:${size}px;height:${size}px;border-radius:50%;background:#c9c9cf;opacity:${op}"></span>`;
    }
  }
  field.innerHTML = html;
})();

// Show/hide password
const eyeToggle = document.getElementById('eyeToggle');
const senha = document.getElementById('senha');
if(eyeToggle && senha){
  eyeToggle.addEventListener('click', () => {
    const isHidden = senha.type === 'password';
    senha.type = isHidden ? 'text' : 'password';
    eyeToggle.setAttribute('aria-pressed', String(isHidden));
    eyeToggle.setAttribute('aria-label', isHidden ? 'Ocultar senha' : 'Mostrar senha');
  });
}

// Submit: validate, then send the user to the app's home screen.
// Swap the setTimeout block below for a real authentication call when one exists;
// on success, keep the redirect to DASHBOARD_URL (and on failure, show an error instead).
const DASHBOARD_URL = 'index.html';

const form = document.getElementById('loginForm');
const btn = document.getElementById('btnEnter');
if(form && btn){
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if(!form.checkValidity()){
      form.reportValidity();
      return;
    }
    btn.disabled = true;
    btn.textContent = 'Entrando...';
    // Placeholder: replace with the real authentication call.
    setTimeout(() => {
      window.location.href = DASHBOARD_URL;
    }, 700);
  });
}