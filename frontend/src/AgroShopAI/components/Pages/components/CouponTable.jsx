import React from 'react'

export default function CouponTable({ coupons, onEdit, onDelete }) {
  return (
    <table className="w-full border-collapse border">
      <thead>
        <tr className="bg-gray-100">
          <th className="border p-2">Code</th>
          <th className="border p-2">Type</th>
          <th className="border p-2">Value</th>
          <th className="border p-2">Start Date</th>
          <th className="border p-2">End Date</th>
          <th className="border p-2">Status</th>
          <th className="border p-2">Usage Limit</th>
          <th className="border p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {coupons.map(coupon => (
          <tr key={coupon.id}>
            <td className="border p-2">{coupon.code}</td>
            <td className="border p-2">{coupon.type}</td>
            <td className="border p-2">{coupon.value}</td>
            <td className="border p-2">{coupon.startDate}</td>
            <td className="border p-2">{coupon.endDate}</td>
            <td className="border p-2">{coupon.status}</td>
            <td className="border p-2">{coupon.usageLimit}</td>
            <td className="border p-2">
              <button
                onClick={() => onEdit(coupon)}
                className="bg-yellow-500 text-white px-2 py-1 rounded mr-2 hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(coupon)}
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
