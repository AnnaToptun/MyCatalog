import { Box, FormGroup, TextField } from '@mui/material'
import { React,  useContext, useState } from 'react'
import { CardsUserContext } from '../../../Context/CardsUserProvider'
import { Buttons } from '../../../UI/button/Buttons'
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';

export const FormComment = ({bookCurrent}) => {
    const {commentIdBooks, setCommentIdBooks, userCurrent, addBookComment} = useContext(CardsUserContext)
    
    const [comment, setComment] = useState({
        id: Date.now(),
        userId: userCurrent.id,
        comment: ''
    })

    const newComment = (value)=>{
        setComment({...comment, comment: value })
    }

    const createCommentBook = ()=>{
        setCommentIdBooks([...commentIdBooks, ...bookCurrent.comments])
        setComment({...comment, comment: ''})
        addBookComment(bookCurrent.id, bookCurrent.comments, comment)
    }
 
    return (
        <FormGroup className='comment-form'>
            <TextField
                value={comment.comment}
                type='text'
                placeholder='text comment'
                onChange={(e)=>newComment(e.target.value)}
                className='text-field'
            />
            <Box className='form-smile'>
                <InsertEmoticonIcon />
            </Box>
            <Buttons onClick={createCommentBook}>Create Comment</Buttons>        
        </FormGroup>
    )
}
