
# 🌾 **AgroTech AI** <a id="top"></a>

<div align="center">
  <h1>AgroTech AI</h1>
  <p><strong>A comprehensive platform using machine learning to provide agriculture-related predictions, helping with crop management, soil health, pest control, and more.</strong></p>
  <br>
  Make sure to **⭐ star** the repository and show your love 💗
</div>

---

## 🌟 **Why Contribute to Open Source?**

Contributing to open source enhances your skills and opens up opportunities to collaborate with diverse projects and mentors, gaining valuable insights. This repository aims to foster creativity and interactivity through contributions, encouraging developers to improve the platform and make it more engaging.

| ![Event Logo](https://user-images.githubusercontent.com/63473496/213306279-338f7ce9-9a9f-4427-8c2a-3e344874498f.png#gh-dark-mode-only) | **GirlScript Summer of Code 2024** <br> GirlScript Summer of Code is a three-month-long Open Source Program by GirlScript Foundation. It aims to bring beginners into Open-Source Software Development. |
|:---:|:---|

---

## 📋 **Project Overview**

AgroTech AI leverages machine learning models to provide solutions for:

| **Functionality**             | **Model Type**                        | **Dataset**                        | **Best Model**         |
| ----------------------------- | ------------------------------------- | ---------------------------------- | ---------------------- |
| **Fertilizer Prediction**      | Classification                        | Fertilizer_Prediction.csv          | Random Forest          |
| **Crop Prediction**            | Classification                        | Crop_recommendation.csv            | Random Forest          |
| **Soil Quality Prediction**    | Classification                        | Soil_Quality.csv                   | Logistic Regression, SVM |
| **Yield Prediction**           | Regression                            | yield_df.csv                       | Random Forest          |
| **Mushroom Edibility Prediction** | Classification                      | mushrooms.csv                      | XGBoost                |

### 🔍 Detailed Breakdown

#### 1. Fertilizer Prediction
- **Objective**: Predict the appropriate fertilizer based on environmental and soil conditions, improving crop yield and soil health.
- **Dataset**: Fertilizer_Prediction.csv
- **Model**: Random Forest Classifier
- **Key Steps**:
  - **Label Encoding**: Used for categorical variables (Soil Type, Crop Type, and Fertilizer Name).
  - **Hyperparameter Tuning**: Applied grid search with cross-validation to optimize Random Forest parameters.

#### 2. Crop Prediction
- **Objective**: Predict the optimal crop based on soil and environmental factors like Nitrogen (N), Phosphorus (P), Potassium (K), temperature, humidity, pH, and rainfall.
- **Dataset**: Crop_recommendation.csv
- **Models Tested**:
  - Logistic Regression: 96.18%
  - Decision Tree Classifier: 97.82%
  - Gaussian Naive Bayes: 99.45%
  - Random Forest Classifier: 99.45% (selected for deployment)

#### 3. Soil Quality Prediction
- **Objective**: Classify soil quality based on features like nitrogen content, pH levels, and organic carbon.
- **Dataset**: Soil_Quality.csv
- **Models Tested**:
  - Logistic Regression
  - Support Vector Machine (SVM) with an RBF kernel
  - **Evaluation**: Models evaluated using accuracy metrics. Both Logistic Regression and SVM were effective in classification.

#### 4. Yield Prediction
- **Objective**: Predict crop yield using factors like area, type of crop, year of cultivation, average rainfall, pesticide usage, and temperature.
- **Dataset**: yield_df.csv
- **Models Tested**:
  - Linear Regression: MSE = 80852.09, Score = 0.098
  - K Neighbors Regressor: MSE = 55183.11, Score = 0.580
  - Decision Tree Regressor: MSE = 13211.19, Score = 0.975
  - Random Forest Regressor: MSE = 10135.47, Score = 0.985 (selected for deployment)
  - Gradient Boosting Regressor, XGBoost Regressor also evaluated

#### 5. Mushroom Edibility Prediction
- **Objective**: Predict whether a mushroom is edible or poisonous based on physical characteristics.
- **Dataset**: mushrooms.csv
- **Models Tested**:
  - Logistic Regression: 0.94
  - Decision Tree Classifier: 1.0
  - K Nearest Neighbors: 0.99
  - Random Forest Classifier: 1.0
  - XGBoost: 1.0 (selected for deployment due to handling missing data better)

---

## 🛠️ **Tech Stack**

| **Frontend**   | **Backend**         | **Database**    | **ML Tools**          |
| -------------- | ------------------- | --------------- | --------------------- |
| React          | Python (Flask)       | MongoDB         | scikit-learn, XGBoost  |
| Tailwind CSS   | Node.js, Express     |                 |                       |

---

## 📥 **Getting Started / Installation**

Ready to contribute? Here’s how to set up your development environment:

| **Step**                          | **Command**                                                                                                       |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| **1. Fork and Clone the Repo**    | `git clone https://github.com/manikumarreddyu/AgroTech-AI.git`                                                    |
| **2. Frontend Setup**             | `cd frontend && npm install`                                                                                      |
| **3. Start React Server**         | `npm run dev`                                                                                                     |
| **4. Backend Setup**              | `cd backend && npm install`                                                                                       |
| **5. Start Backend Server**       | `npm start`                                                                                                       |
| **6. Open Browser**               | Open `http://localhost:5173` to see the project running! 🌟                                                        |

---

## 🤝 **Code of Conduct**

We follow a [Code of Conduct](CODE_OF_CONDUCT.md) to ensure a constructive and positive environment for all contributors. By participating in this project, you agree to abide by its terms.

---

## 👥 **Our Contributors**

<div align="center">
  <h3>Thank you to all our amazing contributors! ❤️</h3>
  <a href="https://github.com/manikumarreddyu/AgroTech-AI/contributors">
    <img src="https://contributors-img.web.app/image?repo=manikumarreddyu/AgroTech-AI" alt="Contributors"/>
  </a>
</div>

---

## 📜 **License**

This project is licensed under the MIT License. See the [LICENSE](https://github.com/manikumarreddyu/AgroTech-AI/blob/main/LICENSE) file for more details.

---

<div align="center">
  Don’t forget to leave a ⭐ star for this project!
  <br>
  <a href="#top" style="position: fixed; bottom: 20px; right: 20px; background-color: black; color: white; padding: 10px 20px; text-align: center; text-decoration: none; display: inline-block; border-radius: 5px; font-family: Arial; font-size: 16px;">Go to Top</a>
</div>

