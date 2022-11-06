import { FormGroup, TextField } from '@mui/material'
import { React,  useContext, useState } from 'react'
import { CardsUserContext } from '../../../Context/CardsUserProvider'
import { Buttons } from '../../../UI/button/Buttons'
import {StateParamsContext} from '../../../Context/StateParamsProvider';

export const FormComment = ({bookCurrent}) => {
    const {commentIdBooks, setCommentIdBooks,  updateArrays} = useContext(CardsUserContext)
    const {userCurrent} = useContext(StateParamsContext)
    
    const [comment, setComment] = useState({
        userId: userCurrent.id,
        comment: ''
    })

    const newComment = (value)=>{
        setComment({...comment, comment: value, id: Date.now(), })
    }

    const createCommentBook = ()=>{
        setCommentIdBooks([...commentIdBooks, {...comment }])
        console.log({...comment})
        const allComments = [...commentIdBooks, {...comment}]
        updateArrays('Books', bookCurrent.id, {comments: allComments})
        setComment({...comment, comment: ''})
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
            <Buttons onClick={createCommentBook}>Create Comment</Buttons>        
        </FormGroup>
    )
}
