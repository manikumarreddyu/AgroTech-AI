import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import pickle
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.svm import SVC
from sklearn import metrics

# Load the data
data = pd.read_csv("notebooks/Soil_Quality.csv")

# Display the first few rows of the data
print(data.head())

# Calculate the correlation matrix
correlation_matrix = data.corr()

# Plot the correlation matrix
plt.matshow(correlation_matrix)
plt.colorbar()
plt.show()

# Split the data into features and target variable
x = data.iloc[:, :-1].values
y = data.iloc[:, -1].values

# Split the data into training and testing sets
x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=0.2, random_state=6)

# Train a logistic regression model
linear_model = LogisticRegression()
linear_model.fit(x_train, y_train)

# Make predictions with the logistic regression model
y_pred = linear_model.predict(x_test)

# Plot the predictions vs the actual test values
plt.scatter(y_test, y_pred)
plt.xlabel("Test values")
plt.ylabel("Prediction values")
plt.show()

# Train a Support Vector Machine (SVM) model with radial basis function (RBF) kernel
svr_rbf = SVC()
svr_rbf.fit(x_train, y_train)

# Make predictions with the SVM model
y_predsvm = svr_rbf.predict(x_test)

# Print accuracy scores for both models
print('Logistic Regression accuracy:', metrics.accuracy_score(y_test, y_pred))
print('SVM accuracy:', metrics.accuracy_score(y_test, y_predsvm))

# Make a prediction with the SVM model for a specific input
print(svr_rbf.predict([[138, 8.6, 560, 7.46, 0.62, 0.7, 5.9, 0.24, 0.31, 0.77, 8.71, 0.11]]))

# Save the trained models to pickle files
# with open('linear_model.pkl', 'wb') as file:
#     pickle.dump(linear_model, file)

with open('soil_quality.pkl', 'wb') as file:
    pickle.dump(svr_rbf, file)

print("Models saved to pickle files.")
