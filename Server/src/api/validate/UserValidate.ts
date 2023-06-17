import Joi from "joi";

const UserValidate = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().exist().required(),
  phone: Joi.string().required(),
  password: Joi.string().required(),
}).unknown(true);

export default UserValidate;
