import { useEffect, useState } from 'react';

function App() {
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    // 1. Get the URL from the environment variable
    const apiUrl = import.meta.env.VITE_API_URL;
    
    console.log("Fetching from:", apiUrl); // Check console to see if URL loads

    // 2. Fetch data from the Backend
    fetch(`${apiUrl}/`)
      .then((res) => res.json())
      .then((data) => {
        // 3. If successful, update the message
        setMessage(data.message);
      })
      .catch((err) => {
        // 4. If failed, show error
        console.error("Connection Error:", err);
        setMessage("Error: Could not connect to Backend. Check Console.");
      });
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px', fontFamily: 'sans-serif' }}>
      <h1>GlassBoard Connection Test</h1>
      
      <div style={{ padding: '20px', border: '1px solid #ccc', display: 'inline-block', borderRadius: '10px' }}>
        <p>Status from Backend:</p>
        {/* If this turns bold and says "Backend is LIVE...", you are connected! */}
        <h2 style={{ color: message.includes("Error") ? 'red' : 'green' }}>
          {message}
        </h2>
      </div>
    </div>
  );
}

export default App;