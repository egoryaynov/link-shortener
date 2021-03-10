const {Router} = require('express')
const config = require('config')
const Link = require('../models/Link')
const auth = require('../middleware/auth.middleware')
const shortid = require('shortid')
const router = Router()

/* /api/link/generate */
router.post('/generate', auth, async (req, res) => {
    try {
        const baseUrl = config.get('baseUrl')
        const {from} = req.body

        Link.findOne({from}, async (error, result) => {
            if (result) {
                return res.json({link: result})
            } else {
                const code = shortid.generate()
                const to = baseUrl + '/t/' + code
                const link = new Link({
                    code, to, from, owner: req.user.userId
                })

                await link.save()

                return res.status(201).json({link})
            }
        })
    } catch (e) {
        return res.status(500).json({message: 'Ошибка при генерации ссылки, попробуйте снова'})
    }
})

/* /api/link/ */
router.get('/', auth, async (req, res) => {
    try {
        Link.find({owner: req.user.userId}, (error, result) => {
            if (error) {
                throw error
            }

            res.json(result)
        })
    } catch (e) {
        return res.status(500).json({message: 'Ошибка при получении ссылок, попробуйте снова'})
    }
})

/* /api/link/:id */
router.get('/:id', auth, async (req, res) => {
    try {
        Link.findById(req.params.id, (error, result) => {
            if (error) {
                throw error
            }

            res.json(result)
        })
    } catch (e) {
        return res.status(500).json({message: 'Ошибка при получении ссылки по id, попробуйте снова'})
    }
})

module.exports = router