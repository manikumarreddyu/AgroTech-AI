import pandas as pd
from sklearn.preprocessing import LabelEncoder
import joblib

# Sample data for crop types
data = {
    'Crop_Type': [
        'Barley', 
        'Cotton', 
        'Ground Nuts', 
        'Maize', 
        'Millets', 
        'Oil Seeds', 
        'Paddy', 
        'Pulses', 
        'Sugarcane', 
        'Tobacco', 
        'Wheat'
    ]
}

# Create a DataFrame
df = pd.DataFrame(data)

# Create a LabelEncoder instance
label_encoder = LabelEncoder()

# Fit and transform the Crop_Type column
df['Encoded_Crop_Type'] = label_encoder.fit_transform(df['Crop_Type'])

# Print the DataFrame to see the encoded values
print(df)

# Save the LabelEncoder to a .pkl file
joblib.dump(label_encoder, 'label_encoder.pkl')

print("Label encoder saved as 'label_encoder.pkl'")

