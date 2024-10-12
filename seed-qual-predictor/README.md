# Seed Quality Prediction API for Maize

This project provides a Flask-based API to predict the quality of maize seeds using a Convolutional Neural Network (CNN) model. The API can classify seeds into three categories: broken, discolored, and pure, helping to automate the quality assessment process.

## Classes in the Prediction Result
The model predicts the following classes for maize seed quality:

- `broken` - seeds that are physically damaged or incomplete.
- `discolored` - seeds that show abnormal coloration, often an indicator of lower quality.
- `pure` - seeds that are in optimal condition for planting.

## Model Architecture
The model used for prediction is a Convolutional Neural Network (CNN) trained on grayscale images of maize seeds, with the following architecture:

- Conv2D layers for feature extraction.
- MaxPooling2D layers for down-sampling.
- Dense layers for classification with a softmax activation function to output class probabilities.

The model was trained using TensorFlow and Keras, with the saved model (`model.h5`) being loaded for inference.

## API Usage
The API exposes a `/predict` endpoint to which you can send an image of a maize seed for classification. The API responds with the predicted class and the model's confidence in the prediction.

### Endpoint: `/predict`
- Method: POST
- Content-Type: multipart/form-data
- Required: Upload a seed image.

## File Structure
```
.
├── app.py                # Flask API code
├── model
│   └── model.h5          # Trained CNN model
├── uploads               # Directory for temporarily storing uploaded files
├── requirements.txt      # List of dependencies
└── README.md             # Project readme file
```

## Running the API
> Fork the repo first!
- 1. Clone the repository:
```
git clone https://github.com/your-repo/AgroTech-AI.git
cd seed-quality-predictor
```
- 2. Run the Flask app:
```
cd seed-quality-predictor
python app.py
```
