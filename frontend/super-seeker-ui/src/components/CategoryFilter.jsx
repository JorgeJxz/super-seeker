const categories = [
  { name: 'Technology', color: 'metro-blue' },
  { name: 'Business', color: 'metro-green' },
  { name: 'Sports', color: 'metro-orange' },
  { name: 'Science', color: 'metro-purple' },
  { name: 'Health', color: 'metro-red' },
  { name: 'Entertainment', color: 'metro-teal' },
  { name: 'World', color: 'metro-blue' },
  { name: 'Politics', color: 'metro-green' }
];

export default function CategoryFilter({ onSelect, selectedCategory }) {
  return (
    <div className="flex flex-wrap gap-3 justify-center mb-8">
      {categories.map((cat) => (
        <button
          key={cat.name}
          onClick={() => onSelect(cat.name)}
          className={`px-4 py-2 rounded-full font-medium text-sm transition-all duration-200
            ${selectedCategory === cat.name 
              ? `bg-${cat.color} text-white scale-105` 
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }
          `}
          style={selectedCategory === cat.name ? { backgroundColor: `var(--tw-${cat.color})` } : {}}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
}
