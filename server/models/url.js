const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence') (mongoose);

const UrlSchema = new mongoose.Schema({
  original_url: {
    type: String,
    required: true,
    trim: true,
  },
  urlIndex: {
    type: Number,
  }
});

UrlSchema.plugin(AutoIncrement, { inc_field: 'urlIndex' });

const Url = mongoose.model('Url', UrlSchema);

module.exports = { Url };
