import express from 'express';
import { addUserAuthToken, encryptingPassword, isUserSessionActive, validateUserCredentials, verifyUserEmail, verifyUserSession } from '../middlewares';
import { LoginUser, createNewUser, logoutUser } from '../controllers';
const router = express.Router();

router.get('/',);
router.post('/new', verifyUserEmail, encryptingPassword, createNewUser)
router.post('/login', verifyUserSession, validateUserCredentials, LoginUser)
router.post('/logout', isUserSessionActive, logoutUser)
export default router;
