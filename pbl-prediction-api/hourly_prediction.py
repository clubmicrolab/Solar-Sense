from datetime import datetime, timedelta

import pandas as pd


def load_model():
    import pickle
    with open('ml_models/model_forecast.pkl', 'rb') as f:
        pickled_model = pickle.load(f)
    return pickled_model


def hourly_predict():
    pickled_model = load_model()
    fcst = pickled_model.predict(
        steps=365 * 24, freq="H", include_history=True)
    fcst.to_csv("hourly_prediction.csv")


def get_hourly_prediction_7days():
    start_time = datetime.now()
    end_time = start_time + timedelta(days=7)
    time_format = '%Y-%m-%d %H:%M:%S'
    df = pd.read_csv('hourly_predict.csv')
    l = df[['time', 'fcst']].values.tolist()
    result = [row for row in l if start_time <=
              datetime.strptime(row[0], time_format) <= end_time]
    return result
