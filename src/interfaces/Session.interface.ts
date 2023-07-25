export interface SessionInterface  {
  expires: string
  session: Session
}

interface Session {
  type: string,
}