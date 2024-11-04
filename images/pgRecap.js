//The simplest possible way to connect, query, and disconnect is with async/await:
import pg from 'pg'

const { Client } = pg
const client = new Client()
await client.connect()
 
const res = await client.query('SELECT $1::text as message', ['Hello world!'])
console.log(res.rows[0].message) // Hello world!
await client.end()

//For the sake of simplicity, these docs will assume that the methods are successful. In real life use, make sure to properly handle errors thrown in the methods. A try/catch block is a great way to do so:

import pg from 'pg'
const { Client } = pg
const client = new Client()
await client.connect()
 
try {
   const res = await client.query('SELECT $1::text as message', ['Hello world!'])
   console.log(res.rows[0].message) // Hello world!
} catch (err) {
   console.error(err);
} finally {
   await client.end()
}

//If you prefer a callback-style approach to asynchronous programming, all async methods support an optional callback parameter as well:

import pg from 'pg'
const { Client } = pg
const client = new Client()
 
client.connect((err) => {
   client.query('SELECT $1::text as message', ['Hello world!'], (err, res) => {
     console.log(err ? err.stack : res.rows[0].message) // Hello World!
     client.end()
   })
})