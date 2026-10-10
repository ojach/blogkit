async function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return;
    } catch {
      // Clipboard APIが使えなければ、予備の方法を試す
    }
  }

  const field = document.createElement('textarea');
  field.value = text;
  field.setAttribute('readonly', '');
  field.style.position = 'fixed';
  field.style.left = '-9999px';
  document.body.appendChild(field);
  field.focus();
  field.select();

  const copied = document.execCommand('copy');
  field.remove();

  if (!copied) throw new Error('コピーに失敗しました');
}

function isMobileDevice() {
  return navigator.userAgentData?.mobile === true
    || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
    || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
}

document.addEventListener('click', async (event) => {
  const button = event.target.closest('[data-share]');
  if (!button) return;

  event.preventDefault();

  const status = button
    .closest('.share-control')
    ?.querySelector('[data-share-status]');

  const data = {
    title: button.dataset.shareTitle || document.title,
    url: button.dataset.shareUrl || window.location.href,
  };

  if (status) status.textContent = '共有しています…';

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
    }
  }

  try {
    await copyText(data.url);
    if (status) status.textContent = 'URLをコピーしました';
  } catch (error) {
    console.error('記事の共有に失敗しました:', error);
    if (status) {
      status.textContent =
        'コピーできませんでした。記事URLをアドレスバーからコピーしてください。';
    }
  }
});