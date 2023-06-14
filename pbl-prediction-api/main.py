from flask import Flask, request

from weather import get_weather_data_next24hours
from weekly_prediction import get_7day_prediction
from hourly_prediction import get_hourly_prediction_7days
from influx_client import last_7days_wh_query, last_7days_wd_query, query_influxdb

flask_app = Flask(__name__)


@flask_app.route('/', methods=['GET'])
def get_index():
    return {'status_code': 200}


@flask_app.route('/weather', methods=['GET'])
def get_weather():
    latitude = request.args['latitude']
    longitude = request.args['longitude']
    return get_weather_data_next24hours(latitude, longitude)


@flask_app.route('/weekly-prediction', methods=['GET'])
def get_weekly_prediction():
    latitude = request.args['latitude']
    longitude = request.args['longitude']
    return get_7day_prediction(latitude, longitude).tolist()


@flask_app.route('/hourly-prediction', methods=['GET'])
def get_hourly_prediction():
    return get_hourly_prediction_7days()

@flask_app.route('/last_7days_wd', methods=['GET'])
def last_7days_wd():
    return query_influxdb(last_7days_wd_query)

@flask_app.route('/last_7days_wh', methods=['GET'])
def last_7days_wh():
    return query_influxdb(last_7days_wh_query)

if __name__ == '__main__':
    flask_app.run(host='0.0.0.0', port=8080, debug=True, use_reloader=False)
