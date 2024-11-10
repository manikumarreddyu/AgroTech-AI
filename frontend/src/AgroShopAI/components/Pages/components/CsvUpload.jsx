import React from 'react'

export default function CsvUpload({ csvFile, handleCsvUpload, validateAndProcessCsv, csvErrors, uploadSuccess }) {
  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-4 text-2xl font-semibold text-green-700">Bulk Product Upload</h2>
      <div className="mb-4">
        <label htmlFor="csv-upload" className="mb-2 block text-sm font-medium text-gray-700">
          Upload CSV File
        </label>
        <input
          type="file"
          id="csv-upload"
          accept=".csv"
          onChange={handleCsvUpload}
          className="w-full rounded-md border border-gray-300 p-2"
        />
      </div>
      {csvFile && (
        <button
          onClick={validateAndProcessCsv}
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Validate and Process CSV
        </button>
      )}
      {csvErrors.length > 0 && (
        <div className="mt-4">
          <h3 className="mb-2 text-lg font-semibold text-red-600">CSV Errors:</h3>
          <ul className="list-inside list-disc">
            {csvErrors.map((error, index) => (
              <li key={index} className="text-red-500">
                {error}
              </li>
            ))}
          </ul>
        </div>
      )}
      {uploadSuccess && (
        <div className="mt-4 text-lg font-semibold text-green-600">
          CSV uploaded and processed successfully!
        </div>
      )}
    </div>
  )
}
