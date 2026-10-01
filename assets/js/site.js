(function () {
  var root = document.documentElement;

  /* ── Theme toggle ─────────────────────────────
     Same icons/labels as the main site, plus the choice is remembered. */
  var MOON = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>';
  var SUN  = '<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>';

  var toggle = document.getElementById('theme-toggle');
  var icon   = document.getElementById('theme-icon');
  var label  = document.getElementById('toggle-label');

  function syncToggle() {
    var isDark = root.getAttribute('data-theme') === 'dark';
    icon.innerHTML = isDark ? MOON : SUN;
    label.textContent = isDark ? 'light' : 'dark';
  }

  if (toggle) {
    syncToggle();
    toggle.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) {}
      syncToggle();
    });
  }

  /* ── Code blocks: language label + copy button ── */
  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    }
    return new Promise(function (resolve, reject) {
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy') ? resolve() : reject(); }
      catch (e) { reject(e); }
      document.body.removeChild(ta);
    });
  }

  document.querySelectorAll('div.highlighter-rouge').forEach(function (block) {
    var code = block.querySelector('code');
    if (!code) return;

    var match = block.className.match(/language-([\w-]+)/);
    var lang = match && match[1] !== 'plaintext' ? match[1] : 'text';

    var header = document.createElement('div');
    header.className = 'code-header';

    var name = document.createElement('span');
    name.className = 'code-lang';
    name.textContent = lang;

    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'code-copy';
    btn.textContent = 'copy';
    btn.setAttribute('aria-label', 'Copy ' + lang + ' code');

    btn.addEventListener('click', function () {
      copyText(code.textContent).then(function () {
        btn.textContent = 'copied';
      }, function () {
        btn.textContent = 'failed';
      }).then(function () {
        setTimeout(function () { btn.textContent = 'copy'; }, 1600);
      });
    });

    header.appendChild(name);
    header.appendChild(btn);
    block.insertBefore(header, block.firstChild);
  });
})();
