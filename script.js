const grid = document.getElementById('grid');
const out = document.getElementById('out');
const sendBtn = document.getElementById('sendBtn');

// bottone disabilitato all'inizio
sendBtn.disabled = true;

// crea 36 checkbox: TEST1..TEST36
for (let i = 1; i <= 36; i++) {
  const label = document.createElement('label');
  label.className = 'cell';

  const cb = document.createElement('input');
  cb.type = 'checkbox';
  cb.value = `TEST${i}`;
  cb.id = `test_${i}`;

  const text = document.createElement('span');
  text.textContent = `TEST${i}`;

  // ascolta i cambi su ogni checkbox
  cb.addEventListener('change', updateButtonState);

  label.appendChild(cb);
  label.appendChild(text);
  grid.appendChild(label);
}

// abilita INVIA solo se le selezionate sono ESATTAMENTE 5
function updateButtonState() {
  const checkedCount =
    document.querySelectorAll('input[type="checkbox"]:checked').length;

  sendBtn.disabled = checkedCount !== 5;
}

// click INVIA
sendBtn.addEventListener('click', () => {
  const checked = [...document.querySelectorAll('input[type="checkbox"]:checked')]
    .map(x => x.value);

  out.textContent = `Hai selezionato: ${checked.join(', ')}`;
});
