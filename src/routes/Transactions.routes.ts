import express from 'express';
import { ValidateUsersToken, parseTransactionBody } from '../middlewares';
import { NewTransaction } from '../controllers';

const router = express.Router();

router.get('/', ValidateUsersToken)
router.post('/start', ValidateUsersToken, parseTransactionBody, NewTransaction)
router.post('/sell', ValidateUsersToken)
router.post('/convert', ValidateUsersToken)
router.post('/send', ValidateUsersToken)
router.post('/donate', ValidateUsersToken)

export default  router