const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const axios = require('axios')

const app = express()
app.use(bodyParser.json())
app.use(cors())


const posts = {}

app.get('/posts', (req, res) => {
    res.send(posts)
})

app.post('/events', (req, res) => {
    const {type, data} = req.body

    handleEvent(type, data)

    console.log(type, 'event recieved', posts)
    res.send({})
})

const handleEvent = (type , data) => {
    if(type == 'PostCreated'){
        const {id, title} = data
        posts[id] = {id, title, comments: []}
    }

    if(type == 'CommentCreated'){
        const{id, content, postId, status} = data

        const post = posts[postId]
        post.comments.push({id, content, status})
    }

    if(type == 'CommentUpdated'){
        const {postId, id, status, content} = data

        const post = posts[postId]
        const comment = post.comments.find(comment => {
            return comment.id == id
        })

        comment.status = status
        comment.content = content
    }
}

app.listen(4002, async () => {
    console.log('listening on port', 4002)

    // get events from event bus eventStore
    const res = await axios.get('http://event-bus-srv:4005/events')
    //log events
    for(let event of res.data){
        console.log('processing event: ', event.type)
        //handle event
        handleEvent(event.type, event.data)
    }
})