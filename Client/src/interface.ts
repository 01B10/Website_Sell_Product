import * as Yup from "yup";

export const formAddSchema = Yup.object({
  name: Yup.string().required("Trường dữ liệu bắt buộc"),
  price: Yup.number().required("Trường dữ liệu bắt buộc"),
  original_price: Yup.number().required("Trường dữ liệu bắt buộc"),
  description: Yup.string().required("Trường dữ liệu bắt buộc"),
  shortdescription: Yup.string().required("Trường dữ liệu bắt buộc"),
  categories: Yup.string().required("Trường dữ liệu bắt buộc"),
  specifications: Yup.string().required("Trường dữ liệu bắt buộc"),
});
// export const formAddSchema = Yup.object({
//   name: Yup.string().required("Trường dữ liệu bắt buộc"),
//   price: Yup.number().required("Trường dữ liệu bắt buộc"),
//   original_price: Yup.number().required("Trường dữ liệu bắt buộc"),
//   description: Yup.string().required("Trường dữ liệu bắt buộc"),
//   categories: Yup.string().required("Trường dữ liệu bắt buộc"),
//   specifications: Yup.string().required("Trường dữ liệu bắt buộc"),
// }).shape({
//   images: Yup.mixed().test("required", "Please select a file", (value: any) => {
//     return value;
//   }),
// });

export type formAdd = Yup.InferType<typeof formAddSchema>;

export const RegisterSchema = Yup.object({
  name: Yup.string().required("Name không được để trống"),
  email: Yup.string().email().required("Email không được để trống"),
  phone: Yup.string().required("Phone không được để trống"),
  password: Yup.string().required("Password không được để trống"),
  cart: Yup.array().optional(),
});

export type RegisterForm = Yup.InferType<typeof RegisterSchema>;

export const LoginSchema = Yup.object({
  email: Yup.string().email().required("Email không được để trống"),
  password: Yup.string().required("Password không được để trống"),
});

export type LoginForm = Yup.InferType<typeof LoginSchema>;

export interface IProduct {
  _id?: string;
  name: string;
  price: number;
  original_price: number;
  description: string;
  shortdescription: string;
  images: {
    base_url: string;
    is_gallery?: boolean;
    label?: string;
    large_url?: string;
    medium_url?: string;
    position?: string;
    small_url?: string;
    thumbnail_url?: string;
  }[];
  brand: string;
  specifications: specifications[];
}

interface specifications {
  name: string;
  attributes: {
    code: string;
    name: string;
    value: string;
  }[];
}

export interface ProductProps {
  data: IProduct;
}

export interface IBrand {
  _id: string;
  name: string;
  slug: string;
}

export interface propData {
  data?: IProduct[];
  setIsSearch?: React.Dispatch<React.SetStateAction<boolean>>;
  isSearch?: boolean;
  setProducts?: React.Dispatch<React.SetStateAction<IProduct[]>>;
}

export interface cartItem {
  _id: {
    _id: string;
    images: [{ base_url: string }];
    name: string;
    original_price: number;
    price: number;
  };
  amount: number;
}

export interface cart {
  cart: {
    _id?: string;
    amount: number;
  }[];
}
