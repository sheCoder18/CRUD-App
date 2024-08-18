import express from "express";
import { User } from "../models/userModel.js";

const router = express.Router();

// Route for Save new User
router.post("/", async (request, response) => {
  try {
    console.log(request.body);
    if (
      !request.body.name ||
      !request.body.email ||
      !request.body.age ||
      !request.body.dob ||
      !request.body.phone ||
      !request.body.profession ||
      !request.body.country ||
      !request.body.full_address
    ) {
      return response.status(400).send({
        message: "Send all required fields",
      });
    }

    const newUser = {
      name: request.body.name,
      email: request.body.email,
      age: request.body.age,
      dob: request.body.dob,
      phone: request.body.phone,
      profession: request.body.profession,
      country: request.body.country,
      full_address: request.body.full_address,
    };

    const user = await User.create(newUser);
    return response.status(200).send(user);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Get All User from database
router.get("/", async (request, response) => {
  try {
    const Users = await User.find({});

    return response.status(200).json({
      count: Users.length,
      data: Users,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Get One User from database by id
router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const book = await User.findById(id);

    return response.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Update an User
router.put("/:id", async (request, response) => {
  try {
    if (
      !request.body.name ||
      !request.body.email ||
      !request.body.age ||
      !request.body.dob ||
      !request.body.phone ||
      !request.body.profession ||
      !request.body.country ||
      !request.body.full_address
    ) {
      return response.status(400).send({
        message: "Send all required fields",
      });
    }

    const { id } = request.params;

    const result = await User.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response.status(404).json({ message: "User not found" });
    }

    return response
      .status(200)
      .send({ message: "User details updated successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Delete an User
router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    console.log("Received ID for deletion:", id); // Debugging log
    if (!id) {
      return response.status(400).send({ message: "User ID is required" });
    }
    const result = await User.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).json({ message: "User not found" });
    }

    return response.status(200).send({ message: "User deleted successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;
