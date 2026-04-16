export default function AnalysisPanel({ wordFreq, bigramFreq, sentiment }) {
  const totalSentiment = sentiment 
    ? Object.values(sentiment).reduce((a, b) => a + b, 0) 
    : 0;

  const sentimentPercentages = sentiment && totalSentiment > 0
    ? {
        positive: ((sentiment.positive || 0) / totalSentiment * 100).toFixed(1),
        neutral: ((sentiment.neutral || 0) / totalSentiment * 100).toFixed(1),
        negative: ((sentiment.negative || 0) / totalSentiment * 100).toFixed(1)
      }
    : { positive: 0, neutral: 0, negative: 0 };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      <div className="bg-gray-800 rounded-xl p-6">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-3 h-3 bg-metro-green rounded-full"></span>
          Sentiment Analysis
        </h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-green-400">Positive</span>
              <span className="text-gray-400">{sentimentPercentages.positive}%</span>
            </div>
            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-green-500 transition-all duration-500"
                style={{ width: `${sentimentPercentages.positive}%` }}
              />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-400">Neutral</span>
              <span className="text-gray-400">{sentimentPercentages.neutral}%</span>
            </div>
            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gray-500 transition-all duration-500"
                style={{ width: `${sentimentPercentages.neutral}%` }}
              />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-red-400">Negative</span>
              <span className="text-gray-400">{sentimentPercentages.negative}%</span>
            </div>
            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-red-500 transition-all duration-500"
                style={{ width: `${sentimentPercentages.negative}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 rounded-xl p-6">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-3 h-3 bg-metro-blue rounded-full"></span>
          Top Keywords
        </h3>
        <div className="flex flex-wrap gap-2">
          {wordFreq?.slice(0, 12).map(([word, count], index) => (
            <span 
              key={word}
              className="px-3 py-1 bg-metro-blue/30 text-metro-blue rounded-full text-sm"
              style={{ opacity: 1 - (index * 0.05) }}
            >
              {word} ({count})
            </span>
          ))}
        </div>
      </div>

      <div className="bg-gray-800 rounded-xl p-6">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-3 h-3 bg-metro-purple rounded-full"></span>
          Top Bigrams
        </h3>
        <div className="flex flex-wrap gap-2">
          {bigramFreq?.slice(0, 8).map(([bigram, count], index) => (
            <span 
              key={bigram}
              className="px-3 py-1 bg-metro-purple/30 text-metro-purple rounded-full text-sm"
              style={{ opacity: 1 - (index * 0.08) }}
            >
              {bigram}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
