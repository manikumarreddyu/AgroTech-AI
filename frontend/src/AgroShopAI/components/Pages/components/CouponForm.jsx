import React from 'react'

export default function CouponForm({
  formData,
  onFormChange,
  onSubmit,
  onCancel,
  editingCoupon
}) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center overflow-auto">
      <div className="bg-white p-6 rounded-lg max-w-2xl w-full relative max-h-[80vh] flex flex-col">
        <h2 className="text-2xl font-bold mb-4">{editingCoupon ? 'Edit Coupon' : 'Create New Coupon'}</h2>
        <form onSubmit={onSubmit} className="space-y-4 flex-1 overflow-y-auto">
          {/* Explicitly render each form field */}

          <div>
            <label htmlFor="code" className="block mb-1">Code</label>
            <input
              type="text"
              id="code"
              name="code"
              value={formData.code}
              onChange={onFormChange}
              className="w-full border rounded px-2 py-1"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block mb-1">Description</label>
            <input
              type="text"
              id="description"
              name="description"
              value={formData.description}
              onChange={onFormChange}
              className="w-full border rounded px-2 py-1"
              required
            />
          </div>

          <div>
            <label htmlFor="value" className="block mb-1">Value</label>
            <input
              type="text"
              id="value"
              name="value"
              value={formData.value}
              onChange={onFormChange}
              className="w-full border rounded px-2 py-1"
              required
            />
          </div>

          <div>
            <label htmlFor="minOrderAmount" className="block mb-1">Minimum Order Amount</label>
            <input
              type="text"
              id="minOrderAmount"
              name="minOrderAmount"
              value={formData.minOrderAmount}
              onChange={onFormChange}
              className="w-full border rounded px-2 py-1"
              required
            />
          </div>

          <div>
            <label htmlFor="maxDiscount" className="block mb-1">Max Discount</label>
            <input
              type="text"
              id="maxDiscount"
              name="maxDiscount"
              value={formData.maxDiscount}
              onChange={onFormChange}
              className="w-full border rounded px-2 py-1"
              required
            />
          </div>

          <div>
            <label htmlFor="startDate" className="block mb-1">Start Date</label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={formData.startDate}
              onChange={onFormChange}
              className="w-full border rounded px-2 py-1"
              required
            />
          </div>

          <div>
            <label htmlFor="endDate" className="block mb-1">End Date</label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={formData.endDate}
              onChange={onFormChange}
              className="w-full border rounded px-2 py-1"
              required
            />
          </div>

          <div>
            <label htmlFor="usageLimit" className="block mb-1">Usage Limit</label>
            <input
              type="text"
              id="usageLimit"
              name="usageLimit"
              value={formData.usageLimit}
              onChange={onFormChange}
              className="w-full border rounded px-2 py-1"
              required
            />
          </div>

        </form>
        <div className="flex justify-end space-x-2 mt-4">
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={onSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            {editingCoupon ? 'Update' : 'Create'}
          </button>
        </div>
      </div>
    </div>
  )
}
