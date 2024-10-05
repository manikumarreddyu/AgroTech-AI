from flask import Flask, request, jsonify
import numpy as np
import pandas as pd
from flask_cors import CORS # CORS for handling Cross-Origin Resource Sharing
import pickle 
from datetime import datetime
import random
from datetime import datetime
from flask import Blueprint
from math import ceil

# Create a Flask application instance
app = Flask(__name__)
application=app
 

# Enable CORS for all routes, allowing requests from any origin
CORS(app,resources={r"/*":{"origins":"*"}})


crop_model = pickle.load(open('crop_recommendation.pkl', 'rb'))
fertilizer_model = pickle.load(open('fertilizer.pkl', 'rb'))
classifier_model = pickle.load(open('classifier.pkl', 'rb'))
soil_quality_model=pickle.load(open('soil_quality.pkl' ,'rb'))

 



# Define a route for handling HTTP GET requests to the root URL
@app.route('/', methods=['GET'])
def get_data():
    data = {
        "message":"API is Running"
    }
    return jsonify(data)
  
# Define a route for making predictions  
@app.route('/crop_predict', methods=['POST'])
def crop_predict():
    try:
        data = request.get_json()
        query_df = pd.DataFrame([data])
        prediction = crop_model.predict(query_df)
        return jsonify({'Prediction': list(prediction)})
    except Exception as e:
        return jsonify({'error': str(e)})
    
@app.route('/fertilizer_predict', methods=['POST'])
def fertilizer_predict():
    try:
        data = request.get_json()
        query_df = pd.DataFrame([data])
        prediction = fertilizer_model.classes_[classifier_model.predict(query_df)]
        return jsonify({'Prediction': str(prediction)})
    except Exception as e:
        return jsonify({'error': str(e)})
    
@app.route('/soil_quality_predict', methods=['POST'])
def soil_quality_predict():
    data = request.get_json()
    features = np.array([
        data['N'], data['P'], data['K'], data['pH'], data['EC'],
        data['OC'], data['S'], data['Zn'], data['Fe'], data['Cu'],
        data['Mn'], data['B']
    ]).reshape(1, -1)  # Convert to 2D array
    prediction = soil_quality_model.predict(features)
    return jsonify({'prediction': str(prediction[0])})

@app.route('/price_predict', methods=['GET'])
def price_predict():
    commodity_dict = {
        "arhar": "crops/Arhar.csv",
        "bajra": "crops/Bajra.csv",
        "barley": "crops/Barley.csv",
        "copra": "crops/Copra.csv",
        "cotton": "crops/Cotton.csv",
        "sesamum": "crops/Sesamum.csv",
        "gram": "crops/Gram.csv",
        "groundnut": "crops/Groundnut.csv",
        "jowar": "crops/Jowar.csv",
        "maize": "crops/Maize.csv",
        "masoor": "crops/Masoor.csv",
        "moong": "crops/Moong.csv",
        "niger": "crops/Niger.csv",
        "paddy": "crops/Paddy.csv",
        "ragi": "crops/Ragi.csv",
        "rape": "crops/Rape.csv",
        "jute": "crops/Jute.csv",
        "safflower": "crops/Safflower.csv",
        "soyabean": "crops/Soyabean.csv",
        "sugarcane": "crops/Sugarcane.csv",
        "sunflower": "crops/Sunflower.csv",
        "urad": "crops/Urad.csv",
        "wheat": "crops/Wheat.csv"
    }

    annual_rainfall = [29, 21, 37.5, 30.7, 52.6, 150, 299, 251.7, 179.2, 70.5, 39.8, 10.9]
    base = {
        "Paddy": 1245.5,
        "Arhar": 3200,
        "Bajra": 1175,
        "Barley": 980,
        "Copra": 5100,
        "Cotton": 3600,
        "Sesamum": 4200,
        "Gram": 2800,
        "Groundnut": 3700,
        "Jowar": 1520,
        "Maize": 1175,
        "Masoor": 2800,
        "Moong": 3500,
        "Niger": 3500,
        "Ragi": 1500,
        "Rape": 2500,
        "Jute": 1675,
        "Safflower": 2500,
        "Soyabean": 2200,
        "Sugarcane": 2250,
        "Sunflower": 3700,
        "Urad": 4300,
        "Wheat": 1350
    }
    commodity_list = []


    class Commodity:
        def __init__(self, csv_name):
            self.name = csv_name
            dataset = pd.read_csv(csv_name)
            self.X = dataset.iloc[:, :-1].values
            self.Y = dataset.iloc[:, 3].values
            from sklearn.tree import DecisionTreeRegressor
            depth = random.randrange(7, 18)
            self.regressor = DecisionTreeRegressor(max_depth=depth)
            self.regressor.fit(self.X, self.Y)

        def getPredictedValue(self, value):
            if value[1] >= 2019:
                fsa = np.array(value).reshape(1, 3)
                return self.regressor.predict(fsa)[0]
            else:
                c = self.X[:, 0:2]
                x = []
                for i in c:
                    x.append(i.tolist())
                fsa = [value[0], value[1]]
                ind = 0
                for i in range(0, len(x)):
                    if x[i] == fsa:
                        ind = i
                        break
                return self.Y[i]

        def getCropName(self):
            a = self.name.split('.')
            return a[0]


    def TopFiveWinners():
        current_month = datetime.now().month
        current_year = datetime.now().year
        current_rainfall = annual_rainfall[current_month - 1]
        prev_month = current_month - 1
        prev_rainfall = annual_rainfall[prev_month - 1]
        current_month_prediction = []
        prev_month_prediction = []
        change = []

        for i in commodity_list:
            current_predict = i.getPredictedValue([float(current_month), current_year, current_rainfall])
            current_month_prediction.append(current_predict)
            prev_predict = i.getPredictedValue([float(prev_month), current_year, prev_rainfall])
            prev_month_prediction.append(prev_predict)
            change.append((((current_predict - prev_predict) * 100 /prev_predict), commodity_list.index(i)))
        sorted_change = change
        sorted_change.sort(reverse=True)

        to_send = []
        for j in range(0, 5):
            perc, i = sorted_change[j]
            name = commodity_list[i].getCropName().split('/')[1]
            to_send.append([name, round((current_month_prediction[i] * base[name]) /100, 2), round(perc, 2)])
        return to_send


    def TopFiveLosers():
        current_month = datetime.now().month
        current_year = datetime.now().year
        current_rainfall = annual_rainfall[current_month - 1]
        prev_month = current_month - 1
        prev_rainfall = annual_rainfall[prev_month - 1]
        current_month_prediction = []
        prev_month_prediction = []
        change = []

        for i in commodity_list:
            current_predict = i.getPredictedValue([float(current_month), current_year, current_rainfall])
            current_month_prediction.append(current_predict)
            prev_predict = i.getPredictedValue([float(prev_month), current_year, prev_rainfall])
            prev_month_prediction.append(prev_predict)
            change.append((((current_predict - prev_predict) * 100 /prev_predict), commodity_list.index(i)))
        sorted_change = change
        sorted_change.sort()
        to_send = []
        for j in range(0, 5):
            perc, i = sorted_change[j]
            name = commodity_list[i].getCropName().split('/')[1]
            to_send.append([name, round((current_month_prediction[i] * base[name]) /100, 2), round(perc, 2)])
        return to_send


    def SixMonthsForecast():
        month1 = []
        month2 = []
        month3 = []
        month4 = []
        month5 = []
        month6 = []
        for i in commodity_list:
            crop = SixMonthsForecastHelper(i.getCropName())
            k = 0
            for j in crop:
                time = j[0]
                price = j[1]
                change = j[2]
                if k == 0:
                    month1.append((price, change, i.getCropName().split("/")[1], time))
                elif k == 1:
                    month2.append((price, change, i.getCropName().split("/")[1], time))
                elif k == 2:
                    month3.append((price, change, i.getCropName().split("/")[1], time))
                elif k == 3:
                    month4.append((price, change, i.getCropName().split("/")[1], time))
                elif k == 4:
                    month5.append((price, change, i.getCropName().split("/")[1], time))
                elif k == 5:
                    month6.append((price, change, i.getCropName().split("/")[1], time))
                k += 1
        month1.sort()
        month2.sort()
        month3.sort()
        month4.sort()
        month5.sort()
        month6.sort()
        crop_month_wise = []
        crop_month_wise.append([month1[0][3], month1[len(month1) - 1][2], month1[len(month1) - 1][0],
                                month1[len(month1) - 1][1], month1[0][2], month1[0][0], month1[0][1]])
        crop_month_wise.append([month2[0][3], month2[len(month2) - 1][2], month2[len(month2) - 1][0],
                                month2[len(month2) - 1][1], month2[0][2], month2[0][0], month2[0][1]])
        crop_month_wise.append([month3[0][3], month3[len(month3) - 1][2], month3[len(month3) - 1][0],
                                month3[len(month3) - 1][1], month3[0][2], month3[0][0], month3[0][1]])
        crop_month_wise.append([month4[0][3], month4[len(month4) - 1][2], month4[len(month4) - 1][0],
                                month4[len(month4) - 1][1], month4[0][2], month4[0][0], month4[0][1]])
        crop_month_wise.append([month5[0][3], month5[len(month5) - 1][2], month5[len(month5) - 1][0],
                                month5[len(month5) - 1][1], month5[0][2], month5[0][0], month5[0][1]])
        crop_month_wise.append([month6[0][3], month6[len(month6) - 1][2], month6[len(month6) - 1][0],
                                month6[len(month6) - 1][1], month6[0][2], month6[0][0], month6[0][1]])
        return crop_month_wise


    def SixMonthsForecastHelper(name):
        current_month = datetime.now().month
        current_year = datetime.now().year
        current_rainfall = annual_rainfall[current_month - 1]
        name = name.split("/")[1]
        name = name.lower()
        commodity = commodity_list[0]
        for i in commodity_list:
            if name == str(i):
                commodity = i
                break
        month_with_year = []
        for i in range(1, 7):
            if current_month + i <= 12:
                month_with_year.append((current_month + i, current_year, annual_rainfall[current_month + i - 1]))
            else:
                month_with_year.append(
                    (current_month + i - 12, current_year + 1, annual_rainfall[current_month + i - 13]))
        wpis = []
        current_wpi = commodity.getPredictedValue([float(current_month), current_year, current_rainfall])
        change = []

        for m, y, r in month_with_year:
            current_predict = commodity.getPredictedValue([float(m), y, r])
            wpis.append(current_predict)
            change.append(((current_predict - current_wpi) * 100) /current_wpi)

        crop_price = []
        for i in range(0, len(wpis)):
            m, y, r = month_with_year[i]
            x = datetime(y, m, 1)
            x = x.strftime("%b %y")
            crop_price.append([x, round((wpis[i] * base[name.capitalize()]) /100, 2), round(change[i], 2)])

        return crop_price


    def CurrentMonth(name):
        current_month = datetime.now().month
        current_year = datetime.now().year
        current_rainfall = annual_rainfall[current_month - 1]
        name = name.lower()
        commodity = commodity_list[0]
        for i in commodity_list:
            if name == str(i):
                commodity = i
                break
        current_wpi = commodity.getPredictedValue([float(current_month), current_year, current_rainfall])
        current_price = (base[name.capitalize()] * current_wpi) /100
        return current_price


    def TwelveMonthsForecast(name):
        current_month = datetime.now().month
        current_year = datetime.now().year
        current_rainfall = annual_rainfall[current_month - 1]
        name = name.lower()
        commodity = commodity_list[0]
        for i in commodity_list:
            if name == str(i):
                commodity = i
                break
        month_with_year = []
        for i in range(1, 13):
            if current_month + i <= 12:
                month_with_year.append((current_month + i, current_year, annual_rainfall[current_month + i - 1]))
            else:
                month_with_year.append(
                    (current_month + i - 12, current_year + 1, annual_rainfall[current_month + i - 13]))
        max_index = 0
        min_index = 0
        max_value = 0
        min_value = 9999
        wpis = []
        current_wpi = commodity.getPredictedValue([float(current_month), current_year, current_rainfall])
        change = []

        for m, y, r in month_with_year:
            current_predict = commodity.getPredictedValue([float(m), y, r])
            if current_predict > max_value:
                max_value = current_predict
                max_index = month_with_year.index((m, y, r))
            if current_predict < min_value:
                min_value = current_predict
                min_index = month_with_year.index((m, y, r))
            wpis.append(current_predict)
            change.append(((current_predict - current_wpi) * 100) /current_wpi)

        max_month, max_year, r1 = month_with_year[max_index]
        min_month, min_year, r2 = month_with_year[min_index]
        min_value = min_value * base[name.capitalize()] /100
        max_value = max_value * base[name.capitalize()] /100
        crop_price = []
        for i in range(0, len(wpis)):
            m, y, r = month_with_year[i]
            x = datetime(y, m, 1)
            x = x.strftime("%b %y")
            crop_price.append([x, round((wpis[i] * base[name.capitalize()]) /100, 2), round(change[i], 2)])

        x = datetime(max_year, max_month, 1)
        x = x.strftime("%b %y")
        max_crop = [x, round(max_value, 2)]
        x = datetime(min_year, min_month, 1)
        x = x.strftime("%b %y")
        min_crop = [x, round(min_value, 2)]

        return max_crop, min_crop, crop_price


    def TwelveMonthPrevious(name):
        name = name.lower()
        current_month = datetime.now().month
        current_year = datetime.now().year
        current_rainfall = annual_rainfall[current_month - 1]
        commodity = commodity_list[0]
        wpis = []
        crop_price = []
        for i in commodity_list:
            if name == str(i):
                commodity = i
                break
        month_with_year = []
        for i in range(1, 13):
            if current_month - i >= 1:
                month_with_year.append((current_month - i, current_year, annual_rainfall[current_month - i - 1]))
            else:
                month_with_year.append(
                    (current_month - i + 12, current_year - 1, annual_rainfall[current_month - i + 11]))

        for m, y, r in month_with_year:
            current_predict = commodity.getPredictedValue([float(m), 2013, r])
            wpis.append(current_predict)

        for i in range(0, len(wpis)):
            m, y, r = month_with_year[i]
            x = datetime(y, m, 1)
            x = x.strftime("%b %y")
            crop_price.append([x, round((wpis[i] * base[name.capitalize()]) /100, 2)])
        new_crop_price = []
        for i in range(len(crop_price) - 1, -1, -1):
            new_crop_price.append(crop_price[i])
        return new_crop_price


    arhar = Commodity(commodity_dict["arhar"])
    commodity_list.append(arhar)
    bajra = Commodity(commodity_dict["bajra"])
    commodity_list.append(bajra)
    barley = Commodity(commodity_dict["barley"])
    commodity_list.append(barley)
    copra = Commodity(commodity_dict["copra"])
    commodity_list.append(copra)
    cotton = Commodity(commodity_dict["cotton"])
    commodity_list.append(cotton)
    sesamum = Commodity(commodity_dict["sesamum"])
    commodity_list.append(sesamum)
    gram = Commodity(commodity_dict["gram"])
    commodity_list.append(gram)
    groundnut = Commodity(commodity_dict["groundnut"])
    commodity_list.append(groundnut)
    jowar = Commodity(commodity_dict["jowar"])
    commodity_list.append(jowar)
    maize = Commodity(commodity_dict["maize"])
    commodity_list.append(maize)
    masoor = Commodity(commodity_dict["masoor"])
    commodity_list.append(masoor)
    moong = Commodity(commodity_dict["moong"])
    commodity_list.append(moong)
    niger = Commodity(commodity_dict["niger"])
    commodity_list.append(niger)
    paddy = Commodity(commodity_dict["paddy"])
    commodity_list.append(paddy)
    ragi = Commodity(commodity_dict["ragi"])
    commodity_list.append(ragi)
    rape = Commodity(commodity_dict["rape"])
    commodity_list.append(rape)
    jute = Commodity(commodity_dict["jute"])
    commodity_list.append(jute)
    safflower = Commodity(commodity_dict["safflower"])
    commodity_list.append(safflower)
    soyabean = Commodity(commodity_dict["soyabean"])
    commodity_list.append(soyabean)
    sugarcane = Commodity(commodity_dict["sugarcane"])
    commodity_list.append(sugarcane)
    sunflower = Commodity(commodity_dict["sunflower"])
    commodity_list.append(sunflower)
    urad = Commodity(commodity_dict["urad"])
    commodity_list.append(urad)
    wheat = Commodity(commodity_dict["wheat"])
    commodity_list.append(wheat)

     
    # Retrieve data for different sections
    top_gainers = TopFiveWinners()
    top_losers = TopFiveLosers()
    six_months_forecast = SixMonthsForecast()
    # max_crop, min_crop, crop_price = TwelveMonthsForecast('wheat')  # Example crop, you can choose any
    # Pass data to the HTML template
    commodities = ['arhar','bajra','barley','copra','urad','gram','groundnut','jowar','jute','maize','masoor','moong','niger','paddy','ragi','rape']
    num_buttons_per_row = 8
    num_rows = ceil(len(commodities) /num_buttons_per_row)
    chunks = [commodities[i:i+num_buttons_per_row] for i in range(0, len(commodities), num_buttons_per_row)]
    
    return jsonify({ 'top_gainers': top_gainers,'top_losers': top_losers,'six_months_forecast': six_months_forecast,'commodities': commodities,'chunks': chunks})


@app.route('/commodity_predict', methods=['POST'])
def commodity_profile():
    
    commodity_dict = {
        "arhar": "crops/Arhar.csv",
        "bajra": "crops/Bajra.csv",
        "barley": "crops/Barley.csv",
        "copra": "crops/Copra.csv",
        "cotton": "crops/Cotton.csv",
        "sesamum": "crops/Sesamum.csv",
        "gram": "crops/Gram.csv",
        "groundnut": "crops/Groundnut.csv",
        "jowar": "crops/Jowar.csv",
        "maize": "crops/Maize.csv",
        "masoor": "crops/Masoor.csv",
        "moong": "crops/Moong.csv",
        "niger": "crops/Niger.csv",
        "paddy": "crops/Paddy.csv",
        "ragi": "crops/Ragi.csv",
        "rape": "crops/Rape.csv",
        "jute": "crops/Jute.csv",
        "safflower": "crops/Safflower.csv",
        "soyabean": "crops/Soyabean.csv",
        "sugarcane": "crops/Sugarcane.csv",
        "sunflower": "crops/Sunflower.csv",
        "urad": "crops/Urad.csv",
        "wheat": "crops/Wheat.csv"
    }

    annual_rainfall = [29, 21, 37.5, 30.7, 52.6, 150, 299, 251.7, 179.2, 70.5, 39.8, 10.9]
    base = {
        "Paddy": 1245.5,
        "Arhar": 3200,
        "Bajra": 1175,
        "Barley": 980,
        "Copra": 5100,
        "Cotton": 3600,
        "Sesamum": 4200,
        "Gram": 2800,
        "Groundnut": 3700,
        "Jowar": 1520,
        "Maize": 1175,
        "Masoor": 2800,
        "Moong": 3500,
        "Niger": 3500,
        "Ragi": 1500,
        "Rape": 2500,
        "Jute": 1675,
        "Safflower": 2500,
        "Soyabean": 2200,
        "Sugarcane": 2250,
        "Sunflower": 3700,
        "Urad": 4300,
        "Wheat": 1350
    }
    commodity_list = []


    class Commodity:
        def __init__(self, csv_name):
            self.name = csv_name
            dataset = pd.read_csv(csv_name)
            self.X = dataset.iloc[:, :-1].values
            self.Y = dataset.iloc[:, 3].values
            from sklearn.tree import DecisionTreeRegressor
            depth = random.randrange(7, 18)
            self.regressor = DecisionTreeRegressor(max_depth=depth)
            self.regressor.fit(self.X, self.Y)

        def getPredictedValue(self, value):
            if value[1] >= 2019:
                fsa = np.array(value).reshape(1, 3)
                return self.regressor.predict(fsa)[0]
            else:
                c = self.X[:, 0:2]
                x = []
                for i in c:
                    x.append(i.tolist())
                fsa = [value[0], value[1]]
                ind = 0
                for i in range(0, len(x)):
                    if x[i] == fsa:
                        ind = i
                        break
                return self.Y[i]

        def getCropName(self):
            a = self.name.split('.')
            return a[0]


    def TopFiveWinners():
        current_month = datetime.now().month
        current_year = datetime.now().year
        current_rainfall = annual_rainfall[current_month - 1]
        prev_month = current_month - 1
        prev_rainfall = annual_rainfall[prev_month - 1]
        current_month_prediction = []
        prev_month_prediction = []
        change = []

        for i in commodity_list:
            current_predict = i.getPredictedValue([float(current_month), current_year, current_rainfall])
            current_month_prediction.append(current_predict)
            prev_predict = i.getPredictedValue([float(prev_month), current_year, prev_rainfall])
            prev_month_prediction.append(prev_predict)
            change.append((((current_predict - prev_predict) * 100 /prev_predict), commodity_list.index(i)))
        sorted_change = change
        sorted_change.sort(reverse=True)

        to_send = []
        for j in range(0, 5):
            perc, i = sorted_change[j]
            name = commodity_list[i].getCropName().split('/')[1]
            to_send.append([name, round((current_month_prediction[i] * base[name]) /100, 2), round(perc, 2)])
        return to_send


    def TopFiveLosers():
        current_month = datetime.now().month
        current_year = datetime.now().year
        current_rainfall = annual_rainfall[current_month - 1]
        prev_month = current_month - 1
        prev_rainfall = annual_rainfall[prev_month - 1]
        current_month_prediction = []
        prev_month_prediction = []
        change = []

        for i in commodity_list:
            current_predict = i.getPredictedValue([float(current_month), current_year, current_rainfall])
            current_month_prediction.append(current_predict)
            prev_predict = i.getPredictedValue([float(prev_month), current_year, prev_rainfall])
            prev_month_prediction.append(prev_predict)
            change.append((((current_predict - prev_predict) * 100 /prev_predict), commodity_list.index(i)))
        sorted_change = change
        sorted_change.sort()
        to_send = []
        for j in range(0, 5):
            perc, i = sorted_change[j]
            name = commodity_list[i].getCropName().split('/')[1]
            to_send.append([name, round((current_month_prediction[i] * base[name]) /100, 2), round(perc, 2)])
        return to_send


    def SixMonthsForecast():
        month1 = []
        month2 = []
        month3 = []
        month4 = []
        month5 = []
        month6 = []
        for i in commodity_list:
            crop = SixMonthsForecastHelper(i.getCropName())
            k = 0
            for j in crop:
                time = j[0]
                price = j[1]
                change = j[2]
                if k == 0:
                    month1.append((price, change, i.getCropName().split("/")[1], time))
                elif k == 1:
                    month2.append((price, change, i.getCropName().split("/")[1], time))
                elif k == 2:
                    month3.append((price, change, i.getCropName().split("/")[1], time))
                elif k == 3:
                    month4.append((price, change, i.getCropName().split("/")[1], time))
                elif k == 4:
                    month5.append((price, change, i.getCropName().split("/")[1], time))
                elif k == 5:
                    month6.append((price, change, i.getCropName().split("/")[1], time))
                k += 1
        month1.sort()
        month2.sort()
        month3.sort()
        month4.sort()
        month5.sort()
        month6.sort()
        crop_month_wise = []
        crop_month_wise.append([month1[0][3], month1[len(month1) - 1][2], month1[len(month1) - 1][0],
                                month1[len(month1) - 1][1], month1[0][2], month1[0][0], month1[0][1]])
        crop_month_wise.append([month2[0][3], month2[len(month2) - 1][2], month2[len(month2) - 1][0],
                                month2[len(month2) - 1][1], month2[0][2], month2[0][0], month2[0][1]])
        crop_month_wise.append([month3[0][3], month3[len(month3) - 1][2], month3[len(month3) - 1][0],
                                month3[len(month3) - 1][1], month3[0][2], month3[0][0], month3[0][1]])
        crop_month_wise.append([month4[0][3], month4[len(month4) - 1][2], month4[len(month4) - 1][0],
                                month4[len(month4) - 1][1], month4[0][2], month4[0][0], month4[0][1]])
        crop_month_wise.append([month5[0][3], month5[len(month5) - 1][2], month5[len(month5) - 1][0],
                                month5[len(month5) - 1][1], month5[0][2], month5[0][0], month5[0][1]])
        crop_month_wise.append([month6[0][3], month6[len(month6) - 1][2], month6[len(month6) - 1][0],
                                month6[len(month6) - 1][1], month6[0][2], month6[0][0], month6[0][1]])
        return crop_month_wise


    def SixMonthsForecastHelper(name):
        current_month = datetime.now().month
        current_year = datetime.now().year
        current_rainfall = annual_rainfall[current_month - 1]
        name = name.split("/")[1]
        name = name.lower()
        commodity = commodity_list[0]
        for i in commodity_list:
            if name == str(i):
                commodity = i
                break
        month_with_year = []
        for i in range(1, 7):
            if current_month + i <= 12:
                month_with_year.append((current_month + i, current_year, annual_rainfall[current_month + i - 1]))
            else:
                month_with_year.append(
                    (current_month + i - 12, current_year + 1, annual_rainfall[current_month + i - 13]))
        wpis = []
        current_wpi = commodity.getPredictedValue([float(current_month), current_year, current_rainfall])
        change = []

        for m, y, r in month_with_year:
            current_predict = commodity.getPredictedValue([float(m), y, r])
            wpis.append(current_predict)
            change.append(((current_predict - current_wpi) * 100) /current_wpi)

        crop_price = []
        for i in range(0, len(wpis)):
            m, y, r = month_with_year[i]
            x = datetime(y, m, 1)
            x = x.strftime("%b %y")
            crop_price.append([x, round((wpis[i] * base[name.capitalize()]) /100, 2), round(change[i], 2)])

        return crop_price


    def CurrentMonth(name):
        current_month = datetime.now().month
        current_year = datetime.now().year
        current_rainfall = annual_rainfall[current_month - 1]
        name = name.lower()
        commodity = commodity_list[0]
        for i in commodity_list:
            if name == str(i):
                commodity = i
                break
        current_wpi = commodity.getPredictedValue([float(current_month), current_year, current_rainfall])
        current_price = (base[name.capitalize()] * current_wpi) /100
        return current_price


    def TwelveMonthsForecast(name):
        current_month = datetime.now().month
        current_year = datetime.now().year
        current_rainfall = annual_rainfall[current_month - 1]
        name = name.lower()
        commodity = commodity_list[0]
        for i in commodity_list:
            if name == str(i):
                commodity = i
                break
        month_with_year = []
        for i in range(1, 13):
            if current_month + i <= 12:
                month_with_year.append((current_month + i, current_year, annual_rainfall[current_month + i - 1]))
            else:
                month_with_year.append(
                    (current_month + i - 12, current_year + 1, annual_rainfall[current_month + i - 13]))
        max_index = 0
        min_index = 0
        max_value = 0
        min_value = 9999
        wpis = []
        current_wpi = commodity.getPredictedValue([float(current_month), current_year, current_rainfall])
        change = []

        for m, y, r in month_with_year:
            current_predict = commodity.getPredictedValue([float(m), y, r])
            if current_predict > max_value:
                max_value = current_predict
                max_index = month_with_year.index((m, y, r))
            if current_predict < min_value:
                min_value = current_predict
                min_index = month_with_year.index((m, y, r))
            wpis.append(current_predict)
            change.append(((current_predict - current_wpi) * 100) /current_wpi)

        max_month, max_year, r1 = month_with_year[max_index]
        min_month, min_year, r2 = month_with_year[min_index]
        min_value = min_value * base[name.capitalize()] /100
        max_value = max_value * base[name.capitalize()] /100
        crop_price = []
        for i in range(0, len(wpis)):
            m, y, r = month_with_year[i]
            x = datetime(y, m, 1)
            x = x.strftime("%b %y")
            crop_price.append([x, round((wpis[i] * base[name.capitalize()]) /100, 2), round(change[i], 2)])

        x = datetime(max_year, max_month, 1)
        x = x.strftime("%b %y")
        max_crop = [x, round(max_value, 2)]
        x = datetime(min_year, min_month, 1)
        x = x.strftime("%b %y")
        min_crop = [x, round(min_value, 2)]

        return max_crop, min_crop, crop_price


    def TwelveMonthPrevious(name):
        name = name.lower()
        current_month = datetime.now().month
        current_year = datetime.now().year
        current_rainfall = annual_rainfall[current_month - 1]
        commodity = commodity_list[0]
        wpis = []
        crop_price = []
        for i in commodity_list:
            if name == str(i):
                commodity = i
                break
        month_with_year = []
        for i in range(1, 13):
            if current_month - i >= 1:
                month_with_year.append((current_month - i, current_year, annual_rainfall[current_month - i - 1]))
            else:
                month_with_year.append(
                    (current_month - i + 12, current_year - 1, annual_rainfall[current_month - i + 11]))

        for m, y, r in month_with_year:
            current_predict = commodity.getPredictedValue([float(m), 2013, r])
            wpis.append(current_predict)

        for i in range(0, len(wpis)):
            m, y, r = month_with_year[i]
            x = datetime(y, m, 1)
            x = x.strftime("%b %y")
            crop_price.append([x, round((wpis[i] * base[name.capitalize()]) /100, 2)])
        new_crop_price = []
        for i in range(len(crop_price) - 1, -1, -1):
            new_crop_price.append(crop_price[i])
        return new_crop_price
    
    
    def cropimg(crop_name):
        crop_data = {
        "wheat":["../assets/crops/wheat.png", "U.P., Punjab, Haryana, Rajasthan, M.P., bihar", "rabi","Sri Lanka, United Arab Emirates, Taiwan"],
        "paddy":["../assets/crops/paddy.png", "W.B., U.P., Andhra Pradesh, Punjab, T.N.", "kharif","Bangladesh, Saudi Arabia, Iran"],
        "barley":["../assets/crops/barley.png", "Rajasthan, Uttar Pradesh, Madhya Pradesh, Haryana, Punjab", "rabi","Oman, UK, Qatar, USA"],
        "maize":["../assets/crops/maize.png", "Karnataka, Andhra Pradesh, Tamil Nadu, Rajasthan, Maharashtra", "kharif", "Hong Kong, United Arab Emirates, France"],
        "bajra":["../assets/crops/bajra.png", "Rajasthan, Maharashtra, Haryana, Uttar Pradesh and Gujarat", "kharif", "Oman, Saudi Arabia, Israel, Japan"],
        "copra":["../assets/crops/copra.png", "Kerala, Tamil Nadu, Karnataka, Andhra Pradesh, Orissa, West Bengal","rabi", "Veitnam, Bangladesh, Iran, Malaysia"],
        "cotton":["../assets/crops/cotton.png", "Punjab, Haryana, Maharashtra, Tamil Nadu, Madhya Pradesh, Gujarat", " China, Bangladesh, Egypt"],
        "masoor":["../assets/crops/masoor.png", "Uttar Pradesh, Madhya Pradesh, Bihar, West Bengal, Rajasthan", "rabi", "Pakistan, Cyprus,United Arab Emirates"],
        "gram":["../assets/crops/gram.png", "Madhya Pradesh, Maharashtra, Rajasthan, Uttar Pradesh, Andhra Pradesh & Karnataka", "rabi", "Veitnam, Spain, Myanmar"],
        "groundnut":["../assets/crops/groundnut.png", "Andhra Pradesh, Gujarat, Tamil Nadu, Karnataka, and Maharashtra", "kharif", "Indonesia, Jordan, Iraq"],
        "arhar":["../assets/crops/arhar.png", "Maharashtra, Karnataka, Madhya Pradesh and Andhra Pradesh", "kharif", "United Arab Emirates, USA, Chicago"],
        "sesamum":["../assets/crops/sesamum.png", "Maharashtra, Rajasthan, West Bengal, Andhra Pradesh, Gujarat", "rabi", "Iraq, South Africa, USA, Netherlands"],
        "jowar":["../assets/crops/jowar.png", "Maharashtra, Karnataka, Andhra Pradesh, Madhya Pradesh, Gujarat", "kharif", "Torronto, Sydney, New York"],
        "moong":["../assets/crops/moong.png", "Rajasthan, Maharashtra, Andhra Pradesh", "rabi", "Qatar, United States, Canada"],
        "niger":["../assets/crops/niger.png", "Andha Pradesh, Assam, Chattisgarh, Gujarat, Jharkhand", "kharif", "United States of American,Argenyina, Belgium"],
        "rape":["../assets/crops/rape.png", "Rajasthan, Uttar Pradesh, Haryana, Madhya Pradesh, and Gujarat", "rabi", "Veitnam, Malaysia, Taiwan"],
        "jute":["../assets/crops/jute.png", " West Bengal , Assam , Orissa , Bihar , Uttar Pradesh", "kharif", "JOrdan, United Arab Emirates, Taiwan"],
        "safflower":["../assets/crops/safflower.png",  "Maharashtra, Karnataka, Andhra Pradesh, Madhya Pradesh, Orissa", "kharif", " Philippines, Taiwan, Portugal"],
        "soyabean":["../assets/crops/soyabean.png",  "Madhya Pradesh, Maharashtra, Rajasthan, Madhya Pradesh and Maharashtra", "kharif", "Spain, Thailand, Singapore"],
        "urad":["../assets/crops/urad.png",  "Andhra Pradesh, Maharashtra, Madhya Pradesh, Tamil Nadu", "rabi", "United States, Canada, United Arab Emirates"],
        "ragi":["../assets/crops/ragi.png",  "Maharashtra, Tamil Nadu and Uttarakhand", "kharif", "United Arab Emirates, New Zealand, Bahrain"],
        "sunflower":["../assets/crops/sunflower.png",  "Karnataka, Andhra Pradesh, Maharashtra, Bihar, Orissa", "rabi", "Phillippines, United States, Bangladesh"],
        "sugarcane":["../assets/crops/sugarcane.png","Uttar Pradesh, Maharashtra, Tamil Nadu, Karnataka, Andhra Pradesh" , "kharif", "Kenya, United Arab Emirates, United Kingdom"]
        }
        return crop_data[crop_name]


    arhar = Commodity(commodity_dict["arhar"])
    commodity_list.append(arhar)
    bajra = Commodity(commodity_dict["bajra"])
    commodity_list.append(bajra)
    barley = Commodity(commodity_dict["barley"])
    commodity_list.append(barley)
    copra = Commodity(commodity_dict["copra"])
    commodity_list.append(copra)
    cotton = Commodity(commodity_dict["cotton"])
    commodity_list.append(cotton)
    sesamum = Commodity(commodity_dict["sesamum"])
    commodity_list.append(sesamum)
    gram = Commodity(commodity_dict["gram"])
    commodity_list.append(gram)
    groundnut = Commodity(commodity_dict["groundnut"])
    commodity_list.append(groundnut)
    jowar = Commodity(commodity_dict["jowar"])
    commodity_list.append(jowar)
    maize = Commodity(commodity_dict["maize"])
    commodity_list.append(maize)
    masoor = Commodity(commodity_dict["masoor"])
    commodity_list.append(masoor)
    moong = Commodity(commodity_dict["moong"])
    commodity_list.append(moong)
    niger = Commodity(commodity_dict["niger"])
    commodity_list.append(niger)
    paddy = Commodity(commodity_dict["paddy"])
    commodity_list.append(paddy)
    ragi = Commodity(commodity_dict["ragi"])
    commodity_list.append(ragi)
    rape = Commodity(commodity_dict["rape"])
    commodity_list.append(rape)
    jute = Commodity(commodity_dict["jute"])
    commodity_list.append(jute)
    safflower = Commodity(commodity_dict["safflower"])
    commodity_list.append(safflower)
    soyabean = Commodity(commodity_dict["soyabean"])
    commodity_list.append(soyabean)
    sugarcane = Commodity(commodity_dict["sugarcane"])
    commodity_list.append(sugarcane)
    sunflower = Commodity(commodity_dict["sunflower"])
    commodity_list.append(sunflower)
    urad = Commodity(commodity_dict["urad"])
    commodity_list.append(urad)
    wheat = Commodity(commodity_dict["wheat"])
    commodity_list.append(wheat)
    
    
    data = request.get_json()
    name = data.get('cropName')  # Accessing 'crop' key from the JSON data
     
    max_crop, min_crop, forecast_crop_values = TwelveMonthsForecast(name)
    prev_crop_values = TwelveMonthPrevious(name)
    forecast_x = [i[0] for i in forecast_crop_values]
    forecast_y = [i[1] for i in forecast_crop_values]
    previous_x = [i[0] for i in prev_crop_values]
    previous_y = [i[1] for i in prev_crop_values]
    current_price = CurrentMonth(name)
    #print(max_crop)
    #print(min_crop)
    #print(forecast_crop_values)
    #print(prev_crop_values)
    #print(str(forecast_x))
    crop_data = cropimg(name)
    return jsonify( {
        "name":name,
        "max_crop": max_crop,
        "min_crop": min_crop,
        "forecast_values": forecast_crop_values,
        "forecast_x": forecast_x,
        "forecast_y":forecast_y,
        "previous_values": prev_crop_values,
        "previous_x":previous_x,
        "previous_y":previous_y,
        "current_price": current_price,
        "image_url":crop_data[0],
        "prime_loc":crop_data[1],
        "type_c":crop_data[2],
        "export":crop_data[3]
    })
    
        

if __name__ == '__main__':
    app.run(debug=True, port=5000)

