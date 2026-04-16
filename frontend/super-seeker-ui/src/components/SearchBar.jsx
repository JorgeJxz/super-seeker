export default function SearchBar({ query, onChange, onSubmit, loading }) {
  return (
    <div className="w-full max-w-3xl mx-auto mb-8">
      <div className="relative flex items-center">
        <input
          type="text"
          value={query}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && onSubmit()}
          placeholder="Search news topics..."
          disabled={loading}
          className="w-full px-6 py-4 bg-gray-800 text-white text-lg rounded-lg border-2 border-gray-700 focus:border-metro-blue focus:outline-none transition-colors placeholder-gray-500 disabled:opacity-50"
        />
        <button
          onClick={onSubmit}
          disabled={!query || loading}
          className="absolute right-2 px-6 py-2 bg-metro-blue text-white font-semibold rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
        >
          {loading ? (
            <>
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              <span>Loading...</span>
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span>Search</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
