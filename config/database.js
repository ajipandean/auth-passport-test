module.exports = function(mongoose) {
  mongoose.connect('mongodb://localhost:27017/authPassportTest', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(function() {
      console.log('Connected to MongoDB...')
    });
};
