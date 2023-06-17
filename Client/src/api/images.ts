import instance from ".";
const uploadImage = (url: string, data: FormData | Object, header: Object) => {
  // if(data?.image){

  // }
  return instance.post(url, data, header);
};

export default uploadImage;
