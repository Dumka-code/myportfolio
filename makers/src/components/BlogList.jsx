// BlogList.js
import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';

const BlogList = ({ blogs }) => {
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  return (
    <div className="relative container mx-auto p-8 z-50 backdrop-filter backdrop-blur-sm bg-opacity-10">
      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-8">
      {blogs.map((blog) => (
    <div key={blog.id} class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
  <Link to={`/blog/${generateSlug(blog.title)}`} > <div class="md:flex">
    <div class="md:shrink-0 bg-black">
      <img class="h-48 w-full object-cover md:h-full md:w-48" src={blog.imageUrl} alt={blog.title}/>
    </div>
    
    <div class="p-8  overflow-hidden h-64 lg:h-48">
      <div class="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{blog.title}</div>
      <a href="#" class="block mt-1 text-lg leading-tight font-medium text-black hover:underline">{blog.keywords}</a>
      <p class="mt-2 py-2 text-slate-500 ">{blog.subtitle}</p>
    </div>
  </div>
  </Link>
</div>
 ))}
      </div>
  
      

    </div>
  );
};

// Function to generate a slug from a string
const generateSlug = (str) => {
  return str.toLowerCase().replace(/\s+/g, '-');
};


export default BlogList;
