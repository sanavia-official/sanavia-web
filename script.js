document.addEventListener('DOMContentLoaded', function () {
  const button = document.querySelector('.mobile-menu');
  const nav = document.querySelector('.nav');
  if (button && nav) {
    button.addEventListener('click', function () {
      const isOpen = nav.classList.toggle('open');
      button.setAttribute('aria-expanded', String(isOpen));
    });
  }

  document.querySelectorAll('[data-requires-agreement]').forEach(function (action) {
    const agreementName = action.getAttribute('data-requires-agreement');
    const checkbox = document.querySelector('[data-agreement="' + agreementName + '"]');
    if (!checkbox) return;

    function syncAgreementState() {
      const enabled = checkbox.checked;
      action.classList.toggle('is-disabled', !enabled);
      action.setAttribute('aria-disabled', String(!enabled));
      if (enabled) {
        action.removeAttribute('tabindex');
      } else {
        action.setAttribute('tabindex', '-1');
      }
    }

    checkbox.addEventListener('change', syncAgreementState);
    syncAgreementState();
  });
});
