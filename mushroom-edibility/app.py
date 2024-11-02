from flask import Flask, request, jsonify
import pandas as pd
import pickle
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

# Load model and encoders at the start to avoid reloading for every request
model_path = os.path.join("models", "model.pkl")
encoder_path = os.path.join("models", "encoders.pkl")

with open(encoder_path, 'rb') as f:
    encoders = pickle.load(f)

# Load the prediction model
model = pickle.load(open(model_path, "rb"))

@app.route("/mushroom_edibility", methods=["POST"])
def mushroom_edibility():
    try:
        mappings = {
            'cap-shape': cap_shape_mapping,
            'cap-surface': cap_surface_mapping,
            'cap-color': cap_color_mapping,
            'bruises': bruises_mapping,
            'odor': odor_mapping,
            'gill-attachment': gill_attachment_mapping,
            'gill-spacing': gill_spacing_mapping,
            'gill-size': gill_size_mapping,
            'gill-color': gill_color_mapping,
            'stalk-shape': stalk_shape_mapping,
            'stalk-root': stalk_root_mapping,
            'stalk-surface-above-ring': stalk_surface_above_ring_mapping,
            'stalk-surface-below-ring': stalk_surface_below_ring_mapping,
            'stalk-color-above-ring': stalk_color_above_ring_mapping,
            'stalk-color-below-ring': stalk_color_below_ring_mapping,
            'veil-type': veil_type_mapping,
            'veil-color': veil_color_mapping,
            'ring-number': ring_number_mapping,
            'ring-type': ring_type_mapping,
            'spore-print-color': spore_print_color_mapping,
            'population': population_mapping,
            'habitat': habitat_mapping
        }

        data_dict = {}

        for key, mapping in mappings.items():
            value = request.form.get(key)
            if value is None:
                raise ValueError(f"Missing value for {key}.")
                
            mapped_value = mapping.get(value)
            if mapped_value is not None:
                data_dict[key] = [mapped_value]
            else:
                raise ValueError(f"Invalid value '{value}' for {key}.")

        df = pd.DataFrame(data_dict)

        for col in df.columns:
            if col in encoders:
                if df[col].isnull().any():  
                    raise ValueError(f"Missing value in column: {col}")
                df[col] = encoders[col].transform(df[col])

        edible = edibility_check(df)
        return jsonify({"edibility": "Edible" if edible == 1 else "Poisonous"})

    except Exception as e:
        return jsonify({"error": str(e)}), 400

def edibility_check(df):
    prediction = model.predict(df)
    return prediction[0]

if __name__ == "__main__":
    app.run(debug=True)
