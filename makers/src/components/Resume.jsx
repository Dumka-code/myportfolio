// A.js
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "./ui/button";
import { FaCloudDownloadAlt } from "react-icons/fa";
import { FaFile } from "react-icons/fa";

import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
  } from "./ui/drawer"
  

const Resume = () => {
  const handleDownload = () => {
    // Replace 'path/to/your/file.pdf' with the actual path to your PDF file
    const pdfFilePath = './d8080cv.pdf';

    // Create an anchor element
    const anchor = document.createElement('a');

    // Set the href attribute to the file path
    anchor.href = pdfFilePath;

    // Set the download attribute to specify the filename for the downloaded file
    anchor.download = './d8080cv.pdf';
    anchor.target = '_blank';

    // Append the anchor element to the body
    document.body.appendChild(anchor);

    // Trigger a click on the anchor element to initiate the download
    anchor.click();

    // Remove the anchor element from the body
    document.body.removeChild(anchor);
  };

    return (
      <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.5 }}
    >
 <div className="z-10 fixed bottom-0 left-0 right-0 mx-auto text-center p-4 bg-zinc-800 backdrop-filter backdrop-blur-md bg-opacity-40  text-white rounded-full w-5/6 lg:w-1/4 my-4">
   
     

      <Drawer>
  <DrawerTrigger className="font-semibold text-base -m-4">Download Resume   <FaCloudDownloadAlt  className='inline fixed right-5 animate-bounce top-1/4' size={26}/> </DrawerTrigger>
  
  <DrawerContent className='bg-gray-200'>
  <div className="mx-auto w-full max-w-sm">
    <DrawerHeader>
      <DrawerTitle>I am Open to jobs</DrawerTitle>
      <DrawerDescription>Visit the footer for direct contact details</DrawerDescription>
    </DrawerHeader>
    <DrawerFooter>
      <Button onClick={handleDownload}>Download Resume (PDF)  <span className='mx-2'><FaFile /> </span> </Button>
      <DrawerClose>
        <Button variant="destructive" className='w-full'>Cancel</Button>
      </DrawerClose>
    </DrawerFooter>
    </div>
  </DrawerContent>

</Drawer>

    </div>
     </motion.div>
    

  )
};

export default Resume;
