'use strict';

const formatINR = value => {
  const sign = value < 0 ? '−' : '';
  return sign + '₹' + Math.abs(Math.round(value)).toLocaleString('en-IN', { maximumFractionDigits: 0 });
};

// Illustrative example, no user inputs are sent anywhere.
const modelDefaults = { tonnage: 500, disposal: 1200, virgin: 4000, transfer: 1800, logistics: 900, processing: 350 };
const modelIds = Object.keys(modelDefaults);
const modelInputs = modelIds.map(id => document.getElementById(id));
const getNumber = input => {
  if (!input) return 0;
  const raw = Number(input.value);
  return Number.isFinite(raw) ? Math.min(Number(input.max || 10000000), Math.max(0, raw)) : 0;
};
function recalculate() {
  if (!modelInputs[0]) return;
  const [volume, disposal, conventional, transfer, logistics, processing] = modelInputs.map(getNumber);
  const generator = volume * (disposal + transfer - logistics - processing);
  const receiver = volume * (conventional - transfer);
  const combined = generator + receiver;
  document.getElementById('combined-value').textContent = formatINR(combined);
  document.getElementById('generator-value').textContent = formatINR(generator);
  document.getElementById('receiver-value').textContent = formatINR(receiver);
  const status = document.getElementById('value-state');
  status.textContent = combined > 0 ? 'POSITIVE SCENARIO' : combined < 0 ? 'NEGATIVE SCENARIO' : 'BREAK-EVEN SCENARIO';
  status.classList.toggle('negative', combined <= 0);
  const posTotal = Math.max(0, generator) + Math.max(0, receiver);
  const supplierWidth = posTotal ? Math.max(0, generator) / posTotal * 100 : 0;
  document.getElementById('supplier-bar').style.width = supplierWidth + '%';
  document.getElementById('buyer-bar').style.width = (posTotal ? 100 - supplierWidth : 0) + '%';
}
modelInputs.filter(Boolean).forEach(input => input.addEventListener('input', recalculate));
document.getElementById('reset-model')?.addEventListener('click', () => {
  modelIds.forEach(id => { document.getElementById(id).value = modelDefaults[id]; });
  recalculate();
});
recalculate();

const menuToggle = document.querySelector('.mobile-menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
function closeMenu() {
  if (!menuToggle || !mobileMenu) return;
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Open menu');
  mobileMenu.hidden = true;
}
menuToggle?.addEventListener('click', () => {
  const opening = menuToggle.getAttribute('aria-expanded') !== 'true';
  menuToggle.setAttribute('aria-expanded', String(opening));
  menuToggle.setAttribute('aria-label', opening ? 'Close menu' : 'Open menu');
  mobileMenu.hidden = !opening;
});
mobileMenu?.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });

const form = document.getElementById('inquiry-form');
const feedback = document.getElementById('form-feedback');
function buildInquiry() {
  if (!form?.reportValidity()) return null;
  const fields = {
    name: document.getElementById('full-name').value.trim(),
    email: document.getElementById('business-email').value.trim(),
    company: document.getElementById('company').value.trim(),
    interest: document.getElementById('interest').value,
    message: document.getElementById('message').value.trim(),
  };
  if (!Object.values(fields).every(Boolean)) {
    if (feedback) feedback.textContent = 'Please complete all required fields.';
    return null;
  }
  return { subject: 'WasteMatch — ' + fields.interest + ' — ' + fields.company,
    body: `WasteMatch strategic inquiry\n\nName: ${fields.name}\nCompany: ${fields.company}\nWork email: ${fields.email}\nInterest: ${fields.interest}\n\nMessage:\n${fields.message}\n\n— Sent by the sender from their email application.` };
}
form?.addEventListener('submit', e => {
  e.preventDefault();
  const inquiry = buildInquiry();
  if (!inquiry) return;
  const href = `mailto:premangshu.mal@gmail.com?subject=${encodeURIComponent(inquiry.subject)}&body=${encodeURIComponent(inquiry.body)}`;
  window.location.href = href;
  feedback.textContent = 'Your email application should open a draft. Please review it and press Send there. If nothing opened, use “copy the inquiry text” and email the contact address shown.';
});
document.getElementById('copy-inquiry')?.addEventListener('click', async () => {
  const inquiry = buildInquiry();
  if (!inquiry) return;
  const text = `To: premangshu.mal@gmail.com\nSubject: ${inquiry.subject}\n\n${inquiry.body}`;
  try {
    await navigator.clipboard.writeText(text);
    feedback.textContent = 'Inquiry copied. Paste it into your email app and send to premangshu.mal@gmail.com.';
  } catch (_error) {
    feedback.textContent = 'Clipboard access unavailable. Please use the email draft button or email the contact address directly.';
  }
});

document.getElementById('print-brief')?.addEventListener('click', () => window.print());
document.querySelectorAll('.year').forEach(el => el.textContent = String(new Date().getFullYear()));
