import Joi from "joi";

const images = Joi.object({
  base_url: Joi.string().required(),
  is_gallery: Joi.boolean(),
  label: Joi.string(),
  large_url: Joi.string(),
  medium_url: Joi.string(),
  position: Joi.string(),
  small_url: Joi.string(),
  thumbnail_url: Joi.string(),
});

const specifications = Joi.object({
  name: Joi.string().required(),
  attributes: Joi.array()
    .items(
      Joi.object({
        code: Joi.string().required(),
        name: Joi.string().required(),
        value: Joi.string().required(),
      })
    )
    .min(1)
    .required(),
});

const DeviceValidate = Joi.object({
  name: Joi.string().required(),
  price: Joi.number(),
  original_price: Joi.number().required(),
  description: Joi.string().required(),
  shortdescription: Joi.string().required(),
  images: Joi.array().items(images).min(1).required(),
  brand: Joi.string().required(),
  specifications: Joi.array().items(specifications).min(1).required(),
}).unknown(false);

export default DeviceValidate;
