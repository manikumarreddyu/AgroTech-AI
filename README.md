<a id="top"></a>
<div style="display:none;" align="center">
<h1><font size="10"> AgroTech AI </font></h1>

<!-- repo intro -->

</div>
<div align="center">

<h3><font size="4">AgroTech AI platform is a comprehensive web-based tool where users can access various machine learning models for making accurate predictions related to agriculture. It offers solutions for crop management, soil health assessment, pest control, and more.</h3>
<br>
Make sure you star the repository and show your love to us💗
</font>
<br>
<br>
<p>


## Why to Open Source

Contributing in open source increases your opportunities to work with different projects and mentors, getting to know various insights and ideas. It is a platform where contributors grow together with a construvtive and a positive attitude.
This repository also provides one such platforms where contributers come over and put their ideas  and make our website as interactive as much they can!

<table>
    <tr>
      <th>Event Logo</th>
      <th>Event Name</th>
      <th>Event Description</th>
    </tr>
    <tr>
        <td><img src="https://user-images.githubusercontent.com/63473496/213306279-338f7ce9-9a9f-4427-8c2a-3e344874498f.png#gh-dark-mode-only" width="200" height="auto" loading="lazy" alt="GSSoC 24"/></td>
        <td>GirlScript Summer of Code 2024</td>
        <td>GirlScript Summer of Code is a three-month-long Open Source Program conducted every summer by GirlScript Foundation. It is an initiative to bring more beginners to Open-Source Software Development. 
    </tr>
</table>

![GitHub issues](https://img.shields.io/github/issues/manikumarreddyu/AgroTech-AI)
![GitHub forks](https://img.shields.io/github/forks/manikumarreddyu/AgroTech-AI)
![GitHub pull requests](https://img.shields.io/github/issues-pr/manikumarreddyu/AgroTech-AI)
![GitHub Repo stars](https://img.shields.io/github/stars/manikumarreddyu/AgroTech-AI)
![GitHub contributors](https://img.shields.io/github/contributors/manikumarreddyu/AgroTech-AI)


</p>

</div>

<div>

## Project Structure

<!-- START_STRUCTURE -->
```
├── Agro_rent/
│   ├── README.md
│   ├── backend/
│   │   ├── config/
│   │   │   └── dbConnection.js
│   │   ├── constants.js
│   │   ├── controllers/
│   │   │   ├── bookingController.js
│   │   │   ├── contactController.js
│   │   │   ├── imageController.js
│   │   │   ├── machineController.js
│   │   │   ├── notificationController.js
│   │   │   ├── ownerController.js
│   │   │   ├── paymentController.js
│   │   │   ├── profileBookingsController.js
│   │   │   ├── profileMachinesController.js
│   │   │   ├── reviewController.js
│   │   │   └── userController.js
│   │   ├── index.js
│   │   ├── middleware/
│   │   │   ├── authMiddlware.js
│   │   │   ├── errorHandler.js
│   │   │   └── validateTokenHandler.js
│   │   ├── models/
│   │   │   ├── booking.js
│   │   │   ├── contact.js
│   │   │   ├── image.js
│   │   │   ├── machine.js
│   │   │   ├── notification.js
│   │   │   ├── owner.js
│   │   │   ├── payment.js
│   │   │   ├── review.js
│   │   │   └── user.js
│   │   ├── package-lock.json
│   │   ├── package.json
│   │   ├── routes/
│   │   │   ├── booking.js
│   │   │   ├── contact.js
│   │   │   ├── image.js
│   │   │   ├── imageRoutes.js
│   │   │   ├── machine.js
│   │   │   ├── notification.js
│   │   │   ├── owner.js
│   │   │   ├── payment.js
│   │   │   ├── profileBookings.js
│   │   │   ├── profileMachines.js
│   │   │   ├── review.js
│   │   │   └── user.js
│   │   ├── routes.txt
│   │   └── swagger.js
│   └── frontend/
│       ├── README.md
│       ├── index.html
│       ├── package-lock.json
│       ├── package.json
│       ├── postcss.config.js
│       ├── public/
│       │   ├── harvestor.png
│       │   ├── harvestor1.png
│       │   ├── tractor.png
│       │   ├── tractor1.png
│       │   └── vite.svg
│       ├── src/
│       │   ├── App.jsx
│       │   ├── assets/
│       │   │   ├── Logo.png
│       │   │   ├── Logo2.png
│       │   │   ├── VID_20240325142854.mp4
│       │   │   ├── about1.jpeg
│       │   │   ├── agrotech.mp4
│       │   │   ├── avatar.jpg
│       │   │   ├── hero.png
│       │   │   ├── illustration.jpg
│       │   │   ├── mm.png
│       │   │   ├── productreg.jpg
│       │   │   └── react.svg
│       │   ├── components/
│       │   │   ├── Footer.jsx
│       │   │   ├── Navbar.jsx
│       │   │   ├── Product/
│       │   │   │   ├── ProductDetailPage.jsx
│       │   │   │   ├── ProductDetails.jsx
│       │   │   │   ├── RelatedProducts.jsx
│       │   │   │   ├── ReviewsSection.jsx
│       │   │   │   └── style.css
│       │   │   ├── ProductCard.jsx
│       │   │   ├── ProductInfoCard/
│       │   │   │   ├── ProductInfoCard.css
│       │   │   │   └── ProductInfoCard.jsx
│       │   │   ├── Review.jsx
│       │   │   └── Reviewscard.jsx
│       │   ├── index.css
│       │   ├── main.jsx
│       │   └── pages/
│       │       ├── About.jsx
│       │       ├── Contact.jsx
│       │       ├── Home.jsx
│       │       ├── Image.jsx
│       │       ├── Login.jsx
│       │       ├── ProductRegistrationPage.jsx
│       │       ├── Productdetails.jsx
│       │       ├── Products.jsx
│       │       ├── Profile.jsx
│       │       ├── Register.jsx
│       │       └── imagecreate.jsx
│       ├── tailwind.config.js
│       └── vite.config.js
├── CODE_OF_CONDUCT.md
├── CONTRIBUTING.md
├── LICENSE
├── Learn.md
├── README.md
├── SECURITY.md
├── agro-quiz-app/
│   ├── components.json
│   ├── next.config.js
│   ├── package-lock.json
│   ├── package.json
│   ├── postcss.config.js
│   ├── public/
│   │   ├── logo.ico
│   │   ├── next.svg
│   │   └── vercel.svg
│   ├── src/
│   │   ├── app/
│   │   │   ├── favicon.ico
│   │   │   ├── globals.css
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── categories.ts
│   │   ├── components/
│   │   │   └── ui/
│   │   │       └── button.tsx
│   │   └── lib/
│   │       ├── ai.ts
│   │       ├── common.ts
│   │       └── utils.ts
│   ├── tailwind.config.js
│   ├── tailwind.config.ts
│   └── tsconfig.json
├── agrotech-ai-apis/
│   ├── app.py
│   ├── crop_recommendation.py
│   ├── data/
│   │   ├── maps.py
│   │   └── mushrooms.csv
│   ├── models/
│   │   ├── crop_rotation_recommendation_model.pkl
│   │   ├── encoders.pkl
│   │   ├── model.pkl
│   │   ├── rice_model.h5
│   │   └── seed_quality_predict.h5
│   ├── mushroom_edibility.py
│   ├── notebook/
│   │   └── mushroom-classification.ipynb
│   ├── paddy_prediction.py
│   ├── requirements.txt
│   └── seed_quality_predictor.py
├── agrotech-ai-chatbot/
│   ├── requirements.txt
│   └── src/
│       ├── config.json
│       └── main.py
├── agrotech-api`s/
│   ├── app.py
│   ├── classifier.pkl
│   ├── crop_recommendation.pkl
│   ├── crops/
│   │   ├── Arhar.csv
│   │   ├── Bajra.csv
│   │   ├── Barley.csv
│   │   ├── Copra.csv
│   │   ├── Cotton.csv
│   │   ├── Gram.csv
│   │   ├── Groundnut.csv
│   │   ├── Jowar.csv
│   │   ├── Jute.csv
│   │   ├── Maize.csv
│   │   ├── Masoor.csv
│   │   ├── Moong.csv
│   │   ├── Niger.csv
│   │   ├── Paddy.csv
│   │   ├── Ragi.csv
│   │   ├── Rape.csv
│   │   ├── Safflower.csv
│   │   ├── Sesamum.csv
│   │   ├── Soyabean.csv
│   │   ├── Sugarcane.csv
│   │   ├── Sunflower.csv
│   │   ├── Urad.csv
│   │   ├── Wheat.csv
│   │   └── price.css
│   ├── fertilizer.pkl
│   ├── irrigation_model.pkl
│   ├── requirements.txt
│   ├── soil_quality.pkl
│   └── vercel.json
├── backend/
│   ├── controllers/
│   │   ├── brandController.js
│   │   ├── categoryController.js
│   │   ├── productController.js
│   │   ├── reviewController.js
│   │   ├── sellerController.js
│   │   └── variantController.js
│   ├── index.js
│   ├── middleware/
│   │   └── auth.js
│   ├── model/
│   │   ├── shop/
│   │   │   ├── brand.js
│   │   │   ├── category.js
│   │   │   ├── product.js
│   │   │   ├── review.js
│   │   │   ├── seller.js
│   │   │   └── variant.js
│   │   └── user.js
│   ├── package-lock.json
│   ├── package.json
│   ├── routes/
│   │   ├── Contactroute.js
│   │   ├── auth.js
│   │   └── shop.js
│   ├── test/
│   │   └── api.test.js
│   └── vercel.json
├── combined-disease-detection-api/
│   ├── app.py
│   ├── plant_disease_model.tflite
│   └── requirements.txt
├── crop-rotation-api/
│   ├── app.py
│   ├── crop_rotation_recommendation_model.pkl
│   └── requirements.txt
├── disease-prediction-api/
│   ├── CNN.py
│   ├── Procfile
│   ├── Readme.md
│   ├── app.py
│   ├── disease_info.csv
│   ├── plant_disease_detection.tflite
│   ├── requirements.txt
│   ├── static/
│   │   └── uploads/
│   │       ├── Disease.jpg
│   │       └── Readme.md
│   └── supplement_info.csv
├── electrical-electronics-shops-api/
│   ├── app.py
│   └── requirements.txt
├── frontend/
│   ├── README.md
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── postcss.config.js
│   ├── public/
│   │   ├── _redirects
│   │   ├── favicon.png
│   │   ├── favicon1.png
│   │   ├── favicon2.png
│   │   ├── intro.mp4
│   │   └── show-more.png
│   ├── sitemap.xml
│   ├── src/
│   │   ├── AgroRentAI/
│   │   │   ├── HeroSectionRent.jsx
│   │   │   ├── NavigateProducts.jsx
│   │   │   └── rent-assets/
│   │   │       ├── banner2.png
│   │   │       └── tp.png
│   │   ├── AgroShopAI/
│   │   │   ├── components/
│   │   │   │   ├── BottomCardContainer.jsx
│   │   │   │   ├── CardContainer.jsx
│   │   │   │   ├── CardRelay.jsx
│   │   │   │   ├── Categories.jsx
│   │   │   │   ├── DisplayCard.jsx
│   │   │   │   ├── Filter.jsx
│   │   │   │   ├── HeroSectionShop.jsx
│   │   │   │   ├── ProductCard.jsx
│   │   │   │   └── ShopFooter.jsx
│   │   │   ├── pages/
│   │   │   │   ├── CategoryPage.jsx
│   │   │   │   └── HomeShop.jsx
│   │   │   └── utils/
│   │   │       └── home-data.js
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── MainContent.jsx
│   │   ├── NotFound.jsx
│   │   ├── assets/
│   │   │   ├── 101.jpg
│   │   │   ├── 102.jpg
│   │   │   ├── 103.jpg
│   │   │   ├── 104.jpg
│   │   │   ├── 105.jpg
│   │   │   ├── 106.jpg
│   │   │   ├── 107.jpg
│   │   │   ├── 108.svg
│   │   │   ├── 109.jpg
│   │   │   ├── 110.jpg
│   │   │   ├── 111.jpeg
│   │   │   ├── 112.jpg
│   │   │   ├── 113.jpg
│   │   │   ├── 113.png
│   │   │   ├── 115.jpg
│   │   │   ├── 116.jpg
│   │   │   ├── 117.jpeg
│   │   │   ├── LoginImage.png
│   │   │   ├── SignUpImage.png
│   │   │   ├── about.png
│   │   │   ├── aboutus.png
│   │   │   ├── ai.jpg
│   │   │   ├── bgHero copy.png
│   │   │   ├── bgHero.png
│   │   │   ├── contactus.png
│   │   │   ├── cookie.png
│   │   │   ├── crop_monitor.jpg
│   │   │   ├── cropinspection.png
│   │   │   ├── cropmanagament.png
│   │   │   ├── crops/
│   │   │   │   ├── allcrops.png
│   │   │   │   ├── arhar.png
│   │   │   │   ├── bajra.png
│   │   │   │   ├── barley.png
│   │   │   │   ├── copra.png
│   │   │   │   ├── gram.png
│   │   │   │   ├── groundnut.png
│   │   │   │   ├── jowar.png
│   │   │   │   ├── jute.png
│   │   │   │   ├── maize.png
│   │   │   │   ├── masoor.png
│   │   │   │   ├── moong.png
│   │   │   │   ├── niger.png
│   │   │   │   ├── paddy.png
│   │   │   │   ├── ragi.png
│   │   │   │   ├── rape.png
│   │   │   │   ├── rice.png
│   │   │   │   ├── test1.png
│   │   │   │   └── urad.png
│   │   │   ├── editor.png
│   │   │   ├── favicon.png
│   │   │   ├── favicon1.png
│   │   │   ├── favicon2.png
│   │   │   ├── github.png
│   │   │   ├── hero.png
│   │   │   ├── icons/
│   │   │   │   ├── cloud.png
│   │   │   │   ├── eye-slash.svg
│   │   │   │   ├── eye.svg
│   │   │   │   ├── fog.png
│   │   │   │   ├── rain.png
│   │   │   │   ├── search.svg
│   │   │   │   ├── snow.png
│   │   │   │   ├── storm.png
│   │   │   │   ├── sun.png
│   │   │   │   └── windy.png
│   │   │   ├── images/
│   │   │   │   ├── Clear.jpg
│   │   │   │   ├── Cloudy.jpg
│   │   │   │   ├── Rainy.jpg
│   │   │   │   ├── Stormy.jpg
│   │   │   │   ├── Sunny.jpg
│   │   │   │   ├── bgHero.png
│   │   │   │   ├── fog.png
│   │   │   │   ├── gain-icon.png
│   │   │   │   ├── loss-icon.png
│   │   │   │   ├── mushroom_bg.jpg
│   │   │   │   └── snow.jpg
│   │   │   ├── img1.jpg
│   │   │   ├── img10.jpg
│   │   │   ├── img11.jpg
│   │   │   ├── img12.jpg
│   │   │   ├── img13.jpg
│   │   │   ├── img14.png
│   │   │   ├── img2.jpg
│   │   │   ├── img3.jpg
│   │   │   ├── irrigation.jpg
│   │   │   ├── loading.gif
│   │   │   ├── notFound.png
│   │   │   ├── playstore.png
│   │   │   ├── prediction.webp
│   │   │   ├── privacy.png
│   │   │   ├── rain-4431.gif
│   │   │   ├── raindrops.gif
│   │   │   ├── react.svg
│   │   │   ├── robo.jpg
│   │   │   ├── soil_analysis.jpg
│   │   │   ├── summer-4134.gif
│   │   │   ├── summer-4144.gif
│   │   │   ├── summer-4145.gif
│   │   │   ├── summer-4146.gif
│   │   │   ├── summer-4147.gif
│   │   │   ├── supply.jpg
│   │   │   ├── terms.png
│   │   │   ├── tp.png
│   │   │   └── weather.jpg
│   │   ├── components/
│   │   │   ├── AIEngine.jsx
│   │   │   ├── AboutUs.jsx
│   │   │   ├── AdvDis.jsx
│   │   │   ├── AuthPage.jsx
│   │   │   ├── CookiePolicy.jsx
│   │   │   ├── Disease.jsx
│   │   │   ├── ElectricalElectronicsShops.jsx
│   │   │   ├── FAQ.jsx
│   │   │   ├── Features.jsx
│   │   │   ├── Feedback.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── GoTop.tsx
│   │   │   ├── GoogleTranslate.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── NewsCard.jsx
│   │   │   ├── NewsForum.jsx
│   │   │   ├── PlantDiseaseClassifier.jsx
│   │   │   ├── PreLoader.jsx
│   │   │   ├── PrivacyPolicy.jsx
│   │   │   ├── ProgressScrollDown.jsx
│   │   │   ├── Showcase.jsx
│   │   │   ├── SignUpPage.jsx
│   │   │   ├── SoilTestingCenters.jsx
│   │   │   ├── Spinner.jsx
│   │   │   ├── Submit.jsx
│   │   │   ├── TermsAndConditions.jsx
│   │   │   ├── TestimonialSlider.jsx
│   │   │   ├── UseScrollToTop.jsx
│   │   │   ├── help/
│   │   │   │   ├── Climate.jsx
│   │   │   │   ├── CropCalender.jsx
│   │   │   │   ├── CropManagementGuide.jsx
│   │   │   │   ├── EcoCropManager.jsx
│   │   │   │   ├── PlantTaskReminder.jsx
│   │   │   │   └── TaskReminder.jsx
│   │   │   ├── models/
│   │   │   │   ├── AdvantagesDisadvantages.jsx
│   │   │   │   ├── Chart.jsx
│   │   │   │   ├── CropImages.jsx
│   │   │   │   ├── CropRecommendation.jsx
│   │   │   │   ├── CropRotationRecommendation.jsx
│   │   │   │   ├── Fertilizer.jsx
│   │   │   │   ├── Irrigation.jsx
│   │   │   │   ├── Prices.jsx
│   │   │   │   ├── Reports.jsx
│   │   │   │   └── SoilQuality.jsx
│   │   │   ├── sugarcane-result-template.jsx
│   │   │   ├── tools/
│   │   │   │   ├── CropYield.jsx
│   │   │   │   ├── FertilizerCalculator.jsx
│   │   │   │   ├── FertilizerRequirement.jsx
│   │   │   │   ├── Mushroom.jsx
│   │   │   │   ├── SoilMoisture.jsx
│   │   │   │   └── WaterRequirement.jsx
│   │   │   ├── ui/
│   │   │   │   └── MagicButton.tsx
│   │   │   └── weather/
│   │   │       ├── BackgroundLayout.jsx
│   │   │       ├── MiniCard.jsx
│   │   │       ├── WeatherCard.jsx
│   │   │       └── index.jsx
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   │   └── StateContextProvider.jsx
│   │   ├── hooks/
│   │   │   ├── useDate.jsx
│   │   │   └── useTheme.jsx
│   │   ├── index.css
│   │   ├── main.jsx
│   │   ├── pages/
│   │   │   ├── About.jsx
│   │   │   ├── Article.jsx
│   │   │   ├── ChatBot.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── Disease/
│   │   │   │   ├── DiseaseRecognition.jsx
│   │   │   │   ├── PaddyRecognition.jsx
│   │   │   │   └── SugarcaneRecognition.jsx
│   │   │   ├── Forecast.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Products.jsx
│   │   │   └── WhyAI.jsx
│   │   ├── styles/
│   │   │   ├── ChatbotButton.css
│   │   │   ├── Contact.css
│   │   │   ├── ElectricalElectronicsShops.css
│   │   │   ├── SoilTestingCenters.css
│   │   │   ├── Translate.css
│   │   │   ├── goTop.css
│   │   │   └── hero.css
│   │   └── utils/
│   │       └── cn.ts
│   ├── tailwind.config.js
│   ├── vercel.json
│   └── vite.config.js
├── irrigation-api/
│   ├── app.py
│   ├── irrigation.py
│   ├── irrigation_model.pkl
│   ├── label_encoder.pkl
│   ├── label_encoder.py
│   ├── requirements.txt
│   └── simulated_irrigation_data.csv
├── mushroom-edibility/
│   ├── app.py
│   ├── data/
│   │   ├── __pycache__/
│   │   │   └── maps.cpython-311.pyc
│   │   ├── maps.py
│   │   └── mushrooms.csv
│   ├── models/
│   │   ├── encoders.pkl
│   │   └── model.pkl
│   ├── notebook/
│   │   └── mushroom-classification.ipynb
│   └── requirements.txt
├── paddy-backend-api/
│   ├── __pycache__/
│   │   └── prediction.cpython-311.pyc
│   ├── app.py
│   ├── model/
│   │   └── rice_model.h5
│   ├── prediction.py
│   ├── readme.md
│   ├── requirements.txt
│   └── uploaded_image/
│       └── readme.md
├── repo_structure.txt
├── seed-qual-predictor/
│   ├── README.md
│   ├── app.py
│   ├── model/
│   │   └── model.h5
│   └── requirements.txt
├── soil-testing-labs-api/
│   ├── app.py
│   └── requirements.txt
└── sugarcane-disease-api/
    ├── app.py
    ├── models/
    │   └── Readme.md
    ├── prediction.py
    ├── requirements.txt
    └── uploaded_image/
        └── readme.md
```
<!-- END_STRUCTURE -->

</div>

<details>
    <summary><h2>:pushpin:Table of Contents: </h2></summary>


1. [Project Description](#project-description)
2. [TechStack](#techstack)
3. [Screenshots](#screenshots)
4. [Video](#video)
5. [Code of Conduct](#code-of-conduct)
6. [Setting Up on your machine](#setting-up-on-your-machine)
7. [How to Contribute](#how-to-contribute)
8. [Our Contributors](#our-contributors)
9. [License](#license)

</details>
<hr>

## Project Description

AgroTech AI platform is a comprehensive web-based tool where users can access various machine learning models for making accurate predictions related to agriculture. It offers solutions for crop management, soil health assessment, pest control, and more.

It implements machine learning algorithms to implement 3 basic functionalities:
# 1. Fertilizer Prediction
Aims to predict the appropriate fertilizer based on environmental and soil conditions. The dataset contains various features like temperature, humidity, moisture, soil type, crop type, and the levels of nitrogen, potassium, and phosphorus in the soil. The model aims to recommend the correct fertilizer to use, improving crop yield and soil health.
 
# Dataset: 
Fertilizer Prediction.csv (Uploaded under notebooks)
 
# Model Development :
A Random Forest Classifier was chosen as the primary model due to its robustness and high accuracy in classification tasks. The dataset was split into training and testing sets in an 80:20 ratio.
Key steps:

# Label Encoding: 
Categorical variables (Soil Type, Crop Type, and Fertilizer Name) were encoded using LabelEncoder.
# Model Training: 
A Random Forest model was trained using the training data.
# Hyperparameter Tuning: 
A grid search with cross-validation was applied to find the optimal parameters for the Random Forest model.

# 2. Crop Prediction
Develop a machine learning-based crop recommendation system that uses various classification algorithms to predict the optimal crop for farming based on soil and environmental factors. The model takes inputs such as Nitrogen (N), Phosphorus (P), Potassium (K), temperature, humidity, pH level, and rainfall, and outputs the most suitable crop for specific conditions.
# Dataset:
Crop_recommendation.csv

# Model Training and Results
Four different models were trained on the dataset to predict the crop:
The results of each model are as follows:

1. Logistic Regression: 96.18%
2. Decision Tree Classifier: 97.82%
3. Gaussian Naive Bayes: 99.45%
4. Random Forest Classifier: 99.45%
The final model selected for deployment is the Random Forest Classifier.

# 3. Soil Quality Prediction 
Implements machine learning models to classify soil quality based on various features like nitrogen content, pH levels, organic carbon, and other nutrients. The goal of the model is to predict the quality of soil using logistic regression and a Support Vector Machine (SVM) model.

# Dataset:
Soil_Quality.csv (Uploaded under notebooks)

# Model Traning and Results
1. Logistic Regression
Logistic Regression is used to model the soil quality based on the provided features. The dataset is split into training and testing sets, and the logistic regression model is trained on the training data.

2. Support Vector Machine (SVM)
A Support Vector Machine with an RBF (Radial Basis Function) kernel is trained as an alternative model. The SVM model aims to find the decision boundary that best separates different soil quality classes.

3. Performance Evaluation
The performance of both models is evaluated using accuracy. The accuracy of each model is calculated by comparing the predicted soil quality labels with the actual labels in the test dataset.

# 4. Yield Prediction
Aims to develop a machine learning-based model for predicting crop yields based on various environmental and agricultural factors. The primary objective of this project is to create a model that predicts the total crop yield for a given region using data such as Area and type of crop, Year of cultivation, Average rainfall (in mm per year), Pesticide usage (in tonnes), Average temperature (in °C)

# Dataset:
yield_df.csv (Uploaded under notebooks)

# Model Training and Results
Various machine learning regression algorithms are applied, and the performance is evaluated based on metrics like Mean Squared Error (MSE).
The results of the models used are as follows:
1. Linear Regression
Mean Squared Error : 80852.08620158922
Score 0.09879301553673503

2. K Neighbors Regressor
Mean Squared Error : 55183.1146293406
Score 0.5801883304861266

3. Decision Tree Regressor
Mean Squared Error : 13211.190235825037
Score 0.9759383181169221

4. Random Forest Regressor
Mean Squared Error : 10135.46523142438
Score 0.9858378410451943

5. Gradient Boosting Regressor
Mean Squared Error : 34773.822585474634
Score 0.833295640875001

6. XGB Regressor
Mean Squared Error : 13451.947664464684
Score 0.975053338957936Linear Regression
Mean Squared Error : 80852.08620158922
Score 0.09879301553673503

The Random Forest Regressor was found to have the lowest MSE, making it the most suitable model for crop yield prediction. This model was selected for deployment and future predictions.

# 5. Mushroom Edibility Prediction
Develop a machine learning model that predicts whether a mushroom is edible or not, depending on it's physical features and environment. The model takes various inputs regarding the physical characteristics of the mushroom and outputs if the mushroom is edible or poisonous.

# Dataset:
mushrooms.csv

# Model Training and Results
Five different models were trained on the dataset to predict mushroom edibility. The accuracy of each model are as follows:

1. Logistic Regression: 0.94
2. Decision Tree Classifier: 1.0
3. K Nearest Neighbors: 0.99
4. Random Forest Classifier: 1.0
5. XGB Classifier: 1.0

The final model selected for deployment is the XGBoost Classifier as it can handle missing datas better than the other models.

## TechStack

- React
- Tailwind
- python - Flask
- Node
- MongoDB
- Express
- Machine Learning
- Deep Learning

<hr>

## ⚙️ Getting Started / 📥 Installation

Ready to contribute to this fun project? Here's how to set up your development environment:
<br>
Make sure you follow our contributing guidlines:-  [here](https://github.com/RamakrushnaBiswal/PlayCafe/blob/main/CONTRIBUTING.md) 

1. **Fork this repository** 🍴 and clone it to your local machine:
   ```bash
   git clone https://github.com/manikumarreddyu/AgroTech-AI.git
# ⚙️ Getting Started with Agro Tech AI main website

2. **Install the node modules in frontend directory:**
   ```bash
   npm install
3. **Start the react server ⚡:**
   ```bash
   npm run dev
4. **Install the node modules for backend directory 🧩:**
   ```bash
   npm install
5. **Run the backend server ⚡:**
   ```bash
   npm start
6. Open your browser at `http://localhost:5173` to see the project running! 🌟

<!-- Code of conduct -->
<div>
<h2><img src = "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Hand%20gestures/Handshake.png" width="35" height="35"> Code of Conduct</h2>
</div>

Please note that this project is released with a [Code of Conduct](CODE_OF_CONDUCT.md). By participating in this project you agree to abide by its terms.


<div>
  <h2><img src="https://github.com/Meetjain1/wanderlust/assets/133582566/90f3930e-5a12-4a4e-8ac9-0dc7d5396adb" width="35" height="35">Are Ready to Contribute?</h2>
</div>

If you would like to contribute to the project then kindly go through [Contributing Guidelines](CONTRIBUTING.md) to understand everything from setup to necessary instructions.

<hr>
<h2 align = "center">Our Contributors ❤️</h2>
<div align = "center">
 <h3>Thank you for contributing to our repository</h3>

<p><a href="https://github.com/manikumarreddyu/AgroTech-AI/contributors">
  <img src="https://contributors-img.web.app/image?repo=manikumarreddyu/AgroTech-AI" />
  
</a></p>

</div>
<!-- License -->
<div>
<h2><img src = "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Page%20with%20Curl.png" width="35" height="35"> License:</h2>
</div>

This project is licensed under the MIT License. See the [LICENSE](https://github.com/manikumarreddyu/AgroTech-AI/blob/main/LICENSE) file for more details.

<hr>
<div>
  Don't forget to leave a star<img src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f31f/512.webp" width="35" height="30"> for this project!
</div> <br>

<a href="#top" style="position: fixed; bottom: 20px; right: 20px; background-color: black ; color: white; padding: 10px 20px; text-align: center; text-decoration: none; display: inline-block; border-radius: 5px; font-family: Arial; font-size: 16px;">Go to Top</a>
