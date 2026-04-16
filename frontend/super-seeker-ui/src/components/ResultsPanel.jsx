import NewsGrid from './NewsGrid';
import AnalysisPanel from './AnalysisPanel';

export default function ResultsPanel({ results, loading }) {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="w-16 h-16 border-4 border-metro-blue border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-gray-400 text-lg">Loading news...</p>
      </div>
    );
  }

  if (!results) {
    return (
      <div className="text-center py-20">
        <div className="inline-block p-6 bg-gray-800/50 rounded-xl">
          <svg className="w-16 h-16 mx-auto text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
          <h2 className="text-2xl font-bold text-gray-300 mb-2">Welcome to SuperSeeker</h2>
          <p className="text-gray-500">Search for any topic to discover trending news</p>
        </div>
      </div>
    );
  }

  if (results.error) {
    return (
      <div className="text-center py-20">
        <div className="inline-block p-6 bg-red-900/30 rounded-xl border border-red-800">
          <svg className="w-12 h-12 mx-auto text-red-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-red-400 text-lg">{results.error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <AnalysisPanel 
        wordFreq={results.word_freq}
        bigramFreq={results.bigram_freq}
        sentiment={results.sentiment}
      />
      <div>
        <h2 className="text-2xl font-bold text-white mb-6">Latest News</h2>
        <NewsGrid articles={results.articles} />
      </div>
    </div>
  );
}
