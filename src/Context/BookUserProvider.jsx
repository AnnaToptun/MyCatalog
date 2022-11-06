import React, {useContext} from 'react'
import {createContext} from 'react';
import {db} from '../firebase/firebase-config';
import {CardsUserContext} from './CardsUserProvider';
import {NotificationContext} from './NotificationProvider';
import {StateParamsContext} from './StateParamsProvider';
import { doc, deleteDoc} from 'firebase/firestore'
export const BookUserContext = createContext()

export const BookUserProvider = ({children}) => {
    const { userIdBooks, setUsersAddBook, setUserIdBooks, updateArrays, usersAddBook, bookId } = useContext(CardsUserContext);
    const { books,userCurrent,setBooksSort,booksSort } = useContext(StateParamsContext)
    
    const { notificationDeleteBook, notificationAddBook } = useContext(NotificationContext);
    
    const usersBooks = books.filter((book) => userIdBooks.includes(book.id));

    const delBookIdUser = (card) => {
        const arrayBooks = userCurrent.userBooks;
        const field = arrayBooks.filter((book) => book !== card.id);
        const updateUser = { userBooks: [...field] };
        updateArrays("Users", userCurrent.id, updateUser);
        setUserIdBooks([...field]); 
    };
    
    const delUserIdBook = (card) => {
        const addUsers = card.addUsers;
        const arrayUsers = addUsers.filter((user) => (user !== userCurrent.id));
        const updateBook = { addUsers: arrayUsers };
        updateArrays("Books", card.id, updateBook);
        setUsersAddBook(arrayUsers)
    }

    const delBookUser = (card) => {
        delBookIdUser(card);
        delUserIdBook(card);
        notificationDeleteBook(card);
    };

    const addBookIdUser = (card) => {
        userIdBooks.includes(card.id)
            ? setUserIdBooks([...userIdBooks])
            : setUserIdBooks([...userIdBooks, card.id]);
        const updateUser = { userBooks: [...userIdBooks, card.id] };
        updateArrays("Users", userCurrent.id, updateUser);
    };

    const addUserIdBook = (card) => {
       const arrayUsers = [...usersAddBook, userCurrent.id];
       const updateBook = { addUsers: arrayUsers };
       updateArrays("Books", card.id, updateBook);
       setUsersAddBook(arrayUsers);
    };
    
    const addBook =  (card) => {
        addBookIdUser(card);
        addUserIdBook(card)
        notificationAddBook(card);
    };

    const deleteBook = async(id) => {
        const userDoc = doc(db, 'Books', id)
        await deleteDoc(userDoc)
        setBooksSort(booksSort.filter((book) => book.id !== id));
    };

    return (
        <BookUserContext.Provider
            value={{
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
