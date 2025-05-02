import React, { useState } from 'react';
import { Helmet } from 'react-helmet';

const BookDemand: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    
    // Create a hidden iframe to handle the form submission
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.name = 'mailchimp-iframe';
    document.body.appendChild(iframe);
    
    // Set the form target to the iframe
    form.target = 'mailchimp-iframe';
    
    // Submit the form
    form.submit();
    
    // Show success message after a short delay
    setTimeout(() => {
      setShowSuccess(true);
      form.reset();
      document.body.removeChild(iframe);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Book Demand Service - Affordable Books at ₹19</title>
        <meta name="description" content="Get your required books in PDF format for just ₹19. Fill out the form and receive your book via email." />
        <link href="//cdn-images.mailchimp.com/embedcode/classic-061523.css" rel="stylesheet" type="text/css" />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Side - Static Image */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img
              src="/book-banner.jpg"
              alt="Book Service Banner"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right Side - Dynamic Content */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            {!showForm ? (
              <div className="space-y-6">
                <h1 className="text-3xl font-bold text-gray-900">Affordable Books for All</h1>
                <div className="prose prose-lg text-gray-600">
                  <p>
                    Our mission is to make quality educational resources accessible to every student.<br></br>
                    <b>We provide PDF versions of books at an affordable price of just ₹19.</b>
                  </p>
                  <br></br>
                  <p className="font-bold text-xl text-blue-600 mb-4">
                    "Skip The Price Tag, Keep The Knowledge" <br></br>
                    "Book you need, Price you love"
                  </p>
                  <p>
                    Whether you're preparing for exams, expanding your knowledge, or just love reading,
                    we're here to help you get the books you need.
                  </p>
                  <br></br>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Delivery of PDF via email in 2 days</li>
                    <li>Wide range of books available</li>
                    <li>Secure payment process</li>
                    <li><b>Payment would be ask only after the book is delivered</b></li>
                  </ul>
                </div>
                <button
                  onClick={() => setShowForm(true)}
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  Demand Your Book Now
                </button>
              </div>
            ) : showSuccess ? (
              <div className="text-center space-y-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <svg
                    className="mx-auto h-12 w-12 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <h2 className="mt-4 text-2xl font-bold text-green-900">Request Received!</h2>
                  <p className="mt-2 text-green-700">
                    Thank you for your book request. We'll process it and send you the book via email shortly, Payment would be asked only after the book is delivered.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setShowSuccess(false);
                    setShowForm(false);
                  }}
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  Make Another Request
                </button>
              </div>
            ) : (
              <div id="mc_embed_signup" className="w-full">
                <form
                  action="https://app.us5.list-manage.com/subscribe/post?u=1fff7104ea848f8b81488b0bc&amp;id=cf04b5f592&amp;f_id=00f8c2e1f0"
                  method="post"
                  id="mc-embedded-subscribe-form"
                  name="mc-embedded-subscribe-form"
                  className="validate"
                  onSubmit={handleSubmit}
                >
                  <div id="mc_embed_signup_scroll">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Request your Book</h2>
                    <div className="indicates-required mb-4">
                      <span className="asterisk text-red-500">*</span> indicates required
                    </div>
                    
                    <div className="mc-field-group mb-4">
                      <label htmlFor="mce-EMAIL" className="block text-sm font-medium text-gray-700">
                        Email Address <span className="asterisk text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="EMAIL"
                        className="required email w-full mt-1 block rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        id="mce-EMAIL"
                        required
                      />
                    </div>

                    <div className="mc-field-group mb-4">
                      <label htmlFor="mce-FNAME" className="block text-sm font-medium text-gray-700">
                        First Name <span className="asterisk text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="FNAME"
                        className="required text w-full mt-1 block rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        id="mce-FNAME"
                        required
                      />
                    </div>

                    <div className="mc-field-group mb-4">
                      <label htmlFor="mce-MMERGE7" className="block text-sm font-medium text-gray-700">
                        Book Name <span className="asterisk text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="MMERGE7"
                        className="required text w-full mt-1 block rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        id="mce-MMERGE7"
                        required
                      />
                    </div>

                    <div className="mc-field-group mb-4">
                      <label htmlFor="mce-MMERGE8" className="block text-sm font-medium text-gray-700">
                        Message
                      </label>
                      <input
                        type="text"
                        name="MMERGE8"
                        className="text w-full mt-1 block rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        id="mce-MMERGE8"
                      />
                      <span id="mce-MMERGE8-HELPERTEXT" className="helper_text text-sm text-gray-500 mt-1">
                        Author Name or any extra instructions
                      </span>
                    </div>

                    <div id="mce-responses" className="clear foot mb-4">
                      <div className="response" id="mce-error-response" style={{ display: 'none' }}></div>
                      <div className="response" id="mce-success-response" style={{ display: 'none' }}></div>
                    </div>

                    <div aria-hidden="true" style={{ position: 'absolute', left: '-5000px' }}>
                      <input
                        type="text"
                        name="b_1fff7104ea848f8b81488b0bc_cf04b5f592"
                        tabIndex={-1}
                        value=""
                      />
                    </div>

                    <div className="optionalParent">
                      <div className="clear foot">
                        <input
                          type="submit"
                          name="subscribe"
                          id="mc-embedded-subscribe"
                          className="button w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                          value="Submit Request"
                        />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>

      <script type="text/javascript" src="//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js"></script>
      <script type="text/javascript">
        {`
          (function($) {
            window.fnames = new Array();
            window.ftypes = new Array();
            fnames[0]='EMAIL';ftypes[0]='email';
            fnames[1]='FNAME';ftypes[1]='text';
            fnames[7]='MMERGE7';ftypes[7]='text';
            fnames[8]='MMERGE8';ftypes[8]='text';
            fnames[2]='LNAME';ftypes[2]='text';
            fnames[3]='ADDRESS';ftypes[3]='address';
            fnames[4]='PHONE';ftypes[4]='phone';
            fnames[5]='BIRTHDAY';ftypes[5]='birthday';
            fnames[6]='COMPANY';ftypes[6]='text';
          }(jQuery));
          var $mcj = jQuery.noConflict(true);
        `}
      </script>
    </div>
  );
};

export default BookDemand; 
