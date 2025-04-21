import React, { useState } from 'react';
import { Check, User, Calendar, Users, ArrowRight, AlertTriangle } from 'lucide-react';

export const RegistrationForm: React.FC = () => {
  const [formStep, setFormStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    trekDate: '',
    groupSize: 1,
    experience: 'beginner',
    dietaryRestrictions: '',
    specialRequests: '',
    termsAccepted: false
  });
  
  const [difficultyLevel, setDifficultyLevel] = useState(50);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {};
    
    if (step === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
      if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
      if (!formData.email.trim()) newErrors.email = 'Email is required';
      else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Valid email is required';
      if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    }
    
    if (step === 2) {
      if (!formData.trekDate) newErrors.trekDate = 'Trek date is required';
    }
    
    if (step === 3) {
      if (!formData.termsAccepted) newErrors.termsAccepted = 'You must accept the terms and conditions';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(formStep)) {
      setFormStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    setFormStep(prev => prev - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep(formStep)) {
      // In a real application, you would submit the form data to your backend here
      console.log('Form submitted:', formData);
      setFormStep(4); // Move to success page
    }
  };

  const getDifficultyLabel = () => {
    if (difficultyLevel < 30) return 'Beginner';
    if (difficultyLevel < 60) return 'Intermediate';
    if (difficultyLevel < 85) return 'Advanced';
    return 'Expert';
  };

  const getDifficultyColor = () => {
    if (difficultyLevel < 30) return 'bg-green-500';
    if (difficultyLevel < 60) return 'bg-yellow-500';
    if (difficultyLevel < 85) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <section id="register" className="py-20 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-gray-50 to-white"></div>
      <div className="absolute -top-20 -right-20 w-80 h-80 bg-teal-100 rounded-full opacity-20"></div>
      <div className="absolute top-40 -left-20 w-60 h-60 bg-orange-100 rounded-full opacity-20"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex items-center justify-center mb-8">
          <User className="text-teal-700 w-8 h-8 mr-3" />
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Registration</h2>
        </div>
        
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden">
          {/* Progress Indicator */}
          <div className="bg-teal-700 py-4 px-6">
            <div className="flex items-center justify-between">
              {[1, 2, 3, 4].map((step) => (
                <div 
                  key={step}
                  className={`flex flex-col items-center relative ${
                    step < 4 ? 'w-full' : ''
                  }`}
                >
                  <div 
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      formStep === step
                        ? 'bg-white text-teal-700' 
                        : formStep > step
                          ? 'bg-teal-300 text-teal-800'
                          : 'bg-teal-600 text-teal-200'
                    } z-10`}
                  >
                    {formStep > step ? <Check /> : step}
                  </div>
                  <span className={`text-sm mt-2 font-medium ${
                    formStep >= step ? 'text-white' : 'text-teal-300'
                  }`}>
                    {step === 1 ? 'Personal Info' : 
                     step === 2 ? 'Trek Details' : 
                     step === 3 ? 'Confirm' : 
                     'Complete'}
                  </span>
                  
                  {/* Connector lines between steps */}
                  {step < 4 && (
                    <div className={`absolute top-5 left-1/2 w-full h-0.5 ${
                      formStep > step ? 'bg-teal-300' : 'bg-teal-600'
                    }`}></div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6 md:p-8">
            {/* Step 1: Personal Information */}
            {formStep === 1 && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Personal Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="firstName">
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.firstName ? 'border-red-500' : 'border-gray-300'
                      } focus:outline-none focus:ring-2 focus:ring-teal-500`}
                      placeholder="Your first name"
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="lastName">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.lastName ? 'border-red-500' : 'border-gray-300'
                      } focus:outline-none focus:ring-2 focus:ring-teal-500`}
                      placeholder="Your last name"
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                    )}
                  </div>
                </div>
                
                <div>
                  <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-teal-500`}
                    placeholder="your.email@example.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-gray-700 font-medium mb-2" htmlFor="phone">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.phone ? 'border-red-500' : 'border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-teal-500`}
                    placeholder="Your phone number"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                  )}
                </div>
              </div>
            )}
            
            {/* Step 2: Trek Details */}
            {formStep === 2 && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Trek Details</h3>
                
                <div>
                  <label className="block text-gray-700 font-medium mb-2" htmlFor="trekDate">
                    Trek Date *
                  </label>
                  <select
                    id="trekDate"
                    name="trekDate"
                    value={formData.trekDate}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.trekDate ? 'border-red-500' : 'border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white`}
                  >
                    <option value="">Select a trek date</option>
                    <option value="2025-06-15">Alpine Meadow Trail - June 15, 2025</option>
                    <option value="2025-07-10">Cascade Mountain Pass - July 10, 2025</option>
                    <option value="2025-08-05">Sunset Ridge Expedition - August 5, 2025</option>
                  </select>
                  {errors.trekDate && (
                    <p className="text-red-500 text-sm mt-1">{errors.trekDate}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-gray-700 font-medium mb-2" htmlFor="groupSize">
                    Group Size
                  </label>
                  <select
                    id="groupSize"
                    name="groupSize"
                    value={formData.groupSize}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
                  >
                    {[1, 2, 3, 4, 5, 6].map((size) => (
                      <option key={size} value={size}>
                        {size} {size === 1 ? 'person' : 'people'}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Your Experience Level - {getDifficultyLabel()}
                  </label>
                  <div className="mb-6">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={difficultyLevel}
                      onChange={(e) => setDifficultyLevel(parseInt(e.target.value))}
                      className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                      style={{
                        background: `linear-gradient(to right, #10b981 0%, #f59e0b 50%, #ef4444 100%)`,
                      }}
                    />
                    <div className="flex justify-between mt-2 text-sm text-gray-600">
                      <span>Beginner</span>
                      <span>Intermediate</span>
                      <span>Expert</span>
                    </div>
                  </div>
                  <div className={`p-4 rounded-lg ${difficultyLevel > 80 ? 'bg-red-50 border border-red-200' : 'bg-gray-50'}`}>
                    {difficultyLevel > 80 ? (
                      <div className="flex items-start">
                        <AlertTriangle className="text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-gray-700">
                          Expert-level treks require previous mountaineering experience and specialized equipment. Our team will contact you to verify experience.
                        </p>
                      </div>
                    ) : (
                      <p className="text-sm text-gray-700">
                        For {getDifficultyLabel().toLowerCase()} level treks, we recommend proper hiking boots, layered clothing, and a good backpack.
                      </p>
                    )}
                  </div>
                </div>
                
                <div>
                  <label className="block text-gray-700 font-medium mb-2" htmlFor="dietaryRestrictions">
                    Dietary Restrictions
                  </label>
                  <textarea
                    id="dietaryRestrictions"
                    name="dietaryRestrictions"
                    value={formData.dietaryRestrictions}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    rows={3}
                    placeholder="Please list any dietary restrictions or allergies"
                  ></textarea>
                </div>
                
                <div>
                  <label className="block text-gray-700 font-medium mb-2" htmlFor="specialRequests">
                    Special Requests
                  </label>
                  <textarea
                    id="specialRequests"
                    name="specialRequests"
                    value={formData.specialRequests}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    rows={3}
                    placeholder="Any special requests or accommodations needed?"
                  ></textarea>
                </div>
              </div>
            )}
            
            {/* Step 3: Confirmation */}
            {formStep === 3 && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Confirm Your Details</h3>
                
                <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm text-gray-500">Name</h4>
                      <p className="font-medium">{formData.firstName} {formData.lastName}</p>
                    </div>
                    <div>
                      <h4 className="text-sm text-gray-500">Email</h4>
                      <p className="font-medium">{formData.email}</p>
                    </div>
                    <div>
                      <h4 className="text-sm text-gray-500">Phone</h4>
                      <p className="font-medium">{formData.phone}</p>
                    </div>
                    <div>
                      <h4 className="text-sm text-gray-500">Trek Date</h4>
                      <p className="font-medium">
                        {formData.trekDate 
                          ? new Date(formData.trekDate).toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })
                          : 'Not selected'}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm text-gray-500">Group Size</h4>
                      <p className="font-medium">{formData.groupSize} {formData.groupSize === 1 ? 'person' : 'people'}</p>
                    </div>
                    <div>
                      <h4 className="text-sm text-gray-500">Experience Level</h4>
                      <p className="font-medium">{getDifficultyLabel()}</p>
                    </div>
                    {formData.dietaryRestrictions && (
                      <div className="md:col-span-2">
                        <h4 className="text-sm text-gray-500">Dietary Restrictions</h4>
                        <p className="font-medium">{formData.dietaryRestrictions}</p>
                      </div>
                    )}
                    {formData.specialRequests && (
                      <div className="md:col-span-2">
                        <h4 className="text-sm text-gray-500">Special Requests</h4>
                        <p className="font-medium">{formData.specialRequests}</p>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-sm text-gray-700">
                    <strong>Payment Information:</strong> A 30% deposit is required to secure your booking. 
                    The remaining balance is due 30 days before the trek date. You will be redirected to 
                    our secure payment page after submission.
                  </p>
                </div>
                
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="termsAccepted"
                    name="termsAccepted"
                    checked={formData.termsAccepted}
                    onChange={handleCheckboxChange}
                    className={`mt-1 h-5 w-5 rounded border-gray-300 text-teal-600 focus:ring-teal-500 ${
                      errors.termsAccepted ? 'border-red-500' : ''
                    }`}
                  />
                  <div>
                    <label htmlFor="termsAccepted" className="text-gray-700">
                      I agree to the <a href="#" className="text-teal-600 underline">Terms and Conditions</a> and <a href="#" className="text-teal-600 underline">Cancellation Policy</a> *
                    </label>
                    {errors.termsAccepted && (
                      <p className="text-red-500 text-sm mt-1">{errors.termsAccepted}</p>
                    )}
                  </div>
                </div>
              </div>
            )}
            
            {/* Step 4: Success */}
            {formStep === 4 && (
              <div className="text-center py-10">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check className="text-green-600 w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Registration Complete!</h3>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                  Thank you for registering for our trek! We've sent a confirmation email to {formData.email} 
                  with all the details and next steps.
                </p>
                <div className="bg-gray-50 rounded-lg p-6 max-w-md mx-auto text-left mb-6">
                  <h4 className="font-semibold text-gray-800 mb-2">What's Next?</h4>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li className="flex">
                      <Check className="text-green-500 mr-2 flex-shrink-0" /> Complete your payment to secure your spot
                    </li>
                    <li className="flex">
                      <Check className="text-green-500 mr-2 flex-shrink-0" /> Receive detailed trek information via email
                    </li>
                    <li className="flex">
                      <Check className="text-green-500 mr-2 flex-shrink-0" /> Prepare your gear using our packing checklist
                    </li>
                    <li className="flex">
                      <Check className="text-green-500 mr-2 flex-shrink-0" /> Join the pre-trek orientation call (one week before)
                    </li>
                  </ul>
                </div>
                <a 
                  href="#home" 
                  className="inline-flex items-center bg-teal-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:bg-teal-700"
                >
                  Return Home
                </a>
              </div>
            )}
            
            {/* Navigation Buttons */}
            {formStep < 4 && (
              <div className={`flex ${formStep === 1 ? 'justify-end' : 'justify-between'} mt-10`}>
                {formStep > 1 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 font-semibold transition-colors duration-300 hover:bg-gray-50"
                  >
                    Back
                  </button>
                )}
                
                {formStep < 3 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="inline-flex items-center bg-teal-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:bg-teal-700"
                  >
                    Next <ArrowRight className="ml-2 w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="inline-flex items-center bg-teal-600 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:bg-teal-700"
                  >
                    Complete Registration <ArrowRight className="ml-2 w-4 h-4" />
                  </button>
                )}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};