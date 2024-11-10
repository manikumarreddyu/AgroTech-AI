import React from "react";

const rainwaterGuides = [
    {
        title: "Introduction to Rainwater Harvesting",
        description: "Learn the basics of setting up rainwater harvesting systems on your farm."
    },
    {
        title: "Designing Efficient Harvesting Systems",
        description: "How to design systems that optimize water collection for agricultural use."
    },
    {
        title: "Storing and Using Harvested Rainwater",
        description: "Best practices for storage tanks and efficient water usage on your farm."
    }
];

const bestPractices = [
    {
        title: "Water-Saving Techniques",
        description: "Explore water-saving techniques like drip irrigation and moisture retention."
    },
    {
        title: "Adopting Smart Irrigation",
        description: "Using IoT-based systems to monitor water usage and optimize irrigation."
    },
    {
        title: "Tech Innovations in Water Conservation",
        description: "Stay updated on the latest technologies in water-saving tools for farming."
    }
];

const WaterManagement = () => {
    return (
        <div className="max-w-7xl mx-auto px-6 py-12 mt-14">
            <header className="text-center">
                <h1 className="text-4xl font-bold text-green-600">Sustainable Water Management Solutions</h1>
                <p className="mt-4 text-lg text-gray-600">
                    Learn sustainable water management techniques, including rainwater harvesting, efficient water use, and more.
                </p>
            </header>

            <section className="mt-12">
                <h2 className="text-3xl font-semibold text-green-600 text-center">Rainwater Harvesting Guides</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
                    {rainwaterGuides.map((guide, index) => (
                        <div key={index} className="bg-gray-100 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <h3 className="text-xl font-semibold text-gray-800">{guide.title}</h3>
                            <p className="mt-4 text-gray-600">{guide.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="mt-12">
                <h2 className="text-3xl font-semibold text-green-600 text-center">Best Practices for Water Conservation</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
                    {bestPractices.map((practice, index) => (
                        <div key={index} className="bg-gray-100 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <h3 className="text-xl font-semibold text-gray-800">{practice.title}</h3>
                            <p className="mt-4 text-gray-600">{practice.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="mt-12 text-center">
                <h2 className="text-3xl font-semibold text-green-600">Resources for Sustainable Water Management</h2>
                <p className="mt-4 text-lg text-gray-600">
                    Access a database of local suppliers and installers for water-saving infrastructure, rainwater harvesting systems, and more.
                </p>
                <button className="mt-8 px-6 py-3 bg-green-600 text-white text-lg font-semibold rounded-full hover:bg-green-700 transition-all duration-300">
                    Find Local Suppliers
                </button>
            </section>
        </div>
    );
};

export default WaterManagement;
