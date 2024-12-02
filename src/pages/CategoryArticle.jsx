import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

const CategoryArticle = () => {
    const [article, setArticle] = useState("")
    const [images, setImages] = useState([]) 
    const [loading, setLoading] = useState(false)

    // const accounts = ["ESPNcricinfo", "ICC", "cricbuzz", "BCCI", "WisdenCricket"]
    const location = useLocation();

    useEffect(() => {
      const queryParams = new URLSearchParams(location.search);
      const categoryFromUrl = queryParams.get("category");
  
      if (categoryFromUrl) {
        
        testApi(categoryFromUrl.toLocaleLowerCase()); 
      }
    }, [location.search]); 

    const testApi = async (category) => {
      console.log(category)
      setLoading(true)
        try {
          const url = 'http://localhost:5000/api/twitter/category/article'; 
          const payload = {
            category,
          }; 
    
          const res = await axios.post(url, payload);
          console.log(res)
          setArticle(res.data.article)
          setImages(res.data.images)
          // console.log(res.data)
          setLoading(false)
        } catch (err) {
          console.error(err)
          setLoading(false)
        }
      };

      // useEffect(()=>{
      //   testApi()
      // },[])
  return (
    <main className='custom-container px-4 py-4'>
      {loading?(
        <section>
          <div className='mx-auto max-w-lg text-center text-[18px] font-semibold'>
            Loading...
          </div>
        </section>
      ):(
        <section>
            <div className='mx-auto max-w-lg'>
            {images.length !== 0 && (
                images.map((img, index)=>{
                   return <div key={index}>
                     <img src={img} className='mt-2 rounded-[6px] w-full min-h-[300px] object-cover' alt="imgg" />
                   </div>
                })
            )}
            {article &&(
                <div className='text-[15px] mt-4' style={{letterSpacing:"1px"}}>
                    {article}
                </div>
            ) }
            </div>
        </section>
      )}
        
       
    </main>
  )
}

export default CategoryArticle