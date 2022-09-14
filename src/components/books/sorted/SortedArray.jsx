import React, {useContext} from 'react';
import { Box } from '@material-ui/core';
import { CardBook } from '../CardBook';
import './sorted.css'
import {BookUserContext} from '../../../Context/BookUserProvider';

export const SortedArray = ({books}) => {
    const {delBookUser, deleteBook} = useContext(BookUserContext);
    return (
        <Box className='sorted'>
            {
                (books.length)
                ? 
                    <Box className='cards'>
                        {
                            books.map(card => (
                                <Box key={card.id} my={4} mx={2} >
                                    <CardBook  
                                        delBookUser={delBookUser} 
                                        card={card} 
                                        deleteBook={deleteBook}
                                    />
                                </Box>
                            ))
                        }
                    </Box>
                :   <p>Ще не додано жодної книги з цього жанру</p>
            }
        </Box>
    )
}
