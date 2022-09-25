import React from 'react'
import { Box, Container } from '@mui/material'
import { CardBook } from '../books/CardBook'
import {useContext} from 'react'
import {BookUserContext} from '../../Context/BookUserProvider'
import './user.css'

export function UserAllBook() {
    
    const { usersBooks } = useContext(BookUserContext);
  return (
    <Container>
      {usersBooks.length ? (
        <Box className="user" p={0} m={0}>
          {usersBooks.map((card) => (
            <Box key={card.id} my={2} mx={2}>
              <CardBook
                card={card}
              />
            </Box>
          ))}
        </Box>
      ) : (
        <p>Ще не додано жодної книги</p>
      )}
    </Container>
  );
}
