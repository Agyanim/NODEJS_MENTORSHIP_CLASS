import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

const secrete = process.env.JWT_SECRET

const salt = bcrypt.genSaltSync(10)
const hash = bcrypt.hashSync("password", salt)

const valid = bcrypt.compareSync("password", hash)

// console.log(valid)

const payload = {
    username: "eazylink",
    password: "password"
}

// const token = jwt.sign(payload, secrete, {expiresIn: '30s'}) //without callback

// with callback
// jwt.sign(payload, secrete, {expiresIn: '30s'}, (err, token)=>{
//     if (err) throw err
//     console.log(token)
// })

const genToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImVhenlsaW5rIiwicGFzc3dvcmQiOiJwYXNzd29yZCIsImlhdCI6MTY5MjIwNTAyOCwiZXhwIjoxNjkyMjA1MDU4fQ.gVDOY3lub5trG-XOQPAzVohpdp0SMkb7WbXcY7BNqNA"
const decode = jwt.verify(genToken, secrete)
console.log(decode)

