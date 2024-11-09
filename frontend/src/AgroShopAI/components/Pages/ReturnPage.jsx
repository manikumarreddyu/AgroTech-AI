import { useState } from "react";
import ReturnHeader from "./components/ReturnAdminHeader";
import ReturnFilter from "./components/ReturnAdminFilter";
import ReturnProductCard from "./components/ReturnAdminProductCard";
import ReturnModal from "./components/ReturnAdminModal";
import ReturnHistory from "./components/ReturnAdminHistory";

export default function ReturnPage() {
  const [products, setProducts] = useState(dummyProducts);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [returnDate, setReturnDate] = useState("");
  const [condition, setCondition] = useState("Good");
  const [comment, setComment] = useState("");
  const [filter, setFilter] = useState("All");
  const [history, setHistory] = useState([]);
  const [sortOption, setSortOption] = useState("Name");

  const handleReturn = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleSubmitReturn = (e) => {
    e.preventDefault();
    const updatedProducts = products.map((p) =>
      p.id === selectedProduct.id ? { ...p, status: "Pending" } : p
    );
    setProducts(updatedProducts);
    setIsModalOpen(false);
    setSelectedProduct(null);
    setReturnDate("");
    setCondition("Good");
    setComment("");
    setHistory([
      ...history,
      { ...selectedProduct, returnDate: new Date().toLocaleString(), comment },
    ]);
  };

  const handleSort = (option) => {
    setSortOption(option);
    const sortedProducts = [...products].sort((a, b) => {
      if (option === "Name") return a.name.localeCompare(b.name);
      if (option === "Start Date")
        return new Date(a.startDate) - new Date(b.startDate);
      if (option === "End Date")
        return new Date(a.endDate) - new Date(b.endDate);
      return 0;
    });
    setProducts(sortedProducts);
  };

  const filteredProducts =
    filter === "All" ? products : products.filter((p) => p.status === filter);

  return (
    <div className="min-h-screen bg-green-50">
      <ReturnHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-green-800">
            Return Rented Equipment
          </h2>
          <ReturnFilter filter={filter} setFilter={setFilter} />
        </div>
        <div className="mb-6">
          <label htmlFor="sort" className="mr-4 text-green-700">
            Sort by:
          </label>
          <select
            id="sort"
            value={sortOption}
            onChange={(e) => handleSort(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="Name">Name</option>
            <option value="Start Date">Start Date</option>
            <option value="End Date">End Date</option>
          </select>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <ReturnProductCard
              key={product.id}
              product={product}
              handleReturn={handleReturn}
            />
          ))}
        </div>
        <ReturnHistory history={history} />
      </main>
      <ReturnModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        selectedProduct={selectedProduct}
        handleSubmitReturn={handleSubmitReturn}
        returnDate={returnDate}
        setReturnDate={setReturnDate}
        condition={condition}
        setCondition={setCondition}
        comment={comment}
        setComment={setComment}
      />
    </div>
  );
}

const dummyProducts = [
  {
    id: 1,
    user: { name: "John Doe", email: "john@example.com", phone: "+1234567890" },
    orderId: "ORD-001",
    product: { name: "Organic Fertilizer", quantity: 2, price: 29.99 },
    reason: "Received wrong product",
    submissionDate: "2023-06-01",
    status: "pending",
    comments: [],
  },
  {
    id: 2,
    user: {
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "+1987654321",
    },
    orderId: "ORD-002",
    product: { name: "Heirloom Tomato Seeds", quantity: 1, price: 14.99 },
    reason: "Product damaged during shipping",
    submissionDate: "2023-05-28",
    status: "approved",
    comments: ["Approved for return. Please send return label to customer."],
  },
  {
    id: 3,
    user: {
      name: "Bob Johnson",
      email: "bob@example.com",
      phone: "+1122334455",
    },
    orderId: "ORD-003",
    product: { name: "Drip Irrigation Kit", quantity: 1, price: 89.99 },
    reason: "Changed mind",
    submissionDate: "2023-05-25",
    status: "rejected",
    comments: ["Return window has expired."],
  },
];
