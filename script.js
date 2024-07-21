#! /usr/bin/env node


// 1- Create a weather CLI tool that: Takes a city name as input Fetches and displays the exact temperature in
//  Celsius using this API endpoint: 
//  https://api.openweathermap.org/data/2.5/weather?q={cityName}&units=metric&appid=895284fb2d2c50a520ea537456963d9c

import { Command } from 'commander';
import fetch from 'node-fetch';

const program = new Command();

program
  .command("weather")
  .description("Fetch the current weather temperature for a given city in Celsius")
  .argument("<city>", "Name of the city to get weather for")
  .action(async (city) => {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=895284fb2d2c50a520ea537456963d9c`);
      const weatherData = await response.json();
      
      if (response.status !== 200) throw new Error("error,city not found");

      const temperature = weatherData.main.temp;
      console.log(`The temperature in ${city} is ${temperature}°C.`);
    } catch (error) {
      console.error("Error ", error.message);
    }
  });

program.parse();





