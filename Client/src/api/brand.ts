import instance from ".";

const Brand = (url: string, data: FormData) => {
  return instance.post(url, data);
};

const getBrand = (url: string) => {
  return instance.get(url);
};

export { Brand, getBrand };
