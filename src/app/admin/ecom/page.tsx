"use client"

import React, { useState, useEffect } from 'react';
import { FaStar, FaShoppingCart, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const ProductPage = () => {
  const [product, setProduct] = useState({
    name: 'Premium Leather Jacket',
    price: 199.99,
    description: 'High-quality leather jacket with a modern design. Perfect for any casual or semi-formal occasion.',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80',
    variants: [
      { name: 'Size', options: ['S', 'M', 'L', 'XL'] },
      { name: 'Color', options: ['Black', 'Brown', 'Tan'] }
    ],
    stock: 10,
    rating: 4.5,
    reviews: [
      { user: 'John D.', rating: 5, comment: 'Excellent quality and fit!' },
      { user: 'Sarah M.', rating: 4, comment: 'Great jacket, slightly pricey.' }
    ]
  });

  const [selectedVariants, setSelectedVariants] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [cartItems, setCartItems] = useState(0);
  const [showMiniCart, setShowMiniCart] = useState(false);
  const [userReview, setUserReview] = useState({ rating: 0, comment: '' });
  const [error, setError] = useState('');
  const [zoomedImage, setZoomedImage] = useState(false);

  const relatedProducts = [
    { name: 'Denim Jacket', price: 89.99, image: 'https://images.unsplash.com/photo-1551537482-f2075a1d41f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80' },
    { name: 'Bomber Jacket', price: 129.99, image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=736&q=80' },
    { name: 'Windbreaker', price: 79.99, image: 'https://images.unsplash.com/photo-1604644401890-0bd678c83788?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80' },
  ];

  useEffect(() => {
    // Initialize selected variants
    const initialVariants = {};
    product.variants.forEach(variant => {
      initialVariants[variant.name] = variant.options[0];
    });
    setSelectedVariants(initialVariants);
  }, [product.variants]);

  const handleVariantChange = (variantName, value) => {
    setSelectedVariants(prev => ({ ...prev, [variantName]: value }));
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (isNaN(value) || value < 1) {
      setError('Please enter a valid quantity');
    } else if (value > product.stock) {
      setError(`Sorry, only ${product.stock} items are available`);
    } else {
      setQuantity(value);
      setError('');
    }
  };

  const addToCart = () => {
    if (quantity > product.stock) {
      setError(`Sorry, only ${product.stock} items are available`);
      return;
    }
    setCartItems(prev => prev + quantity);
    setError('');
  };

  const submitReview = () => {
    if (userReview.rating === 0) {
      setError('Please select a rating');
      return;
    }
    setProduct(prev => ({
      ...prev,
      reviews: [...prev.reviews, { user: 'You', ...userReview }]
    }));
    setUserReview({ rating: 0, comment: '' });
    setError('');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row -mx-4">
        <div className="md:flex-1 px-4">
          <div className="h-64 md:h-80 rounded-lg bg-gray-100 mb-4 relative overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className={`w-full h-full object-cover ${zoomedImage ? 'scale-150' : 'scale-100'} transition-transform duration-300`}
              onMouseEnter={() => setZoomedImage(true)}
              onMouseLeave={() => setZoomedImage(false)}
            />
          </div>
        </div>
        <div className="md:flex-1 px-4">
          <h2 className="mb-2 leading-tight tracking-tight font-bold text-gray-800 text-2xl md:text-3xl">{product.name}</h2>
          <p className="text-gray-500 text-sm">By <a href="#" className="text-indigo-600 hover:underline">ABC Company</a></p>

          <div className="flex items-center space-x-4 my-4">
            <div>
              <div className="rounded-lg bg-gray-100 flex py-2 px-3">
                <span className="font-bold text-indigo-600 text-3xl">${product.price}</span>
              </div>
            </div>
            <div className="flex-1">
              <p className="text-green-500 text-xl font-semibold">Save 12%</p>
              <p className="text-gray-400 text-sm">Inclusive of all Taxes.</p>
            </div>
          </div>

          <p className="text-gray-500">{product.description}</p>

          <div className="my-4">
            {product.variants.map((variant, index) => (
              <div key={index} className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  {variant.name}
                </label>
                <div className="relative">
                  <select
                    className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    value={selectedVariants[variant.name]}
                    onChange={(e) => handleVariantChange(variant.name, e.target.value)}
                  >
                    {variant.options.map((option, optionIndex) => (
                      <option key={optionIndex} value={option}>{option}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Quantity
            </label>
            <input
              type="number"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={quantity}
              onChange={handleQuantityChange}
              min="1"
              max={product.stock}
            />
          </div>

          {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}

          <button
            className="bg-indigo-600 text-white py-2 px-4 rounded-full font-bold hover:bg-indigo-500 transition-colors duration-300"
            onClick={addToCart}
          >
            Add to Cart
          </button>

          <div className="mt-4 relative">
            <button
              className="text-indigo-600 hover:text-indigo-900 font-semibold flex items-center"
              onMouseEnter={() => setShowMiniCart(true)}
              onMouseLeave={() => setShowMiniCart(false)}
            >
              <FaShoppingCart className="mr-2" />
              Cart ({cartItems})
            </button>
            {showMiniCart && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl z-10 p-4">
                <h3 className="font-bold text-lg mb-2">Cart ({cartItems})</h3>
                <ul>
                  <li className="mb-2">{product.name} x {quantity}</li>
                </ul>
                <button className="bg-indigo-600 text-white py-2 px-4 rounded-full font-bold hover:bg-indigo-500 transition-colors duration-300 w-full">
                  View Full Cart
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-16">
        <h3 className="text-gray-600 text-2xl font-semibold mb-4">Reviews</h3>

        <div className="flex items-center mb-4">
          <p className="text-4xl font-bold text-yellow-400 mr-4">{product.rating.toFixed(1)}</p>
          <div>
            <div className="flex">
              {[...Array(5)].map((_, index) => (
                <FaStar
                  key={index}
                  className={index < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}
                />
              ))}
            </div>
            <p className="text-sm text-gray-500">{product.reviews.length} reviews</p>
          </div>
        </div>

        <div className="space-y-4">
          {product.reviews.map((review, index) => (
            <div key={index} className="border-b pb-4">
              <p className="font-semibold">{review.user}</p>
              <div className="flex mb-1">
                {[...Array(5)].map((_, starIndex) => (
                  <FaStar
                    key={starIndex}
                    className={starIndex < review.rating ? 'text-yellow-400' : 'text-gray-300'}
                  />
                ))}
              </div>
              <p className="text-gray-600">{review.comment}</p>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <h4 className="text-lg font-semibold mb-4">Leave a Review</h4>
          <div className="flex mb-4">
            {[...Array(5)].map((_, index) => (
              <FaStar
                key={index}
                className={`cursor-pointer ${index < userReview.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                onClick={() => setUserReview(prev => ({ ...prev, rating: index + 1 }))}
              />
            ))}
          </div>
          <textarea
            className="w-full p-2 border rounded-lg mb-4"
            rows="4"
            placeholder="Write your review here..."
            value={userReview.comment}
            onChange={(e) => setUserReview(prev => ({ ...prev, comment: e.target.value }))}
          ></textarea>
          <button
            className="bg-indigo-600 text-white py-2 px-4 rounded-full font-bold hover:bg-indigo-500 transition-colors duration-300"
            onClick={submitReview}
          >
            Submit Review
          </button>
        </div>
      </div>

      <div className="mt-16">
        <h3 className="text-gray-600 text-2xl font-semibold mb-4">Related Products</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {relatedProducts.map((product, index) => (
            <div key={index} className="border rounded-lg p-4">
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-4 rounded" />
              <h4 className="font-semibold mb-2">{product.name}</h4>
              <p className="text-gray-600">${product.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
