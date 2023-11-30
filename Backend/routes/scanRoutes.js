
const express = require('express');
const axios = require('axios');
const Scan = require('../models/DataModel');

const router = express.Router();

router.get('/api/data', async (req, res) => {
    try {
      // Fetch data from the API
      const apiUrl = 'http://coding-assignment.bombayrunning.com/data.json';
      const response = await axios.get(apiUrl);
      const dataArray = response.data;
  
      // Save data to MongoDB
      const savedData = [];
      for (const data of dataArray) {
        const newData = new Data({ data: data });
        await newData.save();
        savedData.push(newData.data);
      }
  
      res.status(200).json({ message: 'Data saved successfully', data :savedData });
    } catch (error) {
      console.error('Error fetching or saving data:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  router.get('/api/data/read', async (req, res) => {
    try {
      // Retrieve all data from the database
      const dataObjects = await Data.find({});
  
      // Extract data from the retrieved objects
      const savedData = [];
      for (const dataObject of dataObjects) {
        savedData.push(dataObject.data);
      }
  
      // Return the retrieved data in the response
      res.status(200).json({ data: savedData });
    } catch (error) {
      console.error('Error fetching data from MongoDB:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  