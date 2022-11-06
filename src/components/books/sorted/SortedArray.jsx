import {React}from 'react';
import { Box } from '@material-ui/core';
import { CardBook } from '../CardBook';
import './sorted.css'

export const SortedArray = ({books}) => {
    return (
        <Box className='sorted'>
            {
                (books.length)
                ? 
                    <Box className='sorted-cards'>
                        {
                            books.map(card => (
                                <Box key={card.id} my={4} mx={2} >
                                    <CardBook  card={card} />
                                </Box>
                            ))
                        }
                    </Box>
                :   <Box className="sorted-nocards"><p></p> Ще не додано жодної книги з цього жанру</Box>
            }
        </Box>
    )
}
