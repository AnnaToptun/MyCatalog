import { Box, Container } from '@mui/material'
import { React, useContext } from 'react'
import { FormComment } from '../comment/FormComment'
import { Comments } from '../comment/Comments'
import {CardsUserContext} from '../../../Context/CardsUserProvider'
import bookIMG from '../../../img/book.jpg'
import './book.css'
import {BookUserContext} from '../../../Context/BookUserProvider'
import {DetailsBook} from './DetailsBook'

export const CardBookDatails = () => {
    const {
      user,
      bookId,
    } = useContext(CardsUserContext); 
    
   
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
