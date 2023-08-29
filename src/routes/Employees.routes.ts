import express from 'express';
import { Login, logout, createNewEmployee, getEmployees } from '../controllers';
import { addEmployeeAuthToken, verifyEmployeeSession , encryptingPassword, verifyEmployeeEmail, verifyToken, validateEmployeeCredentials, isEmployeeSessionActive } from '../middlewares';

const router = express.Router();

router.get('/', verifyToken ,getEmployees);
router.post('/new', verifyEmployeeEmail, encryptingPassword, createNewEmployee)
router.post('/login', validateEmployeeCredentials, verifyEmployeeSession , Login)
router.post('/logout', verifyToken, isEmployeeSessionActive, logout)

export default router;