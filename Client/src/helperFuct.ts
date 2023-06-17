const FormatNumber = (price: number) => {
  return Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "vnd",
  }).format(price);
};

function convertToBase64(file: any) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
}

export { FormatNumber, convertToBase64 };
