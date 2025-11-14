import React, { useEffect} from 'react';

// Component Imports
import ContactForm from '../../components/Contact/ContactForm';
import ContactHeader from '../../components/Contact/Header';


const Contact:React.FC = () => {
  useEffect(()=>{
    window.scrollTo(0,0);
  })


  return (
    <div className="min-h-screen mx-40">
    <ContactHeader/>
    <ContactForm/>
    </div>
  );
};

export default Contact;