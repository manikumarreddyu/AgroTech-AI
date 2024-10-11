import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { sugarcaneDiseaseInfo } from "./sugarcane-result-template";
const AIEngine = () => {
  const { id } = useParams(); // Extracts the ID from the URL
  console.log(id);
  const index = parseInt(id) - 1;
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState("No file chosen");
  const [previewUrl, setPreviewUrl] = useState(null); // To store the image preview URL
  const [isLoading, setIsLoading] = useState(false);
  const [modelResult, setResult] = useState(null);
  const navigate = useNavigate();
  const cropDetail = [
    {
      id: 1,
      name: "Sugarcane",
      questions: {
        Necessity:
          "• Early detection prevents sugarcane mosaic virus and smut disease.<br>• Improves the overall yield of sugar and fiber.<br>• Reduces economic losses by preventing cane rot.<br>• Helps manage pests like borers and aphids.<br>• Enables targeted treatment for red rot.<br>• Supports sustainable practices for soil health.<br>• Protects biodiversity in sugarcane-growing ecosystems.",
        Prevention:
          "• Inspect plants regularly for symptoms of red rot and smut.<br>• Practice rotation with non-host crops like legumes to reduce disease buildup.<br>• Maintain sanitation of tools and harvesting equipment to prevent disease spread.<br>• Use disease-resistant varieties like Co-0238.<br>• Ensure proper drainage to avoid waterlogging that can lead to root rot.<br>• Apply fertilizers like nitrogen and potassium at the right intervals to promote healthy growth.<br>• Implement integrated pest management strategies to control pests like top shoot borers.",
      },
    },
    {
      id: 2,
      name: "Rice",
      questions: {
        Necessity:
          "• Early detection prevents rice blast and bacterial blight.<br>• Improves overall yield and quality of the grain.<br>• Reduces economic losses by controlling stem rot and sheath blight.<br>• Helps manage pests like brown planthoppers and stem borers.<br>• Enables targeted treatment for leaf spot diseases.<br>• Supports sustainable farming practices for water conservation and soil health.<br>• Protects biodiversity in rice-growing ecosystems.",
        Prevention:
          "• Regularly inspect plants for early symptoms of diseases like rice blast and bacterial blight.<br>• Rotate crops with non-host plants like pulses to minimize disease incidence.<br>• Maintain sanitation of equipment to avoid the spread of pathogens.<br>• Use disease-resistant rice varieties like Swarna-Sub1.<br>• Ensure proper irrigation management to prevent water stagnation and fungal growth.<br>• Apply fertilizers like nitrogen and phosphorus at optimal levels to promote healthy growth.<br>• Employ integrated pest management strategies to control pests like leafhoppers and gall midges.",
      },
    },
    {
      id: 3,
      name: "Crop",
      questions: {
        Necessity: "• Early detection prevents common diseases and improves crop yield.<br>• Reduces economic losses by controlling fungal and bacterial infections.<br>• Helps manage common pests that damage the crop.<br>• Enables targeted treatments for specific diseases affecting the crop.<br>• Supports sustainable farming practices for soil health and water conservation.<br>• Enhances the overall quality and market value of the produce.<br>• Protects biodiversity in crop-growing ecosystems.",
        Prevention: "• Regularly monitor crops for early signs of disease and pest infestation.<br>• Practice crop rotation with non-host plants to minimize disease buildup.<br>• Keep farming tools and equipment clean to avoid the spread of pathogens.<br>• Use disease-resistant crop varieties where available.<br>• Ensure proper irrigation and drainage to prevent waterlogging and root diseases.<br>• Apply fertilizers at the right intervals to support healthy crop growth.<br>• Implement integrated pest management to control harmful pests and insects."
      }
    }
  ];

  
  const backendAPI = ['http://127.0.0.1:5000/submit_sugarcane','RICE_API','https://disease-prediction-api-2.onrender.com/submit']

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setFileName(file ? file.name : "No file chosen");

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
      alert("Please select a file");
      return;
    }

    setIsLoading(true);
    const formData = new FormData();
    formData.append("image", selectedFile);
    try {
      const response = await fetch(backendAPI[index], {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result);
        if(id != 1){
          navigate("/submit", { state: { result, id } });
        }
        else{
          setResult(result);
        }
      } else {
        throw new Error("File upload failed");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while uploading the file");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-full mt-16 mx-auto px-4 pb-10 pt-5 sm:px-6 lg:px-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-green-500">
          🍀{cropDetail[index].name} Disease Prediction Engine🍀
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white shadow rounded-lg p-6">
          <h5 className="font-bold text-xl mb-4">
            Why is it necessary to detect disease in plants?
          </h5>
          <p
            className="text-gray-700"
            dangerouslySetInnerHTML={{
              __html: cropDetail[0]["questions"]["Necessity"],
            }}
          ></p>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          {!previewUrl && (
            <img
              src="https://static.vecteezy.com/system/resources/previews/023/527/362/non_2x/upload-icon-sign-symbol-green-design-transparent-background-free-png.png"
              alt="Upload Crop"
              className="w-48 h-48 object-cover rounded-full mx-auto mb-6"
            />
          )}

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
              Simply upload your plant's leaf image and then see the magic of
              AI.
            </p>

            <div className="text-center">
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : "Submit"}
              </button>
            </div>
          </form>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h5 className="font-bold text-xl mb-4">
            Prevent Plant Disease by following these steps:{" "}
          </h5>
          <p
            dangerouslySetInnerHTML={{
              __html: cropDetail[0]["questions"]["Prevention"],
            }}
          ></p>

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
      {/* Result div */}
      { (id == 1 && modelResult != null) && (
        
<div className="max-w-full mt-16 mx-auto px-4 pb-10 pt-5 sm:px-6 lg:px-8 bg-green-200">
<div className="text-center mb-8">
          <h1 className="text-4xl bg-green-500 font-bold text-white">Result : </h1>
        </div>
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-green-800 underline">{cropDetail[index].name} : {modelResult.prediction} 🍂</h1>
        </div>
  
        <div className="flex justify-center mb-8">
          <div className="bg-white shadow rounded-lg p-4">
            <img src="https://cdn.pixabay.com/photo/2020/07/09/20/00/sugarcane-5388614_640.jpg" alt={cropDetail[index].name} className="w-full max-w-md h-auto" />
          </div>
        </div>
  
        <div className="">
        <thead class='border-black border-solid border-r border-l'>
                <tr class="bg-gray-200 text-gray-600 border-black border-solid ">
                    <th class="py-3 px-4 border border-black border-solid  ">Category</th>
                    <th class="py-3 px-4 border border-black border-solid ">Symptoms & Diagnosis</th>
                    <th class="py-3 px-4 border border-black border-solid ">Management Practices</th>
                    <th class="py-3 px-4 border border-black border-solid ">Disease Impact</th>
                    <th class="py-3 px-4 border border-black border-solid ">Tools & Resources</th>
                    <th class="py-3 px-4 border border-black border-solid ">Farmer Stories & Case Studies</th>
                    <th class="py-3 px-4 border border-black border-solid ">Research & Innovation</th>
                </tr>
            </thead>
            <tbody>
                <tr class="bg-white border-black border-solid">
                
                    <td class="py-2 px-4 border border-black border-solid " dangerouslySetInnerHTML={{
              __html: sugarcaneDiseaseInfo[modelResult.prediction]["Disease Categories"] ,}}></td> 
                    <td class="py-2 px-4 border border-black border-solid " dangerouslySetInnerHTML={{
              __html: sugarcaneDiseaseInfo[modelResult.prediction]["Symptoms & Diagnosis"] ,}}></td>
                    <td class="py-2 px-4 border border-black border-solid " dangerouslySetInnerHTML={{
              __html: sugarcaneDiseaseInfo[modelResult.prediction]["Management Practices"] ,}}></td>
                    <td class="py-2 px-4 border border-black border-solid" dangerouslySetInnerHTML={{
              __html: sugarcaneDiseaseInfo[modelResult.prediction]["Disease Impact"] ,}}></td>
                    <td class="py-2 px-4 border border-black border-solid " dangerouslySetInnerHTML={{
              __html: sugarcaneDiseaseInfo[modelResult.prediction]["Tools & Resources"] ,}}></td>
                    <td class="py-2 px-4 border border-black border-solid " dangerouslySetInnerHTML={{
              __html: sugarcaneDiseaseInfo[modelResult.prediction]["Farmer Stories & Case Studies"] ,}}></td>
                    <td class="py-2 px-4 border border-black border-solid " dangerouslySetInnerHTML={{
              __html: sugarcaneDiseaseInfo[modelResult.prediction]["Research & Innovation"] ,}}></td>
                </tr>
            </tbody>
          
          
        </div>
      </div>
  
      )}
          </div>

  );
};

export default AIEngine;
