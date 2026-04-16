import { useState } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import CategoryFilter from "./components/CategoryFilter";
import ResultsPanel from "./components/ResultsPanel";

function App() {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchNews = async (topic) => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8000/api/news?topic=${encodeURIComponent(topic)}`
      );
      if (!response.ok) throw new Error("Failed to fetch news");
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error("Error fetching results:", error);
      setResults({ error: error.message });
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (!query.trim()) return;
    setSelectedCategory(null);
    fetchNews(query.trim());
  };

  const handleCategorySelect = (category) => {
    setQuery(category);
    setSelectedCategory(category);
    fetchNews(category);
  };

  const handleLogoClick = () => {
    setQuery("");
    setSelectedCategory(null);
    setResults(null);
  };

  return (
    <div className="min-h-screen bg-[#1a1a2e]">
      <Header onLogoClick={handleLogoClick} />
      <main className="max-w-7xl mx-auto px-6 py-8">
        <SearchBar
          query={query}
          onChange={setQuery}
          onSubmit={handleSearch}
          loading={loading}
        />
        <CategoryFilter
          onSelect={handleCategorySelect}
          selectedCategory={selectedCategory}
        />
        <ResultsPanel results={results} loading={loading} />
      </main>
    </div>
  );
}

export default App;
