const titles={dashboard:'Dashboard',clientes:'Clientes',processos:'Processos',agenda:'Agenda & Prazos',financeiro:'Financeiro'};
const buttons=[...document.querySelectorAll('.nav button')], screens=[...document.querySelectorAll('.screen')];
function go(screen){
  screens.forEach(s=>s.classList.toggle('active',s.id===screen));
  buttons.forEach(b=>b.classList.toggle('active',b.dataset.screen===screen));
  document.getElementById('pageTitle').textContent=titles[screen];
  window.scrollTo({top:0,behavior:'smooth'});
}
buttons.forEach(b=>b.addEventListener('click',()=>go(b.dataset.screen)));
document.querySelectorAll('[data-screen-go]').forEach(b=>b.addEventListener('click',()=>go(b.dataset.screenGo)));
const toast=document.getElementById('toast');
function showToast(msg){toast.textContent=msg;toast.classList.add('show');clearTimeout(window.__toast);window.__toast=setTimeout(()=>toast.classList.remove('show'),2200)}
document.querySelectorAll('[data-toast]').forEach(b=>b.addEventListener('click',()=>showToast(b.dataset.toast)));

document.getElementById('clientSearch').addEventListener('input',e=>{
 const q=e.target.value.toLowerCase();
 document.querySelectorAll('#clientRows tr').forEach(r=>r.style.display=r.innerText.toLowerCase().includes(q)?'':'none');
});

document.querySelectorAll('.tabs button').forEach(btn=>btn.addEventListener('click',()=>{
 document.querySelectorAll('.tabs button').forEach(x=>x.classList.remove('active'));btn.classList.add('active');
 const name=btn.dataset.tab;
 const map={resumo:'Resumo do processo carregado.',andamentos:'Histórico de andamentos e movimentações.',prazos:'Prazos cadastrados e responsáveis.',audiencias:'Audiências futuras e realizadas.',documentos:'23 documentos vinculados ao processo.',tarefas:'Tarefas abertas e concluídas.',financeiro:'Lançamentos financeiros deste processo.'};
 document.getElementById('processTab').innerHTML='<div class="empty"><strong>'+map[name]+'</strong><br><span>Esta aba está pronta para integração com uma API/backend.</span></div>';
}));

const grid=document.getElementById('calendarGrid');
['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'].forEach(d=>{grid.innerHTML+=`<div class="day" style="min-height:32px;background:#f8fafc"><span class="muted" style="font-size:9px;font-weight:800">${d}</span></div>`});
const first=new Date(2026,7,1).getDay(), days=31;
for(let i=0;i<first;i++) grid.innerHTML+='<div class="day"></div>';
for(let d=1;d<=days;d++){
 let cls=d===18?'day today':'day', chips='';
 if(d===18) chips='<div class="event-chip">09:00 Audiência</div><div class="event-chip green">11:30 Reunião</div>';
 if(d===20) chips='<div class="event-chip red">Prazo — Contestação</div>';
 if(d===21) chips='<div class="event-chip red">10:00 Audiência</div>';
 if(d===24) chips='<div class="event-chip green">15:30 Reunião</div>';
 if(d===26) chips='<div class="event-chip">Prazo — Réplica</div>';
 grid.innerHTML+=`<div class="${cls}"><div class="num">${d}</div>${chips}</div>`;
}
document.getElementById('globalSearch').addEventListener('keydown',e=>{if(e.key==='Enter'&&e.target.value.trim())showToast('Pesquisa: '+e.target.value.trim())});
