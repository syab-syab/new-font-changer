import type { PlasmoCSConfig } from "plasmo"
 
export const config: PlasmoCSConfig = {
  matches: ["<all_urls>"],
}

type Props = {
  fontColor: string,
  fontWeight: string,
  letterSpacing: string,
  fontStyle: string,
  lineHeight: string,
  fontFamily: string
}

function injectStyle(style: Props) {
  const styleElement = document.createElement("style");
  styleElement.id = "font-changer-syab-syab"
  const css = `
    * {
      color: ${style.fontColor} !important;
      font-weight: ${style.fontWeight} !important;
        letter-spacing: ${style.letterSpacing}px !important;
        font-style: ${style.fontStyle} !important;
        line-height: ${style.lineHeight} !important;
        font-family: ${style.fontFamily} !important;
    }
  `
    styleElement.textContent = css;
    document.head.appendChild(styleElement);
  
}

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.name === "change-style") {
    // const { fontColor } = msg.body
    const css: Props = msg.body
    // ウェブページのスタイルを変更
    // document.body.style.backgroundColor = backgroundColor
    // injectStyle(fontColor)
    injectStyle(css)
    sendResponse({ status: "Style changed" })
  } else if (msg.name === "reset-style") {
    window.location.reload()
  }
})