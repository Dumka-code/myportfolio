// Blog.js
import React, {useEffect} from 'react';
import { useParams } from 'react-router-dom';
import  blogData  from '../blogData.json';
import  BlogPost from '../components/BlogPost';
import { motion } from 'framer-motion';
import { Button } from "../components/ui/button";
import NotFound from './NotFound';
import { Helmet } from 'react-helmet';

const Blog = () => {
  const { slug } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  // Function to convert a slug back to a title
  const convertSlugToTitle = (slug) => {
    return slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const blog = blogData.find((b) => generateSlug(b.title) === slug);

  if (!blog) {
    return <NotFound/>;
  }

  return (
    <div>
      <Helmet>
        <title>{blog.title}</title>
        <meta name="description" content={blog.description} />
        <meta property="og:type" content="website"/>
        <meta property="og:title" content={blog.title} />
        <meta property="og:description" content={blog.keywords} />
        <meta property="og:image" content={blog.imageUrl}/>
        <meta name="twitter:card" content={blog.imageUrl} />
        <meta name="twitter:site" content="@BipneloDumka" />
        <meta name="twitter:creator" content="@BipneloDumka" />
        <meta name="twitter:title" content={blog.title} />
        <meta name="twitter:description" content={blog.keywords} />
        <meta name="twitter:image" content={blog.imageUrl} />
        <meta property="article:published_time" content={blog.date}/>
        <meta property="article:modified_time" content={blog.date}/>
        <meta property="article:section" content={blog.keywords}/>
        <meta property="article:tag" content={blog.keywords}/>
        <meta property="article:publisher" content="https://dumkabipnelo.website/"/>
      </Helmet>
       <motion.div
      initial={{ opacity: 0, y: 150 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.5 }}
      className=" max-w-5xl mx-auto pt-16 sm:pt-18 lg:pt-18 sticky top-0  mb-4  bg-cover  bg-[url('https://framerusercontent.com/images/hREJN8AsFEbJPz6GtPdzL1hLkvc.png')]" 
    >
   
    <div className="text-2xl py-8  sm:text-6xl space-y-1 lg:text-4xl tracking-tight text-center  antialiased">
      <h1>{blog.title} </h1>
      <p className='lg:text-xl  text-xl text-gray-400 pt-2'>{blog.keywords}</p> 

      <Button variant="outline">Explore my blog 🚀</Button>


    </div>
 

 
    </motion.div>



      <BlogPost blog={blog} />
    </div>
  );
};

// Function to generate a slug from a string
const generateSlug = (str) => {
  return str.toLowerCase().replace(/\s+/g, '-');
};

export default Blog;
