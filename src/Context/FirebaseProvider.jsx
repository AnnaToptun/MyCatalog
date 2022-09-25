import { React, createContext, useEffect, useState, useContext } from "react";
import {CardsUserContext} from './CardsUserProvider';
import { db } from '../firebase/firebase-config'
import { addDoc, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore'

const FirebaseContext = createContext()

export const FirebaseProvider = ({children}) => {
    const {
      setBooks,
      setAvtors,
      setUsers,
      setGenres,
      booksCollectionRef,
      genresCollectionRef,
      avtorsCollectionRef,
      usersCollectionRef,
    } = useContext(CardsUserContext);
    const [userCurrent, setUserCurrent] = useState({});
    const [userIdBooks, setUserIdBooks] = useState([]);
    const [usersAddBook, setUsersAddBook] = useState([]);  
    
     const getBookCards = async () => {
       const dataBooks = await getDocs(booksCollectionRef);
       const allBook = dataBooks.docs.map((doc) => ({
         ...doc.data(),
         id: doc.id,
       }));
       setBooks(allBook.sort((prev, next) => prev.title < next.title && -1));
     };

     const getUsers = async (email) => {
       const dataUsers = await getDocs(usersCollectionRef);
       const allUsers = dataUsers.docs.map((doc) => ({
         ...doc.data(),
         id: doc.id,
       }));
       setUsers(allUsers);
       allUsers.filter((user) => {
         if (user.email === email) {
           const booksUser = user.userBooks;
           return setUserCurrent(user), setUserIdBooks(booksUser);
         }
       });
     };
     const getAvtors = async () => {
       const dataAvtors = await getDocs(avtorsCollectionRef);
       const allAvtors = dataAvtors.docs.map((doc) => ({
         ...doc.data(),
         id: doc.id,
       }));
       setAvtors(allAvtors.sort((prev, next) => prev.avtor < next.avtor && -1));
     };
     const getGenres = async () => {
       const dataGenres = await getDocs(genresCollectionRef);
       const allGenres = dataGenres.docs.map((doc) => ({
         ...doc.data(),
         id: doc.id,
       }));
       setGenres(allGenres.sort((prev, next) => prev.genre < next.genre && -1));
    };
    
    const addCollection = async (collections, field) => {
      await addDoc(collections, field);
    };

    const updateArrays = async (collections, id, newField) => {
      const bookDoc = doc(db, collections, id);
      await updateDoc(bookDoc, newField);
    };
    const deleteBookUser = async (id, collection) => {
      const userDoc = doc(db, collection, id);
      const deleteBook = await deleteDoc(userDoc);
      console.log(typeof deleteBook);
    };
    useEffect(() => {
      getUsers();
      getBookCards();
      getGenres();
      getAvtors();
    }, [usersAddBook]);
    
    return (
      <FirebaseContext.Provider
        value={
          (userCurrent,
            userIdBooks,
                    usersAddBook,
                    setUsersAddBook,
          setUserCurrent,
          setUserIdBooks,
          getUsers,
          getBookCards,
          getGenres,
          getAvtors,
          addCollection,
          updateArrays,
          deleteBookUser)
        }
      >
        {children}
      </FirebaseContext.Provider>
    );
}
