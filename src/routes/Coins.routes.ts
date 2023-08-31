import express from 'express';
import { ValidatePermissions } from '../middlewares/ValidatePermissions.middleware';
import { createNewCoin } from '../controllers';
import { validateEmployeeToken } from '../middlewares';

const router = express.Router();

router.post('/create', validateEmployeeToken, ValidatePermissions, createNewCoin)

export default  router