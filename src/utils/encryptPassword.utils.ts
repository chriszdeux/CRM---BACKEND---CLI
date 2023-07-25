const bcrypt =  require('bcryptjs');

export const encryptPassword = async ( password:string = '' ) => {
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)
  return hashedPassword
}

export const comparePassword = async (password: string, hashedPassword: string) => {
  const passwordMatch = await bcrypt.compare(password, hashedPassword);
  return passwordMatch;
};