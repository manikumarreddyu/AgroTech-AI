import pandas as pd
import numpy as np
import pickle
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.multioutput import MultiOutputRegressor
from sklearn.preprocessing import StandardScaler
from sklearn import metrics

# Step 1: Function to Calculate Irrigation Requirement
def calculate_irrigation_requirement(soil_type, crop_type, avg_temp, moisture_level):
    base_req = 200
    if soil_type == 'Sandy':
        base_req += 50
    elif soil_type == 'Clayey':
        base_req -= 30
    if crop_type in ['Sugarcane', 'Tobacco']:
        base_req += 100
    elif crop_type in ['Millets', 'Pulses']:
        base_req -= 50
    if avg_temp > 35:
        base_req += 30
    if moisture_level > 70:
        base_req -= 50
    return max(base_req, 100)

# Step 2: Generate Simulated Dataset
soil_types = ['Clayey', 'Sandy', 'Black', 'Loamy', 'Red']
crop_types = ['Barley', 'Groundnuts', 'Wheat', 'Tobacco', 'Sugarcane', 
              'Pulses', 'Paddy', 'Oil Seeds', 'Maize', 'Millets', 'Cotton']
locations = ['Mumbai', 'Delhi', 'Kolkata', 'Chennai', 'Bengaluru', 
             'Hyderabad', 'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow']
irrigation_types = ['Surface Irrigation', 'Pivot Irrigation', 
                    'Sprinkler Irrigation', 'Drip Irrigation', 'Subsurface Drip Irrigation']

data = []
num_samples = 1000

for _ in range(num_samples):
    soil = np.random.choice(soil_types)
    crop = np.random.choice(crop_types)
    avg_temp = np.random.uniform(15, 40)
    location = np.random.choice(locations)
    moisture_level = np.random.uniform(10, 100)
    
    irrigation_req = calculate_irrigation_requirement(soil, crop, avg_temp, moisture_level)
    irrigation_type = np.random.choice(irrigation_types)
    
    data.append([soil, crop, avg_temp, location, moisture_level, irrigation_req, irrigation_type])

df_simulated = pd.DataFrame(data, columns=['Soil Type', 'Crop Type', 'Avg Temperature', 
                                           'Geographical Location', 'Moisture Level', 
                                           'Irrigation Requirement', 'Irrigation Type'])

# Step 3: One-hot encode categorical variables
df_encoded = pd.get_dummies(df_simulated, columns=['Soil Type', 'Crop Type', 'Geographical Location'])

# Scale continuous features
scaler = StandardScaler()
df_encoded[['Avg Temperature', 'Moisture Level']] = scaler.fit_transform(df_encoded[['Avg Temperature', 'Moisture Level']])

# Step 4: Define Features and Target Variables
X = df_encoded[['Avg Temperature', 'Moisture Level'] + 
               [col for col in df_encoded.columns if col.startswith(('Soil Type', 'Crop Type', 'Geographical Location'))]].values
y1 = df_encoded['Irrigation Requirement'].values
y2 = pd.get_dummies(df_encoded['Irrigation Type']).values

y = np.column_stack((y1, y2))

# Step 5: Split Data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=6)

# Step 6: Train the Model
linear_model = MultiOutputRegressor(LinearRegression())
linear_model.fit(X_train, y_train)

# Step 7: Prediction
y_pred = linear_model.predict(X_test)

# Evaluate the irrigation requirement prediction
print('Irrigation Requirement R-squared score:', metrics.r2_score(y_test[:, 0], y_pred[:, 0]))

# Save the model
with open('irrigation_model.pkl', 'wb') as file:
    pickle.dump(linear_model, file)

print("Model saved to 'irrigation_model.pkl'.")

# Step 8: Make a Prediction for a New Input
# Ensure that sample input has all 28 features (same as the training features after encoding)
sample_input = [[30, 50, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]]
sample_prediction = linear_model.predict(sample_input)

# Extract predicted irrigation amount and type
predicted_irrigation_amount = sample_prediction[0, 0]
predicted_irrigation_type = np.argmax(sample_prediction[0, 1:])

# Map back to original irrigation type label
irrigation_type_labels = pd.get_dummies(df_simulated['Irrigation Type']).columns
predicted_irrigation_type_label = irrigation_type_labels[predicted_irrigation_type]

print(f'Irrigation Requirement Prediction: {predicted_irrigation_amount} mm')
print(f'Irrigation Type Prediction: {predicted_irrigation_type_label}')


