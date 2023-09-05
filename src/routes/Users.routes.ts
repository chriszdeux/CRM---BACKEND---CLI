import express from 'express';
import {  EncryptingPassword, IsUserSessionActive, ValidateUserCredentials, ValidateUsersToken, VerifyUserEmail, VerifyUserSession } from '../middlewares';
import { LoginUser, CreateNewUser, LogoutUser, ResetUserPassword, ValidateAccount } from '../controllers';
const router = express.Router();

router.get('/',);
router.post('/new', VerifyUserEmail, EncryptingPassword ,CreateNewUser)
router.post('/login', VerifyUserSession, ValidateUserCredentials, LoginUser)
router.post('/logout/:id', ValidateUsersToken, IsUserSessionActive, LogoutUser)
router.put('/reset-password', ValidateUsersToken, ValidateUserCredentials, ResetUserPassword )
router.put('/confirm-account/:id', ValidateAccount)
export default router;
