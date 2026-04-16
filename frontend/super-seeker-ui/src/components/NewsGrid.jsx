import NewsCard from './NewsCard';

export default function NewsGrid({ articles }) {
  if (!articles || articles.length === 0) {
    return (
      <div className="text-center text-gray-400 py-12">
        <p className="text-lg">No articles found</p>
        <p className="text-sm mt-2">Try searching for a different topic</p>
      </div>
    );
  }

  const getLayoutPattern = (index) => {
    const patterns = ['hero', 'small', 'small', 'medium', 'medium', 'small', 'small'];
    return patterns[index % patterns.length];
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[minmax(140px,auto)]">
      {articles.map((article, index) => (
        <NewsCard
          key={`${article.url}-${index}`}
          article={article}
          size={getLayoutPattern(index)}
          colorIndex={index}
        />
      ))}
    </div>
  );
}
