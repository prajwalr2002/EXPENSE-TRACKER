const mongoose = require('mongoose');

// Define your schema with index definitions
const yourSchema = new mongoose.Schema({
  // Your schema fields
  name: String,
  email: { type: String, unique: true }, // Example unique index
  // ...
});

// Create a model based on the schema
const YourModel = mongoose.model('YourModel', yourSchema);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold);
  } catch (err) {
    console.error(`Error: ${err.message}`.red);
    process.exit(1);
  }
};

module.exports = { connectDB, YourModel }; // Export the model if needed
module.exports = connectDB;
