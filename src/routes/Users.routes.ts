import express from 'express';
import {  EncryptingPassword, IsUserSessionActive, StartTransaction, ValidateRequest, ValidateUserCredentials, ValidateUsersToken, VerifyUserEmail, VerifyUserSession } from '../middlewares';
import { LoginUser, CreateNewUser, LogoutUser, ResetUserPassword, ValidateAccount, BuyCrypto } from '../controllers';
const router = express.Router();

router.get('/',);
router.post('/new', VerifyUserEmail, EncryptingPassword ,CreateNewUser)
router.post('/login', ValidateUserCredentials, LoginUser)
// router.post('/login', VerifyUserSession, ValidateUserCredentials, LoginUser)
router.post('/logout/:id', ValidateUsersToken, IsUserSessionActive, LogoutUser)
router.put('/reset-password', ValidateUsersToken, ValidateUserCredentials, ResetUserPassword )
router.put('/confirm-account/:id', ValidateAccount)

router.post('/buy-crypto', ValidateUsersToken, ValidateRequest, StartTransaction, BuyCrypto)

export default router;
