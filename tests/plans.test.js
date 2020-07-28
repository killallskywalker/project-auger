const mongoose = require('mongoose');
const app = require('./../server') 
const supertest = require('supertest')
const request = supertest(app)
const snsPublisher  = require('../helper/index');
const planData = require('./../seeder/plan');
const Plan = require('./../model/Plan');

describe('Plans route test', () => {
    
    // By using mongoose.connect
    beforeAll(async () => {
        await mongoose.connect(global.__MONGO_URI__, { useNewUrlParser: true, useCreateIndex: true }, (err) => {
            Plan.create(planData[0].documents);
            if (err) {
                console.error(err);
                process.exit(1);
            }
        });
    });

    it('create and successfully send query for quotation when passing require data', async (done) => {
        snsPublisher.publishToSnS = jest.fn();
        request.post('/plans')
        .send({email:"skywalker@gmail.com",name:"skywalker",category:["tunda","e-hailing"]})
        .set('Accept', 'application/json')
        .end((err,res) => {
            expect(res.status).toBe(200);
            expect(res.body.success).toBe(true);
            expect(res.body.message).toBe('Enquiry success , we will send quotation through email');
            done();
        })
    });
    
    it('cannot create and send query for quotation when passing not passing name data and return proper error to require data', async (done) => {
        request.post('/plans')
        .send({email:"skywalker@gmail.com"})
        .set('Accept', 'application/json')
        .end((err,res) => {
            expect(res.status).toBe(400);
            expect(res.body.error).toBe('Bad Request');
            done();
        })
    });

    it('cannot create and send query for quotation when passing wrong category and return proper error that refer to category', async (done) => {
        request.post('/plans')
        .send({email:"skywalker@gmail.com",name:"skywalker",category:["tundas","e-hailing"]})
        .set('Accept', 'application/json')
        .end((err,res) => {
            expect(res.status).toBe(400);
            expect(res.body.error).toBe('Bad Request');
            expect(res.body.details.body[0].message).toBe(`"category[0]" must be one of [e-hailing, tunda, servis, gantian]`);
            done();
        })
    });

    it('can retrieve all plans available', async (done) => {
        request.get('/plans')
        .set('Accept', 'application/json')
        .end((err,res) => {
            expect(res.status).toBe(200);
            expect(res.body.success).toBe(true);
            expect(res.body.message).toBe('Retrieve success');
            expect(res.body.data).not.toBeNull();
            done();
        })
    });

    it('can retrieve specific plans available', async (done) => {
        const specificId = await Plan.findOne();
        request.get(`/plans/${specificId._id}`)
        .send({email:"skywalker@gmail.com",name:"skywalker",category:["tunda","e-hailing"]})
        .set('Accept', 'application/json')
        .end((err,res) => {
            expect(res.status).toBe(200);
            expect(res.body.success).toBe(true);
            expect(res.body.message).toBe('Retrieve success');
            expect(res.body.data._id).toBe(specificId._id.toString())
            done();
        })
    });

    it('cannot retrieve specific plan if using non existence id and return proper error', async (done) => {
        request.get(`/plans/5f1ff5d243f57920f74478d5`)
        .set('Accept', 'application/json')
        .end((err,res) => {
            expect(res.status).toBe(404);
            expect(res.body).toEqual({ success: false, message: 'Not found', data: null });
            done();
        })
    });
})