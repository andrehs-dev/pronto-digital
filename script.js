// NAVBAR ATIVO NO SCROLL
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

function updateActiveNav() {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 100) current = s.id;
  });
  navLinks.forEach(a => {
    a.classList.remove('active');
    if (a.getAttribute('href') === '#' + current) a.classList.add('active');
  });
}

// REVEAL ON SCROLL
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

reveals.forEach(r => observer.observe(r));

window.addEventListener('scroll', updateActiveNav);
updateActiveNav();

// FAQ
function toggleFaq(btn) {
  const item = btn.parentElement;
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
  if (!isOpen) item.classList.add('open');
}

// MENU MOBILE
function toggleMenu() {
  document.getElementById('nav-mobile').classList.toggle('open');
}

function closeMenu() {
  document.getElementById('nav-mobile').classList.remove('open');
}

// FECHAR MENU AO CLICAR FORA
document.addEventListener('click', function(e) {
  const mobile = document.getElementById('nav-mobile');
  const hamburger = document.getElementById('hamburger');
  if (mobile.classList.contains('open') && !mobile.contains(e.target) && !hamburger.contains(e.target)) {
    mobile.classList.remove('open');
  }
});

// MENU FORMULÁRIO
(function() {
  var shown = false;
  var COOKIE = 'ae_popup_filled'; // só salvo após envio do formulário

  function getCookie(n) {
    var m = document.cookie.match('(^|;)\\s*' + n + '\\s*=\\s*([^;]+)');
    return m ? m.pop() : '';
  }

  function setCookie(n) {
    // Expira em 1 ano — quem preencheu não vê mais
    document.cookie = n + '=1; path=/; max-age=31536000';
  }

  function showPopup() {
    if (shown || getCookie(COOKIE)) return; // bloqueia só quem já preencheu
    shown = true;
    document.getElementById('ae-overlay').style.display = 'flex';
  }

  window.aeClose = function() {
    document.getElementById('ae-overlay').style.display = 'none';
  };

  window.aeFound = function(val) {
    document.getElementById('ae-opt-sim').classList.toggle('ae-active', val === 'sim');
    document.getElementById('ae-opt-nao').classList.toggle('ae-active', val === 'nao');
    document.getElementById('ae-blk-sim').classList.toggle('ae-on', val === 'sim');
    document.getElementById('ae-blk-nao').classList.toggle('ae-on', val === 'nao');
  };

  window.aeMeeting = function(val) {
    document.getElementById('ae-meet-sim').classList.toggle('ae-active', val === 'sim');
    document.getElementById('ae-meet-nao').classList.toggle('ae-active', val === 'nao');
    document.getElementById('ae-meet-fields').style.display = val === 'sim' ? 'block' : 'none';
  };

  window.aeExp = function(val) {
    document.getElementById('ae-exp-s').classList.toggle('ae-active', val === 's');
    document.getElementById('ae-exp-n').classList.toggle('ae-active', val === 'n');
  };

  window.aeSubmit = function() {
  var nome = document.getElementById('ae-nome').value.trim();
  var contato = document.getElementById('ae-contato').value.trim();
  if (!nome || !contato) {
    alert('Por favor, preencha seu nome e contato.');
    return;
  }

  // Coleta todos os dados do formulário
  var dados = new FormData();
  dados.append('Nome', nome);
  dados.append('Contato', contato);
  dados.append('Encontrou o que procurava', document.querySelector('input[name="ae_found"]:checked') ? document.querySelector('input[name="ae_found"]:checked').value : 'Não respondeu');
  dados.append('Quer reunião', document.querySelector('input[name="ae_meeting"]:checked') ? document.querySelector('input[name="ae_meeting"]:checked').value : 'Não respondeu');
  dados.append('Ramo de negócio', document.querySelectorAll('.ae-row select')[0].value);
  dados.append('Maior dificuldade', document.querySelectorAll('.ae-row select')[1].value);
  dados.append('Orçamento', document.querySelectorAll('.ae-row select')[2].value);
  dados.append('Prazo', document.querySelectorAll('.ae-row select')[3].value);
  dados.append('Experiência anterior', document.querySelector('input[name="ae_exp"]:checked') ? document.querySelector('input[name="ae_exp"]:checked').value : 'Não respondeu');
  dados.append('Como conheceu', document.querySelectorAll('.ae-row select')[4].value);

  // Envia para o Formspree
  fetch('https://formspree.io/f/xlgoyzpz', { // <-- troque pelo seu endpoint
    method: 'POST',
    body: dados,
    headers: { 'Accept': 'application/json' }
  }).then(function() {
    setCookie(COOKIE);
    document.getElementById('ae-form').style.display = 'none';
    document.getElementById('ae-success').style.display = 'block';
  }).catch(function() {
    alert('Erro ao enviar. Tente novamente.');
  });
};
    }
    setCookie(COOKIE); // salva cookie SÓ após envio — não aparece mais para este usuário
    document.getElementById('ae-form').style.display = 'none';
    document.getElementById('ae-success').style.display = 'block';
  };

  // Gatilho: mouse sai pelo topo da página (exit intent)
  document.addEventListener('mouseleave', function(e) {
    if (e.clientY <= 0) showPopup();
  });

  // Gatilho mobile: usuário fica 30 segundos sem interagir
  var mobileTimer = setTimeout(function() {
    if (window.innerWidth < 768) showPopup();
  }, 30000);

  // Cancela o timer se o usuário interagir antes
  document.addEventListener('touchstart', function() {
    clearTimeout(mobileTimer);
  }, { once: true });

})();
// FIM FORMULÁRIO
