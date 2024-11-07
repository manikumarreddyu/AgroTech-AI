import React from 'react'

export default function LandscapeCategories({categories}) {


  return (
    <section className="py-2">
      <div className="mx-2 ">
      <div className="relative w-full h-40 bg-gradient-to-r from-green-800 to-green-400 flex items-center justify-center my-2">
  {/* Optional decorative shapes or icon */}
  <div className="absolute top-0 left-0 m-4 w-16 h-16 bg-white bg-opacity-20 rounded-full"></div>
  <div className="absolute bottom-0 right-0 m-4 w-20 h-20 bg-white bg-opacity-20 rounded-full"></div>

  {/* Content */}
  <div className="relative z-10 text-center">
    <h1 className="text-3xl font-bold ">Available Categories</h1>
    <p className=" text-md text-green-100 opacity-90">Explore a wide range of categories to find your needs</p>
  </div>
</div>

        <div className="relative  overflow-hidden  ">
          <div className="flex overflow-x-auto pb-8 -mx-4 px-4 scroll-smooth scrollbar-thin">
            <div className="flex space-x-6 mx-auto ">
              {categories.map((category) => (
                <a key={category.alias} href={`/agroshop/category/${category.alias}`} className="group flex-shrink-0 w-64 transition-all duration-300 hover:shadow-lg">
                  <div className="relative h-40 w-full overflow-hidden rounded-lg">
                    <img src={category.banner} alt={category.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-black bg-opacity-40 transition-opacity duration-300 group-hover:bg-opacity-30"></div>
                    <div className="absolute inset-0 flex flex-col justify-end p-4">
                      <h3 className="text-xl font-semibold text-white group-hover:text-green-300 transition-colors duration-300">{category.title}</h3>
                      <span className="text-sm text-gray-200 group-hover:text-green-200 transition-colors duration-300">View Products</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
          <div className="absolute top-0 bottom-8 left-0 bg-gradient-to-r from-gray-50 to-transparent w-8"></div>
          <div className="absolute top-0 bottom-8 right-0 bg-gradient-to-l from-gray-50 to-transparent w-8"></div>
        </div>
      </div>
    </section>
  )
}