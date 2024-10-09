import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const AIEngine = () => {
  const {id} = useParams(); // Extracts the ID from the URL
  const index = parseInt(id) - 1;
  console.log(index)
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState('No file chosen');
  const [previewUrl, setPreviewUrl] = useState(null); // To store the image preview URL
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  console.log(id)
  const cropDetail =
    [
      {
        "id": 1,
        "name": "Sugarcane",
        "questions": {
          "Necessity": "• Early detection prevents sugarcane mosaic virus and smut disease.<br>• Improves the overall yield of sugar and fiber.<br>• Reduces economic losses by preventing cane rot.<br>• Helps manage pests like borers and aphids.<br>• Enables targeted treatment for red rot.<br>• Supports sustainable practices for soil health.<br>• Protects biodiversity in sugarcane-growing ecosystems.",
          "Prevention": "• Inspect plants regularly for symptoms of red rot and smut.<br>• Practice rotation with non-host crops like legumes to reduce disease buildup.<br>• Maintain sanitation of tools and harvesting equipment to prevent disease spread.<br>• Use disease-resistant varieties like Co-0238.<br>• Ensure proper drainage to avoid waterlogging that can lead to root rot.<br>• Apply fertilizers like nitrogen and potassium at the right intervals to promote healthy growth.<br>• Implement integrated pest management strategies to control pests like top shoot borers."
        }
      },
      {
        "id": 2,
        "name": "Apple",
        "questions": {
          "Necessity": "• Early detection helps prevent apple scab and fire blight.<br>• Improves the overall quality and size of apples.<br>• Reduces economic losses caused by storage diseases.<br>• Helps manage pests like codling moths and aphids.<br>• Enables targeted treatment for powdery mildew and rust.<br>• Supports organic and sustainable apple farming.<br>• Protects pollinator species essential for apple orchards.",
          "Prevention": "• Regularly inspect trees for signs of apple scab, fire blight, and fruit rot.<br>• Implement crop rotation with non-fruit-bearing plants to reduce disease buildup.<br>• Prune and sanitize tools to prevent the spread of diseases like fire blight.<br>• Select disease-resistant varieties such as Liberty or Enterprise.<br>• Ensure optimal irrigation without waterlogging to prevent root rot.<br>• Apply fertilizers like phosphorus and potassium for balanced tree nutrition.<br>• Implement pest management strategies to control codling moth infestations."
        }
      },
      {
        "id": 3,
        "name": "Blueberry",
        "questions": {
          "Necessity": "• Early detection helps prevent mummy berry and botrytis blight.<br>• Improves the overall yield and sweetness of blueberries.<br>• Reduces economic losses from fungal infections and bird damage.<br>• Helps manage pests like spotted wing drosophila.<br>• Enables targeted control for powdery mildew and anthracnose.<br>• Supports organic and low-impact farming methods.<br>• Preserves beneficial insects in blueberry ecosystems.",
          "Prevention": "• Regularly inspect plants for signs of mummy berry and anthracnose.<br>• Practice crop rotation and avoid planting blueberries in areas with high disease pressure.<br>• Sanitize pruning shears and tools to avoid spreading diseases like botrytis blight.<br>• Choose disease-resistant varieties like 'Duke' or 'Bluecrop'.<br>• Ensure proper irrigation without water stagnation to avoid root diseases.<br>• Use organic fertilizers and apply mulch to maintain soil moisture.<br>• Implement integrated pest management for controlling pests like blueberry maggots."
        }
      },
      {
        "id": 4,
        "name": "Cherry",
        "questions": {
          "Necessity": "• Early detection helps prevent brown rot and bacterial canker.<br>• Improves the overall quality of cherries and prevents fruit cracking.<br>• Reduces economic losses caused by post-harvest diseases.<br>• Helps manage pests like cherry fruit flies and aphids.<br>• Enables targeted treatment for powdery mildew and leaf spot.<br>• Supports organic cherry production and sustainable practices.<br>• Maintains the biodiversity needed for pollination in orchards.",
          "Prevention": "• Regularly inspect trees for signs of brown rot, bacterial canker, and powdery mildew.<br>• Rotate crops with non-fruit-bearing plants to reduce disease buildup.<br>• Sanitize tools to prevent the spread of fungal infections.<br>• Plant disease-resistant varieties like 'Lapins' or 'Stella'.<br>• Ensure proper irrigation and avoid over-watering, which can lead to root rot.<br>• Apply balanced fertilizers to support strong fruit and tree development.<br>• Implement pest control strategies for managing aphids and fruit flies."
        }
      },
      {
        "id": 5,
        "name": "Corn",
        "questions": {
          "Necessity": "• Early detection prevents smut, rust, and stalk rot.<br>• Improves the overall yield and quality of corn kernels.<br>• Reduces economic losses from pests like armyworms.<br>• Helps manage pests like corn earworms and rootworm beetles.<br>• Enables targeted treatment for diseases like northern corn leaf blight.<br>• Supports sustainable corn farming and biodiversity in fields.<br>• Protects soil health through reduced pesticide use.",
          "Prevention": "• Regularly inspect fields for signs of smut, rust, and stalk rot.<br>• Practice crop rotation with legumes or grasses to reduce disease pressure.<br>• Sanitize tools and machinery to prevent the spread of diseases.<br>• Choose disease-resistant hybrids like 'Pioneer P1184'.<br>• Ensure proper irrigation and drainage to avoid waterlogged soils.<br>• Apply fertilizers like nitrogen at optimal growth stages for strong plant development.<br>• Implement integrated pest management for controlling armyworms and earworms."
        }
      },
      {
        "id": 6,
        "name": "Grape",
        "questions": {
          "Necessity": "• Early detection helps prevent downy mildew and powdery mildew.<br>• Improves the overall yield and quality of grape clusters.<br>• Reduces economic losses caused by fungal diseases and pests.<br>• Helps manage pests like grape berry moth and mealybugs.<br>• Enables targeted treatment for black rot and leaf spot.<br>• Supports sustainable vineyard management practices.<br>• Protects beneficial organisms in the vineyard ecosystem.",
          "Prevention": "• Regularly inspect grapevines for signs of mildew and black rot.<br>• Practice crop rotation and avoid replanting in disease-prone areas.<br>• Sanitize tools to prevent the spread of fungal infections.<br>• Choose disease-resistant varieties like 'Chardonnay' or 'Cabernet Sauvignon'.<br>• Ensure proper watering and drainage to avoid excessive moisture that leads to fungal growth.<br>• Apply organic fertilizers to support healthy vine growth.<br>• Implement integrated pest management to control grape berry moth and other pests."
        }
      },
      {
        "id": 7,
        "name": "Orange",
        "questions": {
          "Necessity": "• Early detection prevents citrus greening and black spot.<br>• Improves the overall quality and sweetness of oranges.<br>• Reduces economic losses caused by fungal diseases and pests.<br>• Helps manage pests like citrus leaf miners and aphids.<br>• Enables targeted treatment for root rot and sooty mold.<br>• Supports organic citrus farming and sustainable practices.<br>• Preserves biodiversity in orange groves, supporting pollinator species.",
          "Prevention": "• Regularly inspect trees for signs of citrus greening and root rot.<br>• Practice crop rotation with non-citrus crops to reduce disease buildup.<br>• Sanitize pruning tools to avoid spreading infections.<br>• Plant disease-resistant varieties like 'Washington Navel'.<br>• Ensure proper watering and drainage to avoid root diseases.<br>• Apply organic or balanced fertilizers to maintain healthy fruit production.<br>• Implement pest management to control leaf miners and aphids."
        }
      },
      {
        "id": 8,
        "name": "Peach",
        "questions": {
          "Necessity": "• Early detection helps prevent peach leaf curl and brown rot.<br>• Improves the overall quality and yield of peaches.• Reduces economic losses from post-harvest diseases.<br>• Helps manage pests like peach tree borers and aphids.<br>• Enables targeted treatment for shot hole disease and powdery mildew.<br>• Supports sustainable farming methods for peach orchards.<br>• Protects beneficial insects and biodiversity in the ecosystem.",
          "Prevention": "• Regularly inspect trees for signs of leaf curl, brown rot, and shot hole disease."
        }
      }
      
      
  ];
  
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setFileName(file ? file.name : 'No file chosen');

    // Set image preview
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewUrl(imageUrl);
    } else {
      setPreviewUrl(null);
    }
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      alert('Please select a file');
      return;
    }

    setIsLoading(true);
    const formData = new FormData();
    formData.append('image', selectedFile);
    let backendAPI = ""
    if (id == 1){
      backendAPI = "http://127.0.0.1:5000/submit_sugarcane"
      console.log("1 here")
    }
    else{
      backendAPI = "https://disease-prediction-api-2.onrender.com/submit"
    }
    try {
      const response = await fetch(backendAPI, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result)
        navigate('/submit', { state: { result,id } });
      } else {
        throw new Error('File upload failed');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while uploading the file');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-full mt-16 mx-auto px-4 pb-10 pt-5 sm:px-6 lg:px-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-green-500">🍀{cropDetail[index].name} Disease Prediction Engine🍀</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white shadow rounded-lg p-6">
          <h5 className="font-bold text-xl mb-4">Why is it necessary to detect disease in plants?</h5>
          <p className="text-gray-700"  dangerouslySetInnerHTML={{ __html: cropDetail[0]['questions']['Necessity']}}>
          
          </p>
        </div>

        <div className="bg-white shadow rounded-lg p-6">

          {!previewUrl && (<img
            src="https://static.vecteezy.com/system/resources/previews/023/527/362/non_2x/upload-icon-sign-symbol-green-design-transparent-background-free-png.png"
            alt="Upload Crop"
            className="w-48 h-48 object-cover rounded-full mx-auto mb-6"
          />)}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Image preview */}
            {previewUrl && (
              <div className="mt-4">
                <img
                  src={previewUrl}
                  alt="Selected file preview"
                  className="w-96 h-96 object-contain rounded-lg"
                />
              </div>
            )}

            <div className="flex items-center justify-center mt-4">
              <label
                htmlFor="file-upload"
                className="cursor-pointer bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
              >
                Choose File
              </label>
              <input
                id="file-upload"
                type="file"
                className="hidden"
                onChange={handleFileChange}
                accept="image/*"
              />
              <span className="ml-3 text-gray-700">{fileName}</span>
            </div>

            <p className="text-center text-gray-600">
              Simply upload your plant's leaf image and then see the magic of AI.
              
            </p>

            <div className="text-center">
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                disabled={isLoading}
              >
                {isLoading ? 'Processing...' : 'Submit'}
              </button>
            </div>
          </form>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h5 className="font-bold text-xl mb-4">Prevent Plant Disease by following these steps: </h5>
          <p dangerouslySetInnerHTML={{ __html: cropDetail[0]['questions']['Prevention']}}></p>
            
          <a
            href="/article"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          >
            More info
          </a>
        </div>
      </div>
    </div>
  );
};

export default AIEngine;
