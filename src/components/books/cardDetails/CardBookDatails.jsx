import { Box, Container } from '@mui/material'
import { React, useContext } from 'react'
import { FormComment } from '../comment/FormComment'
import { Comments } from '../comment/Comments'
import {CardsUserContext} from '../../../Context/CardsUserProvider'
import bookIMG from '../../../img/book.jpg'
import './book.css'
import {DetailsBook} from './DetailsBook'
import {StateParamsContext} from '../../../Context/StateParamsProvider'

export const CardBookDatails = () => {
    const { bookId} = useContext(CardsUserContext); 
    const { user } = useContext(StateParamsContext)
   
    return (
        <Container p={10} my={4}>
            <Box  >
                <Box className='book'>
                    <Box className='book-img-box'>
                        {
                        (bookId.img ) 
                        ? <img src={bookId.img || bookIMG} className='book-img' alt=''/>
                        : <img src={bookIMG}  className='book-img'/>
                        }
                    </Box> 
                   <DetailsBook/>
                        
                </Box> 
                <Comments bookId={bookId} />
                {
                    (user)
                        ? <FormComment bookCurrent={bookId}/>
                        : <p>Незареєстровані користувачі не можуть залишати коментарі</p>
                }
            </Box>
        </Container>
    )
}
