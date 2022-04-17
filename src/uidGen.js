const generateUid = () => {
  const randomNo = Math.floor(Math.random() * 999) + 2;
  return randomNo;
};

export { generateUid };
