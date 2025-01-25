import React, { useEffect, useState } from 'react';
import API from './api'; // Import the axios instance
import "./BlogList.css";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    // Use the axios instance to fetch blogs
    API.get('blogs/')
      .then((response) => {
        setBlogs(response.data); // Use `response.data` to get the actual data
      })
      .catch((error) => {
        console.error('Error fetching blogs:', error);
      });
  }, []);

  return (
    <div className="blog-list">
      <h2>Blogs And Updates</h2>
      {blogs.map((blog) => (
        <div key={blog.id} className="blog-card">
          <h3>{blog.title}</h3>
          <p><strong>Author:</strong> {blog.author}</p>
          <p>{blog.content.substring(0, 1000)}...</p>
          {blog.image && <img src={blog.image} alt={blog.title} />}
          <p><strong>Published:</strong> {new Date(blog.created_at).toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
