export const totalQuantity = (products) => {
  let total = 0;
  for (let i = 0; i < products.length; i++) {
    total = +total + +products[i].quantity;
  }
  return total;
};
