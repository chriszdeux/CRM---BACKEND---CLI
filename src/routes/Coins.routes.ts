import express from 'express';
import { createNewCoin } from '../controllers';
import { validateEmployeeToken, ValidatePermissions } from '../middlewares';

const router = express.Router();

router.post('/create', validateEmployeeToken, ValidatePermissions, createNewCoin)

export default  router