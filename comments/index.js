const express = require('express')
const bodyParser = require('body-parser')
const {randomBytes} = require('crypto')
const cors = require('cors')
const axios = require('axios')


const app = express()
app.use(bodyParser.json())
app.use(cors())

const commentsByPostId = {

}

app.get('/posts/:id/comments', (req, res)=>{
    res.send(commentsByPostId[req.params.id] || [])
})

app.post('/posts/:id/comments', async (req, res)=>{
    const commentId = randomBytes(4).toString('hex')
    const {content} = req.body

    //check
    const comments = commentsByPostId[req.params.id] || []
    // append
    comments.push({
        id: commentId,
        content
    })
    // update memory
    commentsByPostId[req.params.id] = comments

    //emit event to event bus
    await axios.post('http://localhost:4005/events', {
        type: 'CommentCreated',
        data: {
            id:commentId,
            content,
            postId: req.params.id
        }
    })

    res.status(201).send(comments)
})

app.listen(4001, ()=>{
    console.log('listening on 4001')
})