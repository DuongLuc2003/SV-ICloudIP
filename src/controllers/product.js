import fs from 'fs';
import Joi from 'joi';
import Product from '../models/product.js';

import mongoose from 'mongoose';

// Error Handler Function
const errorHandler = (err, res) => {
  console.error(err);
  res.status(500).json({
    message: 'Có lỗi xảy ra',
  });
};

export const getAllProducts = async function (req, res) {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    errorHandler(err, res);
  }
};

export const getProductById = async function (req, res) {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({
        message: 'Không tìm thấy sản phẩm',
      });
    }
    res.status(200).json(product);
  } catch (err) {
    errorHandler(err, res);
  }
};

export const addProductPage = function (req, res) {
  const html = fs.readFileSync('./pages/add.html', 'utf-8');
  res.send(html);
};

const schema = Joi.object({
  productName: Joi.string().required(),
  imgUrl: Joi.string(),
  category: Joi.string(),
  price: Joi.number().min(0),
  shortDesc: Joi.string(),
  description: Joi.string(),
  reviews: Joi.array().items(
    Joi.object({
      rating: Joi.number().min(0).max(5),
      text: Joi.string(),
    })
  ),
  avgRating: Joi.number().min(0).max(5),
  name: Joi.string(),
});

export const createProduct = async (req, res) => {
  try {
    const { productName, imgUrl, category, price, shortDesc, description, reviews, avgRating, name } = req.body;

    const newProduct = await Product.create({
      productName,
      imgUrl,
      category,
      price,
      shortDesc,
      description,
      reviews,
      avgRating,
      name,
    });

    res.status(201).json({
      message: 'Tạo mới sản phẩm thành công',
      data: newProduct,
    });
  } catch (err) {
    errorHandler(err, res);
  }
};

export const updateProduct = async function (req, res) {
  const { id } = req.params;
  try {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (!error) {
      const product = await Product.findByIdAndUpdate(id, req.body);
      if (!product) {
        return res.status(404).json({
          message: 'Không tìm thấy sản phẩm',
        });
      }
      res.status(200).json({
        message: 'Cập nhật sản phẩm thành công',
        data: product,
      });
    } else {
      const messages = error.details.map((item) => item.message);
      res.status(400).json({
        message: messages,
      });
    }
  } catch (err) {
    errorHandler(err, res);
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Product.findByIdAndDelete(id);
    if (data) {
      res.status(200).json({
        message: 'Xoá sản phẩm thành công',
        data: data,
      });
    } else {
      res.status(404).json({
        message: 'Bản ghi không tồn tại',
      });
    }
  } catch (err) {
    errorHandler(err, res);
  }
};

export const searchProducts = async (req, res) => {
  const { keyword } = req.query;
  try {
    const products = await Product.find({ $text: { $search: keyword } });
    res.status(200).json(products);
  } catch (err) {
    errorHandler(err, res);
  }
};
