document.addEventListener('DOMContentLoaded', function () {
  const button = document.querySelector('.mobile-menu');
  const nav = document.querySelector('.nav');
  if (!button || !nav) return;
  button.addEventListener('click', function () {
    const isOpen = nav.classList.toggle('open');
    button.setAttribute('aria-expanded', String(isOpen));
  });
});
