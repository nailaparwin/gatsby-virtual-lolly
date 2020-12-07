import React, {Ref, RefObject, useEffect, useRef, useState} from 'react'
import Header from '../components/Header'
import Lolly from '../components/Lolly'
const shortid = require("shortid")
import {gql, useMutation, useQuery} from '@apollo/client'
import { navigate,  Link } from 'gatsby'
import '../styles/main.css'

const createLollyMutation = gql`
mutation createLolly(
    $recipientName: String!
    $message: String!
    $senderName: String!
    $flavourTop: String!
    $flavourMiddle: String!
    $flavourBottom: String!
    $lollyPath: String!  
) {
  createLolly(
    recipientName: $recipientName
      message: $message
      senderName: $senderName
      flavourTop: $flavourTop
      flavourMiddle: $flavourMiddle
      flavourBottom: $flavourBottom
      lollyPath: $lollyPath  
  ) {    
    flavourTop
    flavourMiddle
    flavourBottom
    recipientName
    message
    senderName
    lollyPath
  }
}
`;



export default function CreateNew(){
    const [color1, setColor1] = useState("#bec044")
    const [color2, setColor2] = useState("#473564")
    const [color3, setColor3] = useState("#e6194c")
    const [submit, setSubmit] = useState(false)
    const [sender, setSender] = useState('')
    const [message, setMessage] = useState('')
    const [recipient, setRecipient] = useState('')

    const [createLolly] = useMutation(createLollyMutation);

    const recipientNameRef = useRef<HTMLInputElement>(null)
    const senderNameRef = useRef<HTMLInputElement>(null)
    const messageRef =  useRef<HTMLTextAreaElement>(null)
    const id = shortid.generate();   
    useEffect(()=>{

    },[submit])

    const submitLollyForm = () =>{        
        console.log("sender", senderNameRef.current.value) 
        setSender(senderNameRef.current.value)
        setRecipient(recipientNameRef.current.value)
        setMessage(messageRef.current.value)
        createLolly({
            variables: {
                flavourTop: color1,
                flavourMiddle: color2,
                flavourBottom: color3,
                recipientName: recipientNameRef.current.value,
                message: messageRef.current.value,
                senderName: senderNameRef.current.value,
                lollyPath:id
             
            },
          });
          console.log("message sent")
          //navigate(`/lollies/${id}`)
          setSubmit(true)
        }      
    
    
    return(
    (submit===false) ?  (
        <div className="container">
            
            <div className="lollyFormDiv">
                <div>
                    <Lolly fillLollyTop={color1} fillLollyMiddle={color2} fillLollyBottom={color3}/>

                </div>
                <div className="lollyFlavourDiv">
                    <label htmlFor="flavourTop" className="colorPickerLabel">
                        <input type="color" className="colorPicker" value={color1} name="flavourTop" id ="flavourTop"
                        onChange={ (e) => { setColor1(e.target.value)}} />
                    </label>

                    <label htmlFor="flavourMiddle" className="colorPickerLabel">
                        <input type="color" className="colorPicker" value={color2} name="flavourMiddle" id ="flavourMiddle"
                        onChange={ (e) => { setColor2(e.target.value)}} />
                    </label>

                    <label htmlFor="flavourBottom" className="colorPickerLabel">
                        <input type="color" className="colorPicker" value={color3} name="flavourBottom" id ="flavourBottom"
                        onChange={ (e) => { setColor3(e.target.value)}} />
                    </label>
                </div>
                <div>
                    <div className="lollyForm">
                        <label htmlFor="recipientName">
                            To
                        </label>
                        <input type="text"
                        name="recipientName"
                        id="recipientName"
                        
                        ref={recipientNameRef}/>
                        <label htmlFor="message">
                        message
                        </label>
                        <textarea
                        rows={8}
                        
                        name="message"
                        id="message"
                        ref={messageRef}/>
                        <label htmlFor="senderName">
                        From
                        </label>
                        <input type="text"
                        name="senderName"
                        id="senderName"
                        
                        ref={senderNameRef}/>
                    </div>
                    <input type="button" value='Create' onClick={submitLollyForm}/>
                </div>
            </div>
        </div>
    ):(
        <div className="container">
            
            <div className="lollyFormDiv">
                <div>
                    <Lolly fillLollyTop={color1} fillLollyMiddle={color2} fillLollyBottom={color3}/>

                </div>
                <div>
                    <div className="lollyFormSubmitNext">
                        <div className="to">
                            To : {recipient}
                        </div>
                       
                        <div className="msg">
                           {message}
                        </div>
                        
                        <div className="from">
                         - {sender}
                        </div>
                        <br/>
                        <div className="url">
                        Your lolly is freezing. Wait for a while<br/>
                        you can see it here <br/>    
                        <button onClick={() => {navigate(`/lollies/${id}`)}}>                                           
                            https://virtual-lolly-with-gatsby-faunadb.netlify.app/lollies/{id}
                        </button>
                        </div>
                    </div>
                    {/* <input type="button" value='' onClick={() => {navigate(`/lollies/${id}`)}}/> */}
            </div>
            </div>
            </div>
    )
    )
}