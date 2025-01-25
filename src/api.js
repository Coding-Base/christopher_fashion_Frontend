import axios from 'axios';

// Create an axios instance with a base URL
const API = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/', // Your Django API base URL
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor for handling errors globally (optional)
API.interceptors.response.use(
    response => response, // Pass through successful responses
    error => {
        console.error('API Error:', error.response || error.message);
        return Promise.reject(error); // Propagate the error
    }
);

// Fetch all products
export const fetchProducts = () => API.get('products/');

// Fetch all categories
export const fetchCategories = () => API.get('categories/');

// Create a payment link (for Selar)
export const createPaymentLink = (paymentData) =>
    API.post('create-payment-link/', paymentData);

