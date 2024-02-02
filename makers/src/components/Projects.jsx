// B.js
import React from 'react';
import { motion } from 'framer-motion';
import { TbClick } from "react-icons/tb";

const Projects = ({ projects }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className='relative mx-auto px-2 flex items-center justify-center backdrop-filter backdrop-blur-sm bg-opacity-10'
    >
   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-1 mx-auto">
      {projects.map((project) => (
        <a key={project.id} href={`/project/${project.id}`} className="flex-1 lg:max-w-2xl m-3 "> 
          <span className="border-2 border-gray-300 text-gray-600 animate-pulse text-xs rounded-full px-3 py-0.5">Open <TbClick className='inline'/></span>

          <div className="relative aspect-w-16 aspect-h-9 mt-2 ">
            <video className="w-full h-full bg-black object-cover rounded-lg" autoPlay loop muted playsInline>
              <source src={project.videoUrl} type="video/webm" />
              Your browser does not support the video tag.
            </video>
          </div>

          <div className="text-gray-700 m-2">{project.title}</div>
        </a> 
      ))}
    </div>

    

    </motion.div>
  );
};

export default Projects;
