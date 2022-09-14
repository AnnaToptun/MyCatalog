import { Box } from '@mui/material'
import { React, useContext} from 'react'
import { CardsUserContext } from '../../Context/CardsUserProvider'
import { CardBook } from './CardBook'
import { SortedBook } from './sorted/SortedBook';
import { Pagination } from '../pagination/Pagination';
import './cards.css'
import {BookUserContext} from '../../Context/BookUserProvider';
import {PaginationProvider} from '../../Context/PaginationProvider';

export const AllCard = () => {
    const {booksSort} = useContext(CardsUserContext)
    const {deleteBook, addBook, delBookUser} = useContext(BookUserContext);
    return (
        <Box className='cards-box'>
            <PaginationProvider>
                <Pagination>
                    <SortedBook />
                </Pagination>
                {
                    <Box className='cards' >
                        {
                            booksSort.map((card)=>(
                                <Box key={card.id} mx={2}  my={2}>
                                    <CardBook 
                                        delBookUser={delBookUser}
                                        addBook={addBook}
                                        card={card}
                                        deleteBook={deleteBook}
                                    />
                                </Box>
                            ))
                        }
                    </Box>
                }   
            </PaginationProvider>
            
        </Box>
    )
}
