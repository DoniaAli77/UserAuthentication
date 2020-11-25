require('dotenv').config()
const mongoose= require('mongoose')
const studentModel= require('../models/students_model')
const request= require('supertest')
const {app}= require('../app')

mongoose.connect(process.env.DB_URL_TEST,
    { useNewUrlParser: true, useUnifiedTopology: true })
.then(console.log('Successfully Connected to The Test Database'))

beforeEach(async ()=>{
    await studentModel.deleteMany({})

})
test('saving test', async ()=>{

    await request(app).get('/students')
    .expect(404)
    .expect('Content-Type', /text/)
})

test('saving new student', async ()=>{

    const newStudent= new studentModel({name: "Dina", id: 1})
   await newStudent.save()
    await request(app).get('/students')
    .expect(200)
    .expect('Content-Type', /json/)

//     expect(await studentModel.find()).toHaveLength(1)

})


test('saving new student', async ()=>{
   await request(app).post('/students')
   .send({
    name: "New Student",
    id: 3,
    gpaa :3
    })
    .expect(200)
    //.expect('Content-Type, /json/')

    const findresult= await studentModel.find()
    expect(findresult).toHaveLength(1)
    expect(findresult[0].name).toBe("New Student")
    expect(findresult[0].id).toBe(3)

})


















// const mongoose= require('mongoose')
// const request= require('supertest')
// const {app}= require('../app')
// const studentModel= require('../models/students_model')
// mongoose.connect('mongodb+srv://nouraashraaf:nouraashraaf@cluster0.q3aat.mongodb.net/ACLProjectTest?retryWrites=true&w=majority',
//     { useNewUrlParser: true, useUnifiedTopology: true })
// .then(console.log('Successfully Connected to The Database'))

// beforeEach(async ()=>{
//    await studentModel.deleteMany({})
// })
// test('First test', async ()=>{
//     const newStudent= new studentModel({
//         name: "Student 1",
//         id: 1
//     })
//     await newStudent.save() 
//     await request(app).get('/students')
//     .expect(200)
//     .expect('Content-Type', /json/)
// })

// test('adding new student', async ()=>{
//     const result= await request(app).post('/students')
//     .send({name: "New student", id:2})
//     .expect(200)
//     .expect('Content-Type', /json/)

//     const findresult= await studentModel.find()
//     expect(findresult).toHaveLength(1)
//     expect(findresult[0].name).toBe("New student")
//     expect(findresult[0].id).toBe(2)

// })
// test('Getting students with no student in the database', async ()=>{
//     await request(app).get('/students')
//     .expect(404)
//     .expect('Content-Type', /html/)
// })