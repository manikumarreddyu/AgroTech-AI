
import React, { useState } from 'react'



export default function ReturnPanel() {
  const [requests, setRequests] = useState(dummyRequests)
  const [filterStatus, setFilterStatus] = useState('all')
  const [sortBy, setSortBy] = useState('date')
  const [newComment, setNewComment] = useState('')

  const filteredRequests = requests.filter(request => 
    filterStatus === 'all' ? true : request.status === filterStatus
  ).sort((a, b) => 
    sortBy === 'date' 
      ? new Date(b.submissionDate).getTime() - new Date(a.submissionDate).getTime()
      : a.status.localeCompare(b.status)
  )

  const handleStatusChange = (id, newStatus) => {
    setRequests(requests.map(request => 
      request.id === id ? { ...request, status: newStatus } : request
    ))
  }

  const handleAddComment = (id) => {
    if (newComment.trim()) {
      setRequests(requests.map(request => 
        request.id === id 
          ? { ...request, comments: [...request.comments, newComment.trim()] }
          : request
      ))
      setNewComment('')
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-green-800 mb-8">AgroShop Return Panel</h1>
      
      <div className="mb-6 flex justify-between items-center">
        <div>
          <label htmlFor="filter" className="mr-2 text-gray-700">Filter by status:</label>
          <select 
            id="filter"
            className="border rounded p-2"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            <option value="processed">Processed</option>
          </select>
        </div>
        <div>
          <label htmlFor="sort" className="mr-2 text-gray-700">Sort by:</label>
          <select 
            id="sort"
            className="border rounded p-2"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="date">Date</option>
            <option value="status">Status</option>
          </select>
        </div>
      </div>

      {filteredRequests.map(request => (
        <div key={request.id} className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">{request.user.name}</h2>
              <p className="text-gray-600">{request.user.email} | {request.user.phone}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm font-semibold
              ${request.status === 'pending' ? 'bg-yellow-200 text-yellow-800' :
                request.status === 'approved' ? 'bg-green-200 text-green-800' :
                request.status === 'rejected' ? 'bg-red-200 text-red-800' :
                'bg-blue-200 text-blue-800'}`}>
              {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
            </span>
          </div>
          
          <div className="mb-4">
            <p><span className="font-semibold">Order ID:</span> {request.orderId}</p>
            <p><span className="font-semibold">Product:</span> {request.product.name}</p>
            <p><span className="font-semibold">Quantity:</span> {request.product.quantity}</p>
            <p><span className="font-semibold">Price:</span> ${request.product.price.toFixed(2)}</p>
            <p><span className="font-semibold">Reason:</span> {request.reason}</p>
            <p><span className="font-semibold">Submission Date:</span> {request.submissionDate}</p>
          </div>

          <div className="mb-4">
            <h3 className="font-semibold mb-2">Comments:</h3>
            {request.comments.map((comment, index) => (
              <p key={index} className="bg-gray-100 p-2 rounded mb-2">{comment}</p>
            ))}
            <div className="flex mt-2">
              <input
                type="text"
                className="flex-grow border rounded-l p-2"
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-r hover:bg-green-600"
                onClick={() => handleAddComment(request.id)}
              >
                Add
              </button>
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            {request.status === 'pending' && (
              <>
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                  onClick={() => handleStatusChange(request.id, 'approved')}
                >
                  Approve
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  onClick={() => handleStatusChange(request.id, 'rejected')}
                >
                  Reject
                </button>
              </>
            )}
            {request.status === 'approved' && (
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={() => handleStatusChange(request.id, 'processed')}
              >
                Mark as Processed
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}


const dummyRequests = [
    {
      id: 1,
      user: { name: 'John Doe', email: 'john@example.com', phone: '+1234567890' },
      orderId: 'ORD-001',
      product: { name: 'Organic Fertilizer', quantity: 2, price: 29.99 },
      reason: 'Received wrong product',
      submissionDate: '2023-06-01',
      status: 'pending',
      comments: []
    },
    {
      id: 2,
      user: { name: 'Jane Smith', email: 'jane@example.com', phone: '+1987654321' },
      orderId: 'ORD-002',
      product: { name: 'Heirloom Tomato Seeds', quantity: 1, price: 14.99 },
      reason: 'Product damaged during shipping',
      submissionDate: '2023-05-28',
      status: 'approved',
      comments: ['Approved for return. Please send return label to customer.']
    },
    {
      id: 3,
      user: { name: 'Bob Johnson', email: 'bob@example.com', phone: '+1122334455' },
      orderId: 'ORD-003',
      product: { name: 'Drip Irrigation Kit', quantity: 1, price: 89.99 },
      reason: 'Changed mind',
      submissionDate: '2023-05-25',
      status: 'rejected',
      comments: ['Return window has expired.']
    }
  ]