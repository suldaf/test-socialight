const { generateToken } = require("../helpers/jwt");
const { User } = require("../models");

class UserController {
  static async login(req, res) {
    try {
      const { name, password } = req.body;

      const data = await User.findOne({ where: { name, password } });
      console.log(data);
      if (data) {
        const accessToken = generateToken({
          id: data.id,
          name: data.name,
          role: data.role,
        });

        return res.status(200).json({
          message: "success login",
          data: {
            id: data.id,
            name: data.name,
            role: data.role,
            accessToken,
          },
        });
      }
    } catch (error) {
      return res.send(error);
    }
  }
  static async create(req, res) {
    try {
      const { name, role, password } = req.body;
      const data = await User.create({ name, role, password });
      return res.status(201).json({ message: "success create user", data });
    } catch (e) {
      return res.send(e);
    }
  }

  static async show(req, res) {
    try {
      const userId = +req.params.id;
      const currentUser = req.currentUser;
      if (userId === currentUser.id) {
        const data = await User.findOne({ where: { id: userId } });
        if (data) {
          return res.status(200).json({
            message: "success get data user",
            data: {
              id: data.id,
              name: data.name,
              role: data.role,
            },
          });
        } else {
          return res.status(404).json({ message: "user not found" });
        }
      } else {
        return res.status(401).json({ message: "Not Authorized", status: 401 });
        {
        }
      }
    } catch (e) {
      return res.send(e);
    }
  }
  static async showAll(req, res) {
    try {
      const data = await User.findAll({
        attributes: { exclude: ["password"] },
      });
      if (data.length) {
        return res
          .status(200)
          .json({ message: "success get all data user", data });
      } else {
        return res.status(404).json({ message: "data not found" });
      }
    } catch (e) {
      return res.send(e);
    }
  }
}

module.exports = UserController;
