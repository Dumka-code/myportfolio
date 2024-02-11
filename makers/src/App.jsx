// AnimationContainer.js
import React, { useEffect } from 'react';
import Name from './components/Name';
import Projects from './components/Projects';
import projectsData  from './my-data.json';
import Resume from './components/Resume';
import About from './components/About';
import Footer from './components/Footer';
import { Toaster } from "./components/ui/sonner";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Work from './pages/Work';
import Blog from './pages/Blog';
import BlogHome from './pages/BlogHome';
import NotFound from './pages/NotFound';
import { Helmet } from 'react-helmet';

const imageUrls = [
  './prol.jpeg',
  'dumka.jpeg',
  'dumka1.jpeg',
  'dumka2.jpeg',
  'dumka3.jpeg',
  'dumka4.jpeg',
  'dumka5.jpeg',
  // Add more image URLs as needed
];


const LandingPage = () => (
  <>
  <Helmet>
        <meta charset="utf-8"/>
        <title>Dumka Bipnelo </title>
        <meta name="description" content="Software Developer and Architect" />
        <meta name="robots" content="index, follow"/>
        <meta name="author" content="Dumka_Bipnelo"/>
        <meta http-equiv="Content-Language" content="en"/>
        <meta name="keywords" content="Dumka, Bipnelo, Software, Graphql, Django, full-stack, Nextjs, Linux" />
        <meta property="og:url" content="https://dumkabipnelo.website"/>
        <meta property="og:type" content="website"/>
        <meta property="og:title" content="About Dumka Bipnelo" />
        <meta property="og:description" content="Dumka Bipnelo Portfolio and Projects" />
        <meta property="og:image" content="https://dumkabipnelo.website/dumka.jpeg" />
        <meta name="twitter:card" content="https://dumkabipnelo.website/dumka.jpeg"/>
        <meta name="twitter:site" content="@BipneloDumka"/>
        <meta name="twitter:creator" content="@BipneloDumka"/>
        <meta name="twitter:title" content="Dumka Bipnelo"/>
        <meta name="twitter:description" content="About Dumka Bipnelo"/>
        <meta name="twitter:image" content="https://dumkabipnelo.website/dumka.jpeg"/>
        {/* Additional meta tags for SEO */}
      </Helmet>
    <Name />
     <Projects projects = {projectsData}/>
     <About images={imageUrls}/>
     <Resume/>
  </>
);

const App = () => {
  

  return (
    <div className="relative bg-gray-200 mx-auto">

     <Router>      
      <Routes>
        <Route exact path="/" element={<LandingPage/>} />
        <Route exact path="/project/:id" element={<Work/>} />
        <Route  path="/Blog" element={<BlogHome/>} />
        <Route path="/blog/:slug" element={<Blog/>} />
        <Route path='/*' element={<NotFound/>} />         
      </Routes>
    </Router>
    <Toaster/>
     <Footer/>
    
     
     
     

     
      
    </div>
  );
};

export default App;
