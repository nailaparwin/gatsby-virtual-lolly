import React from "react"
import Lolly from '../components/Lolly'
import '../styles/main.css'
import Header from '../components/Header'
import { navigate, Link } from "gatsby"

export default function Home() {
  return (
  <div className="container">       
    <div className="listLollies">
    <Lolly fillLollyTop='#deaa43' fillLollyMiddle='#d52358'  fillLollyBottom='#e95946' />
    <Lolly fillLollyTop='green' fillLollyMiddle='red'  fillLollyBottom='blue' />
    <Lolly fillLollyTop='#deaa43' fillLollyMiddle='white'  fillLollyBottom='yellow' />
    </div> 
    <input className="btnNavigate" type="button" value="Create New Lolly" onClick={()=>{
      navigate("/createNew")
    }}/>
  </div>
  )
}
