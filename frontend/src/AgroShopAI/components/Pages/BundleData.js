const dummyBundles = [
    {
      id: 1,
      name: "Vegetable Garden Starter Kit",
      products: [
        { id: 101, name: "Tomato Seeds", price: 2.99, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrs2SNL4lNOnoRgBlf0GRJWQl1yKHoVObKWQ&s" },
        { id: 102, name: "Cucumber Seeds", price: 2.49, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0Vwa7PEYpsxTqVB7Rk8XvlIfDKJGwxGNoUA&s" },
        { id: 103, name: "Lettuce Seeds", price: 1.99, image: "https://rukminim2.flixcart.com/image/850/1000/xif0q/plant-seed/r/h/s/500-lettuce-seeds-nutritious-strong-vitality-500-seeds-cybexis-original-imagj7zpsdzbusmy.jpeg?q=90&crop=false" },
      ],
      discount: 0.15,
      popular: true,
    },
    {
      id: 2,
      name: "Organic Fertilizer Pack",
      products: [
        { id: 201, name: "Compost", price: 9.99, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKrbmfitL_ySlrc4X1i1NfR0_9mgMHBd5Yng&s" },
        { id: 202, name: "Worm Castings", price: 14.99, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWEIMyLgEpGv5yvvUAwQMfDzBr4HAEaYZk_A&s" },
      ],
      discount: 0.1,
      popular: false,
    },
    {
      id: 3,
      name: "Herb Garden Deluxe",
      products: [
        { id: 301, name: "Basil Seeds", price: 2.99, image: "https://www.indianhealthyrecipes.com/wp-content/uploads/2022/05/how-to-use-sabja-seeds-005.webp" },
        { id: 302, name: "Cilantro Seeds", price: 2.49, image: "https://i.etsystatic.com/24334654/r/il/ee104f/2746663992/il_570xN.2746663992_kug2.jpg" },
        { id: 303, name: "Mint Seeds", price: 2.99, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7FO1mXAwhcF9nlI7muH4gZUAAoA07m_QObQ&s" },
        { id: 304, name: "Herb Planter", price: 19.99, image: "https://m.media-amazon.com/images/I/81Bn7zfkySL.jpg" },
      ],
      discount: 0.2,
      popular: true,
      loyaltyOnly: true,
    },
  ]
  
  const relatedBundles = [
    { id: 4, name: "Gardening Tools Set", price: 49.99, image: "https://m.media-amazon.com/images/I/91qFY3-tD9L.jpg" },
    { id: 5, name: "Pest Control Kit", price: 29.99, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHZI-60B7w_gP-kSTjhHkhx8zv7Ash3Y6HWg&s" },
  ]

export {dummyBundles,relatedBundles}
