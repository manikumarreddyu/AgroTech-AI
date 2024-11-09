import React, { useState } from 'react'
import ProductStepForm from './ProductStepForm'
import NavigationButtons from './NavigationButtons'
import CsvUpload from './CsvUpload'

export default function ProductEntry() {
  const [step, setStep] = useState(1)
  const [productData, setProductData] = useState({
    name: '',
    category: '',
    price: '',
    quantity: '',
    description: '',
  })
  const [csvFile, setCsvFile] = useState(null)
  const [csvErrors, setCsvErrors] = useState([])
  const [uploadSuccess, setUploadSuccess] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleNextStep = () => {
    setStep((prevStep) => prevStep + 1)
  }

  const handlePrevStep = () => {
    setStep((prevStep) => prevStep - 1)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically send the data to your backend
    console.log('Product submitted:', productData)
    alert('Product submitted successfully!')
    setProductData({
      name: '',
      category: '',
      price: '',
      quantity: '',
      description: '',
    })
    setStep(1)
  }

  const handleCsvUpload = (e) => {
    const file = e.target.files[0]
    setCsvFile(file)
  }

  const validateAndProcessCsv = () => {
    // Simulating CSV validation and processing
    setTimeout(() => {
      const simulatedErrors = []
      if (Math.random() > 0.7) {
        simulatedErrors.push('Error in row 3: Missing product name')
        simulatedErrors.push('Error in row 7: Invalid price format')
      }
      setCsvErrors(simulatedErrors)
      if (simulatedErrors.length === 0) {
        setUploadSuccess(true)
        setCsvFile(null)
      }
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="mb-8 text-3xl font-bold text-green-800">Agroshop Product Update</h1>

      <div className="mb-8 rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-4 text-2xl font-semibold text-green-700">Add New Product</h2>
        <div className="mb-4 flex justify-between">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className={`w-1/3 py-2 text-center ${
                i === step ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'
              } rounded-md`}
            >
              Step {i}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          <ProductStepForm step={step} productData={productData} handleInputChange={handleInputChange} />
          <NavigationButtons step={step} handleNextStep={handleNextStep} handlePrevStep={handlePrevStep} handleSubmit={handleSubmit} />
        </form>
      </div>

      <CsvUpload
        csvFile={csvFile}
        handleCsvUpload={handleCsvUpload}
        validateAndProcessCsv={validateAndProcessCsv}
        csvErrors={csvErrors}
        uploadSuccess={uploadSuccess}
      />
    </div>
  )
}
