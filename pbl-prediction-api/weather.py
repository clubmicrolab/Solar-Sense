from functools import reduce
from datetime import datetime

import requests


WHEATHER_API_KEY = 'd121f163b27143a294e72016231306'


def get_weather_data(latitude, longitude, days):
    url = f'https://api.weatherapi.com/v1/forecast.json?key={WHEATHER_API_KEY}&q={latitude},{longitude}&days={days}&hourly=24'
    response = requests.get(url)
    if response.status_code != 200:
        raise Exception('Wheather API Exception')

    json_data = response.json()
    return json_data


def get_weather_data_next24hours(latitude, longitude):
    json_data = get_weather_data(latitude, longitude, 2)
    current_hour = datetime.now().hour
    hours = [hour for forecastday in json_data['forecast']['forecastday']
             for hour in forecastday['hour']][current_hour: current_hour + 1 + 24]

    return hours


def get_weather_data_next7days(latitude, longitude):
    json_data = get_weather_data(latitude, longitude, 7)
    days = []
    for forecastday in json_data['forecast']['forecastday']:
        day = forecastday['day']
        cloud = reduce(lambda x, y: x + y, [hour['cloud']
                       for hour in forecastday['hour']]) / 24
        day['cloud'] = cloud
        days.append(day)

    return days


if __name__ == '__main__':
    import json

    latitude, longitude = 47.061470, 28.867153
    result = get_weather_data_next7days(latitude, longitude)
    with open('data.json', 'w') as f:
        json.dump(result, f)
