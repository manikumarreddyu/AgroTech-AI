import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import Reviewscard from "../components/Reviewscard.jsx";
import ProductInfoCard from "../components/ProductInfoCard/ProductInfoCard.jsx";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard.jsx";
import axios from "axios";

// const ProductDetails = () => {
//   const { id } = useParams();
//   const [machine, setMachine] = useState(null);

//   const BASE_URL = import.meta.env.VITE_BASE_URL;

//   useEffect(() => {
//     const fetchMachineDetails = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

//         console.log("machine id in product details page", id);

//         const response = await axios.get(`${BASE_URL}/api/machine?machineId=${id}`);

//         setMachine(response.data);
//         console.log("Machine data retrieved successfully in ProductDetails component:", response.data);
//       } catch (error) {
//         console.error("Error fetching machine details:", error);
//       }
//     };

//     fetchMachineDetails();
//   }, [id]);


//   return (
//     <div>
//       <div className="mb-24">
//         <Navbar />
//       </div>
//       {/* {machine && <ProductInfoCard machine={machine} />} */}
//        <ProductInfoCard machine={machine} />
//       <div className="px-10">
//         <Reviewscard />
//       </div>
//       <div className="my-10 px-10">
//         <p className="text-3xl font-bold my-5">Similar Machines</p>
//         <div className="w-full grid grid-cols-4 gap-10">
//           {[1, 1, 1, 1].map(() => (
//             <div className="flex justify-center">
//               {/* Render ProductCard with machine data */}
//               {/* {machine && <ProductCard machine={machine} />} */}
//            <ProductCard machine={machine} />
//             </div>
//           ))}
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default ProductDetails;



const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const BASE_URL = import.meta.env.VITE_BASE_URL;


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        console.log("machine id in product details page", id, ' requested URL ->', `${BASE_URL}/api/machine?machineId=${id}`);
        const response = await axios.get(`${BASE_URL}/api/machine?machineId=${id}`);
        console.log("Machine info ", response.data.machine);
        if (response.status === 200) {
          const productData = response.data.machine; // Axios already parses JSON data
          setProduct(productData);
        } else {
          throw new Error('Failed to fetch product details');
        }
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProduct();
  }, [id]);


  if (!product) {
    return <p>Loading...</p>;
  }


  return (
    <div>
      <div className="mb-24">
        <Navbar />
      </div>
      {/* {machine && <ProductInfoCard machine={machine} />} */}
      <ProductInfoCard machine={product} />
      <div className="px-10">
        <Reviewscard />
      </div>
      <div className="my-10 px-10">
        <p className="text-3xl font-bold my-5">Similar Machines</p>
        <div className="w-full grid grid-cols-4 gap-10">
          {[1, 1, 1, 1].map(() => (
            <div className="flex justify-center">
              {/* Render ProductCard with machine data */}
              {/* {machine && <ProductCard machine={machine} />} */}
              {/* <ProductCard machine={machine} /> */}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};


export default ProductDetails;
