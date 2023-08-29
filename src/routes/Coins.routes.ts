import express from 'express';
import { verifyToken } from '../middlewares';
import { ValidatePermissions } from '../middlewares/ValidatePermissions.middleware';
import { createNewCoin } from '../controllers';

const router = express.Router();

router.post('/create', verifyToken, ValidatePermissions, createNewCoin)

export default  router