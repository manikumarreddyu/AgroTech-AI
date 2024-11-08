
import React, { useState, useEffect } from "react";

import {
  User,
  Clock,
  CreditCard,
  Heart,
  Bell,
  Star,
  Shield,
  LifeBuoy,
  FileText,
  Package,
} from "lucide-react";
import ProfileComponent from "./components/AccountInformation";
import RentalHistoryComponent from "./components/RentalHistory";
import PaymentMethodsComponent from "./components/PaymentMethods";
import WishlistComponent from "./components/Wishlist";
import NotificationsComponent from "./components/RentNotifications";
import RatingsReviewsComponent from "./components/RatingReviews";
import SecurityPrivacyComponent from "./components/SecurityPrivacyComponent";
import SupportAssistanceComponent from "./components/SupportAssistance";
import SubscriptionMembershipComponent from "./components/Subscription";
import OrderDeliveryTrackingComponent from "./components/OrderTracking";

const RentUserDashboard = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    address: "",
    profilePicture: "",

    paymentMethods: [],
  });
  const [rentals, setRentals] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [activeSection, setActiveSection] = useState("Account Information");

  useEffect(() => {
    const fetchData = async () => {
      setProfile(await fetchUserProfile());
      setRentals(await fetchUserRentals());
      setWishlist(await fetchUserWishlist());
      setReviews(await fetchUserReviews());
      setNotifications(await fetchUserNotifications());
    };

    fetchData();
  }, []);

  // Mock API calls
  const fetchUserProfile = async () => ({

    name: "John Doe",
    email: "john@example.com",
    address: "123 Main St, Springfield, USA",
    profilePicture: "/images/profile.png",
    paymentMethods: ["Visa **** 1234", "Mastercard **** 5678"],

  });

  const fetchUserRentals = async () => [
    {
      id: 1,
      name: "Tractor",
      duration: "5 days",
      cost: "$150",
      status: "Active",
    },
    { id: 2, name: "Plow", duration: "2 days", cost: "$80", status: "Pending" },
    {
      id: 3,
      name: "Seeder",
      duration: "1 week",
      cost: "$200",
      status: "Completed",
    },
  ];

  const fetchUserWishlist = async () => [
    { id: 1, name: "Rototiller", price: "$300" },
    { id: 2, name: "Lawn Mower", price: "$200" },
  ];


  const fetchUserNotifications = async () => [
    {
      id: 1,
      message: "Your rental for Seeder is due tomorrow!",
      type: "reminder",
    },
    { id: 2, message: "20% discount on new rentals!", type: "offer" },
  ];

  const handleCancelRental = (id) => {
    setRentals(rentals.filter((rental) => rental.id !== id));
  };

  const renderSectionContent = () => {
    switch (activeSection) {
      case "Account Information":

        return <ProfileComponent profile={profile} />;

      case "Rental History":
        return <RentalHistoryComponent />;
      case "Payment Methods & Billing":
        return (
          <PaymentMethodsComponent paymentMethods={profile.paymentMethods} />
        );
      case "Saved Items / Wishlist":
        return <WishlistComponent wishlist={wishlist} />;
      case "Notifications & Alerts":
        return <NotificationsComponent notifications={notifications} />;
      case "Ratings & Reviews":
        return <RatingsReviewsComponent />;
      case "Security & Privacy":
        return <SecurityPrivacyComponent />;
      case "Support & Assistance":
        return <SupportAssistanceComponent />;
      case "Subscription & Membership":
        return <SubscriptionMembershipComponent />;
      case "Order & Delivery Tracking":
        return <OrderDeliveryTrackingComponent rentals={rentals} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <div className="w-1/4 bg-green-50 p-6">
        <h2 className="text-2xl font-extrabold tracking-tight text-green-900 mb-6">
          Dashboard
        </h2>
        <ul className="space-y-4">
          <li
            className="cursor-pointer"
            onClick={() => setActiveSection("Account Information")}
          >
            <User className="inline mr-2" /> Account Information
          </li>
          <li
            className="cursor-pointer"
            onClick={() => setActiveSection("Rental History")}
          >
            <Clock className="inline mr-2" /> Rental History
          </li>
          <li
            className="cursor-pointer"
            onClick={() => setActiveSection("Payment Methods & Billing")}
          >
            <CreditCard className="inline mr-2" /> Payment Methods & Billing
          </li>
          <li
            className="cursor-pointer"
            onClick={() => setActiveSection("Saved Items / Wishlist")}
          >
            <Heart className="inline mr-2" /> Saved Items / Wishlist
          </li>
          <li
            className="cursor-pointer"
            onClick={() => setActiveSection("Notifications & Alerts")}
          >
            <Bell className="inline mr-2" /> Notifications & Alerts
          </li>
          <li className="cursor-pointer" onClick={() => setActiveSection("Ratings & Reviews")}>
            <Star className="inline mr-2" /> Ratings & Reviews
          </li>
          <li className="cursor-pointer" onClick={() => setActiveSection("Security & Privacy")}>
            <Shield className="inline mr-2" /> Security & Privacy
          </li>
          <li className="cursor-pointer" onClick={() => setActiveSection("Support & Assistance")}>
            <LifeBuoy className="inline mr-2" /> Support & Assistance
          </li>
          <li className="cursor-pointer" onClick={() => setActiveSection("Subscription & Membership")}>
            <FileText className="inline mr-2" /> Subscription & Membership
          </li>
          <li className="cursor-pointer" onClick={() => setActiveSection("Order & Delivery Tracking")}>
            <Package className="inline mr-2" /> Order & Delivery Tracking
          </li>
        </ul>
      </div>

      <div className="w-3/4 bg-white p-8">
        <h2 className="text-2xl font-bold text-green-500 mb-4">
          {activeSection}
        </h2>
        {renderSectionContent()}
      </div>
    </div>
  );
};

export default RentUserDashboard;
