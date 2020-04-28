const URI = process.env.MONGODB_URI || 'mongodb://localhost/horarioweb';

module.exports = {
	db: URI,
};
