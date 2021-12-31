import './App.css';
import React, {useState} from 'react';

function App() {

  const [inpt, setInpt]=useState(null);             // stores text input
  const [print, setPrint]=useState(false);          // display result
  const [frqWrds, setFrequents]=useState(null);     // 3 most frequent words
  const [notification, setWarning]=useState(false); // warn user at wrong input

  // get input from text input field
  function getTxt(event) {
    setInpt(event.target.value)
    setPrint(false)
  }

  // count occurence of each word in input and store the 3 most frequent in frqWrds
  function countWords() {

    if(inpt == null){ // check for empty input
      setWarning(true)
      return;
    }
    
    var dict = { };
    var words = inpt.split(" ");

    for(var i = 0; i < words.length; i++)
        dict[words[i].toLowerCase()] = (dict[words[i].toLowerCase()] || 0) + 1;

    var items = Object.keys(dict).map(function(key) {
      return [key, dict[key]];
    });

    items.sort(function(first, second) {
      return second[1] - first[1];
    });

    if(items.length >= 3) {
      setFrequents(items.slice(0, 3));
      setPrint(true)
      setWarning(false)
    }
    else {
      setWarning(true)
    }
  }

  return (
    <div className="App">
        <p>
          Please insert your text.
        </p>
        <div>
        <textarea type="text" onChange={getTxt}></textarea>
        </div>
        
        <button onClick={()=>countWords()}>OK</button>
        {
          print ?
            <p> The most frequent words are: &nbsp; 
              {frqWrds[0][1]} x {frqWrds[0][0]}, &nbsp;
              {frqWrds[1][1]} x {frqWrds[1][0]}, &nbsp;
              {frqWrds[2][1]} x {frqWrds[2][0]}
            </p>
          : <p>Please click OK to find the three most common words.</p>
        }
        {
          notification ?
          <p> Please make sure to enter at least three different words seperated by whitespaces.</p> 
          : <p></p>
        }

    </div>
  );
}

export default App;
