import { Injectable } from '@nestjs/common';
import * as moment from 'moment';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class WeatherService {
  constructor(private httpService: HttpService) {}

  private weatherAPIKey = process.env.WEATHERAPI_API_KEY;

  private async fetchWeatherAPI(location: {
    latitude: number;
    longitude: number;
  }) {
    const response = await this.httpService
      .get(
        `https://api.weatherapi.com/v1/forecast.json?key=${this.weatherAPIKey}&q=${location.latitude},${location.longitude}&days=2&hourly=24`,
      )
      .toPromise();
    // Get the current date and time
    const now = moment();
    // Get the date and time for 24 hours from now
    const end = now.clone().add(24, 'hours');

    // Filter the forecasts to include only those from the next hour to 24 hours later
    const forecasts = response.data.forecast.forecastday[0].hour
      .concat(response.data.forecast.forecastday[1].hour)
      .filter((forecast) => {
        const forecastTime = moment(forecast.time);
        return forecastTime.isAfter(now) && forecastTime.isBefore(end);
      });

    return forecasts.map((forecast) => ({
      dt: moment(forecast.time).unix(),
      temp: forecast.temp_c,
      humidity: forecast.humidity,
    }));
  }

  async getWeather(location: { latitude: number; longitude: number }) {
    const forecasts = await this.fetchWeatherAPI(location);

    const results = [];
    for (let hour = 0; hour < 24; hour++) {
      const hourForecasts = forecasts.filter(
        (forecast) => new Date(forecast.dt * 1000).getHours() === hour,
      );

      const tempSum = hourForecasts.reduce(
        (sum, forecast) => sum + forecast.temp,
        0,
      );
      const humiditySum = hourForecasts.reduce(
        (sum, forecast) => sum + forecast.humidity,
        0,
      );

      results.push({
        hour,
        temp: tempSum / hourForecasts.length,
        humidity: humiditySum / hourForecasts.length,
      });
    }

    return results;
  }
}
