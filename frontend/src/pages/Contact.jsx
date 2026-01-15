import React from 'react';
import { assets } from '../assets/assets';

const Contact = () => {
  return (
    <div className="px-4 md:px-10 lg:px-20">
      <div className="text-center text-2xl pt-10 text-gray-500">
        <p>
          CONTACT <span className="text-gray-700 font-semibold">US</span>
        </p>
      </div>

      <div className="my-10 flex flex-col md:flex-row items-center justify-center gap-10 mb-28 text-sm">
        <img className="w-full md:max-w-[360px] rounded-lg shadow-md" src={assets.contact_image} alt="Contact" />

        <div className="flex flex-col gap-6 text-gray-700 max-w-md">
          <div>
            <h2 className="font-semibold text-base mb-2">OUR OFFICE</h2>
            <p className="leading-relaxed">
              00000 Willms Station<br />
              Suite 000, Washington, USA<br />
              Tel: (000) 000-0000<br />
              Email: <a href="mailto:greatstackdev@gmail.com" className="text-blue-600 hover:underline">singhraj@gmail.com</a>
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-base mb-2">CAREERS AT PRESCRIPTO</h2>
            <p className="mb-3">Join our team and help build the future of healthcare technology.</p>
            <button className="border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500 ">
              Explore Jobs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
