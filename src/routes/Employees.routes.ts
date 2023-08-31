import express from 'express';
import { Login, logout, createNewEmployee, getEmployees } from '../controllers';
import { addEmployeeAuthToken, verifyEmployeeSession , encryptingPassword, verifyEmployeeEmail, validateEmployeeCredentials, isEmployeeSessionActive, validateEmployeeToken } from '../middlewares';

const router = express.Router();

router.get('/',  validateEmployeeToken ,getEmployees);
router.post('/new', verifyEmployeeEmail, encryptingPassword, createNewEmployee)
router.post('/login', validateEmployeeCredentials, verifyEmployeeSession , Login)
router.post('/logout', validateEmployeeToken, isEmployeeSessionActive, logout)

export default router;