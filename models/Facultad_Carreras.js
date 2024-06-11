const mongoose = require('mongoose');

const DataFiltroSchema = new mongoose.Schema({
  year: Number,
  campus: String,
  faculty: String,
  career: String
});

module.exports = mongoose.model('Data', DataFiltroSchema);
