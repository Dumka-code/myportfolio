// Home.js
import React from 'react';
import  blogData  from '../blogData.json';
import BlogList from '../components/BlogList';
import { motion } from 'framer-motion';
import { Button } from "../components/ui/button";
import { FaLinux } from "react-icons/fa";

const BlogHome = () => {
  return (
    <div>
      <motion.div
      initial={{ opacity: 0, y: 150 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.5 }}
      className=" max-w-5xl mx-auto pt-16 sm:pt-18 lg:pt-18 sticky top-0  mb-4  bg-cover  bg-[url('https://framerusercontent.com/images/hREJN8AsFEbJPz6GtPdzL1hLkvc.png')]" 
    >
   
    <div className="text-2xl py-8  sm:text-6xl space-y-1 lg:text-4xl tracking-tight text-center  antialiased">
      <h1>Dumka's Posts<FaLinux className='inline' /></h1>
      <p>Blogs, Articles and Research</p>
      <p className='lg:text-xl  text-xl text-gray-400 pt-2'>A.I.(Models) Software Development, and Vulnerabilities</p> 

      <Button variant="outline">Explore my posts 🚀</Button>


    </div>
 

 
    </motion.div>

      <BlogList blogs={blogData} />
      
    </div>
  );
};

export default BlogHome;
