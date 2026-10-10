document.querySelectorAll('[data-share]').forEach((button) => {
  button.addEventListener('click', async () => {
    const status = button.parentElement.querySelector('[data-share-status]');
    const data = {
      title: button.dataset.shareTitle,
      url: button.dataset.shareUrl,
    };

    try {
      if (navigator.share) {
        await navigator.share(data);
        return;
      }
      await navigator.clipboard.writeText(data.url);
      status.textContent = 'URLをコピーしました';
    } catch (error) {
      if (error.name !== 'AbortError') status.textContent = '共有できませんでした';
    }
  });
});
