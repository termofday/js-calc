'use client'
'use strict'

import Button from "@/component/button"
import React, { useState } from "react";

const isOperator = /[*/+-]/
, endIsOperator = /[*/+-]$/
, endIsNegative = /\d[*/+-]{1}-$/
, isNumb = (/\d/)
, isEqual = (/\=/)
, isDecimal = (/\./);
 
let isResult = false;

export default function Home() {
  
  const [current, setCurrent] = useState('0');
  const [prevVal, setPrevVal] = useState(`0`);
  const [operator, setOperator] = useState(null);
  const [overflow, setOverflow] = useState(false);
  

  const updateDisplay = (val) =>
  {

    // check length
    if(current.length >= 25)
    {
      setOverflow(true);
    }

    //setCurrent(val)

    if(val === 'AC')
    {
      setCurrent('0');
      setPrevVal('0');
      setOperator(null);
      setOverflow(false);
    }

    if(isNumb.test(val))
    {
      console.log("numb", val)

    // check for numb overflow
    if(!overflow === true)
    {

      // inner numb logic
      if(current === '0' )
      {
        setCurrent(val);
      }

      else if(operator !== null)
      {
        console.log("op nicht mehr null")
        if(isOperator.test(current))
        {
          setCurrent(val);
        }
        else
        {
            console.log("jetzt ich", val);
            setCurrent(current + val); 
        }
      }
      else
      {
        setCurrent(current + val);
      }
    }
    else
    {
      setCurrent('Numb overflow. Press AC.');
    }
    }

    // checks for decimal
    if(isDecimal.test(val))
    {
      try
      {
        if(!current.match(isDecimal))
        {
          setCurrent(current + val)
        }
      }
      catch(e)
      {
        // ... i've thought that the problem could be the render. Maybe someone knows more?
        //console.log(e)
      }
    }

    // checks for operators
    if(isOperator.test(val))
    {
      if(prevVal === '0')
      {
        console.log("prevVal 0")
        setOperator(val);
        setPrevVal(current);
        setCurrent(val)
      }
    else
    {  
      if(operator !== val )
      {
        console.log("????")
        setOperator(val);
        setPrevVal(current)
        setCurrent(val)
      }
      else
      {
          setOperator(val);
          setPrevVal(current)
          setCurrent(val)
      }
    }
  }

    // checks for equal, then call calc()
    if(isEqual.test(val))
    {
      calc();
    }

    // calc func
    function calc()
    {

      const prev = parseFloat(prevVal);
      const curr = parseFloat(current);

      if(!isNaN(prev) && !isNaN(curr))
      {
        switch(operator)
        {
          case '+':
            setCurrent(prev + curr);
            isResult = true;
          break;
          case '-':
            setCurrent(prev - curr);
            isResult = true;
          break;
          case '/':
            setCurrent(prev / curr);
            isResult = true;
          break;
          case '*':
            setCurrent(prev * curr);
            isResult = true;
          break;
          default:
            console.error("Error in Equal.");
          break;
        }
    }
  }
}

  return (
    <main className='flex p-52 justify-center'>
    

      {

        /*

        // row-span: would be the solution for the long-resized equals button. 
        // or relative/absolute ... 
        
<div>
<div className="grid grid-cols-4 gap-1">
<div className="col-start-1 col-end-2">ac</div>
<div className="col-start-3 col-end-3">/</div>
<div className="col-start-4 col-end-4">x</div>
<div className="col-start-1 col-end-1">7</div>
<div className="col-start-2 col-end-2">8</div>
<div className="col-start-3 col-end-3">9</div>
<div className="col-start-4 col-end-4">-</div>
<div>4</div>
<div>5</div>
<div>6</div>
<div>+</div>
<div>1</div>
<div>2</div>
<div>3</div>
<div className="row-span-2">=</div>
<div className="col-start-1 col-end-2">0</div>
<div className="col-start-3 col-end-3">.</div>
</div>
</div>
        
        
         */
      }
      


      <div className="border-solid border-8 border-black">
        <div className="w-80">
      <div className="flex flex-row">
      {
        /*
        // extra candy
        <div className="bg-black w-full" id="formularField">
          {formularDisplay}
        </div>
         */
      }

        <div className="bg-black w-full text-right p-2 text-white" id="display">
        {prevVal}
        <br/>
        {current}
        </div>
        </div>

        <div className="flex flex-row">
        <Button updateDisplay={updateDisplay} class='border-solid border-2 border-black basis-1/2 bg-yellow-500 p-5 hover:bg-yellow-600' value='AC' id='clear'></Button>
        <Button updateDisplay={updateDisplay} class='border-solid border-2 border-black basis-1/4 bg-sky-500 p-5 hover:bg-sky-600' value='*' id='multiply'></Button>
        <Button updateDisplay={updateDisplay} class='border-solid border-2 border-black basis-1/4 bg-sky-500 p-5 hover:bg-sky-600' value='/' id='divide'></Button>
        </div>

        <div className="flex flex-row">
        <Button updateDisplay={updateDisplay} class='border-solid border-2 border-black basis-1/4 bg-slate-500 p-5 hover:bg-slate-600' value='7' id='seven'></Button>
        <Button updateDisplay={updateDisplay} class='border-solid border-2 border-black basis-1/4 bg-slate-500 p-5 hover:bg-slate-600' value='8' id='eight'></Button>
        <Button updateDisplay={updateDisplay} class='border-solid border-2 border-black basis-1/4 bg-slate-500 p-5 hover:bg-slate-600' value='9' id='nine'></Button>
        <Button updateDisplay={updateDisplay} class='border-solid border-2 border-black basis-1/4 bg-sky-500 p-5 hover:bg-sky-600' value='-' id='subtract'></Button>
        </div>

        <div className="flex flex-row">
        <Button updateDisplay={updateDisplay} class='border-solid border-2 border-black basis-1/4 bg-slate-500 p-5 hover:bg-slate-600' value='4' id='four'></Button>
        <Button updateDisplay={updateDisplay} class='border-solid border-2 border-black basis-1/4 bg-slate-500 p-5 hover:bg-slate-600' value='5' id='five'></Button>
        <Button updateDisplay={updateDisplay} class='border-solid border-2 border-black basis-1/4 bg-slate-500 p-5 hover:bg-slate-600' value='6' id='six'></Button>
        <Button updateDisplay={updateDisplay} class='border-solid border-2 border-black basis-1/4 bg-sky-500 p-5 hover:bg-sky-600' value='+' id='add'></Button>      
        </div>

        <div className="flex flex-row">
        <Button updateDisplay={updateDisplay} class='border-solid border-2 border-black basis-1/4 bg-slate-500 p-5 hover:bg-slate-600' value='1' id='one'></Button>
        <Button updateDisplay={updateDisplay} class='border-solid border-2 border-black basis-1/4 bg-slate-500 p-5 hover:bg-slate-600' value='2' id='two'></Button>
        <Button updateDisplay={updateDisplay} class='border-solid border-2 border-black basis-1/4 bg-slate-500 p-5 hover:bg-slate-600' value='3' id='three'></Button>
        <Button updateDisplay={updateDisplay} class='border-solid border-2 border-black basis-1/4 bg-green-700 p-5 hover:bg-green-600' value='.' id='decimal'></Button>
        </div>

        <div className="flex flex-row">
        <Button updateDisplay={updateDisplay} class='border-solid border-2 border-black basis-3/4 bg-slate-500 p-5 hover:bg-slate-600' value='0' id='zero'></Button>
        <Button updateDisplay={updateDisplay} class='border-solid border-2 border-black basis-1/4 bg-yellow-500 p-5 hover:bg-yellow-600 flex-grow' value='=' id='equals'></Button>
        </div>
    
        </div>
      </div>
    </main>
  )
}