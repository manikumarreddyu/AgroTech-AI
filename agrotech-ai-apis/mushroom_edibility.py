import pandas as pd
import pickle
from flask import request, jsonify
from data.maps import *

def check_mushroom_edibility():
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
            if value:
                mapped_value = mapping.get(value)
                data_dict[key] = [mapped_value if mapped_value is not None else None]
            else:
                raise ValueError(f"Missing value in column: {key} with value {value}")
                data_dict[key] = [None]

        df = pd.DataFrame(data_dict)

        with open('./models/encoders.pkl', 'rb') as f:
            encoders = pickle.load(f)

        for col in df.columns:
            if col in encoders:
                if df[col].isnull().any():
                    raise ValueError(f"Missing value in column: {col}")
                df[col] = encoders[col].transform(df[col])

        return jsonify({"edibility": edibility_check(df)})

    except Exception as e:
        return jsonify({"error": str(e)})


def edibility_check(df):
    with open("./models/model.pkl", "rb") as f:
        model = pickle.load(f)
    prediction = model.predict(df)
    return "Edible" if prediction[0] == 1 else "Poisonous"
