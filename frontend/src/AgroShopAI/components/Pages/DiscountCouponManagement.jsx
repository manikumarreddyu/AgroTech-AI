import React, { useState } from 'react'
import CouponTable from './components/CouponTable'
import CouponForm from './components/CouponForm'
import DeleteConfirmationModal from './components//DeleteConfirmationModal'
import FilterBar from './components/FilterBar'

export default function DiscountCouponManagement() {
  const [coupons, setCoupons] = useState([
    { id: 1, code: 'SUMMER10', type: 'Percentage', value: 10, startDate: '2023-06-01', endDate: '2023-08-31', status: 'active', usageLimit: 100 },
    { id: 2, code: 'WELCOME20', type: 'Percentage', value: 20, startDate: '2023-01-01', endDate: '2023-12-31', status: 'active', usageLimit: 1000 },
    { id: 3, code: 'FLASH50', type: 'Fixed Amount', value: 50, startDate: '2023-07-01', endDate: '2023-07-02', status: 'expired', usageLimit: 500 },
  ])

  const [showForm, setShowForm] = useState(false)
  const [editingCoupon, setEditingCoupon] = useState(null)
  const [deleteConfirmation, setDeleteConfirmation] = useState(null)

  const [formData, setFormData] = useState({
    code: '',
    description: '',
    type: 'Percentage',
    value: 0,
    minOrderAmount: 0,
    maxDiscount: 0,
    startDate: '',
    endDate: '',
    usageLimit: 0,
    status: 'active'
  })

  const [filter, setFilter] = useState({ status: 'all', dateRange: '', discountType: '' })

  const handleFilterChange = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value })
  }

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editingCoupon) {
      setCoupons(coupons.map(coupon => coupon.id === editingCoupon.id ? { ...coupon, ...formData } : coupon))
    } else {
      setCoupons([...coupons, { id: coupons.length + 1, ...formData }])
    }
    setShowForm(false)
    setEditingCoupon(null)
    setFormData({
      code: '',
      description: '',
      type: 'Percentage',
      value: 0,
      minOrderAmount: 0,
      maxDiscount: 0,
      startDate: '',
      endDate: '',
      usageLimit: 0,
      status: 'active'
    })
  }

  const handleEdit = (coupon) => {
    setEditingCoupon(coupon)
    setFormData(coupon)
    setShowForm(true)
  }

  const handleDelete = (coupon) => {
    setDeleteConfirmation(coupon)
  }

  const confirmDelete = () => {
    setCoupons(coupons.filter(c => c.id !== deleteConfirmation.id))
    setDeleteConfirmation(null)
  }

  return (
    <div className="p-6 max-w-6xl mx-auto h-screen">
      <h1 className="text-3xl font-bold mb-6">Discount and Coupon Management</h1>

      <FilterBar handleFilterChange={handleFilterChange} />
      <div className="overflow-y-auto max-h-96">
      <CouponTable
        coupons={coupons}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      </div>

      <button
        onClick={() => setShowForm(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Create Coupon
      </button>
    <div className="mt-50">

      {showForm && (
        <CouponForm
          formData={formData}
          onFormChange={handleFormChange}
          onSubmit={handleSubmit}
          onCancel={() => setShowForm(false)}
          editingCoupon={editingCoupon}
        />
      )}
    </div>

      {deleteConfirmation && (
        <DeleteConfirmationModal
          coupon={deleteConfirmation}
          onCancel={() => setDeleteConfirmation(null)}
          onConfirm={confirmDelete}
        />
      )}
    </div>
  )
}
