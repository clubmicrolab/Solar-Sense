import pickle
import pandas as pd

from weather import get_weather_data_next7days

with open('ml_models/energy_on_weather_prediction.pkl', 'rb') as f:
    model = pickle.load(f)


def get_7day_prediction(latitude, longitude):
    days = get_weather_data_next7days(latitude, longitude)
    days = [{
        'maxtemp_f': day['maxtemp_f'],
        'totalprecip_mm': day['totalprecip_mm'],
        'cloud': day['cloud']
    } for day in days]
    df = pd.DataFrame(days)
    predictions = model.predict(df)
    return predictions
