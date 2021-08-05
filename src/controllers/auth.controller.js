import db from "../../db/models/";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt-nodejs';
require('dotenv').config();




class Auth {

  async register(req, res) {
    try {
      if (!req.body.email || !req.body.password) {
        res.json({ success: false, msg: 'Please pass email and password.' });
      }
      else {
        var newUser = {
          fullName: req.body.fullName,
          email: req.body.email,
          password: req.body.password
        };
           await db.User.create(newUser).then((data) => {
        return res.json({ success: true, msg: 'Successful created new user.' });
      })
    }
  }
    catch (error) {
      res.json({ success: false, msg: error });
    }

  };




  async login(req, res) {
    try {
      const { email, password } = req.body;
      if (!email || email === undefined || !password || password === undefined) {
        const error = new Error("Invalid email OR password input");
        throw error;
      }
      const query = {
        where: {
          email
        }
      };
      const user = await db.User.findOne(query);
      if (!user) {
        return res.status(400).json({ success: false, msg: 'Authentication failed. User not found.' });
      }

      if (bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign(user.toJSON(), process.env.SECRET_KEY, { expiresIn: '10m' });
        return res.status(200).json(
          { success: true, token: token }
        );
      }

      return res.status(401).json({ msg: 'Unauthorized' });
    }
    catch (error) {
      res.status(401).send({ success: false, msg: 'Authentication failed. Wrong password.' });
    }
  }


  async getall(req, res) {
    try {
      const users = await db.User.findAll();
      return res.status(200).json({ users });
    }
    catch (error) {
      console.error("UsersController.getAll error: ", { error });
      return processError(error, req, res);
    }


  }

};




export default new Auth();