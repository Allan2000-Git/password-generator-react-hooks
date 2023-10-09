import { useCallback, useEffect, useRef, useState } from 'react';
import './App.css';

function App() {

  const [length, setLength] = useState(6)
  const [numbersChecked, setNumbersChecked] = useState(false)
  const [charChecked, setCharChecked] = useState(false)
  const [passwordInput, setPasswordInput] = useState("")


  //useCallback => render the state (when page is refreshed), automatically renders some methods; for optimization
  const generatePassword = useCallback(()=>{

    let password = ""
    let temp = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numbersChecked) temp += "0123456789"
    if(charChecked) temp += "`~!@#$%^&*()-_=+[]{}\|<>/?"

    for(let i=0;i<length;i++){
      let randomNumber = Math.floor(Math.random() * temp.length)
      password += temp.charAt(randomNumber)
    }

    setPasswordInput(password); 

  },[length,numbersChecked,charChecked])


  const copyPassword = useCallback(()=>{
    window.navigator.clipboard.writeText(passwordInput)
    passwordRef.current?.select();
    // passwordRef.current?.setSelectionRange(0,20);
  },[passwordInput])


//any change in the function, then run it again
  useEffect(()=>{
    generatePassword()
  },[length,numbersChecked,charChecked, generatePassword])


  const passwordRef = useRef(null)


  return (
    <>
    <div className="w-full max-w-lg mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
      <h1 className='text-white text-center my-3 text-[1.5rem]'>Password Generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
              type="text"
              value={passwordInput}
              className="outline-none w-full py-3 px-3"
              placeholder="Password"
              readOnly
              ref={passwordRef}
          />
          <button
          className='outline-none bg-blue-700 text-white px-5 py-0.5 '
          onClick={copyPassword}
          >Copy</button>
          
      </div>
    <div className='flex text-sm justify-between mt-6'>
      <div className='flex items-center justify-center gap-x-2'>
        <input 
        type="range"
        min={6}
        max={30}
        value={length}
        className='cursor-pointer'
        onChange={(e) => {setLength(e.target.value)}}
        />
        <label>Length: {length}</label>
      </div>
      <div className="flex items-center gap-x-2 justify-center">
      <input
          type="checkbox"
          defaultChecked={numbersChecked}
          id="numbersInput"
          onChange={() => {
              setNumbersChecked((previous) => !previous);//toggle the state of the checkbox
          }}
      />
      <label htmlFor="numberInput">Numbers</label>
      </div>
      <div className="flex items-center gap-x-2 justify-center">
          <input
              type="checkbox"
              defaultChecked={charChecked}
              id="charactersInput"
              onChange={() => {
                  setCharChecked((previous) => !previous )//toggle the state of the checkbox
              }}
          />
          <label htmlFor="characterInput">Characters</label>
      </div>
    </div>
</div>
    </>
  );
}

export default App;
