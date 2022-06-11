const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("please provide password");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://fullstack:${password}@cluster0.g5av1jt.mongodb.net/phoneApp?retryWrites=true&w=majority`;

const phoneSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", phoneSchema);

if (process.argv.length > 3) {
  const newName = process.argv[3];
  const newNumber = process.argv[4];

  mongoose
    .connect(url)
    .then((result) => {
      console.log("connected");

      const person = new Person({
        name: newName,
        number: newNumber,
      });
      return person.save();
    })
    .then(() => {
      console.log("person saved");
      return mongoose.connection.close();
    })
    .catch((err) => {
      console.log(err);
    });
} else if (process.argv.length === 3) {
  mongoose
    .connect(url)
    .then(() => {
      Person.find({}).then((result) => {
        result.forEach((person) => {
          console.log(person);
        });
        mongoose.connection.close();
      });
    })
    .catch((err) => {
      console.log(err);
    });
}
