import React from "react";
// import axios from 'axios'

export default ({comments}) => {
    // const [comments, setComments] = useState([])

    // const fetchComments = async () => {
    //     const res = await axios.get(`http://localhost:4001/posts/${postId}/comments`)
    //     setComments(res.data)
    // }

    // useEffect(() => {
    //     fetchComments()
    // }, []) //runs one time only 

    //display comments
    const renderedComments = comments.map(comment => {
        let content

        if(comment.status == 'approved'){
            content = comment.content
        }
        if(comment.status == 'pending'){
            content='this comment is awaiting moderation'
        }
        if(comment.status == 'rejected'){
            content = 'this comment is rejected'
        }

        return <li key={comment.id}>{content}</li>
    })

    return <ul>{renderedComments}</ul>
}