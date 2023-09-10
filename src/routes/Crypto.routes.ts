import express from 'express';
import { CreateNewCoin } from '../controllers';
import { ValidateEmployeeToken, ValidatePermissions, ValidateUsersToken } from '../middlewares';
import { GetCryptos } from '../controllers/crypto/GetCryptos.controller';

const router = express.Router();

router.get('/', ValidateUsersToken, GetCryptos)
router.post('/create', ValidateEmployeeToken, ValidatePermissions, CreateNewCoin)

export default  router