import React, { useContext, useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import { TiTick } from "react-icons/ti";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { useLocation } from "react-router-dom";
import AuthContext from "../context/authContext";

const News = () => {
  const [user, setUser] = useState(true);
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState(null);
  const [userTweets, setUserTweets] = useState([]);
  const [favourites, setfavourites] = useState([]);
  const [error, setError] = useState(null);
  const {isLoggedIn} = useContext(AuthContext)
  const [addedToFav, setAddedToFav] = useState(false)

  const location = useLocation(); // React Router location object

  const token = localStorage.getItem('token')

  const searchApi = async (query) => {
    try {
      const tweetsResponse = await axios.get(
        `http://localhost:5000/api/twitter/search`,
        {
          params: { query },
        }
      );
      setUserTweets(tweetsResponse.data.data.results);
    } catch (error) {
      alert("Tweets fetch error:", error);
    }
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const trendFromUrl = queryParams.get("trend");

    if (trendFromUrl) {
      setUsername(trendFromUrl.toLocaleLowerCase()); // Update username
      setUser(false);
      searchApi(trendFromUrl.toLocaleLowerCase()); // Pass directly
    }
  }, [location.search]); // Dependency on URL search string

  const handleApis = () => {
    if (user) {
      
      handleSearch(username);
      userTweetsApi(username);
    } else {
      searchApi(username);
    }
  };

  useEffect(()=>{
    fetchFavourite()
    
  },[])

  const handleSearch = async (user) => {
    setAddedToFav(false)
    try {
      const userResponse = await axios.get(
        `http://localhost:5000/api/twitter/user/details`,
        {
          params: { username:user },
        }
      );
      setUserData(userResponse.data.data);

      const foundFav=favourites.find((fav)=>fav.username === userData.username)
      if(foundFav){
        setAddedToFav(true)
      }
    } catch (error) {
    }
  };

  const userTweetsApi = async (user) => {
    try {
      const tweetsResponse = await axios.get(
        `http://localhost:5000/api/twitter/user/tweets`,
        {
          params: { username:user },
        }
      );
      setUserTweets(tweetsResponse.data.data.results);
      setUser(true)
    } catch (error) {
    }
  };

  const addFavourite = async ()=>{
    try {
      const tweetsResponse = await axios.post(
        `http://localhost:5000/api/favourite/add`,
        {
          name: userData.name,
          username: userData.username,
          bio: userData.description,
          avatar: userData.profile_pic_url,
          twitterId: userData.user_id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      favourites.push(tweetsResponse.data.data);
      setAddedToFav(true)
    } catch (error) {
      alert( error.response.data.message);
    }
  }

  const fetchFavourite = async ()=>{
    try {
      const tweetsResponse = await axios.get(
        `http://localhost:5000/api/favourite/get`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setfavourites(tweetsResponse.data.data);
    } catch (error) {
      alert( error.response.data.message);
    }
  }

 const removeFavourite = async(user)=>{
  try {
    const tweetsResponse = await axios.delete(
      `http://localhost:5000/api/favourite/delete/${user}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const favs = favourites.filter((fav)=>{
      return fav.username !== user
    })
    setfavourites(favs);
    // alert(tweetsResponse)
  } catch (error) {
    // alert( error.response.data.message);
  }
 }

  return (
    <>
    <main className="custom-container px-4 py-4">
      {/* Search Bar */}
      <section className="flex w-full sm:w-[50%] mx-auto mb-8 flex-col">
        <div className="flex gap-4 pl-2 mb-2">
          <button className={`font-semibold text-[18px] ${user ? 'text-[#000] underline':'text-[#787878]'}`} onClick={()=>setUser(true)}>User</button>
          <button className={`${user ? 'text-[#787878]':'text-[#000] underline'} font-semibold text-[18px]`} onClick={()=>setUser(false)}>News</button>
        </div>

        <div className="flex items-center">
          <input
            type="text"
            className="py-3 px-4 w-full rounded-l-[50px] outline-none border-black border"
            placeholder={`${user ? 'Search with username':'Search with topic name'}`}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button
            onClick={() => {
              handleApis();
            }}
            className="flex items-center gap-2 text-white bg-black py-3 border-[2px] border-black px-4 rounded-r-[50px]"
          >
            <FaSearch /> Search
          </button>
        </div>
      </section>

      <div className="flex relative">
        {favourites.length !==0 && isLoggedIn && user && (
          
          <div className="absolute left-0">
            <h2 className="text-[20px] font-semibold mb-8">Favourites</h2>
            {favourites.map((fav)=>{
            return <div className="flex justify-between w-[250px] mb-4">
              <div className="flex items-center">
                {fav.avatar !== null && (
                  <img
                    src={fav.avatar}
                    className="w-[40px] h-[40px] rounded-[50%]"
                    alt="User Image"
                  />
                )}
                <div className="ml-2 cursor-pointer" onClick={()=>{
                  setUsername(fav.username);
                  handleSearch(fav.username)
                  userTweetsApi(fav.username)
                
                }}>
                  <h4 className="text-[15px] leading-none font-[500] mt-1">
                    {fav.name}
                  </h4>
                  <span className="text-[14px] text-[#787878]">
                    {fav.username}
                  </span>
                </div>
              </div>
              <div className="mt-1">
                <FaHeart className="text-[22px]  text-[#F33A6A] cursor-pointer hover:translate-y-[-2px] transition-transform duration-200" onClick={()=>removeFavourite(fav.username)}/>
              </div>
            </div>
            })}
          </div>
        )}

        <div className="max-w-xl mx-auto">
          {userData && user  && (
            <div className="mb-10">
              <div className="">
                <div className="flex items-center">
                  {userData.profile_pic_url !== null && (
                    <img
                      src={userData.profile_pic_url}
                      className="w-[80px] h-[80px] rounded-[50%] object-cover"
                      alt="User Profile"
                    />
                  )}
                  <div className="ml-4 flex gap-10 w-full justify-between">
                    <div>
                      <h4 className="text-[24px] font-[600] flex items-center">
                        {userData.name}
                        {userData.is_blue_verified && (
                          <span className="ml-1 w-[13px] h-[13px] rounded-[50%] bg-blue-500 text-white flex justify-center items-center">
                            <TiTick />
                          </span>
                        )}
                      </h4>
                      <span>@{userData.username}</span>
                    </div>
                    {
                      isLoggedIn &&

                      <div className=" mt-2 mr-8">
                        {addedToFav ?(
                          <FaHeart className="text-[26px] text-[#F33A6A] cursor-pointer hover:translate-y-[-2px] transition-transform duration-200" onClick={()=>{removeFavourite(userData.username); setAddedToFav(false)}}/>
  

                        ):(
<FaRegHeart className="text-[26px] cursor-pointer hover:translate-y-[-2px] transition-transform duration-200" onClick={addFavourite}/>                        
                        )

                        }
                    </div>
                    }
                  </div>
                </div>
                <div className="text-[15px] mt-4 text-[#787878]">
                  {userData.description}
                </div>
              </div>
            </div>
          )}

          {userTweets && (
            <section className="">
              <div className="flex flex-col gap-8">
                {userTweets.map((tweet, index) => {
                  return (
                    <div key={index}>
                      <div className="flex items-center">
                        {userData !== null ?
                         userData.profile_pic_url !== null&& (
                          <img
                            src={userData.profile_pic_url}
                            className="w-[40px] h-[40px] rounded-[50%]"
                            alt="User Image"
                          />
                        )
                         :
                         tweet.user.profile_pic_url !== null && (
                          <img
                            src={tweet.user.profile_pic_url}
                            className="w-[40px] h-[40px] rounded-[50%]"
                            alt="User Image"
                          />
                        )
                         }
                        <div className="ml-2">
                          <h4 className="text-[15px] leading-none font-[500] mt-1">
                            {userData !== null ? userData.name : tweet.user.name}
                          </h4>
                          <span className="text-[14px] text-[#787878]">
                            {new Date(tweet.creation_date).toLocaleString(
                              "en-GB",
                              {
                                day: "2-digit",
                                month: "short",
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
                          </span>
                        </div>
                      </div>

                      <div className="mt-2">
                        <p className="text-[14px]">{tweet.text}</p>
                        {tweet.media_url !== null && (
                          <img
                            src={tweet.media_url[0]}
                            className="mt-2 rounded-[6px] w-full min-h-[300px] object-cover"
                          />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}
        </div>
      </div>
    </main>
    </>
  );
};

export default News;
