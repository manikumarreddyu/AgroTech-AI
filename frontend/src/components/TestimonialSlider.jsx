import { useEffect, useState } from 'react';

const TestimonialSlider = () => {
  const [active, setActive] = useState(3);
  const items = [
    {
      img: "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250",
      stars: "★★★★★",
      text: "The AgroTech AI platform has completely transformed the way I approach agricultural data analysis. The AI-driven insights are accurate, user-friendly, and truly empowering for farmers. I’m thrilled to use this tool that’s making a real difference in sustainable agriculture!",
      name: "- Arjun Sharma",
      jobTitle: "Data Analyst",
      location: "Location: Bengaluru, India"
    },
    {
      img: "https://img.freepik.com/free-vector/illustration-user-avatar-icon_53876-5907.jpg?ga=GA1.1.713761379.1679213202&semt=ais_hybrid",
      stars: "★★★★",
      text: "Working with AgroTech AI has opened new possibilities for crop management. The platform’s predictive models help me recommend tailored solutions for farmers, which they find incredibly helpful. The entire experience has made my job easier and much more impactful!",
      name: "- Priya Desai",
      jobTitle: "Agronomist",
      location: "Location: Mumbai, India"
    },
    {
      img: "https://img.freepik.com/free-vector/gradient-professional-sarah-smith-linkedin-personal-profile-picture_742173-13011.jpg?ga=GA1.1.713761379.1679213202&semt=ais_hybrid",
      stars: "★★★★★",
      text: "AgroTech AI’s pest control recommendations have been a game-changer for our farm. We can now manage pests more effectively and sustainably. The platform’s easy-to-use tools are perfect for any farm size. It’s a must-have for anyone in agriculture!",
      name: "- Rohan Patel",
      jobTitle: "Farm Manager",
      location: "Location: Ahmedabad, India"
    },
    {
      img: "https://img.freepik.com/free-vector/profile-picture-template-design_742173-22027.jpg?ga=GA1.1.713761379.1679213202&semt=ais_hybrid",
      stars: "★★★★",
      text: "AgroTech AI is an invaluable resource for managing soil health. The insights on nutrient levels and soil quality have helped me guide farmers toward healthier crops and improved yields. It’s a must-use tool for anyone serious about sustainable farming!",
      name: "- Neha Iyer",
      jobTitle: "Environmental Scientist",
      location: "Location: Chennai, India"
    },
    {
      img: "https://i.pravatar.cc/250?u=mail@ashallendesign.co.uk",
      stars: "★★★★★",
      text: "The AgroTech AI platform has been an amazing resource for understanding climate impact on crops. I can now make informed decisions based on weather predictions and irrigation insights a noticeable difference in crop health and yield.",
      name: "- Rahul Singh",
      jobTitle: "Agricultural Consultant",
      location: "Location: Hyderabad, India"
    },
    {
      img: "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250",
      stars: "★★★★★",
      text: "AgroTech AI has been an outstanding tool for improving our pest control strategies. With data-backed recommendations, we’ve reduced pesticide use and achieved better crop health. The platform is incredibly insightful!",
      name: "- Kavita Nair",
      jobTitle: "Sustainable Farming Specialist",
      location: "Location: Pune, India"
    },
  ];


  useEffect(() => {
    const interval = setInterval(() => {
      setActive(prev => (prev + 1) % items.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [items.length]);

  useEffect(() => {
    loadShow();
  }, [active]);

  const loadShow = () => {
    const itemsElement = document.querySelectorAll('.slider .item');
    itemsElement[active].style.transform = `none`;
    itemsElement[active].style.zIndex = 1;
    itemsElement[active].style.filter = 'none';
    itemsElement[active].style.opacity = 1;
    // Show after
    let stt = 0;
    for (let i = active + 1; i < itemsElement.length; i++) {
      stt++;
      itemsElement[i].style.transform = `translateX(${120 * stt}px) scale(${1 - 0.2 * stt}) perspective(16px) rotateY(-1deg)`;
      itemsElement[i].style.zIndex = 0;
      itemsElement[i].style.filter = 'blur(5px)';
      itemsElement[i].style.opacity = stt > 2 ? 0 : 0.6;
    }
    stt = 0;
    for (let i = (active - 1); i >= 0; i--) {
      stt++;
      itemsElement[i].style.transform = `translateX(${-120 * stt}px) scale(${1 - 0.2 * stt}) perspective(16px) rotateY(1deg)`;
      itemsElement[i].style.zIndex = 0;
      itemsElement[i].style.filter = 'blur(5px)';
      itemsElement[i].style.opacity = stt > 2 ? 0 : 0.6;
    }
  };

  return (
    <div>

      <h2 className="text-3xl md:text-4xl font-extrabold text-green-600 text-center mb-10">⭐ What Our Users Say ⭐</h2>

      <div className="slider" style={{ position: 'relative', marginTop: '100px', width: '100%', height: '550px', overflow: 'hidden' }}>
        {items.map((item, index) => (
          <div className="item max-sm:!w-[300px] max-sm:!h-[430px]" key={index} style={{
            position: 'absolute',
            width: '350px',
            height: '500px',
            textAlign: 'justify',
            background: '#15ae49', // Dark green to light yellow gradient
            borderRadius: '12px',
            padding: '20px',
            transition: '0.5s',
            left: 'calc(50% - 150px)',
            top: '0',
            marginBottom: '100px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)', // Soft shadow for depth
            overflow: 'hidden', // Ensures the image does not overflow
            color: 'white',
          }}>
            <img
              src={item.img}
              alt="User Avatar"
              className='w-[150px] h-[150px] rounded-lg object-cover mb-[20px] cursor-pointer max-sm:h-[120px] mb-0'
              style={{
                transition: 'transform 0.3s ease, filter 0.3s ease',
                border: '3px solid #d0e7b0' // Green border for the image
              }}
              onMouseOver={e => {
                e.currentTarget.style.transform = 'scale(1.1)';
                e.currentTarget.style.filter = 'brightness(1.1)'; // Brightness effect on hover
              }}
              onMouseOut={e => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.filter = 'brightness(1)'; // Reset brightness
              }}
            />
            <div className="stars text-[#ffd700] text-2xl mt-auto max-sm:mt-2">{item.stars}</div>
            <p className='text-justify mb-[15px] max-sm:text-xs max-sm:mb-0'>{item.text}</p>
            <h2 className='mb-[5px] text-xl font-semibold max-sm:mb-1 max-sm:text-lg'>{item.name}</h2>
            <div className="job-title text-[#ffffff] font-bold mb-[3px]">{item.jobTitle}</div>
            <div className="location text-[#e4e4e4] mb-[10px] max-sm:mb-1">{item.location}</div>
          </div>


        ))}

        <button id="next" className=' absolute top-[40%] text-green-900 bg-none border-none text-6xl font-mono font-bold opacity-80 transition-opacity z-10 right-[50px] max-sm:text-white max-sm:text-2xl max-sm:right-2' onClick={() => setActive(prev => (prev + 1 < items.length ? prev + 1 : prev))}>{">>"}</button>
        <button id="prev" className=' absolute top-[40%] text-green-900 bg-none border-none text-6xl font-mono font-bold opacity-80 transition-opacity z-10 left-[50px] max-sm:text-white max-sm:text-2xl max-sm:left-2' onClick={() => setActive(prev => (prev - 1 >= 0 ? prev - 1 : prev))}> {"<<"}</button>
      </div>
    </div>
  );
};

export default TestimonialSlider;
