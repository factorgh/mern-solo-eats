import cloudinary from "cloudinary";
import Restaurant from "../models/MyRestaurant.js";
import mongoose from "mongoose";

const uploadImage = async (file) => {
  const image = file;
  const base64Image = Buffer.from(image.buffer).toString("base64");
  const dataURI = `data:${image.mimetype};base64,${base64Image}`;

  const uploadResponse = await cloudinary.v2.uploader.upload(dataURI);
  return uploadResponse.url;
};

const createMyRestaurant = async (req, res) => {
  try {
    //1)Check if user restaurant exist
    const imageUrl = await uploadImage(req.file);

    const existingRestaurant = await Restaurant.findOne({ user: req.userId });

    if (existingRestaurant) {
      return res.status(409).json({ message: "User restaurant already exist" });
    }
    //2)Create user reataurant create request here

    const restaurant = new Restaurant(req.body);
    restaurant.imageUrl = imageUrl;
    restaurant.user = new mongoose.Types.ObjectId(req.userId);
    restaurant.lastUpdated = new Date();
    await restaurant.save();

    res.status(200).json({ message: "Restaurant created successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const getMyRestaurant = async (req, res) => {
  const restaurant = await Restaurant.findOne({ user: req.userId });
  if (!restaurant) {
    return res.status(404).json({ message: "Restaurant not found" });
  }
  return res.status(200).json(restaurant);
};

const updateMyRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findOne({ user: req.userId });

    if (!restaurant) {
      return res.status(404).json({ message: "Cannot find restaurant" });
    }
    //2)Create user reataurant update request here

    restaurant.restaurantName = req.body.restaurantName;
    restaurant.city = req.body.city;
    restaurant.country = req.body.country;
    restaurant.deliveryPrice = req.body.deliveryPrice;
    restaurant.estimatedDeliveryTime = req.body.estimatedDeliveryTime;
    restaurant.cuisines = req.body.cuisines;
    restaurant.menuItems = req.body.menuItems;
    restaurant.lastUpdated = new Date();

    if (req.file) {
      const imageUrl = await uploadImage(req.file);
      restaurant.imageUrl = imageUrl;
    }
    await restaurant.save();

    res.status(200).send(restaurant);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export default {
  createMyRestaurant,
  getMyRestaurant,
  updateMyRestaurant,
};
