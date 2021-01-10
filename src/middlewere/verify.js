
import db from "../../db/models/";

class ValidationRules  {

    async checkDuplicateFullName(req, res, next) {
      try {
        const user = await db.User.findOne({ where: { fullName: req.body.fullName } });
        if (user) {
          return res.json({ success: false, msg: 'fullName already exists! ' });
        }
        return next();
      }
      catch (error) {
        return res.status(400).json(error);
      }
    }
  
    async checkDuplicateEmail(req, res, next) {
        try {
          const user = await db.User.findOne({ where: { email: req.body.email } });
          if (user) {
            return res.json({ success: false, msg: 'Email already exists! ' });
          }
          return next();
        }
        catch (error) {
          return res.status(400).json(error);
        }
      }
  
  }
  export default new ValidationRules();