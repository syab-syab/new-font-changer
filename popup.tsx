// new-font-changer
import { useState } from "react"
import styled from "styled-components"
import Header from "~components/header"


const Wrapper = styled.div`
  padding: 20px;
  background: rgb(217, 217, 217);
`

const FormWrapper = styled.div`
  margin-bottom: 10px;
`

const Label = styled.label`
  font-size: 20px;
`

const Select = styled.select`
  font-size: 20px;
  width: 100%;
`

const Input = styled.input`
  font-size: 20px;
  width: 100%;
`

const ApplicableBtn = styled.button`
  width: 50%;
  font-size: 20px;
`

const ResetBtn = styled.button`
  width: 50%;
  font-size: 20px;
`

export default function Popup() {
  const [weight, setWeight] = useState("normal")
  const [color, setColor] = useState<string>("#000000")
  const [spacing, setSpacing] = useState(0)
  const [inclination, setInclination] = useState("normal")
  const [lineHeight, setLineHeight] = useState("normal")
  const [family, setFamily] = useState("")

  const [toggleBtn, setToggleBtn] = useState(false)

  const changeStyle = async () => {
    try {
      // 現在のタブを取得
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
      // コンテンツスクリプトにメッセージを送信
      await chrome.tabs.sendMessage(tab.id, {
        name: "change-style",
        body: {
          fontColor: color,
          fontWeight: weight,
          letterSpacing: spacing,
          fontStyle: inclination,
          lineHeight: lineHeight,
          fontFamily: family
        }
      })
      console.log("Style change requested")
      setToggleBtn(true)
    } catch (error) {
      console.error("Error sending message:", error)
    }
  }

  const resetStyle = async() => {
    try {
      // 現在のタブを取得
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
      // コンテンツスクリプトにメッセージを送信
      await chrome.tabs.sendMessage(tab.id, {
        name: "reset-style",
        body: {
          value: "reset please"
        }
      })
      console.log("Style reset requested")
      setToggleBtn(false)
    } catch(error) {
      console.error("Error sending message:", error)
    }
  }

  return (
    <div
      style={{
        width: "340px",
    }}
    >
      <Header />
      <Wrapper>
      <FormWrapper>
        <Label htmlFor="weight">
            文字の太さ
          </Label>
          <br />
          {/* font-weight */}
          <Select name="" id="weight" value={weight} onChange={(e) => setWeight(e.target.value)}>
            <option value="normal">普通</option>
            <option value="bold">濃く</option>
            <option value="lighter">薄く</option>
          </Select>
        </FormWrapper>
      
      <FormWrapper>
        <Label htmlFor="color">
          文字の色
        </Label>
        <br />
        {/* 色の種類をもっと増やす */}
        <Input value={color} type="color" onChange={(e) => setColor(e.target.value)} />
      </FormWrapper>

      <FormWrapper>
        <Label htmlFor="spacing">
          文字の間隔
        </Label>
        <br />
        <Input type="number" id="spacing" value={spacing} onChange={(e) => setSpacing(Number(e.target.value))} />
        {/* letter-spacing */}
      </FormWrapper>

      <FormWrapper>
        <Label htmlFor="inclination">
          文字の傾き
        </Label>
        <br />
        <Select value={inclination} id="inclination" onChange={(e) => setInclination(e.target.value)}>
          <option value="normal">変更なし</option>
          <option value="italic">傾ける</option>
        </Select>
        {/* font-style */}
      </FormWrapper>

      <FormWrapper>
        <Label htmlFor="lineHeight">
          行間
        </Label>
        <br />
        <Select value={lineHeight} id="lineHeight" onChange={(e) => setLineHeight(e.target.value)}>
          <option value="normal">変更なし</option>
          <option value="100%">100%</option>
          <option value="200%">200%</option>
          <option value="300%">300%</option>
          <option value="400%">400%</option>
          <option value="500%">500%</option>
        </Select>
        {/* line-heightで設定できる */}
      </FormWrapper>

      <FormWrapper>
        <Label htmlFor="family">
          フォントの種類
        </Label>
        <br />
        <Select value={family} id="family" onChange={(e) => setFamily(e.target.value)}>
          <option value="">変更なし</option>
          <option value="serif">serif</option>
          <option value="sans-serif">sans-serif</option>
          <option value="cursive">cursive</option>
          <option value="fantasy">fantasy</option>
          <option value="monospace">monospace</option>
        </Select>
      </FormWrapper>

      <div>
        <ApplicableBtn
          onClick={changeStyle}
          disabled={toggleBtn ? true : false}
        >
          適用
        </ApplicableBtn>
        <ResetBtn
          onClick={resetStyle}
          disabled={toggleBtn ? false: true}
        >
          リセット
        </ResetBtn>
      </div>
    </Wrapper>
    </div>
  )
}