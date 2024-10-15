import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    console.log("calling navbar useEffect!");
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      axios
        .get(`${BASE_URL}/api/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log("user name", response.data.user.name);
          setUsername(response.data.user.name);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      {username ? (
        <nav className="navbar p-2 px-8 w-full h-16 flex items-center bg-[#f7f7f8b8] fixed top-0 z-10 font-semibold">
          <div className="flex align-center items-center justify-start gap-2 w-1/3">
            <Link to="/products">
              <img
                src="../src/assets/Logo2.png"
                alt=""
                className="rounded-full"
                width={"50px"}
              />
            </Link>
            <h2 className="text-2xl text-zinc-800 font-bold">AgroRent</h2>
          </div>
          <div className="flex items-end justify-center gap-4 w-1/3">
            <h1 className="hover:bg-[#b2d8b4] p-1 rounded-md">
              <Link to="/products">Products</Link>
            </h1>
            <h1 className="hover:bg-[#b2d8b4] p-1 rounded-md">
              <Link to="/add_tools">Add Tools</Link>
            </h1>
            <h1 className="hover:bg-[#b2d8b4] p-1 rounded-md">
              <Link to="/about">About us</Link>
            </h1>
            <h1 className="hover:bg-[#b2d8b4] p-1 rounded-md">
              <Link to="/contact">Contact us</Link>
            </h1>
          </div>
          <div className="flex items-center justify-end w-1/3 gap-8">
            <div
              className="flex align-center items-center justify-start gap-2"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/profile")}
            >
              <img
                src="../src/assets/avatar.jpg"
                alt=""
                className="rounded-full w-10 object-cover"
              />
              <h1 className="text-xl text-zinc-800">{username}</h1>
            </div>
            <button
              onClick={handleLogout}
              className="bg-[#b2d8b4] hover:bg-[#9fd39b] text-black font-bold py-2 px-4 rounded"
            >
              <i className="ri-logout-box-r-line"></i> Logout
            </button>
          </div>
        </nav>
      ) : (
        <nav className="navbar p-2 px-8 w-full h-16 flex items-center bg-[#f7f7f8b8] fixed top-0 z-10">
          <div className="flex align-center items-center justify-start gap-2 w-1/3">
            <img
              src="../src/assets/Logo2.png"
              alt=""
              className="rounded-full"
              width={"50px"}
            />
            <h2 className="text-2xl text-zinc-800 font-bold">AgroRent</h2>
          </div>
          <div className="flex items-end justify-center gap-4 w-1/3">
            <h1 className="hover:bg-[#b2d8b4] p-1 rounded-md">
              <Link to="/contact">Contact us</Link>
            </h1>
            <h1 className="hover:bg-[#b2d8b4] p-1 rounded-md">
              <Link to="/about">About us</Link>
            </h1>
          </div>
          <div className="flex items-end justify-end w-1/3 gap-4">
            <button className="bg-[#b2d8b4] hover:bg-[#9fd39b] text-black font-bold py-2 px-4 rounded">
              <Link to="/login">Login</Link>
            </button>
            <button className="bg-[#b2d8b4] hover:bg-[#9fd39b] text-black font-bold py-2 px-4 rounded">
              <Link to="/register">Register</Link>
            </button>
          </div>
        </nav>
      )}
    </>
  );
};

export default Navbar;
