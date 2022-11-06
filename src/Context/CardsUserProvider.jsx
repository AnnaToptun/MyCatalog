import { React, createContext, useState, useEffect, useContext } from "react";
import { db, auth } from '../firebase/firebase-config'
import { collection, addDoc, getDocs, updateDoc, doc } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'
import { useHistory } from 'react-router-dom'
import { NotificationProvider } from "./NotificationProvider";
import { BookUserProvider } from "./BookUserProvider";
import { StateParamsContext } from "./StateParamsProvider";


export const CardsUserContext = createContext({})

export const CardsUserProvider = ({children}) => {
    const {setBooks, setUsers, setUser, setGenres, setUserCurrent, setAvtors} = useContext(StateParamsContext)
    const [userIdBooks, setUserIdBooks] = useState([])
    const [userId, setUserId] = useState({})
    const [bookId, setBookId] = useState({})
    const [usersAddBook, setUsersAddBook] = useState([]);  
    const [avtorId, setAvtorId] = useState({})
    const [commentIdBooks, setCommentIdBooks] = useState([])
   
    const route = useHistory();

    const usersCollectionRef = collection(db, 'Users')
    const genresCollectionRef = collection(db, 'Genre')
    const avtorsCollectionRef = collection(db, 'Avtors')
    const booksCollectionRef = collection(db, 'Books')

    const getBookCards = async () => {
        const dataBooks = await getDocs(booksCollectionRef)
        const allBook = dataBooks.docs.map(doc => ({ ...doc.data(), id: doc.id }))
        setBooks(allBook.sort((prev, next) => prev.title < next.title && -1))
        
    }
    
    const getUsers = async (email) => {
        const dataUsers = await getDocs(usersCollectionRef)
        const allUsers = dataUsers.docs.map(doc => ({ ...doc.data(), id: doc.id }))
        setUsers(allUsers)
        allUsers.filter(user => {
            if (user.email === email) {
                const booksUser = user.userBooks 
                return (
                setUserCurrent(user),
                setUserIdBooks(booksUser)
                )
            }
        })
    }

    const getAvtors = async () => {
        const dataAvtors = await getDocs(avtorsCollectionRef)
        const allAvtors = dataAvtors.docs.map(doc => ({ ...doc.data(), id: doc.id }))
        setAvtors(allAvtors.sort((prev, next) =>  prev.avtor < next.avtor &&  -1))
    }

    const getGenres = async () => {
        const dataGenres = await getDocs(genresCollectionRef);
        const allGenres = dataGenres.docs.map(doc => ({ ...doc.data(), id: doc.id }))
        setGenres(allGenres.sort((prev, next) =>  prev.genre < next.genre &&  -1))
    }

    const addCollection = async (collections, field) => {
        await addDoc(collections, field);
    }
 
    const updateArrays = async (collections, id, newField) => {
        const bookDoc = doc(db, collections, id);
        console.log(newField)
        await updateDoc(bookDoc, newField);
    };
    
    const monitorAuthState = async () => {
        onAuthStateChanged(auth, user => {
            if (user) {
                route.push('/user/home')
                setUser(true)
                getUsers(user.email)
            } else {
                route.push('/quest/login')
                setUser(false);
            }
        }) 
    }

    useEffect(() => {
      monitorAuthState();
      getUsers();
      getBookCards();
      getGenres();
      getAvtors();
    }, [usersAddBook]);
    
    return (
      <CardsUserContext.Provider
        value={{
          userIdBooks,
          setUserIdBooks,
          commentIdBooks,
          setCommentIdBooks,
          bookId,
          setBookId,
          userId,
          setUserId,
          avtorId,
          setAvtorId,
          usersAddBook,
          setUsersAddBook,

          addCollection,
          booksCollectionRef,
          genresCollectionRef,
          avtorsCollectionRef,
          usersCollectionRef,
          updateArrays,
        }}
      >
           <NotificationProvider>
                <BookUserProvider>
                    {children}
                </BookUserProvider>
            </NotificationProvider>
      </CardsUserContext.Provider>
    );
};
