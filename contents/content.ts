// contents/content.ts
function injectStyle(style: any) {
  const styleElement = document.createElement("style");
  styleElement.id = "font-changer-syab-syab"
  const css = `
    * {
      background: ${style} !important;
    }
  `
    styleElement.textContent = css;
    document.head.appendChild(styleElement);
  
}

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.name === "change-style") {
    const { backgroundColor } = msg.body
    // ウェブページのスタイルを変更
    // document.body.style.backgroundColor = backgroundColor
    injectStyle(backgroundColor)
    sendResponse({ status: "Style changed" })
  }
})