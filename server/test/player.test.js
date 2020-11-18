const chai = require('chai')
const request = require('supertest')

const app = require('./test-server')
const conn = require('../database')

describe('GET /api/players? and /api/download queries', () => {
    before((done) => {
        conn.connect()
            .then(() => done())
            .catch(err => done(err))
    })

    after((done) => {
        conn.close()
            .then(() => done())
            .catch(err => done(err))
    })

    it('Searching for Derrick Henry', () => {
        return request(app).get('/api/players?search=Derrick%20Henry')
        .then(response => {
            chai.assert.equal(response.body.data[0]['Player'], 'Derrick Henry')
            chai.assert.equal(response.body.data[0]['Team'], 'TEN')
            chai.assert.equal(response.body.data[0]['Pos'], 'RB')
        })
    })

    it('Sort by Rushing yards with Zeke having the most rushing yards', () => {
        return request(app).get('/api/players?sort=yds')
        .then(response => {
            chai.assert.equal(response.body.data[0]['Player'], 'Ezekiel Elliott')
            chai.assert.equal(response.body.data[0]['Team'], 'DAL')
            chai.assert.equal(response.body.data[0]['Pos'], 'RB')
        })
    })

    it('Sort by TD with Blount having the most TD', () => {
        return request(app).get('/api/players?sort=td')
        .then(response => {
            chai.assert.equal(response.body.data[0]['Player'], 'LeGarrette Blount')
            chai.assert.equal(response.body.data[0]['Team'], 'NE')
            chai.assert.equal(response.body.data[0]['Pos'], 'RB')
        })
    })

    it('Sort by longest rush with Crowell having the longest rush', () => {
        return request(app).get('/api/players?sort=lng')
        .then(response => {
            chai.assert.equal(response.body.data[0]['Player'], 'Isaiah Crowell')
            chai.assert.equal(response.body.data[0]['Team'], 'CLE')
            chai.assert.equal(response.body.data[0]['Pos'], 'RB')
        })
    })

    // sort and search
    it('Sort by Joe and sort by most td', () => {
        return request(app).get('/api/players?sort=yds&search=Joe')
        .then(response => {
            chai.assert.equal(response.body.data[0]['Player'], 'Joe Flacco')
            chai.assert.equal(response.body.data[0]['Team'], 'BAL')
            chai.assert.equal(response.body.data[0]['Pos'], 'QB')
        })
    })

    // csv
    it('Sort by Joe and sort by most td and convert to csv', () => {
        return request(app).get('/api/download?search=joe&sort=yds')
        .then(response => {
            chai.expect(response.res.text).to.include('Joe Flacco')
            chai.expect(response.res.text).to.include('Joe Banyard')
            chai.expect(response.res.text).to.include('Joe Kerridge')
        })
    })
})