import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CategoryDropdown from '../components/CategoryDropdown';
import data from '../data.json';
import image1 from '../assets/images/dog1.jpg';
import image2 from '../assets/images/woman-dog.png';
import image3 from '../assets/images/vaccination.png';

const DogPage = () => {
  const { sections } = data;
  const [selectedCategory, setSelectedCategory] = useState('');
  const navigate = useNavigate();

  const handleFindProducts = () => {
    if (selectedCategory) {
      navigate(`/products/${selectedCategory.toLowerCase().replace(/ /g, '-')}`);
    } else {
      alert('Please select a category to find products.');
    }
  };

return (
    <div className="p-6">
        <div
            className="relative bg-cover bg-center h-[400px] flex items-center justify-center"
            style={{ backgroundImage: `url(${image2})` }}
        ></div>

        <div className="bg-gray-600 flex flex-col items-center mb-8">
            <div className="w-full max-w-4xl flex flex-col md:flex-row justify-between mb-4 space-x-4">
                <div className="bg-gray-200 p-4 rounded-lg mb-4 md:mb-0 md:mr-2 flex-1">
                    <img
                        src={image3}
                        alt="Banner 1"
                        className="w-full h-60 object-cover rounded-lg"
                    />
                    <p className="text-center mt-4 text-lg font-semibold">
                        Vaccinating your dog: which diseases should you protect against?
                    </p>
                </div>
                <div className="mt-5 max-w-4xl mb-4 md:mb-0 md:mx-4 flex flex-col items-center pt-7">
                    <CategoryDropdown onCategoryChange={setSelectedCategory} />
                    <button
                        onClick={handleFindProducts}
                        className="mt-12 bg-green-500 text-white px-8 py-2 rounded-lg hover:bg-green-600 transition duration-300 "
                    >
                        Find a product
                    </button>
                </div>
                <div className="bg-gray-200 p-4 rounded-lg mb-4 md:mb-0 md:ml-2 flex-1">
                    <img
                        src={image1}
                        alt="Banner 2"
                        className="w-full h-60 object-cover rounded-lg"
                    />
                    <p className="text-center mt-4 text-lg font-semibold">
                        VETERINARY HPM Kibble: a low-carbohydrate, high-protein formulation to best meet your dog's needs.
                    </p>
                </div>
            </div>
        </div>

        {sections.map((section, index) => (
            <div key={index} className="mb-12">
                <h2 className="text-2xl font-bold mb-6 text-center">{section.title}</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {section.articles.map((article) => (
                        <div key={article.id} className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col items-center">
                            <img
                                src={article.image}
                                alt={article.title}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4 text-center">
                                <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
                                <Link
                                    to={`/article/${article.id}`}
                                    className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition duration-300"
                                >
                                    Learn More
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex justify-center mt-6">
                    <Link
                        to={`/all-articles/${section.title.toLowerCase().replace(/ /g, '-')}`}
                        className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition duration-300"
                    >
                        All articles on {section.title}
                    </Link>
                </div>
            </div>
        ))}
    </div>
);
};

export default DogPage;