import fs from 'fs'
import Joi from 'joi'
import Categories from '../models/categories.js'


export const getAllCategories = async function (req, res) {
    try {
        const categories = await Categories.find()
        res.send(categories)
    } catch (err) {
        res.status(500).send({
            message: "Có lỗi xảy ra khi lấy danh sách categories"
        })
    }
}

export const getCategoryById = async function (req, res) {
    const { id } = req.params
    try {
        const category = await Categories.findById(id)
        if (category) {
            res.send(category)
        } else {
            res.status(404).send({
                message: "Không tìm thấy category với ID đã cho"
            })
        }
    } catch (err) {
        res.status(500).send({
            message: "Có lỗi xảy ra khi lấy thông tin category"
        })
    }
}

export const addCategoryPage = function (req, res) {
    const html = fs.readFileSync('./pages/add_category.html', "utf-8")
    res.send(html)
}

const schema = Joi.object({
    name: Joi.string().min(5).required().messages({
        'string.empty': "{{#label}} là trường bắt buộc",
        "string.min": "{{#label}} phải có ít nhất 5 ký tự"
    }),
    description: Joi.string().min(10).required().messages({
        'string.empty': "{{#label}} là trường bắt buộc",
        "string.min": "{{#label}} phải có ít nhất 10 ký tự"
    }),
})

export const createCategory = async function (req, res) {
    try {
        const { error } = schema.validate(req.body, { abortEarly: false })
        if (!error) {
            const category = await Categories.create(req.body)
            res.send({
                message: "Tạo mới category thành công",
                data: category
            })
        } else {
            const messages = error.details.map(item => item.message)
            res.status(400).send({
                message: messages
            })
        }
    } catch (err) {
        res.status(500).send({
            message: "Có lỗi xảy ra khi tạo mới category"
        })
    }
}

export const updateCategory = async function (req, res) {
    const { id } = req.params
    try {
        const { error } = schema.validate(req.body, { abortEarly: false })
        if (!error) {
            const category = await Categories.findByIdAndUpdate(id, req.body)
            if (category) {
                res.send({
                    message: "Cập nhật category thành công",
                    data: category
                })
            } else {
                res.status(404).send({
                    message: "Không tìm thấy category với ID đã cho"
                })
            }
        } else {
            const messages = error.details.map(item => item.message)
            res.status(400).send({
                message: messages
            })
        }
    } catch (err) {
        res.status(500).send({
            message: "Có lỗi xảy ra khi cập nhật category"
        })
    }
}

export const deleteCategory = async (req, res) => {
    const { id } = req.params
    try {
        const category = await Categories.findByIdAndDelete(id)
        if (category) {
            res.send({
                message: "Xoá category thành công",
                data: category
            })
        } else {
            res.status(404).send({
                message: "Không tìm thấy category với ID đã cho"
            })
        }
    } catch (err) {
        res.status(500).send({
            message: "Có lỗi xảy ra khi xoá category"
        })
    }
}