import React, {useContext, useState} from 'react'
import {createContext} from 'react';
import {CardsUserContext} from './CardsUserProvider';
import {NotificationContext} from './NotificationProvider';

export const BookUserContext = createContext()

export const BookUserProvider = ({children}) => {
    const {
      books,
      userCurrent,
      userIdBooks,
      setUsersAddBook,
      setBooksSort,
      booksSort,
      deleteBookUser,
      deleteBookOrUser,
      updateListUsers,
      setUserIdBooks,
      updateArrays,
      usersAddBook,
      bookId,
    } = useContext(CardsUserContext);
    const { notificationDeleteBook, notificationAddBook } =
      useContext(NotificationContext);
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
        notificationDeleteBook(card);
    };

    const addBookIdUser = (card) => {
        userIdBooks.includes(card.id)
            ? setUserIdBooks([...userIdBooks])
            : setUserIdBooks([...userIdBooks, card.id]);
        const updateUser = { userBooks: [...userIdBooks, card.id] };
        updateArrays("Users", userCurrent.id, updateUser);
    };

    const addUserIdBook = () => {
       const arrayUsers = [...usersAddBook, userCurrent.id];
       const updateBook = { addUsers: arrayUsers };
       updateArrays("Books", bookId.id, updateBook);
       setUsersAddBook(arrayUsers);
    };
    
    const addBook =  (card) => {
        addBookIdUser(card);
        addUserIdBook()
        notificationAddBook(card);
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
