const {Router} = require('express')
const config = require('config')
const {Link} = require('../models/Link')
const auth = require('../middleware/auth.middleware')
const shortid = require('shortid')
const router = Router()

/* /api/link/generate */
router.post('/generate', auth, async (req, res) => {
    try {
        const baseUrl = config.get('baseUrl')
        const {from} = req.body

        const code = shortid.generate()
        const existing = await Link.findOne({from})

        if (existing) {
            return res.json({link: existing})
        }

        const to = baseUrl + '/t/' + code

        const link = new Link({
            code, to, from, owner: req.user.userId
        })

        await link.save()

        res.status(201).json({link})
    } catch (e) {
        return res.status(500).json({message: 'Ошибка при генерации ссылки, попробуйте снова'})
    }
})

/* /api/link/ */
router.get('/', auth, async (req, res) => {
    try {
        const links = await Link.find({owner: req.user.userId})
        res.json(links)
    } catch (e) {
        return res.status(500).json({message: 'Ошибка при получении ссылок, попробуйте снова'})
    }
})

/* /api/link/:id */
router.get('/:id', auth, async (req, res) => {
    try {
        const link = await Link.findById(req.params.id)
        res.json(link)
    } catch (e) {
        return res.status(500).json({message: 'Ошибка при получении ссылки по id, попробуйте снова'})
    }
})

module.exports = router