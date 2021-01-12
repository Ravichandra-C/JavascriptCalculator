import React, { useEffect, useState } from "react"
import styles from "../scss/App.module.scss"
import Button from "./Button"
import evaluate from "../evaluate"
export default function(){
    const [input,setInput]=useState('0');
    const [formula,setFormula]=useState('');
    const [equal,setEqual]=useState(false);
    function calculate(event){
        let ele=event.target;
        if(event.target.tagName!='BUTTON'){
            event.preventDefault();
            return;
        }
        let text=ele.textContent;
        console.log(/^[+\-*/]$/.test(text))
        if(text=="AC"){
            setInput('0');
            setFormula("");
            setEqual(false);
        }
        else if (/^[+\-*/]$/.test(text)){
            setEqual(false);
            if(input!=''){
                setInput('');
                setFormula(formula + input + text)
            }
            else if(/[+*\-\/]$/g.test(formula)&&text!='-'){
                setFormula((formula).replace(/[+*\-\/]*$/g,"")+text)
            }
            
            else{
                setFormula(formula+text);
            }
           
        }
        else if(text=='='){
            let res=evaluate((formula+input).replace(/[+*\-\/]*$/g,""));
            console.log("---"+res)
            setFormula('');
            setInput(res);
            setEqual(true);   
        }
        else{
            console.log("text is "+text);
            
            if(input=='0'){
                setInput(text)
            }
            else if(/\./g.test(input)&&text=='.'){

            }
            else{
                console.log("--"+equal);
                console.log('--'+input);
                if(equal){
                    setInput(text)
                    setEqual(false);
                    console.log('----'+input);
                }
                else if(/[+\-*\/]+/.test(formula)){
                    setInput((input + text))
                }
                else{
                    setFormula('');
                    setInput((input + text))
                }
            }
        }
    }

    useEffect(function ee(){
        document.addEventListener('keydown',keyPressEvent);
        return function cleanup(){
         document.removeEventListener('keydown',keyPressEvent);   
        }
    })
    function keyPressEvent(event){
        console.log(event.key);
        let obj={
            '+':'add',
            '-':'subtract',
            '*':"multiply",
            '/':"divide",
            "1":"one",
            "2":"two",
            "3":"three",
            "4":"four",
            "5":"five",
            "6":"six",
            "7":"seven",
            "8":"eight",
            "9":"nine",
            "0":"zero",
            ".":"decimal",
            "=":"equals"
        }
        if(obj.hasOwnProperty(event.key)){
            document.getElementById(obj[event.key]).click();
        }
    
        
    
    }
  
    return (<div id='app' className={styles.App} onClick={calculate}>
        <div className={styles.display} >
            <div className={styles.formula}>{formula}</div>
            <div id='display' className={styles.input}>{input}</div>
        </div>
        <Button id="clear" className={styles.clear} text="AC" color={styles.primaryColor} />
        <Button id='divide' className={styles.divide} text="/" color={styles.primaryColor}/>
        <Button id="multiply" className={styles.multiply} text="*" color={styles.primaryColor}/>
        <Button id='seven' className={styles.seven} text="7" color={styles.primaryColor}/>
        <Button id='eight' className={styles.eight} text="8" color={styles.primaryColor}/>
        <Button id='nine' className={styles.nine} text="9" color={styles.primaryColor}/>
        <Button id='subtract' className={styles.subtract} text="-" color={styles.primaryColor}/>
        <Button id='four' className={styles.four} text="4" color={styles.primaryColor}/>
        <Button id='five' className={styles.five} text="5" color={styles.primaryColor}/>
        <Button id='six' className={styles.six} text="6" color={styles.primaryColor}/>
        <Button id='add' className={styles.add} text="+" color={styles.primaryColor}/>
        <Button id='one' className={styles.one} text="1" color={styles.primaryColor}/>
        <Button id='two' className={styles.two} text="2" color={styles.primaryColor}/>
        <Button id='three' className={styles.three} text="3" color={styles.primaryColor}/>
        <Button id='equals' className={styles.equals} text="=" color={styles.primaryColor}/>
        <Button id='zero' className={styles.zero} text="0" color={styles.primaryColor}/>
        <Button id='decimal' className={styles.decimal} text="." color={styles.primaryColor}/>

    </div>);
}