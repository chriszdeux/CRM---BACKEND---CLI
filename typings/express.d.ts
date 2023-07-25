// types.ts

import { SessionData } from 'express-session';

interface CustomSessionData extends SessionData {
  employeeId?: string;
  isLogged?: boolean
}
