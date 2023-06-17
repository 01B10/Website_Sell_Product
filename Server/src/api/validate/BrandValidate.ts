import Joi from "joi";

const BrandValidate = Joi.object({
  name: Joi.string().required(),
  slug: Joi.string().required(),
});

export default BrandValidate;
