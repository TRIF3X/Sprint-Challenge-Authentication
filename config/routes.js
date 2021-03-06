const axios = require('axios');
const jwt = require('jsonwebtoken')
const secret = require('../_secrets/keys').jwtKey;
const bcrypt = require('bcryptjs')
const db = require('../database/dbConfig.js')

const { authenticate } = require('./middlewares');

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
  server.get('/', test)
};

function test(req, res) {
  res.send('im working')
}

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username
  }

  const options = {
    expiresIn: '1hr'
  }

  return jwt.sign(payload, secret, options)
}

function register(req, res) {
  const creds = req.body;

  const hash = bcrypt.hashSync(creds.password, 14)
  creds.password = hash;

  db('users')
    .insert(creds)
    .then(ids => {
      const id = ids[0]
      res.status(201).json({ newUserId: id })
    })
    .catch(err => {
      res.status(500).json({ message: 'error', err })
    })
}

function login(req, res) {
  const creds = req.body

  db('users')
    .where({ username: creds.username })
    .first()
    .then(user => {
      if(user && bcrypt.compareSync(creds.password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({ welcome: user.username, token })
      } else {
        res.status(401).json({ message: 'Error logging in' })
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'server error', err })
    })
}

function getJokes(req, res) {
  axios
    .get(
      'https://safe-falls-22549.herokuapp.com/random_ten'
    )
    .then(response => {
      res.status(200).json(response.data);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}
