import React , {useEffect} from 'react';
import { useParams } from 'react-router-dom'; // If you're using React Router for navigation
import ProductDetails from './ProductDetails';
import RelatedProducts from './RelatedProducts';
import ReviewsSection from './ReviewsSection';
import axios from "axios"



const ProductDetailPage = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const { machineId } = useParams();
 

  return (
    <div>
      <ProductDetails machineId={machineId} />
      <ReviewsSection machineId={machineId} />
    </div>
  );
};

export default ProductDetailPage;
