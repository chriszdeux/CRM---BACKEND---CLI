export const generateRandomCode = () => {
  const min = 100000;
  const max = 999999;
  const random =  Math.floor(Math.random() * (max - min + 1)) + min;
  return  random.toString()
}

export const generateReferenceCode = () => {
  const data ='ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';

  for (let i = 0; i < 12; i++) {
    const randomIndex = Math.floor(Math.random() * data.length);
    code += data[randomIndex];
    data.slice(randomIndex, 1); 
    
  }
  return code.replace(/(.{4})/g, '$1-').slice(0, -1);
}