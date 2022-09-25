import { Box } from '@mui/material'
import { React, useContext} from 'react'
import { CardsUserContext } from '../../Context/CardsUserProvider'
import { CardBook } from './CardBook'
import { SortedBook } from './sorted/SortedBook';
import { Pagination } from '../pagination/Pagination';
import './cards.css'
import {PaginationProvider} from '../../Context/PaginationProvider';

export const AllCard = () => {
    const {booksSort} = useContext(CardsUserContext)
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
                                    <CardBook card={card}/>
                                </Box>
                            ))
                        }
                    </Box>
                }   
            </PaginationProvider>
            
        </Box>
    )
}
