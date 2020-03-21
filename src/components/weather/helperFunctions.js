export const mapDataToWeather = data => {
  const mapped = {
    city: data.name,
    country: data.sys.country,
    date: data.dt * 1000,
    humidity: data.main.humidity,
    iconId: data.weather[0].id,
    temperature: data.main.temp,
    description: data.weather[0].description,
    windSpeed: Math.round(data.wind.speed * 3.6), // convert from m/s to km/h
    condition: data.cod
  };

  // Add extra properties for the five day forecast: dt_txt, icon, min, max
  if (data.dt_txt) {
    mapped.dtTxt = data.dt_txt;
  }

  if (data.weather[0].icon) {
    mapped.icon = data.weather[0].icon;
  }

  if (data.main.temp_min && data.main.temp_max) {
    mapped.max = data.main.temp_max;
    mapped.min = data.main.temp_min;
  }

  // remove undefined fields
  Object.keys(mapped).forEach(
    key => mapped[key] === undefined && delete data[key]
  );

  return mapped;
};
