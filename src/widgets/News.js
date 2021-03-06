import React, { useEffect, useState } from "react";
import "../style/style.scss";

const News = () => {
  let todayDate = new Date(); // set variable to today's date to fetch today's news

  const [data, setData] = useState({ articles: [] });

  useEffect(() => {
    const fetchData = async () => {
      await fetch(
        `http://newsapi.org/v2/everything?q=bitcoin&from=${todayDate}&sortBy=publishedAt&apiKey=080166ce3b2842bba7e9d29cc29840c4`
      )
        .then((response) => response.json())
        .then((data) => setData(data))
        .then((result) => {
          console.log("Success:", result);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    };

    fetchData();
  }, [todayDate]);
  return (
    <div className="newsCards">
      <h2>Today's News</h2>
      <ul>
        {data.articles.map((news, index) => (
          <li key={index} style={{ listStyle: "none" }}>
            <div className="container">
              <h5>
                <span role="img" aria-label="calendar">
                  🗓
                </span>
                {new Date(news.publishedAt).toDateString()}
              </h5>
              <img
                className="container__image"
                src={news.urlToImage}
                alt="imgNews"
                width="200"
                height="150"
              />

              <div className="container__text">
                <a href={news.url} target="target_blank">
                  <h3>{news.title}</h3>
                </a>
                <p>
                  {news.description}
                  <span role="img" aria-label="hand">
                    ✍🏻
                  </span>
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default News;
