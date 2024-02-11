import React, { useState, useEffect, useRef} from 'react';
import axios from 'axios';
import  { toast }  from "sonner"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Textarea } from "../components/ui/textarea"
import { PaystackButton } from 'react-paystack';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../components/ui/alert-dialog"




const SubmitForm = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isErrorSubmit, setIsErrorSubmit] = useState(false);
  const [isPayed, setIsPayed] = useState(false);

  const [formData, setFormData] = useState({
    id: 0,
    name: '',
    introduction: '',
    background: '',
    currentPlaceOfWork: '',
    domain: '',
    paid: 'No',
    phoneNumber: '',
    email: '',
    research_interests: [],
    professionalExperience: '',
    vision: '',
    linkedin: '',
    academicHistory: [
        {
          title: 'Education',
          items: [
            {
              Degree: '',
              image: '',
              Institution: '',
              thesisTitle: '',
              'Year Of Completion': '',
            },
          ],
        },
        {
            title: 'Professional Experience/Occupation',
            items: [
              {
                Position: '',
                'Institution/Organisation': '',
                Duration: '',
                Responsibilities: '',
                image: '',
              },
            ],
          },
          {
            title: 'Fellowships and Grants:',
            items: [
              {
                event: '',
              },
            ],
          },
          {
            title: 'Certifications',
            items: [
              {
                cert: '',
              },
            ],
          },
      ],
      publications: {},
  });


  const [isSubmitting, setIsSubmitting] = useState(false); // State to track form submission

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleResearchInterestsChange = (index, value) => {
    const updatedInterests = [...formData.research_interests];
    updatedInterests[index] = { interests: value };

    setFormData({
      ...formData,
      research_interests: updatedInterests,
    });
  };

  const addResearchInterest = () => {
    setFormData({
      ...formData,
      research_interests: [...formData.research_interests, { interests: '' }],
    });
  };

  const removeResearchInterest = (index) => {
    const updatedInterests = [...formData.research_interests];
    updatedInterests.splice(index, 1);

    setFormData({
      ...formData,
      research_interests: updatedInterests,
    });
  };
  const handleAcademicHistoryChange = (historyIndex, itemIndex, field, value) => {
    const updatedAcademicHistory = [...formData.academicHistory];
    updatedAcademicHistory[historyIndex].items[itemIndex][field] = value;

    setFormData({
      ...formData,
      academicHistory: updatedAcademicHistory,
    });
  };

  const handleAddAcademicHistoryItem = (historyIndex) => {
    const updatedAcademicHistory = [...formData.academicHistory];
    const title = formData.academicHistory[historyIndex].title;

    // Add fields based on the current title
    if (title === 'Education') {
      updatedAcademicHistory[historyIndex].items.push({
        Degree: '',
        image: '',
        Institution: '',
        thesisTitle: '',
        'Year Of Completion': '',
      });
    } else if (title === 'Professional Experience/Occupation') {
      updatedAcademicHistory[historyIndex].items.push({
        Position: '',
        'Institution/Organisation': '',
        Duration: '',
        Responsibilities: '',
        image: '',
      });
    } else if (title === 'Fellowships and Grants:') {
      updatedAcademicHistory[historyIndex].items.push({
        '': '',
      });
    } else if (title === 'Certifications') {
      updatedAcademicHistory[historyIndex].items.push({
        '': '',
      });
    }

    setFormData({
      ...formData,
      academicHistory: updatedAcademicHistory,
    });
  };

  const handleRemoveAcademicHistoryItem = (historyIndex, itemIndex) => {
    const updatedAcademicHistory = [...formData.academicHistory];
    updatedAcademicHistory[historyIndex].items.splice(itemIndex, 1);

    setFormData({
      ...formData,
      academicHistory: updatedAcademicHistory,
    });
  };

  const handleImageUpload = (historyIndex, itemIndex, e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const updatedAcademicHistory = [...formData.academicHistory];
      updatedAcademicHistory[historyIndex].items[itemIndex].image = reader.result;

      setFormData({
        ...formData,
        academicHistory: updatedAcademicHistory,
      });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const renderImagePreview = (image) => {
    if (image) {
      return <img src={image} alt="Preview" className="mx-auto rounded m-4 max-w-48 h-48" />;
    }
    return null;
  };

  const renderImageInput = (historyIndex, itemIndex, field) => {
    if (field === 'image') {
      return (
        <label key={field} className="block mb-2">
          {field} (optional):
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(historyIndex, itemIndex, e)}
            className="mt-1 p-2 "
            placeholder={field}
          />
          {renderImagePreview(formData.academicHistory[historyIndex].items[itemIndex].image)}
        </label>
      );
    }

    return (
      <label key={field} className="block mb-2">
        {field}:
        <Input
          type="text"
          value={formData.academicHistory[historyIndex].items[itemIndex][field]}
          onChange={(e) => handleAcademicHistoryChange(historyIndex, itemIndex, field, e.target.value)}
          className=""
          placeholder={field}
        />
      </label>
    );
  };

  
  const isFormValid = () => {
    // Perform your validation checks here
    // For simplicity, let's just check if the name and email are not empty
    return formData.name.trim() !== '' && formData.email.trim() !== '';
  };


       const publicKey = "pk_live_2607f229288cc9c92ba4820b80ebdeac40614c0a"
        const amount = 1000;
        const email = formData.email;
        const name = formData.name;
        const currency = 'NGN'        


        const componentProps = {

          email,
      
          amount,

          currency,
      
          metadata: {
      
          name, 
                     
          },
      
          publicKey,
      
          text: "Pay Now",
      
          onSuccess: () =>

          setIsPayed(true),
      
          onClose: () => alert("Wait! Don't leave :("),
      
        }

  const handleSubmit = async (e) =>  {
    e.preventDefault();


    if (!isFormValid()) {
      toast("Please Fill in the Required Details!!");
        return;
      }

      setIsSubmitting(true); // Set isSubmitting to true when form submission begins
    

    try {
        const formDataToSubmit = {
            ...formData,
            academicHistory: formData.academicHistory.map((history) => ({
              title: history.title,
              items: history.items.map((item) => ({
                Degree: item.Degree,
            image: item.image,
            Institution: item.Institution,
            thesisTitle: item.thesisTitle,
            'Year Of Completion': item['Year Of Completion'],
            Position: item.Position,
            'Institution/Organisation': item['Institution/Organisation'],
            Duration: item.Duration,
            Responsibilities: item.Responsibilities,
            '': item[''],
              })),
            })),
          };

          // Add your API key (token)
      const API_KEY = 'DUMKACODE2024';
      
      // Prepare the request headers with the token
      const headers = {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json', // Adjust content type if needed
      };
  
        const response = await axios.post('https://dapi.quantumdesigns.site/formz', formDataToSubmit, { headers });
  
        console.log('Server response:', response.data.message);
        
        
        toast(response.data.message);

         // Set isSubmitted to true to display the success message
      setIsSubmitted(true);     
      
      } catch (error) {
        toast('Error submitting form:', error);
        console.log('Error submitting form:', error);
        setIsErrorSubmit(true)
      } finally {
        setIsSubmitting(false); // Set isSubmitting back to false when form submission completes (whether success or error)
      }


   // console.log(JSON.stringify(formData, null, 2));
    // You can send the JSON data to your server or perform any other action here
  };

  return (
    <section className="flex items-center justify-center text-center">
      <div className='container mx-auto mt-12 p-4'>
        
    <div className='p-4'>
     <p>For us to create a nice and organised Portfolio for you.  Submit your Personal Details at <a href='mailto'>info@quantumdesigns.site</a> with the following fields <br/> <strong>Personal Details</strong>, <strong>Research Interests</strong>, <strong> Academic / Occupational Details </strong>, 
        <br/> for us to create your Portfolio. 
         <br/> <strong>Alternatively</strong> you can fill in your details in the form below. </p>
    </div>
      <form onSubmit={handleSubmit} role="form" encType="multipart/form-data">
      <h2 className="text-2xl font-bold mb-4">Enter Your Portfolio Details : </h2>
        <div className="max-w-screen-lg mx-auto bg-white p-8 rounded shadow-md grid grid-cols-1 lg:grid-cols-2 gap-8">
        

        <label className="block mb-4">
          Name  <span className="text-red-500 text-xs">* as appears on google scholar</span>
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            className="mt-1 p-2 w-full border rounded"
            required
          />
        </label>

        <label className="block mb-4">
          Introduction:
          <Textarea 
            placeholder="Introduce your self."
            name="introduction"
            value={formData.introduction}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded"
            required
          />
        </label>

        <label className="block mb-4">
          Background:
          <Textarea 
            placeholder="A little about your background"
            name="background"
            value={formData.background}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded"
            required
          />
        </label>

        <label className="block mb-4">
          Current Place of Work:
          <Input
            type="text"
            name="currentPlaceOfWork"
            placeholder="Current Place Of Work"
            value={formData.currentPlaceOfWork}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded"
            required
          />
        </label>

        <label className="block mb-4">
          Phone Number:
          <Input
            type="tel"
            placeholder="Contact Line"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded"
            
          />
        </label>

        <label className="block mb-4">
          Email:
          <Input
            type="email"
            placeholder="Your Email address"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded"
            required
          />
        </label>

        

        <label className="block mb-4">
          Vision:
          <Textarea 
            placeholder="your aim"
            name="vision"
            value={formData.vision}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded"
            required
          />
        </label>

        <label className="block mb-4">
          Linkedin:
          <Textarea 
            placeholder="linkedin handle(url)"
            name="linkedin"
            value={formData.linkedin}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded"           
          />
        </label>

        <label className="block mb-4">
          Professional Experience:
          <Textarea
          placeholder="Professional Experience:"
            name="professionalExperience"
            value={formData.professionalExperience}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded"
            required
          />
        </label>

        

        </div>


        <label className="block mb-4 bg-white p-8 rounded shadow-md">
          <p className='underline text-center py-4'>Enter Your Research Interests: </p>
          {formData.research_interests.map((interest, index) => (
            <div key={index} className="mt-2 max-w-screen-lg mx-auto my-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Input
                type="text"
                value={interest.interests}
                onChange={(e) => handleResearchInterestsChange(index, e.target.value)}
                className="mt-1 p-2 w-full border rounded"
                placeholder="Interested ..."
                required
              />
              <Button
                type="button"
                onClick={() => removeResearchInterest(index)}
                className="text-white m-auto w-24"
                variant="destructive"
              >
                Remove
              </Button>
            </div>
          ))}
          <Button
            type="button"
            onClick={addResearchInterest}
            className="bg-blue-500 text-white  m-3"
          >
            Add your Interest
          </Button>
        </label>




        <label className="block mb-4  bg-white p-8 rounded shadow-md">
        <p className='underline text-center py-4'> Enter Your Academic / Occupational Details  </p>
         
          {formData.academicHistory.map((history, historyIndex) => (
            <div key={historyIndex} className="mt-2 ">
              <label className="block mb-2 text-amber-600">{history.title}</label>
              {history.items.map((item, itemIndex) => (

                <div key={itemIndex} className='max-w-screen-lg mx-auto my-8 grid grid-cols-1 lg:grid-cols-2 gap-8'>
                 
                 {Object.keys(item).map((field) => renderImageInput(historyIndex, itemIndex, field))}

                  {/* ... (previous fields) */}
                  
                  <Button
                    variant="destructive"
                    onClick={() => handleRemoveAcademicHistoryItem(historyIndex, itemIndex)}
                    className="font-bold my-auto"
                  >
                    Remove 
                  </Button>              
                </div> 
                
              ))}
              
              <Button                
                type="button"
                onClick={() => handleAddAcademicHistoryItem(historyIndex)}
                className="my-6"
              >
                Add More
              </Button>

              <hr/>
            </div>
          ))}
        </label>


       

<div className='w-full text-center my-4'>


<div class="max-w-md mx-auto p-6 my-4 ">
  <label class="flex items-center mb-4">
    <input type="checkbox" class="form-checkbox mr-2" required/>
    <span class="text-gray-700">Note: There is a payment method once this form is submitted.</span>
  </label>
</div> 


<AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
        variant="outline"
          type="submit"
          className={`bg-green-500 text-white py-2 mx-auto px-24 h-10 rounded hover:bg-green-600 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={isSubmitting}
        >
         {isSubmitting ? 'Submitting...' : 'Submit'}
        </Button>
        </AlertDialogTrigger>
          {/* Display success message if form is submitted successfully */}
      {isSubmitted && (
             <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Proceed with Payment</AlertDialogTitle>
          <AlertDialogDescription>
            The form you submitted has been sent to our server 
           Successfully, you can now proceed to payment. (paystack) 
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <PaystackButton {...componentProps} className='text-sm px-3 py-2 bg-green-500 rounded'/>
        </AlertDialogFooter>
      </AlertDialogContent>
       )}


{isErrorSubmit && (
             <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Your Submit was Unsuccessful</AlertDialogTitle>
          <AlertDialogDescription>
            Please ensure that the Name you inputted matches with your name used on google scholar
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className='bg-red-700 rounded'>Cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
       )}
    </AlertDialog>

        </div>
      </form>

      {isPayed && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
          <div className="relative max-w-md mx-auto rounded-lg overflow-hidden bg-white shadow-lg p-8">
            <h2 className="text-xl font-semibold text-green-600 mb-4">Successfully!</h2>
            <p className="text-gray-800">Thank you! We will send you a mail soon.</p>
          </div>
        </div>
      )}

      </div>     

    </section>
  );
};


  

export default SubmitForm;
