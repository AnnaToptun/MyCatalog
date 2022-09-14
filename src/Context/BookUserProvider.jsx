import React, {useContext, useState} from 'react'
import {createContext} from 'react';
import {CardsUserContext} from './CardsUserProvider';
import {NotificationContext} from './NotificationProvider';

export const BookUserContext = createContext()

export const BookUserProvider = ({children}) => {
    const {
      books,
      userCurrent,
      addBookUser,
      userIdBooks,
      setUsersAddBook,
      setBooksSort,
      booksSort,
      deleteBookUser,
      deleteBookOrUser,
      updateListUsers,
      addBookIdUser,
    } = useContext(CardsUserContext);
    const {createNotification} = useContext(NotificationContext)
    const [sortBooks, setSortBooks] = useState([]);
    
    const usersBooks = books.filter((book) => {
      if (userIdBooks.includes(book.id)) {
        return book;
      }
    });

    const sortBooksGenre = (sort) => {
      setSortBooks(
        usersBooks.filter((book) => {
          return book.genre.includes(sort);
        })
      );
    };

    const delBookUser = async (card) => {
      const addUsers = card.addUsers;
      const field = addUsers.filter((user) => {
        if (user !== userCurrent.id) {
          return user;
        }
      });
      updateListUsers(card.id, field);
      deleteBookUser(userCurrent.id, userCurrent.userBooks, card.id);
      setUsersAddBook(field);
      createNotification(
        "warning",
        `Ви видалили книгу ${card.title} зі свого каталогу`
      );
    };

    const addBook =  (card) => {
      const addUsers = card.addUsers;
      addBookUser(userCurrent.id, userCurrent.userBooks, card.id);
      addBookIdUser(card.id, card.addUsers, userCurrent.id);
      addUsers.includes(userCurrent.id)
        ? setUsersAddBook(addUsers)
        : setUsersAddBook([...addUsers, userCurrent.id]);

      createNotification(
        "success",
        `Ви успішно додали книгу ${card.title} до свого каталогу`
      );
    };

    
    const deleteBook = (id) => {
      deleteBookOrUser(id, "Books");
      setBooksSort(booksSort.filter((book) => book.id !== id));
    };
  return (
    <BookUserContext.Provider
      value={{
        sortBooksGenre,
        deleteBook,
        addBook,
        delBookUser,
        usersBooks,
      }}
    >
      {children}
    </BookUserContext.Provider>
  );
}
