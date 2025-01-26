import React, { useEffect, useState } from 'react';
import "./style.css";
import { fetchProducts, createPaymentLink } from '../api'; // Import API methods

const ProductList = () => {
  const [products, setProducts] = useState([]); // State for products
  const [loading, setLoading] = useState(true); // State for overall loading status
  const [error, setError] = useState(null); // State for general error messages
  const [loadingProduct, setLoadingProduct] = useState(null); // State for product-specific loading
  const [errorProduct, setErrorProduct] = useState(null); // State for product-specific error

  // Fetch products on component mount
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await fetchProducts(); // Fetch products using the API function
        setProducts(response.data); // Populate products
      } catch (err) {
        console.error('Error fetching products:', err);
        setError("Failed to fetch products. Please try again later.");
      } finally {
        setLoading(false); // Stop loading spinner
      }
    };

    loadProducts();
  }, []);

  // Handle payment link generation
  const handleOrderClick = async (product) => {
    setLoadingProduct(product.id); // Set loading for the specific product
    setErrorProduct(null);
    try {
      const response = await createPaymentLink({
        product_id: product.id,
        email: "osimigodsgiftgbubemi@gmail.com", // Replace with actual customer email
      });

      if (response.data && response.data.payment_url) {
        window.location.href = response.data.payment_url; // Redirect to payment link
      } else {
        setErrorProduct(product.id); // Set error for the specific product
      }
    } catch (err) {
      console.error(`Error generating payment link for product ${product.id}:`, err);
      setErrorProduct(product.id); // Handle API call failure
    } finally {
      setLoadingProduct(null); // Clear loading state
    }
  };

  // Render loading state
  if (loading) {
    return <p>Loading products...</p>;
  }

  // Render error state
  if (error) {
    return <p className="error">{error}</p>;
  }

  // Render the product list
  return (
    <div className="gallery">
      <h2>Shop Our Collection</h2>
      <div className="gallery-items">
        {products.map((product) => (
          <div key={product.id} className="gallery-item">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>${product.price}</p>
            <button
              className="get-started-btn"
              onClick={() => handleOrderClick(product)}
              disabled={loadingProduct === product.id}
            >
              {loadingProduct === product.id ? "Processing..." : "Place Your Order"}
            </button>
            {errorProduct === product.id && (
              <p className="error">Error generating payment link. Please try again.</p>
            )}
          </div>
        ))}
      </div>
      <div className="gallery-items">
        <h2>Our Story And Journey So Far</h2>
        <p>
          Every great story has a little beginning, so is our story. From the establishment of this fashion
          house in 2016 until today, we can only give God all the glory.<br />
          Christowonder Fashion House started from a single shop with just two workers who were apprentices at
          that time. Over the years, it has now grown into a large establishment.
        </p>
      </div>
      <div className="gallery-items">
        {/* Blog content and updates can go here */}
      </div>
    </div>
  );
};

export default ProductList;
