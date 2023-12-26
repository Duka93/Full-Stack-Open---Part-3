const express = require('express')
const morgan = require('morgan')
const app = express()

app.use(express.json())
app.use(morgan(':method :url :body'))

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/', function (req, res) {
  res.send('hello, world!')
})


app.get('/api/persons',(request, response)=>{

    response.json(persons)
})

app.get('/info',(request,response)=>{
  const now = new Date()
  const date = now.toLocaleDateString()
  const time = now.toLocaleTimeString()
  response.send(`<p>Phonebook has info for ${persons.length} people</p> 
                 <p>${date + " " + time}<p/>`)
})

app.get(`/api/persons/:id`, (request, response)=>{
    const id = Number(request.params.id)
    const person = persons.find(person=>person.id===id)
    if(person){
      response.json(person)
    }
    else{
      response.status(404).end()
    }
    
})

app.delete('/api/persons/:id',(request,response)=>{
   const id = Number(request.params.id)
   persons = persons.filter(person=>person.id !== id)
   response.status(204).end()
})



app.post('/api/persons',(request, response)=>{
  const id = Math.floor(Math.random()*20)
  const body = request.body

  const test = persons.map(n=>n.name)

  if(!body.name || !body.number){
    return response.status(400).json({
      error:"content missing"
    })
  }
  
  if(test.includes(body.name)){
    return response.status(400).json({
      error:"aaaaaaaaa"
    })
  }

  const person = {
      id:id,
      name:body.name,
      number:body.number,
  }
  persons = persons.concat(person)
  response.json(person)
  morgan.token('body', request => JSON.stringify(request.body))
})


const PORT = 3001

app.listen(PORT)
