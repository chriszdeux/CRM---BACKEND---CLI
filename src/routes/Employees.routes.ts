import express from 'express';
import { Login, Logout, CreateNewEmployee, GetEmployees } from '../controllers';
import { VerifyEmployeeSession , EncryptingPassword, VerifyEmployeeEmail, ValidateEmployeeCredentials, IsEmployeeSessionActive, ValidateEmployeeToken } from '../middlewares';

const router = express.Router();

router.get('/',  ValidateEmployeeToken ,GetEmployees);
router.post('/new', VerifyEmployeeEmail, EncryptingPassword, CreateNewEmployee)
router.post('/login', ValidateEmployeeCredentials , Login)
router.post('/logout', ValidateEmployeeToken, IsEmployeeSessionActive, Logout)

export default router;