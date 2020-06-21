import React from 'react'
import { Card } from 'react-bootstrap'
import '../styles/card.scss'


const CardWithImage=({image,text, width, height})=>{  
   
    return(
        <div className="container cards" style={{position:'relative', width:width, display:'inline-block', height:height}} >
            <img src={image} alt="Avatar" className="image" style={{display:'block', width:'100%', height:'auto'}} />
            <div className="overlay">
                <div className="text" >{text}</div>
            </div>
        </div>
    )
}

export default CardWithImage;