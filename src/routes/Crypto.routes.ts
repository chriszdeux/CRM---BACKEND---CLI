import express from 'express';
import { CreateNewCoin } from '../controllers';
import { ValidateEmployeeToken, ValidatePermissions } from '../middlewares';

const router = express.Router();

router.post('/create', ValidateEmployeeToken, ValidatePermissions, CreateNewCoin)
router.post('/buy',)

export default  router