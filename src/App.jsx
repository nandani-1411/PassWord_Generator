import React, { useCallback, useEffect, useState, useRef } from 'react';

const App = () => {
  const [len, setLen] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [passWord, setPassWord] = useState("No generated Password");

  const passWordGenerator = useCallback(() => {
    let result = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "{}[]#@!()*%$`~,:|";

    for (let index = 0; index < len; index++) {
      let rndmIndx = Math.floor(Math.random() * str.length);
      result += str.charAt(rndmIndx);
    }
    setPassWord(result);
  }, [len, numberAllowed, charAllowed]);

  useEffect(() => {
    passWordGenerator();
  }, [len, numberAllowed, charAllowed]);

  const passRef = useRef(null);

  const handleCopyClipboard = useCallback(() => {
    passRef.current?.select();
    passRef.current?.setSelectionRange(0, passWord.length);
    window.navigator.clipboard.writeText(passWord);
  }, [passWord]);

  return (
    <div className="passContainer w-full h-screen bg-zinc-900 text-white flex justify-center items-center">
      <div className="flex flex-col items-center w-full max-w-md px-4">
        <h1 className="text-center text-4xl pt-3">Password Generator</h1>
        <div className="input mt-6 w-full flex flex-col sm:flex-row">
          <input 
            type="text" 
            className="p-3 bg-transparent text-2xl rounded-t-xl sm:rounded-t-none sm:rounded-l-xl outline-none border-2 border-zinc-700 flex-grow" 
            value={passWord} 
            ref={passRef} 
            readOnly 
          />
          <button 
            className="p-3 text-2xl bg-blue-400 hover:bg-blue-500 text-white rounded-b-xl sm:rounded-b-none sm:rounded-r-xl border-2 border-blue-400 hover:border-blue-500 transition duration-200" 
            onClick={handleCopyClipboard}
          >
            Copy
          </button>
        </div>
        <div className="passItem mt-5 w-full"></div>
        <div className="flex flex-col sm:flex-row items-center mt-4 w-full">
          <input 
            type="range" 
            className="w-full sm:w-auto" 
            value={len} 
            min={0} 
            max={100} 
            onChange={(e) => setLen(e.target.value)} 
          />
          <p className="ml-2 mr-2 mt-2 sm:mt-0">Length({len})</p>
          <label className="ml-3 mr-1 mt-2 sm:mt-0 text-orange-400">Numbers</label>
          <input 
            type="checkbox" 
            className="form-checkbox h-5 w-5 text-orange-400" 
            onChange={() => setNumberAllowed(prev => !prev)} 
          />
          <label className="ml-3 mr-1 mt-2 sm:mt-0 text-orange-400">Characters</label>
          <input 
            type="checkbox" 
            className="form-checkbox h-5 w-5 text-orange-400" 
            onChange={() => setCharAllowed(prev => !prev)} 
          />
        </div>
      </div>
    </div>
  );
}

export default App;
