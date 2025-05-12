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
    <div className="min-h-screen bg-[#f3f4fd] flex items-center justify-center py-8 px-2">
      <Helmet>
        <title>Book Demand Service - Affordable Books at ₹19</title>
        <meta name="description" content="Get your required books in PDF format for just ₹19. Fill out the form and receive your book via email." />
        <link href="//cdn-images.mailchimp.com/embedcode/classic-061523.css" rel="stylesheet" type="text/css" />
      </Helmet>

      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 bg-transparent rounded-3xl shadow-none">
        {/* Left Side - Modern Book Image */}
        <div className="flex flex-col items-center justify-center bg-white rounded-3xl shadow-xl p-6 md:p-10">
          <img
            src="/book-banner.jpg"
            alt="Book Service Banner"
            className="w-full max-w-xs md:max-w-sm rounded-2xl shadow-lg object-cover"
          />
          <div className="mt-6 text-center">
            <h2 className="text-3xl font-extrabold text-[#7b2ff2] tracking-tight mb-2">BOOK BOX <span className="text-[#f357a8]">PDF</span></h2>
            <p className="text-lg text-gray-700 font-medium">Books on Demand at Just Rs.19 only</p>
          </div>
        </div>

        {/* Right Side - Modern Card with Offer and CTA */}
        <div className="flex flex-col items-center justify-center">
          <div className="w-full bg-white rounded-3xl shadow-2xl px-6 py-10 md:px-10 md:py-14 flex flex-col items-center">
            {/* Only show logo and offer texts if not showing form or success */}
            {!showForm && !showSuccess && (
              <>
                <img src="/logo.jpg" alt="Being Notified Logo" className="h-8 mb-6" />
                <h1 className="text-2xl md:text-3xl font-extrabold text-[#7b2ff2] text-center uppercase mb-2 tracking-tight">SKIP THE PRICE TAG,<br />KEEP THE KNOWLEDGE</h1>
                <p className="text-lg md:text-xl font-semibold text-[#7b2ff2] text-center mb-2">Book you need, Price you love <span role="img" aria-label="fire">🔥</span></p>
                <p className="text-base md:text-lg text-[#7b2ff2] text-center mb-2">Demand any book in PDF at <span className="font-bold">₹19</span> only</p>
                <p className="text-sm text-gray-600 text-center mb-6">Payment would be asked after book delivered to your mail!</p>
              </>
            )}
            {/* CTA Buttons or Form */}
            {!showForm ? (
              <div className="w-full flex flex-col items-center gap-4">
                <button
                  onClick={() => setShowForm(true)}
                  className="w-full py-3 text-lg font-bold rounded-full bg-gradient-to-r from-[#7b2ff2] to-[#f357a8] text-white shadow-lg hover:from-[#5f1bbd] hover:to-[#d13b8a] transition-all duration-200"
                >
                  Demand Now
                </button>
                <button
                  onClick={() => window.location.href = '/'}
                  className="w-full py-3 text-lg font-semibold rounded-full bg-gray-200 text-gray-500 hover:bg-gray-300 transition-all duration-200"
                >
                  No, thanks
                </button>
              </div>
            ) : showSuccess ? (
              <div className="text-center space-y-6">
                <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
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
                    Thank you for your book request. We'll process it and send you the book via email shortly. Payment would be asked only after the book is delivered.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setShowSuccess(false);
                    setShowForm(false);
                  }}
                  className="w-full bg-gradient-to-r from-[#7b2ff2] to-[#f357a8] text-white py-3 px-6 rounded-full font-bold hover:from-[#5f1bbd] hover:to-[#d13b8a] transition-all duration-200"
                >
                  Make Another Request
                </button>
              </div>
            ) : (
              <div id="mc_embed_signup" className="w-full mt-2">
                <div className="w-full flex items-center justify-end mb-4">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 transition-all duration-200 p-2"
                    style={{ minWidth: 0 }}
                  >
                    <span className="text-2xl leading-none">←</span>
                  </button>
                </div>
                <form
                  action="https://app.us5.list-manage.com/subscribe/post?u=1fff7104ea848f8b81488b0bc&amp;id=cf04b5f592&amp;f_id=00f8c2e1f0"
                  method="post"
                  id="mc-embedded-subscribe-form"
                  name="mc-embedded-subscribe-form"
                  className="validate"
                  onSubmit={handleSubmit}
                >
                  <div id="mc_embed_signup_scroll">
                    <h2 className="text-xl font-bold text-[#7b2ff2] mb-4 text-center">Request your Book</h2>
                    <div className="indicates-required mb-4 text-center">
                      <span className="asterisk text-red-500">*</span> indicates required
                    </div>
                    <div className="mc-field-group mb-4">
                      <label htmlFor="mce-EMAIL" className="block text-sm font-medium text-gray-700">
                        Email Address <span className="asterisk text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="EMAIL"
                        className="required email w-full mt-1 block rounded-md border-gray-300 shadow-sm focus:border-[#7b2ff2] focus:ring-[#7b2ff2]"
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
                        className="required text w-full mt-1 block rounded-md border-gray-300 shadow-sm focus:border-[#7b2ff2] focus:ring-[#7b2ff2]"
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
                        className="required text w-full mt-1 block rounded-md border-gray-300 shadow-sm focus:border-[#7b2ff2] focus:ring-[#7b2ff2]"
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
                        className="text w-full mt-1 block rounded-md border-gray-300 shadow-sm focus:border-[#7b2ff2] focus:ring-[#7b2ff2]"
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
                        readOnly
                      />
                    </div>
                    <div className="optionalParent">
                      <div className="clear foot">
                        <input
                          type="submit"
                          name="subscribe"
                          id="mc-embedded-subscribe"
                          className="button w-full bg-gradient-to-r from-[#7b2ff2] to-[#f357a8] text-white py-3 px-6 rounded-full font-bold hover:from-[#5f1bbd] hover:to-[#d13b8a] transition-all duration-200"
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
