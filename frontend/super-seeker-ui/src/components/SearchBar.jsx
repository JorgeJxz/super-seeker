import React from 'react';

export default function SearchBar({ query, onChange, onSubmit, loading }) {
    return (
        <div>
            <input
                type="text"
                value={query}
                onChange={(e) => onChange(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && onSubmit()}
                placeholder="Enter search term..."
            />
            <button onClick={onSubmit} disabled={!query || loading}>
                Search
            </button>
        </div>
    );
}