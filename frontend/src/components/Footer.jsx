import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <footer className="bg-gray-50 px-4 sm:px-8 md:px-10">
      <div className="max-w-7xl mx-auto">

        {/* Top Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[3fr_1fr_1fr] gap-10 py-12 text-sm">

          {/* Left */}
          <div>
            <img
              className="mb-4 w-36"
              src={assets.logo}
              alt="HealthNEXT Logo"
            />
            <p className="text-gray-600 leading-6 max-w-md">
              At HealthNEXT, we are committed to delivering compassionate and
              comprehensive healthcare tailored to your individual needs. Our
              experienced medical professionals focus on personalized treatment
              and modern care.
            </p>
          </div>

          {/* Company */}
          <div>
            <p className="text-lg font-semibold mb-4">Company</p>
            <ul className="flex flex-col gap-2 text-gray-600">
              <li><a href="/" className="hover:text-primary">Home</a></li>
              <li><a href="/about" className="hover:text-primary">About Us</a></li>
              <li><a href="/contact" className="hover:text-primary">Contact Us</a></li>
              <li><a href="/privacy" className="hover:text-primary">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-lg font-semibold mb-4">Get in Touch</p>
            <ul className="flex flex-col gap-2 text-gray-600">
              <li>
                <a href="tel:+16103476142" className="hover:text-primary">
                  +1-610-347-6142
                </a>
              </li>
              <li>
                <a href="mailto:info@healthnext.com" className="hover:text-primary">
                  info@healthnext.com
                </a>
              </li>
              <li>1583 West Doe Run Road</li>
              <li>Unionville, PA 87482</li>
            </ul>
          </div>

        </div>

        {/* Bottom */}
        <div className="border-t py-4">
          <p className="text-center text-xs sm:text-sm text-gray-500">
            © 2025 HealthNEXT. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
