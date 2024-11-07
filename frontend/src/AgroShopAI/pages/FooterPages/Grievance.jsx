import { useState } from 'react'
import { Leaf, HelpCircle, Send, ChevronDown, ChevronUp } from 'lucide-react'

export default function GrievanceRedressal() {
  const [expandedFaq, setExpandedFaq] = useState(null)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('')
  const [loading, setLoading] = useState(false)
  const [formError, setFormError] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const faqs = [
    {
      question: "How long does it take to process a grievance?",
      answer: "We aim to respond to all grievances within 5-7 business days. Complex issues may take longer to resolve."
    },
    {
      question: "Can I track the status of my grievance?",
      answer: "Yes, you will receive a unique tracking number after submitting your grievance. You can use this to check the status on our website."
    },
    {
      question: "What if I'm not satisfied with the resolution?",
      answer: "If you're not satisfied with the resolution, you can appeal the decision within 14 days of receiving our response."
    }
  ]

  const categories = [
    { value: "product-quality", label: "Product Quality" },
    { value: "delivery", label: "Delivery Issues" },
    { value: "customer-service", label: "Customer Service" },
    { value: "website", label: "Website Problems" },
    { value: "other", label: "Other" }
  ]

  const handleCategorySelect = (value, label) => {
    setSelectedCategory(label)
    setIsDropdownOpen(false)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    setLoading(true)
    setFormError('')

    const formData = new FormData(event.target)

    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      orderNumber: formData.get('order-number'),
      category: selectedCategory,
      description: formData.get('description'),
    }

    try {
      console.log('Form data:', data)

      
      setTimeout(() => {
        setLoading(false)
        setIsModalOpen(true)
      }, 2000)
      event.target.reset()
      setSelectedCategory('')
    } catch (error) {
      setLoading(false)
      setFormError('An error occurred while submitting the form. Please try again.')
    }
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  return (
    <div className="min-h-screen bg-green-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center">
          <Leaf className="mx-auto h-12 w-12 text-green-600" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Grievance Redressal</h2>
          <p className="mt-2 text-sm text-gray-600">
            We're here to help resolve any issues you may have with our agricultural products or services.
          </p>
        </div>

        <div className="mt-12 bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Submit a Grievance</h3>
            <form className="mt-5 grid grid-cols-1 gap-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm bg-white px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 transition duration-150 ease-in-out"
                  placeholder="Your Name"
                  required
                  disabled={loading}
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm bg-white px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 transition duration-150 ease-in-out"
                  placeholder="Account Email"
                  required
                  disabled={loading}
                />
              </div>
              <div>
                <label htmlFor="order-number" className="block text-sm font-medium text-gray-700">
                  Order Number (if applicable)
                </label>
                <input
                  type="text"
                  name="order-number"
                  id="order-number"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm bg-white px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 transition duration-150 ease-in-out"
                  placeholder="e.g. AG12345"
                  disabled={loading}
                />
              </div>
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                  Grievance Category
                </label>
                <div className="mt-1 relative">
                  <button
                    type="button"
                    className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 sm:text-sm"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    disabled={loading}
                  >
                    <span className="block truncate">
                      {selectedCategory || "Select a category"}
                    </span>
                    <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <ChevronDown className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </span>
                  </button>
                  {isDropdownOpen && (
                    <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                      {categories.map((category) => (
                        <div
                          key={category.value}
                          className="cursor-default select-none relative py-2 pl-3 pr-9 hover:bg-green-50"
                          onClick={() => handleCategorySelect(category.value, category.label)}
                        >
                          <span className="block truncate">{category.label}</span>
                          {selectedCategory === category.label && (
                            <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-green-600">
                              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Grievance Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  className="mt-1 block w-full rounded-md shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm bg-white px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 transition duration-150 ease-in-out"
                  placeholder="Please provide details about your grievance..."
                  required
                  disabled={loading}
                ></textarea>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-gray-400"
                  disabled={loading}
                >
                  {loading ? 'Submitting...' : 'Submit Grievance'}
                </button>
              </div>
            </form>
            {formError && <p className="mt-4 text-sm text-red-600">{formError}</p>}
          </div>
        </div>
        <div className="mt-12">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Frequently Asked Questions</h3>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-md">
                <button
                  className="flex justify-between items-center w-full px-4 py-2 text-left"
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                >
                  <span className="font-medium text-gray-900">{faq.question}</span>
                  {expandedFaq === index ? (
                    <ChevronUp className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  )}
                </button>
                {expandedFaq === index && (
                  <div className="px-4 pb-2">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <HelpCircle className="mx-auto h-8 w-8 text-green-600" />
          <h3 className="mt-2 text-lg font-medium text-gray-900">Need More Help?</h3>
          <p className="mt-1 text-sm text-gray-600">
            If you have any questions about the grievance process, please don't hesitate to contact our customer support team.
          </p>
          <div className="mt-4">
            <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500
                               transition duration-150 ease-in-out">
              Contact Support
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
            <h3 className="text-lg font-semibold text-gray-900">Grievance Submitted</h3>
            <p className="mt-2 text-sm text-gray-600">
              Thank you for submitting your grievance. Please check your email, as we will respond further regarding your issue.
            </p>
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleCloseModal}
                className="text-sm text-green-600 hover:text-green-800 focus:outline-none"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      
    </div>
  )
}
