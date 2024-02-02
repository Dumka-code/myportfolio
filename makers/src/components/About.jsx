import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const About = ({ images }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  return (
    <div className=' relative mx-auto backdrop-filter backdrop-blur-md bg-opacity-10'>
    <div className="lg:flex lg:items-center lg:justify-center p-6 lg:p-16">
    {/* Image on the left for large screens */}
    <div className="lg:w-1/2 lg:mr-8 mb-6 lg:mb-0">
      <div className=' relative'>
    <Slider {...settings} className='relative h-auto w-64 lg:w-96 mx-auto'>
          {images.map((imageUrl, index) => (
            <div key={index}>
              <img
                src={imageUrl}
                alt={`Slide ${index + 1}`}
                className="w-full h-auto object-cover rounded-md  max-h-96"
              />
            </div>
          ))}
        </Slider>
        </div>
    </div>

    {/* Article on the right for large screens */}
    <div className="lg:w-1/2">
      <p className="text-gray-700 pt-6"> Hi, I am 
Dumka Bipnelo 
A Software Architect/Developer ✍️ .
</p>

<p className="text-gray-700 pt-6">
An architect in software developmental planning, deployment & and coordination of secured systems and structures. That mirrors strategies that enhance the status and growth of an eco-systems, firm, or
company and orchestrates systems of platforms for development
</p>

<p className="text-gray-700 pt-6">
While currently located at Port-harcourt Nigeria, I'm not limited by geographical constraints and exploring availability 
</p>

<p className="text-gray-700 pt-6">
I love both Solo and team work and also love to explore possibilities while coding and designing 
</p>

 </div>
  </div>

  </div>
  );
};

export default About;
