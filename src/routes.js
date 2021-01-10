
import express from 'express';
import authController from './controllers/auth.controller';
import auth from './middlewere/auth';
const {validateRegistrationBody,validateLoginBody, validate} = require('./middlewere/validation');
import verify from './middlewere/verify';
export default function setRoutes(app) {

    const router = express.Router();

  
    router.route('/register').post(validateRegistrationBody(),validate,verify.checkDuplicateEmail,authController.register);
    router.route('/login').post( validateLoginBody(),authController.login);
    router.route('/getall').get(auth.verifyToken,authController.getall);



app.use('/', router);
} 