import React from 'react';

const ProductCard = ({ product }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="text-orange-400">★</span>);
    }
    
    if (hasHalfStar) {
      stars.push(<span key="half" className="text-orange-400">☆</span>);
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="text-gray-300">★</span>);
    }
    
    return stars;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden group cursor-pointer border border-gray-200">
      {/* Product Image */}
      <div className="relative overflow-hidden bg-gray-50" style={{minHeight: '80px'}}>
        {product.image ? (
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-20 object-cover object-center group-hover:scale-105 transition-transform duration-300"
            style={{aspectRatio: '1/1'}}
            onError={(e) => {
              e.target.onerror = null;
              e.target.style.display = 'none';
              e.target.parentElement.innerHTML = `
                <div class="w-full h-20 flex flex-col items-center justify-center bg-gray-200" style="aspect-ratio: 1/1;">
                  <svg class="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 16l4.586-4.586a2 2 0 012.828 0l3.172 3.172a4 4 0 01-5.656 0M12 8l.01 0M16 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <span class="text-xs text-gray-500 mt-1">No Image</span>
                </div>
              `;
            }}
          />
        ) : (
          <div className="w-full h-20 flex flex-col items-center justify-center bg-gray-200" style={{aspectRatio: '1/1'}}>
            <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0l3.172 3.172a4 4 0 01-5.656 0M12 8l.01 0M16 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <span className="text-xs text-gray-500 mt-1">No Image</span>
          </div>
        )}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
            <span className="bg-red-600 text-white px-1 py-0.5 rounded text-xs font-medium">
              Out of Stock
            </span>
          </div>
        )}
        {product.category && (
          <span className="absolute top-1 left-1 bg-orange-500 text-white px-1 py-0.5 rounded text-xs font-medium">
            {product.category}
          </span>
        )}
      </div>

      {/* Product Info */}
      <div className="p-2">
        <h3 className="text-xs font-medium text-gray-900 mb-1 line-clamp-2 group-hover:text-orange-600 transition-colors">
          {product.name}
        </h3>
        
        <div className="flex items-center mb-1">
          {renderStars(product.rating)}
          <span className="ml-1 text-xs text-gray-600">
            ({product.reviews})
          </span>
        </div>
        
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-bold text-gray-900">
            {formatPrice(product.price)}
          </span>
          {product.inStock ? (
            <span className="text-xs text-green-600 font-medium">In Stock</span>
          ) : (
            <span className="text-xs text-red-600 font-medium">Out of Stock</span>
          )}
        </div>

        {/* Action Button */}
        <button 
          className={`w-full py-1 px-1 rounded text-xs font-medium transition-all ${
            product.inStock 
              ? 'bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white shadow-sm' 
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          }`}
          disabled={!product.inStock}
        >
          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
