function hasKeyword(normalizedText, keyword) {
  return normalizedText.includes(keyword) && normalizedText.includes("recipe");
}

function showToast(message) {
  const toast = document.createElement("div");
  toast.textContent = message;
  toast.style.position = "fixed";
  toast.style.top = "20px";
  toast.style.right = "20px";
  toast.style.padding = "10px 20px";
  toast.style.backgroundColor = "#2c307f";
  toast.style.color = "#fff";
  toast.style.borderRadius = "5px";
  toast.style.boxShadow = "0px 0px 10px rgba(0, 0, 0, 0.5)";
  toast.style.zIndex = "10000";
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.transition = "opacity 0.5s ease-in-out";
    toast.style.opacity = "0";
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 500);
  }, 2000);
}

const observer = new MutationObserver((_, observer) => {
  const jumpLink = [...document.querySelectorAll("a")].find((anchor) => {
    const normalizedText = anchor.innerText.replace(/\s+/g, "").toLowerCase();
    const hasJump = hasKeyword(normalizedText, "jump");
    const hasSkip = hasKeyword(normalizedText, "skip");
    return hasJump || hasSkip;
  });

  if (jumpLink) {
    try {
      showToast("Jump to Recipe link found!");
      jumpLink.click();
      observer.disconnect();
    } catch (err) {
      console.error("Error jumping to recipe!", err);
    }
  }
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});
