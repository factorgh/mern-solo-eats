import User from "../models/myUser.js";

const createMyUser = async (req, res) => {
  const { auth0Id } = req.body;

  const response = await User.findOne({ auth0Id });

  if (response) return res.status(200).send({ message: "ok" });

  const user = new User(req.body);
  await user.save();

  res.status(201).send({ message: "User created successfully" });
};

const getMyCurrentUser = async (req, res) => {
  try {
    //1)Check if current user exist
    const currentUser = await User.findOne({ _id: req.userId });
    if (!currentUser) {
      return res.status(404).json({ message: "User not found " });
    }
    ///2)Return user data to client

    return res.json(currentUser);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const updateMyUser = async (req, res) => {
  ///1}Destructure red body to get new user data
  try {
    const { name, addressLine1, country, city } = req.body;
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = name;
    user.addressLine1 = addressLine1;
    user.city = city;
    user.country = country;

    await user.save();

    res.send(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error updating user" });
  }
};
export default {
  createMyUser,
  updateMyUser,
  getMyCurrentUser,
};
