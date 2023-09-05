import express from 'express';
import { login, logout, createNewEmployee, getEmployees } from '../controllers';
import { addEmployeeAuthToken, verifyEmployeeSession , encryptingPassword, verifyEmployeeEmail, validateEmployeeCredentials, isEmployeeSessionActive, validateEmployeeToken } from '../middlewares';

const router = express.Router();

router.get('/',  validateEmployeeToken ,getEmployees);
router.post('/new', verifyEmployeeEmail, encryptingPassword, createNewEmployee)
router.post('/login', validateEmployeeCredentials, verifyEmployeeSession , login)
router.post('/logout', validateEmployeeToken, isEmployeeSessionActive, logout)

export default router;