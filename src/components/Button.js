import React,{useState} from "react"
export default function(props){
    const [hover,setHover]=useState(false);
    const styleObj=hover?{borderColor:"white",borderWidth:"3px",color:"black",fontWeight:"bolder"}:{borderColor:props.color}
    return (
            <button id={props.id} style={styleObj} onMouseEnter={(e)=>{setHover(true);e.preventDefault();}} onMouseLeave={(event)=>{setHover(false);event.preventDefault();}} className={props.className}>{props.text}</button>
       )
}

