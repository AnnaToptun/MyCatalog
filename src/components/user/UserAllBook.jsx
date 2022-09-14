import React from 'react'
import { Box, Container } from '@mui/material'
import { CardBook } from '../books/CardBook'
import classesPages from '../../styles/classesPages'
import {useContext} from 'react'
import {BookUserContext} from '../../Context/BookUserProvider'

export function UserAllBook() {
    
    const { addBook, delBookUser, usersBooks } = useContext(BookUserContext);
  return (
    <Container>
      {usersBooks.length ? (
        <Container style={classesPages.pageAllCard} p={0} m={0}>
          {usersBooks.map((card) => (
            <Box key={card.id} my={2} mx={2}>
              <CardBook
                addBook={addBook}
                delBookUser={delBookUser}
                card={card}
              />
            </Box>
          ))}
        </Container>
      ) : (
        <p>Ще не додано жодної книги</p>
      )}
    </Container>
  );
}
