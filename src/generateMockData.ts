import mongoose from "mongoose";
import { User } from "./models/user";
import { House } from "./models/house";
import { Booking } from "./models/booking";
import { Favorite } from "./models/favorite";
import { faker } from "@faker-js/faker";

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/rent-app";

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    seedDatabase()
      .then(() => {
        console.log("Database seeded");
        mongoose.disconnect();
        console.log("Disconnected from MongoDB");
      })
      .catch((err) => {
        console.error("Error seeding database", err);
        mongoose.disconnect();
      });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });

const seedDatabase = async () => {
  // Clear existing data
  await User.deleteMany({});
  await House.deleteMany({});
  await Booking.deleteMany({});
  await Favorite.deleteMany({});

  // Create users
  const users = [];
  for (let i = 0; i < 10; i++) {
    const user = new User({
      user_name: faker.person.fullName(),
      profile_photo: faker.image.avatar(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      phone_number: faker.phone.number(),
    });
    users.push(await user.save());
  }

  // Create houses
  const houses = [];
  for (let i = 0; i < 10; i++) {
    const house = new House({
      user_id: faker.database.mongodbObjectId(),
      price: parseFloat(faker.commerce.price()),
      location: {
        type: "Point",
        coordinates: [faker.location.longitude(), faker.location.latitude()],
      },
    });
    houses.push(await house.save());
  }

  // Create bookings
  for (let i = 0; i < 10; i++) {
    const booking = new Booking({
      guest_id: faker.database.mongodbObjectId(),
      host_id: faker.database.mongodbObjectId(),
      house_id: faker.database.mongodbObjectId(),
      total_price: faker.commerce.price(),
    });
    await booking.save();
  }

  // Create favorites
  for (let i = 0; i < 10; i++) {
    const favorite = new Favorite({
      user_id: faker.database.mongodbObjectId(),
      house_id: faker.database.mongodbObjectId(),
    });
    await favorite.save();
  }
};
