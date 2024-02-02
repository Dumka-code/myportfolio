// BlogPost.js
import React from 'react';


const BlogPost = ({ blog }) => {
  // Function to convert HTML content
  const createMarkup = (htmlContent) => {
    return { __html: htmlContent };
  };

  return (
    <div className="container mx-auto p-8 relative z-50 backdrop-filter backdrop-blur-md bg-opacity-10">
      <div className="max-w-2xl mx-auto">
      <img
          className="w-full h-64 object-cover object-center mb-6 rounded-lg shadow-lg"
          src={blog.imageUrl}
          alt={blog.title}
        />
        <div className="text-gray-600 mb-6">
          <p className="text-sm">Published on {blog.date} </p> 
        </div>
        {/* Render HTML content using dangerouslySetInnerHTML */}
        <div
          className="text-lg leading-relaxed mb-6"
          dangerouslySetInnerHTML={createMarkup(blog.content)}
        />
        
      </div>
    </div>
  );
};

export default BlogPost;
