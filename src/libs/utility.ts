export const formatCurrency = (price: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(price);
};

export const toastStyle = {
  borderRadius: "10px",
  background: "#333",
  color: "#fff",
};
