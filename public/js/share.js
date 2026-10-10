async function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }

  // Clipboard API is unavailable in some browsers or non-secure contexts.
  const field = document.createElement('textarea');
  field.value = text;
  field.setAttribute('readonly', '');
  field.style.position = 'fixed';
  field.style.opacity = '0';
  document.body.appendChild(field);
  field.select();

  const copied = document.execCommand('copy');
  field.remove();

  if (!copied) throw new Error('Clipboard copy failed');
}

document.querySelectorAll('[data-share]').forEach((button) => {
  button.addEventListener('click', async () => {
    const status = button.parentElement.querySelector('[data-share-status]');
    const data = {
      title: button.dataset.shareTitle,
      url: button.dataset.shareUrl,
    };

    if (status) status.textContent = '';

    if (navigator.share) {
      try {
        await navigator.share(data);
        return;
      } catch (error) {
        // A dismissed native share sheet is intentional; other failures fall
        // through to copying the article URL instead.
        if (error.name === 'AbortError') return;
      }
    }

    try {
      await copyText(data.url);
      if (status) status.textContent = 'URLをコピーしました';
    } catch {
      if (status) status.textContent = 'URLをコピーできませんでした。アドレスバーからコピーしてください。';
    }
  });
});