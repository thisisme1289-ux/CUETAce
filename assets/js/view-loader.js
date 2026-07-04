(function () {
  const slots = Array.from(document.querySelectorAll('[data-view-src]'));

  async function loadSlot(slot) {
    const src = slot.getAttribute('data-view-src');
    if (!src) return;
    const res = await fetch(src, { cache: 'no-cache' });
    if (!res.ok) throw new Error('HTTP ' + res.status + ' loading ' + src);
    slot.outerHTML = await res.text();
  }

  window.cuetaceViewsReady = Promise.all(slots.map(loadSlot)).catch(err => {
    console.error('[CUETAce] Could not load view partials', err);
    const firstSlot = slots[0];
    if (firstSlot) {
      firstSlot.innerHTML = '<div class="empty-state" style="margin:80px auto;max-width:520px;"><div class="empty-title">Could not load app views</div><div class="empty-desc">Please refresh the page.</div></div>';
    }
    throw err;
  });
})();
