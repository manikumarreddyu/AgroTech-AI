import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bar } from 'react-chartjs-2';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';

import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const ProductReview = () => {
  const [newReview, setNewReview] = useState({ rating: 0, title: '', comment: '' });
  const [averageRating, setAverageRating] = useState(4.0);
  const [ratingDistribution, setRatingDistribution] = useState([1, 1, 1, 1, 1]);
  const [helpfulReview, setHelpfulReview] = useState({});
  const [filterRating, setFilterRating] = useState(0);
  const [sortOrder, setSortOrder] = useState('newest');

  const [reviews, setReviews] = useState([
    {
      _id: '1',
      rating: 5,
      title: 'Amazing Product!',
      comment: 'This product exceeded my expectations. Highly recommend!',
      date: '2023-10-01',
    },
    {
      _id: '2',
      rating: 4,
      title: 'Very Good',
      comment: 'The product is really good, though it could use a few improvements.',
      date: '2023-09-15',
    },
    {
      _id: '3',
      rating: 3,
      title: 'Average',
      comment: 'It’s okay, does the job but nothing extraordinary.',
      date: '2023-08-20',
    },
  ]);

  const handleReviewSubmit = () => {
    if (newReview.rating === 0 || !newReview.comment) {
      return toast.error("Please provide a rating and a comment.");
    }
    const updatedReviews = [...reviews, { ...newReview, _id: Date.now().toString(), date: new Date().toISOString() }];
    setReviews(updatedReviews);
    toast.success("Review submitted successfully!");
    setNewReview({ rating: 0, title: '', comment: '' });
  };

    // Fetch reviews and rating distribution
//   useEffect(() => {
    // const fetchReviews = async () => {
    //   try {
    //     const response = await fetch(`${apiUrl}/api/rent-products/${productId}/reviews`);
    //     const data = await response.json();
    //     setReviews(data.reviews);
    //     setAverageRating(data.averageRating);
    //     setRatingDistribution(data.ratingDistribution);
    //   } catch (error) {
    //     console.error('Error fetching reviews:', error);
    //   }
    // };
    // fetchReviews();
//   }, [productId, apiUrl]);

  // Handle new review submission
//   const handleReviewSubmit = async () => {
//     if (newReview.rating === 0 || !newReview.comment) {
//       return toast.error("Please provide a rating and a comment.");
//     }

//     try {
//       const response = await fetch(`${apiUrl}/api/rent-products/${productId}/reviews`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(newReview),
//       });

//       if (response.ok) {
//         toast.success("Review submitted successfully!");
//         setNewReview({ rating: 0, title: '', comment: '' });
//       } else {
//         const errorData = await response.json();
//         toast.error(`Error: ${errorData.message}`);
//       }
//     } catch (error) {
//       toast.error('Failed to submit review');
//     }
//   };

  const markReviewHelpful = (reviewId, isHelpful) => {
    setHelpfulReview((prevHelpfulReview) => ({
      ...prevHelpfulReview,
      [reviewId]: isHelpful,
    }));
  };

    // Handle marking reviews as helpful
//   const markReviewHelpful = async (reviewId, isHelpful) => {
//     try {
//       await fetch(`${apiUrl}/api/reviews/${reviewId}/helpful`, {
//         method: 'PATCH',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ helpful: isHelpful }),
//       });
//       setHelpfulReview({ ...helpfulReview, [reviewId]: isHelpful });
//     } catch (error) {
//       console.error('Error marking review as helpful:', error);
//     }
//   };


  // Apply filter and sort to reviews
  const filteredReviews = reviews
    .filter((review) => filterRating === 0 || review.rating === filterRating)
    .sort((a, b) => {
      if (sortOrder === 'newest') return new Date(b.date) - new Date(a.date);
      if (sortOrder === 'oldest') return new Date(a.date) - new Date(b.date);
      if (sortOrder === 'highest') return b.rating - a.rating;
      if (sortOrder === 'lowest') return a.rating - b.rating;
      return 0;
    });

  // Rating distribution graph data
  const chartData = {
    labels: ['1 Star', '2 Stars', '3 Stars', '4 Stars', '5 Stars'],
    datasets: [
      {
        label: 'Number of Ratings',
        data: ratingDistribution,
        backgroundColor: ['#f87171', '#fbbf24', '#facc15', '#4ade80', '#22c55e'],
      },
    ],
  };

  return (
    <div className="product-review mt-8">
      <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>

      {/* Average Rating and Rating Distribution */}
      <div className="average-rating mb-4 flex items-center">
        <span className="text-3xl font-semibold mr-2">{averageRating.toFixed(1)}</span>
        <Star className="w-5 h-5 text-yellow-400" />
      </div>
      <Bar data={chartData} />

      {/* Filter and Sort Options */}
      <div className="filter-sort mt-4 flex justify-between items-center">
        {/* Filter by Rating */}
        <div className="filter-rating flex items-center">
          <label className="mr-2">Filter by Rating:</label>
          <select value={filterRating} onChange={(e) => setFilterRating(Number(e.target.value))} className="border p-1 rounded">
            <option value={0}>All</option>
            {[1, 2, 3, 4, 5].map((rating) => (
              <option key={rating} value={rating}>
                {rating} Stars
              </option>
            ))}
          </select>
        </div>

        {/* Sort Options */}
        <div className="sort-order flex items-center">
          <label className="mr-2">Sort by:</label>
          <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className="border p-1 rounded">
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="highest">Highest Rating</option>
            <option value="lowest">Lowest Rating</option>
          </select>
        </div>
      </div>

      {/* Review Form */}
      <div className="review-form mt-8">
        <h3 className="text-xl font-semibold mb-2">Submit Your Review</h3>
        <div className="rating-input flex items-center mb-4">
          <label className="mr-4">Rating:</label>
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-5 h-5 cursor-pointer ${star <= newReview.rating ? 'text-yellow-500' : 'text-gray-300'}`}
              onClick={() => setNewReview({ ...newReview, rating: star })}
            />
          ))}
        </div>
        <input
          type="text"
          placeholder="Review title (optional)"
          value={newReview.title}
          onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
          className="mb-4 p-2 border rounded w-full"
        />
        <textarea
          placeholder="Write your review here..."
          value={newReview.comment}
          onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
          className="p-2 border rounded w-full"
          rows="4"
        />
        <button
          onClick={handleReviewSubmit}
          className="mt-4 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-500"
        >
          Submit Review
        </button>
      </div>

      {/* Reviews List */}
      <div className="reviews-list mt-8">
        {filteredReviews.map((review) => (
          <div key={review._id} className="review-item border-t py-4">
            <div className="flex items-center">
              <Star className="w-4 h-4 text-yellow-500 mr-2" />
              <span>{review.rating} / 5</span>
              <p className="ml-auto text-gray-500">{new Date(review.date).toLocaleDateString()}</p>
            </div>
            <h4 className="font-bold">{review.title}</h4>
            <p>{review.comment}</p>
            <div className="flex items-center mt-2">
              <button
                className={`text-green-600 flex items-center ${helpfulReview[review._id] === true ? 'font-bold' : ''}`}
                onClick={() => markReviewHelpful(review._id, true)}
              >
                <FaThumbsUp className="mr-1" /> Helpful
              </button>
              <button
                className={`text-red-600 flex items-center ml-4 ${helpfulReview[review._id] === false ? 'font-bold' : ''}`}
                onClick={() => markReviewHelpful(review._id, false)}
              >
                <FaThumbsDown className="mr-1" /> Not Helpful
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductReview;
