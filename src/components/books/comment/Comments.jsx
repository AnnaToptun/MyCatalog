import { Container } from '@mui/material'
import { React, useContext } from 'react'
import { CardsUserContext } from '../../../Context/CardsUserProvider'
import { NewComment} from './NewComment'
import './comment.css'
export const Comments = ({bookId}) => {
    const {commentIdBooks} = useContext(CardsUserContext)
    return (
        <Container >
            { 
            (commentIdBooks.length)
                ?
                commentIdBooks.map((comment)=>(
                    <NewComment bookId={bookId} key={comment.id} comment={comment}/>
                ))
                : <p className="comments-nocomment">Ще не додано жодного коментаря</p>
            }
        </Container>
    )
}
