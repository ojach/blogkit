async function copyText(text) {
  // Try the modern clipboard API first. If the browser blocks it, fall back to
  // the selection-based method used by older browsers.
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return;
    } catch {
      // Continue to the fallback below.
    }
  }

  const field = document.createElement('textarea');
  field.value = text;
  field.setAttribute('readonly', '');
  field.style.position = 'fixed';
  field.style.top = '0';
  field.style.left = '-9999px';
  document.body.appendChild(field);
  field.focus();
  field.select();

  const copied = document.execCommand('copy');
  field.remove();

  if (!copied) throw new Error('Clipboard copy failed');
}

function isMobileDevice() {
  return navigator.userAgentData?.mobile === true
    || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
    || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
}

// Delegation also works if the share button is rendered after this script runs.
document.addEventListener('click', async (event) => {
  const button = event.target.closest('[data-share]');
  if (!button) return;

  event.preventDefault();
  const status = button.closest('.share-control')?.querySelector('[data-share-status]');
  const data = {
    title: button.dataset.shareTitle || document.title,
    url: button.dataset.shareUrl || window.location.href,
  };

  if (status) status.textContent = '共有しています…';

  // Use the native share sheet on phones. Desktop browsers often expose
  // navigator.share without having a usable share target, so copy the URL there.
  if (isMobileDevice() && navigator.share) {
    try {
      await navigator.share(data);
      if (status) status.textContent = '共有しました';
      return;
    } catch (error) {
      if (error.name === 'AbortError') {
        if (status) status.textContent = '共有をキャンセルしました';
        return;
      }
      // Native sharing failed; try copying the URL instead.
    }
  }

  try {
    await copyText(data.url);
    if (status) status.textContent = 'URLをコピーしました';
  } catch (error) {
    console.error('Article sharing failed:', error);
    if (status) status.textContent = 'コピーできませんでした。記事URLをアドレスバーからコピーしてください。';
  }
});
