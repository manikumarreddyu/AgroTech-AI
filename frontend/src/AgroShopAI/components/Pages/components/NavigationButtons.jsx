import React from 'react'

export default function NavigationButtons({ step, handleNextStep, handlePrevStep, handleSubmit }) {
  return (
    <div className="mt-6 flex justify-between">
      {step > 1 && (
        <button
          type="button"
          onClick={handlePrevStep}
          className="rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
        >
          Previous
        </button>
      )}
      {step < 3 ? (
        <button
          type="button"
          onClick={handleNextStep}
          className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
        >
          Next
        </button>
      ) : (
        <button
          type="submit"
          className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
        >
          Submit Product
        </button>
      )}
    </div>
  )
}
