// Connect to the contact database using MongoDB Node.js driver
import { MongoClient } from "mongodb";
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const db = client.db("contact");
    console.log("Connected to the contact database");

    // Insert multiple contacts into the contactlist collection
    await db.collection("contactlist").insertMany([
      {
        last_name: "Ben",
        first_name: "Moris",
        email: "ben@gmail.com",
        age: 26,
      },
      {
        last_name: "Kefi",
        first_name: "Seif",
        email: "kefi@gmail.com",
        age: 15,
      },
      {
        last_name: "Emilie",
        first_name: "brouge",
        email: "emilie.b@gmail.com",
        age: 40,
      },
      { last_name: "Alex", first_name: "brown", age: 4 },
      { last_name: "Denzel", first_name: "Washington", age: 3 },
    ]);

    // Add your other database operations here...
  } finally {
    await client.close();
  }
}

run().catch(console.dir);

// Insert multiple contacts into the contactlist collection
db.contactlist.insertMany([
  { last_name: "Ben", first_name: "Moris", email: "ben@gmail.com", age: 26 },
  { last_name: "Kefi", first_name: "Seif", email: "kefi@gmail.com", age: 15 },
  {
    last_name: "Emilie",
    first_name: "brouge",
    email: "emilie.b@gmail.com",
    age: 40,
  },
  { last_name: "Alex", first_name: "brown", age: 4 },
  { last_name: "Denzel", first_name: "Washington", age: 3 },
]);

// Display all contacts
db.contactlist.find().pretty();

// Find a contact by ID (replace YOUR_ID_HERE with an actual ObjectId from your collection)
db.contactlist.findOne({ _id: ObjectId("YOUR_ID_HERE") });

// Find all contacts with age > 18
db.contactlist.find({ age: { $gt: 18 } }).pretty();

// Find contacts with age > 18 and first name contains "ah" (case-insensitive)
db.contactlist
  .find({
    age: { $gt: 18 },
    first_name: { $regex: "ah", $options: "i" },
  })
  .pretty();

// Update first name from "Seif" to "Anis" for the contact with last name "Kefii"
db.contactlist.updateOne(
  { last_name: "Kefi", first_name: "Seif" },
  { $set: { first_name: "Anis" } }
);

// Delete all contacts with age < 5
db.contactlist.deleteMany({ age: { $lt: 5 } });

// Display all remaining contacts
db.contactlist.find().pretty();


