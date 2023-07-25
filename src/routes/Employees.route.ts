import express from 'express';
import { Login, Logout, createNewEmployee, getEmployees } from '../controllers';
import { addAuthToken, checkLogin, encryptingPassword, validateCredentials, verifyEmailExist, verifyToken } from '../middlewares';

const router = express.Router();

router.get('/', verifyToken ,getEmployees);
router.post('/new', verifyEmailExist, encryptingPassword, addAuthToken, createNewEmployee)
router.post('/login', checkLogin, validateCredentials, Login)
router.post('/logout',  Logout)

export default router;
