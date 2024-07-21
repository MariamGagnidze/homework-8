#! /usr/bin/env node



// 2- Create a budget CLI tool where you can:/Add a new expense./Delete an expense./Show all expenses./Use the fs
//  module to save expense information.


import { Command } from 'commander';
import fs from 'fs/promises';
import path from 'path';

const program = new Command();
const dataFile = path.resolve('data.json');

const readData = async () => {
  try {
    const data = await fs.readFile(dataFile, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

const writeData = async (data) => {
    await fs.writeFile(dataFile, JSON.stringify(data));
  };
  

  program
  .command('add')
  .description('Add a new number')
  .argument('<number>', 'Number to add')
  .action(async (number) => {
    const data = await readData();
    data.push(number);
    await writeData(data);
    console.log('Added successfully');
  });

program
  .command('showAll')
  .description('Show all numbers')
  .action(async () => {
    const data = await readData();
    console.log(data);
  });

program
  .command('delete')
  .description('Delete a number by its value')
  .argument('<number>', 'Number to delete')
  .action(async (number) => {
    const data = await readData();
    const updatedData = data.filter((item) => item !== number);
    if (updatedData.length === data.length) {
      console.error('Number not found');
    } else {
      await writeData(updatedData);
      console.log('Deleted successfully');
    }
  });

program.parse();