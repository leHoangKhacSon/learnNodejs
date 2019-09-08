const mongoose = require('mongoose');

let albumSchema = mongoose.Schema({
	userId: String,
	urls: Array
});

let Album = mongoose.model('Album', albumSchema, 'albums');

module.exports = Album;