import './App.css';
import Zoom from './Zoom';
import { useState } from 'react';

function App() {
  const [joinMeeting, setJoinMeeting] = useState(false)

  return (
    <div className="App">
      {joinMeeting ? (
        <Zoom />
      ) : (
        <button onClick={() => setJoinMeeting(true)} style={{border: `1px solid black`}}>
          Join Meeting
        </button>
      )}
    </div>
  );
}

export default App;
