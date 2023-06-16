const express = require('express');
const router = express.Router()
const Student = require('../models/student');

router.get('/', async (req, res) => {
    try {
        const students = await Student.find() ;
        if(!students){
            return res.status(500).json({ message : 'can`t get data'})
        }else{
            return res.status(200).json(students)
        }
    } catch (e) {
        res.status(404).json({ message : "error occured"})
        console.log(e)
    }
})

router.get('/studentsProfile', async (req, res) => {
    const { email, password } = req.body
    console.log(req.body)
    const students = await Student.findOne({ email: email }, { password: password })
    res.json(students)
})

router.post('/studentsLogin', async (req, res) => {
    try {
        // console.log(req.body)
        const { email, password } = req.body;
        // console.log(email, password)
        const student = await Student.findOne({ email, password })

        // console.log(student)
        
        // const student = await Student.findOne({ email: email }, { password: password })
        // res.json(students)
        if (!student) {
            return res.status(404).json({ message: 'User not found' });
        }else{
            res.status(200).json({ student })
        }

    } catch (e) {
        // console.log(e)
        res.status(500).json({ message: 'An error occurred' })
    }

})

router.post('/studentsRegistration', async (req, res) => {
    console.log("jaffa")
    const student = new Student({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword
    })

    try {
        if (student.password === student.confirmPassword) {
    
            console.log("password successfull")
            const std = await student.save() // add here server response status and object on success
            // res.json(s1)
            if (!std) {
                return res.status(404).json({ message: 'User not saved' });
            }else{
                return res.status(200).json({ std })
            }
        }
    } catch (err) {
        // res.send('error')
        res.status(404).json({ message : 'user not saved due password mismatch' })
    }
})

router.patch('/:id', async (req, res) => {
    try {
        const student = await Student.findById(req.params.id)
        person.email = req.body.email
        person.passowrd = req.body.password
        const p1 = await person.save()
        res.send(p1)
    } catch (err) {
        res.send('error')
    }
})


module.exports = router ;