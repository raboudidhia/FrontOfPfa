import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import CategoryDropdown from '../components/CategoryDropdown';
import image1 from '../assets/images/dog1.jpg';
import image2 from '../assets/images/woman-dog.png';
import image3 from '../assets/images/vaccination.png';

const DogPage = () => {
  const [careTips, setCareTips] = useState([]);
  const [diseases, setDiseases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

 
  const healthImages = [
    "https://images.ctfassets.net/b85ozb2q358o/d863425c73c7c617a9774422e6436312d34f417f79d87066c70c0d76adc4f858/3731c6967b8127db7f493a334035c07c/image.png",
    "https://fr.mypet.com/wp-content/uploads/sites/10/2024/04/nettoyage-yeux-chien.png",
    "https://www.myvetshop.fr/img/cms/helena-lopes-S3TPJCOIRoo-unsplash.jpg"
  ];

  const diseaseImages = [
    "https://www.shutterstock.com/image-photo/vet-examining-dog-cat-puppy-600nw-1479238910.jpg",
    "https://i.pinimg.com/736x/0e/47/ea/0e47eaab34ef1d9f96757afaa6e38102.jpg",
    "https://i.pinimg.com/222x/16/6a/34/166a34c139c329802e19d9285759237b.jpg"
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

       
        const careTipsResponse = await axios.get('http://localhost:8080/api/care-tips');
        setCareTips(careTipsResponse.data.slice(0, 3)); 

        
        const diseasesResponse = await axios.get('http://localhost:8080/diseases');
        setDiseases(diseasesResponse.data.slice(0, 3)); 
      } catch (err) {
        setError('Failed to load data. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

 
  const sections = [
    {
      title: "HEALTH AND WELL-BEING",
      articles: careTips.map((careTip, index) => ({
        id: careTip.id,
        title: careTip.title,
        image: healthImages[index % healthImages.length],
        link: `/care-tips/${careTip.id}`
      })),
      allArticlesLink: "/care-tips"
    },
    {
      title: "DISEASES",
      articles: diseases.map((disease, index) => ({
        id: disease.id,
        title: disease.name,
        image: diseaseImages[index % diseaseImages.length],
        link: `/diseases/${disease.id}`
      })),
      allArticlesLink: "/diseases"
    }
  ];

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
          <div className="mt-5 max-w-4xl mb-4 md:mb-0 md:mx-4">
            <CategoryDropdown />
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

      {loading ? (
        <div className="flex justify-center items-center min-h-[50vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
        </div>
      ) : error ? (
        <div className="text-red-500 text-center">{error}</div>
      ) : (
        sections.map((section, index) => (
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
                      to={article.link}
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
                to={section.allArticlesLink}
                className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition duration-300"
              >
                All articles on {section.title.charAt(0) + section.title.slice(1).toLowerCase()}
              </Link>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default DogPage;