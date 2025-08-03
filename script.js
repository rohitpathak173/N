const API_KEY = "f879d50e460b7cda9f2deedb6d60b8e5";
const newsContainer = document.getElementById("news-container");

async function fetchNews(category = "general") {
  newsContainer.innerHTML = "<p>Loading news...</p>";

  try {
    const url = `https://gnews.io/api/v4/top-headlines?category=${category}&lang=en&country=in&token=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();

    if (!data.articles || data.articles.length === 0) {
      newsContainer.innerHTML = "<p>No news available right now.</p>";
      return;
    }

    newsContainer.innerHTML = data.articles.map(article => `
      <div class="news-card">
        <img src="${article.image || 'https://via.placeholder.com/300'}" alt="News Image">
        <h2>${article.title}</h2>
        <p>${article.description || 'No description available.'}</p>
        <a href="${article.url}" target="_blank">Read More</a>
      </div>
    `).join('');

  } catch (error) {
    console.error("Error fetching news:", error);
    newsContainer.innerHTML = "<p>Failed to load news. Check your API key or network.</p>";
  }
}

// Load default category
fetchNews();
