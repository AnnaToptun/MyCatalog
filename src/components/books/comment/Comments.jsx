import { Container } from '@mui/material'
import { React, useContext } from 'react'
import { CardsUserContext } from '../../../Context/CardsUserProvider'
import { NewComment} from './NewComment'

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
            : <p>Ще не додано жодного коментаря</p>
        }
        </Container>
    )
}
