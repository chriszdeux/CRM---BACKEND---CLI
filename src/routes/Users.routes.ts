import express from 'express';
import { addUserAuthToken, encryptingPassword, isUserSessionActive, validateUserCredentials, validateUsersToken, verifyUserEmail, verifyUserSession } from '../middlewares';
import { loginUser, createNewUser, logoutUser, resetUserPassword, validateAccount } from '../controllers';
const router = express.Router();

router.get('/',);
router.post('/new', verifyUserEmail, encryptingPassword ,createNewUser)
router.post('/login', verifyUserSession, validateUserCredentials, loginUser)
router.post('/logout/:id', validateUsersToken, isUserSessionActive, logoutUser)
router.put('/reset-password', validateUsersToken, validateUserCredentials, resetUserPassword )
router.put('/confirm-account/:id', validateAccount)
export default router;
