const sentimentColors = {
  positive: 'bg-metro-green',
  neutral: 'bg-gray-500',
  negative: 'bg-metro-red'
};

const tileColors = ['metro-blue', 'metro-green', 'metro-orange', 'metro-purple', 'metro-red', 'metro-teal'];

export default function NewsCard({ article, size = 'medium', colorIndex = 0 }) {
  const colorClass = `metro-tile-${tileColors[colorIndex % tileColors.length]}`;
  const sentimentClass = sentimentColors[article.sentiment] || 'bg-gray-500';
  
  const sizeClasses = {
    hero: 'col-span-2 row-span-2 min-h-[400px]',
    large: 'col-span-2 min-h-[200px]',
    medium: 'min-h-[180px]',
    small: 'min-h-[140px]'
  };

  const textSizes = {
    hero: 'text-3xl',
    large: 'text-xl',
    medium: 'text-lg',
    small: 'text-base'
  };

  return (
    <a 
      href={article.url} 
      target="_blank" 
      rel="noopener noreferrer"
      className={`metro-tile ${colorClass} ${sizeClasses[size]} flex flex-col justify-end p-6 group`}
    >
      {article.imageUrl && size !== 'small' && (
        <div className="absolute inset-0 opacity-30 group-hover:opacity-50 transition-opacity">
          <img 
            src={article.imageUrl} 
            alt="" 
            className="w-full h-full object-cover"
            onError={(e) => e.target.style.display = 'none'}
          />
        </div>
      )}
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-2">
          <span className={`px-2 py-1 rounded text-xs font-semibold ${sentimentClass}`}>
            {article.sentiment}
          </span>
          <span className="text-sm opacity-80">{article.source}</span>
        </div>
        <h3 className={`font-bold leading-tight ${textSizes[size]} mb-2 line-clamp-3`}>
          {article.title}
        </h3>
        {size === 'hero' && article.description && (
          <p className="text-sm opacity-90 line-clamp-2">{article.description}</p>
        )}
      </div>
    </a>
  );
}
