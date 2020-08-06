require('../src/db/mongoose')
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const RegistrationData = require('./model/ss_data')
const ITMilanUtsav = require('./model/itmlan')

const app = express()
const port = process.env.PORT || 3000
const name = 'RSS IT Milan MLP Khand'

// Define paths for express config.
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

var isUserAuthenticated = false

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: "RSS Utsav",
        name: name
    })
})

app.get('/registration', (req, res) => {

    var mName = req.query.milan
    var nextSlot = 0
    var timeslot = ""

    RegistrationData.countDocuments({ milan: mName }).then((count) => {
        nextSlot = Math.floor(count / 5) * 10
    }).catch((e) => {
        res.status(500).send({ e })
    }).then(() => {
        ITMilanUtsav.findOne({ milan: mName }).then((data) => {
            console.log('From Config: ' + (data.utsavStartTime))
            var newTimeslot = new Date(data.utsavStartTime)
            newTimeslot.setMinutes(newTimeslot.getMinutes() + nextSlot)
            console.log('Updated time: ' + newTimeslot.toString())
            timeslot = newTimeslot.toString()
        }).catch((e) => {
            res.status(500).send({ e })
        }).then(() => {
            var sgpuDate = new Date(timeslot)
            console.log('Timeslot allotted: ' + sgpuDate.toString())

            const user = new RegistrationData({
                name: req.query.name,
                contact: req.query.contact,
                valay: req.query.valay,
                milan: req.query.milan,
                timeslot: sgpuDate.toString()
            })
            user.save().then(() => {
                res.status(201).send({ user })
            }).catch((e) => {
                res.status(500).send({ e })
            })
        })
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About RSS Utsav',
        name: name
    })
})

app.get('/registrations', async (req, res) => {
    var ssDataList
    ssDataList = await RegistrationData.find({})
    ssDataList.forEach((ssData) => {
        let uday = new Date(ssData.timeslot.toString())
        ssData.timeslot = uday.toLocaleDateString() + ' ' + uday.toLocaleTimeString()
    })

    try {
        res.render('registrations', {
            title: 'RSS Utsav',
            name: name,
            data: JSON.stringify(ssDataList)
        })
    } catch (e) {
        res.render('errorHandler', {
            title: '404',
            name: name,
            errorMessage: 'Data not found!'
        })
    }

})

app.get('/registrations/:id', async (req, res) => {
    var ssDataList = await RegistrationData.findOne(req.params.id)

    if (!ssDataList) {
        console.log('Data not found!')
    }

    console.log(ssDataList)
    try {
        if (ssDataList) {
            res.render('registrations', {
                title: 'RSS Utsav',
                name: name,
                data: ssDataList
            })
        }

    } catch (e) {
        res.render('errorHandler', {
            title: '404',
            name: name,
            errorMessage: e
        })
    }
})

app.get('/login', (req, res) => {
    res.render('login', {
        title: 'RSS Utsav',
        name: name
    })
})

app.get('/adminlogin', (req, res) => {
    if (req.query.username === 'admin' && req.query.password === 'sgpu') {
        res.send({ message: 'login success!' })
        isUserAuthenticated = true;
    } else {
        res.status(404).send({ error: 'login failed!' })
    }
})

app.get('/admin', (req, res) => {
    if (!isUserAuthenticated) {
        return res.render('index', {
            title: 'RSS Utsav',
            name: name
        })
    }

    res.render('admin', {
        title: 'RSS Utsav',
        name: name
    })
})

app.get('/adminconfig', async (req, res) => {

    // const prakhand = req.query.pName
    // const khand = req.query.kName
    // const valay = req.query.valay
    // const milan = req.query.mName
    const sTime = new Date(req.query.startTime).toLocaleString()
    const eTime = new Date(req.query.endTime).toLocaleString()
    // const venue = req.query.venue

    // var startTime = (sTime.toLocaleDateString() + ' ' + sTime.toLocaleTimeString()).toString()
    // var endTime = (eTime.toLocaleDateString() + ' ' + eTime.toLocaleTimeString()).toString()

    console.log(sTime)
    console.log(eTime)

    // var ssData = RegistrationData.findById(req.query.mName)

    // if (!ssData) {

    // }

    const configITMilan = new ITMilanUtsav({
        prakhand: req.query.pName,
        khand: req.query.kName,
        valay: req.query.vName,
        milan: req.query.mName,
        utsavVenue: req.query.uVenue,
        utsavStartTime: sTime,
        utsavEndTime: eTime
    })

    try {
        await configITMilan.save().then(() => {
            console.log('Saved config')
            res.status(201).send({ response: 'Configuration saved!' })
        }).catch((e) => {
            console.log('Error! Failed to save.', e)
            res.status(500).send({ response: 'Failed to save configuration!' })
        })
    } catch (e) {
        console.log('server issues:')
        res.status(500).send({ response: e })
    }

})

app.get('/logout', (req, res) => {
    isUserAuthenticated = false
    res.render('index', {
        title: 'RSS Utsav',
        name: name
    })
})

app.get('*', (req, res) => {
    res.render('errorHandler', {
        title: '404',
        errorMessage: 'Page not found',
        name: name
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})