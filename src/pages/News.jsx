import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import axios from 'axios';
import { TiTick } from 'react-icons/ti';

const News = () => {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [userTweets, setUserTweets] = useState([]);
  const [trendingTopics, setTrendingTopics] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    // try {
      try {
        const userResponse = await axios.get(`http://localhost:5000/api/twitter/user/details`, {
          params: { username },
        });
        setUserData(userResponse.data.data);
      } catch (error) {
        console.error("User data fetch error:", error);
      }
      

      // Fetch trending topics
    //   const trendingResponse = await axios.get(`http://localhost:5000/api/twitter/trending`, {
    //     params: { username },
    //   });
    //   setTrendingTopics(trendingResponse.data);

      // setError(null);
    // } catch (error) {
    //   console.log(error)
    //   setError('Unable to fetch data for this user');
    //   setUserData(null);
    //   setUserTweets([]);
    //   setTrendingTopics([]);
    // }
  };

  const userTweetsApi = async()=>{
    try {
      const tweetsResponse = await axios.get(`http://localhost:5000/api/twitter/user/tweets`, {
        params: { username },
      });
      setUserTweets(tweetsResponse.data.data);
      console.log(tweetsResponse)
    } catch (error) {
      console.error("Tweets fetch error:", error);
    }
  }

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Search Bar */}
      <section className="flex items-center w-full sm:w-[50%] mx-auto mb-8">
        <input
          type="text"
          className="py-3 px-4 w-full rounded-l-[50px] outline-none border-black border"
          placeholder="Search with username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button
          onClick={() => {
            userTweetsApi();
            handleSearch();
            
          }}
          
          className="flex items-center gap-2 text-white bg-black py-3 border-[2px] border-black px-4 rounded-r-[50px]"
        >
          <FaSearch /> Search
        </button>
      </section>

      {userData &&
      <div>
      <div className='w-[420px] border border-[gainsboro]'>
        <div className='flex items-center'>
          <img src={userData.profile_pic_url} className='w-[80px] h-[80px] rounded-[50%] object-cover' alt="User Profile" />
          <div className='ml-4'>
          <h4 className="text-[24px] font-[600] flex items-center">
            {userData.name} 
            {userData.is_blue_verified && (
              <span className="ml-1 w-[13px] h-[13px] rounded-[50%] bg-blue-500 text-white flex justify-center items-center">
                <TiTick />
              </span>
            )}
          </h4>
          <span >@{userData.username}</span>
          </div>
        </div>
        <div className='text-[15px] mt-4 text-center text-[#787878]'>
        {userData.description}
        </div>
      </div>
    </div>
      }


      {/* {userTweets && 
        <section className='border'>
          {userTweets.map((tweet)=>{
            return <div>
            <div className='flex items-center'>
              <img src={userData.profile_pic_url} className='w-[40px] h-[40px] rounded-[50%]' alt="User Image" />
              <div className='ml-2'>
                <h4 className="text-[15px] leading-none font-[500] mt-1">
                  {userData.name}
                </h4>
                <span className="text-[14px] text-[#787878]">
                  {new Date(tweet.creation_date).toLocaleString('en-GB', {
                    day: '2-digit',
                    month: 'short',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
            </div>
          </div>
          })}
        </section>
        // userTweets.map((tweet)=>{
        //   tweet.text
        // })
      }  */}
    </main>
  );
};

export default News;


