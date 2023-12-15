import React from "react"

export default function Button({...props}) 
{
    
    const btnHandler = (e) => 
    {
    props.updateDisplay(e.target.innerText)
    }

    return (
        <button className={props.class} id={props.id} onClick={btnHandler} >{props.value}</button>
    )
}