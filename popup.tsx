// new-font-changer

// popup.tsx
import { useState } from "react"

export default function Popup() {
  const [color, setColor] = useState("#ffffff")

  const changeStyle = async () => {
    try {
      // 現在のタブを取得
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
      // コンテンツスクリプトにメッセージを送信
      await chrome.tabs.sendMessage(tab.id, {
        name: "change-style",
        body: {
          backgroundColor: color
        }
      })
      console.log("Style change requested")
    } catch (error) {
      console.error("Error sending message:", error)
    }
  }

  return (
    <div style={{ padding: 16, width: 200 }}>
      <h2>Style Changer</h2>
      <input
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
      />
      <button onClick={changeStyle}>Change Page Style</button>
    </div>
  )
}