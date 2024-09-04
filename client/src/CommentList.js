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
        return <li key={comment.id}>{comment.content}</li>
    })

    return <ul>{renderedComments}</ul>
}