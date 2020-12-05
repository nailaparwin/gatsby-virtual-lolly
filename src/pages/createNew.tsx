import React, {Ref, RefObject, useRef, useState} from 'react'
import Header from '../components/Header'
import Lolly from '../components/Lolly'
import {gql, useMutation, useQuery} from '@apollo/client'


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
    id
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
    const [color1, setColor1] = useState('pink')
    const [color2, setColor2] = useState('pink')
    const [color3, setColor3] = useState('pink')
    
    const [createLolly] = useMutation(createLollyMutation);
    console.log(createLolly)
    const recipientNameRef = useRef<HTMLInputElement>(null)
    const senderNameRef = useRef<HTMLInputElement>(null)
    const messageRef =  useRef<HTMLTextAreaElement>(null)

    const submitLollyForm = () =>{        
        console.log("sender", senderNameRef.current.value) 
        createLolly({
            variables: {
                flavourTop: color1,
                flavourMiddle: color2,
                flavourBottom: color3,
                recipientName: recipientNameRef.current.value,
                message: messageRef.current.value,
                senderName: senderNameRef.current.value,
                lollyPath:''
             
            },
          });
          console.log("message sent")
        }      
    
    

    return (
        <div className="container">
            <Header/>
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
                        rows={15}
                        
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
    )
}