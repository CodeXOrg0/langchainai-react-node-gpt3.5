import './App.css';
import { useState } from 'react';
import 'cal-sans'
import axios from 'axios'

function App() {
  const [response, setResponse] = useState('');

  // Function to get response from server.js
  const handleResponse = () => {
    // Change the port if you change it in server.js
     fetch('http://localhost:8000/')
      .then(res => res.json())
      .then(data => {
        setResponse(data.text)
        console.log(data.text)
     })
  }

  // Function to send data to server.js when the submit button is clicked
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submit button clicked')
    // Send data to server.js
    axios.post('http://localhost:8000', {
      data: e.target[0].value
    })
    e.target[0].value = ''
    handleResponse()
  }

  // Function to render the response from server.js
  const renderPoints = () => {
    const points = response.split('\n').map((point, index) => {
      return <div key={index}>{point}</div>;
    });
    return points;
  }


  
  return (
    <div className="App">
      <h1 className='title'>TITLE GOES HERE</h1>

      <form className='form' onSubmit={handleSubmit}>
        <input className='input' type='text' placeholder='Enter your prompt here' />
        <button className='button' type='submit'>Submit</button>
      </form>

      <div className='points'>{renderPoints()}</div>
    </div>
  );
}

export default App;
