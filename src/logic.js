import _ from 'lodash';
import 'jquery';

const API_KEY = process.env.API_KEY;
let city = $(".search-bar");
const searchBtn = $(".search-btn");
const geoBtn = $(".gps-btn");
const simpleRes = $(".simple-result");
const aqiIndex = $(".aqi-index");
const pm25 = $(".pm25");
const pm10 = $(".pm10");
const o3 = $(".o3");
const no2 = $(".no2");

const cityNameContainer = $('.city-name-container')

function defaultVal() {
    let url = `http://api.waqi.info/feed/italia/?token=${API_KEY}`;
    fetch(url)
        .then((response) => response.json())
        .then((informations) => {
            let aqi = informations.data.aqi;
            if (aqi >= 0 && aqi <= 50) {
                simpleRes.text("GOOD");
            } else if (aqi > 50 && aqi <= 100) {
                simpleRes.text("MODERATE");
            } else if (aqi > 100 && aqi <= 150) {
                simpleRes.text("NOT SO GOOD");
            } else if (aqi > 150 && aqi <= 200) {
                simpleRes.text("UNHEALTHY");
            } else if (aqi > 200 && aqi <= 300) {
                simpleRes.text("VERY UNHEALTHY");
            } else if (aqi > 300) {
                simpleRes.text("HAZARDOUS");
            }
            aqiIndex.text("AQI: " + aqi);
            pm25.text("PM2.5: " + _.get(informations, "data.iaqi.pm25.v", "--"));
            pm10.text("PM10: " + _.get(informations, "data.iaqi.pm10.v", "--"));
            no2.text("NO2: " + _.get(informations, "data.iaqi.no2.v", "--"));
            o3.text("O3: " + _.get(informations, "data.iaqi.o3.v", "--"));
            cityNameContainer.text('italia');
        })
}

defaultVal();

searchBtn.on("click", function () {
    let userInput = $(".search-bar").val().toLowerCase();
    const url = `http://api.waqi.info/feed/${userInput}/?token=${API_KEY}`;
    city.val('');
    fetch(url)
        .then((response) => response.json())
        .then((informations) => {
            var city = _.get(informations, "data.city", "Unknown");
            if (city !== "Unknown") {
                city = _.startCase(userInput);
                let aqi = informations.data.aqi;
                if (aqi >= 0 && aqi <= 50) {
                    simpleRes.text("GOOD");
                } else if (aqi > 50 && aqi <= 100) {
                    simpleRes.text("MODERATE");
                } else if (aqi > 100 && aqi <= 150) {
                    simpleRes.text("NOT SO GOOD");
                } else if (aqi > 150 && aqi <= 200) {
                    simpleRes.text("UNHEALTHY");
                } else if (aqi > 200 && aqi <= 300) {
                    simpleRes.text("VERY UNHEALTHY");
                } else if (aqi > 300) {
                    simpleRes.text("HAZARDOUS");
                }
                aqiIndex.text("AQI: " + aqi);
                pm25.text("PM2.5: " + _.get(informations, "data.iaqi.pm25.v", "--"));
                pm10.text("PM10: " + _.get(informations, "data.iaqi.pm10.v", "--"));
                no2.text("NO2: " + _.get(informations, "data.iaqi.no2.v", "--"));
                o3.text("O3: " + _.get(informations, "data.iaqi.o3.v", "--"));
                cityNameContainer.text(city);
            } else {
                simpleRes.text('--')
                aqiIndex.text('AQI: -');
                pm25.text('PM2.5: -');
                pm10.text('PM10: -');
                no2.text('NO2: -');
                o3.text('O3: -');
                cityNameContainer.text('Unknown');
            }
        });
});




geoBtn.on('click', function() {
    navigator.geolocation.getCurrentPosition(function(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        const url = `http://api.waqi.info/feed/geo:${latitude};${longitude}/?token=${API_KEY}`;

        fetch(url)
        .then((response) => response.json())
        .then((informations) => {
            var city = _.get(informations, "data.city", "Unknown");
            if (city !== "Unknown") {
                city = 'Your Location';
                let aqi = informations.data.aqi;
                if (aqi >= 0 && aqi <= 50) {
                    simpleRes.text("GOOD");
                } else if (aqi > 50 && aqi <= 100) {
                    simpleRes.text("MODERATE");
                } else if (aqi > 100 && aqi <= 150) {
                    simpleRes.text("NOT SO GOOD");
                } else if (aqi > 150 && aqi <= 200) {
                    simpleRes.text("UNHEALTHY");
                } else if (aqi > 200 && aqi <= 300) {
                    simpleRes.text("VERY UNHEALTHY");
                } else if (aqi > 300) {
                    simpleRes.text("HAZARDOUS");
                }
                aqiIndex.text("AQI: " + aqi);
                pm25.text("PM2.5: " + _.get(informations, "data.iaqi.pm25.v", "--"));
                pm10.text("PM10: " + _.get(informations, "data.iaqi.pm10.v", "--"));
                no2.text("NO2: " + _.get(informations, "data.iaqi.no2.v", "--"));
                o3.text("O3: " + _.get(informations, "data.iaqi.o3.v", "--"));
                cityNameContainer.text(city);
            } else {
                simpleRes.text('--')
                aqiIndex.text('AQI: -');
                pm25.text('PM2.5: -');
                pm10.text('PM10: -');
                no2.text('NO2: -');
                o3.text('O3: -');
                cityNameContainer.text('Unknown');
            }
        });
      });
})