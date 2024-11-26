import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TrendingArticles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [trend, setTrend] = useState('');

  // Function to get yesterday's date in 'yyyy-mm-dd' format
  const getYesterdayDate = () => {
    const date = new Date();
    date.setDate(date.getDate() - 1); // Set the date to yesterday
    const yyyy = date.getFullYear();
    const mm = (date.getMonth() + 1).toString().padStart(2, '0');
    const dd = date.getDate().toString().padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  // Extract 'trend' from the query string in the URL
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const trendFromUrl = queryParams.get('trend');
    if (trendFromUrl) {
      setTrend(trendFromUrl.toLocaleLowerCase()); // Update 'trend' state
    }
  }, []);

  // Fetch trending articles based on the 'trend' state
  useEffect(() => {
    if (!trend) return; // Prevent the API call if the 'trend' is not set

    const fetchTrendingArticles = async () => {
      const start_date = getYesterdayDate(); // Get yesterday's date

      try {
        // Make the API request with 'trend' and 'start_date'
        const response = await axios.get(`http://localhost:5000/api/twitter/search?query=${trend}&start_date=${start_date}`);

        // Update the state with the fetched articles
        setArticles(response.data.data.results);
        setLoading(false);
      } catch (error) {
        setError('Error fetching trending articles');
        setLoading(false);
      }
    };

    fetchTrendingArticles();
  }, [trend]); // Re-run whenever 'trend' changes

  // Function to format the creation date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return date.toLocaleDateString('en-GB', options);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Trending Articles</h2>
      <div className="space-y-4">
        {articles.map((article, index) => (
          <div key={index} className="border border-gray-300 rounded-lg overflow-hidden shadow-md">
            {/* Display Media */}
            {article.media_url && article.media_url[0] && (
              <img
                src={article.media_url[0]}
                alt="Media"
                className="w-[70%] mx-auto h-[400px] object-cover"
              />
            )}
            {/* Display Text */}
            <p className="p-4 text-gray-700">{article.text}</p>
            {/* Format and display Creation Date */}
            <p className="p-4 text-gray-500 text-sm">{formatDate(article.creation_date)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingArticles;
