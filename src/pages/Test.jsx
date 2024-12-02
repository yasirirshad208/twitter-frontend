import axios from 'axios';
import React from 'react'

const Test = () => {
    const accounts = ["ESPNcricinfo", "ICC", "cricbuzz", "BCCI", "WisdenCricket"]
    const testApi = async () => {
        try {
          const url = 'http://localhost:5000/api/twitter/category/article'; // Replace with your API endpoint
          const payload = {
            category: 'cricket',
            accounts
          }; 
    
          const res = await axios.post(url, payload);
          console.log(res.data)
        } catch (err) {
          console.error(err)
        }
      };
  return (
    <div onClick={testApi}>Test</div>
  )
}

export default Test