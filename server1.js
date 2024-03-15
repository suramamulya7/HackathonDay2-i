const mongoose = require('mongoose');
const express = require('express');
const Store = require('./models/bookModel');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/addbook', async (req, res) => {
  try {
    const store = await Store.create(req.body);
    res.status(201).json(store);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
});

app.get('/getbooks', async (req, res) => {
  try {
    const store = await Store.find();
    res.status(200).json(store);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
});

app.delete('/deletebook/:id', async (req, res) => {
  try {
    const store = await Store.findByIdAndDelete(req.params.id);
    if (!store) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json(store);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
});

app.put('/updatebook/:id', async (req, res) => {
  try {
    const store = await Store.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!store) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json(store);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
});

mongoose.connect('mongodb://localhost:27017/onlinebook', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to local MongoDB');
    app.listen(3001, () => {
      console.log('Node API app is running on port 3001');
    });
  })
  .catch((error) => {
    console.error('Error connecting to local MongoDB:', error);
  });
