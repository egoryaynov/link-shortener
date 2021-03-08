const {Router} = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const {check, validationResult} = require('express-validator')
const User = require('../models/User')

const router = Router()

/* /api/auth/register */
router.post(
    '/register',
    [
        check('email', 'Некорректный email').isEmail(),
        check('password', 'Минимальная длина пароля 6 символов').isLength({min: 6})
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректные данные при регистрации'
                })
            }

            const {email, password} = req.body
            const candidate = await User.findOne({email})

            if (candidate) {
                return res.status(400).json({message: 'Пользователь с таким email уже существует'})
            }

            const hashedPassword = await bcrypt.hash(password, 12)
            const user = new User({email, password: hashedPassword})

            await user.save()

            return res.status(201).json({message: 'Пользователь успешно создан'})
        } catch (e) {
            return res.status(500).json({message: 'Ошибка при регистрации, попробуйте снова'})
        }
    })

/* /api/auth/login */
router.post(
    '/login',
    [
        check('email', 'Некорректный email').normalizeEmail().isEmail(),
        check('password', 'Минимальная длина пароля 6 символов').isLength({min: 6})
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректные данные при входе в систему'
                })
            }

            const {email, password} = req.body
            const user = await User.findOne({email})

            if (!user) {
                return res.status(400).json({message: 'Такого пользователя не существует'})
            }

            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) {
                return res.status(400).json({message: 'Неверный пароль, попробуйте снова'})
            }

            const token = jwt.sign(
                {userId: user.id},
                config.get('jwtSecret'),
                {expiresIn: '1h'}
            )

            res.status(200).json({token, userId: user.id})
        } catch (e) {
            return res.status(500).json({message: 'Ошибка при входе в систему, попробуйте снова'})
        }
    })

module.exports = router