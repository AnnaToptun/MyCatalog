import { React, createContext, useState, useEffect } from "react";
import { db, auth } from '../firebase/firebase-config'
import { collection, addDoc, getDocs, updateDoc, doc, deleteDoc,} from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'
import { useHistory } from 'react-router-dom'
import {NotificationProvider} from "./NotificationProvider";


export const CardsUserContext = createContext({})

export const CardsUserProvider = ({children}) => {
    const [books, setBooks] = useState([])
    const [avtors, setAvtors] = useState([])
    const [users, setUsers] = useState([])
    const [genres, setGenres] = useState([])
    const [userCurrent, setUserCurrent] = useState({})
    const [userIdBooks, setUserIdBooks] = useState([])
    const [user, setUser] = useState(false)

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

  
    const [userId, setUserId] = useState({})
    const [commentIdBooks, setCommentIdBooks] = useState([])
    const [bookId, setBookId] = useState({})
    const [usersAddBook, setUsersAddBook] = useState([]);  
    const [booksSort, setBooksSort] = useState([])
    const [avtorId, setAvtorId] = useState({})
    const route = useHistory();
    
   
  
    const addCollection = async (collections, field) => {
        await addDoc(collections, field);
    }
 
    const updateArrays = async (collections, id, newField) => {
      const bookDoc = doc(db, collections, id);
      await updateDoc(bookDoc, newField);
    };
  
    const addBookUser = async (id, userBooks, newBook) => {
        const userDoc = doc(db, 'Users', id)
        const newField = {userBooks: [...userBooks, newBook]}
        setUserIdBooks([...userIdBooks, newBook]);
        await updateDoc(userDoc, newField)
        getUsers()
    }
  
    const deleteBookUser = async (id, userBooks, delBooks) => {
        const userDoc = doc(db, "Users", id);
        const newArray = userBooks.filter((book) => book !== delBooks);
        const newField = { userBooks: newArray };
        await updateDoc(userDoc, newField);
        setUserIdBooks(newArray);
    };

  const addBookComment = async (id, comments, newComment) => {
    const userDoc = doc(db, 'Books', id)
    const newField = { comments: [...comments, newComment] }
    await updateDoc(userDoc, newField)
    setCommentIdBooks([...commentIdBooks, newComment])
    getBookCards()
  }
  const addBookIdUser = async (id, addUsers, newUser) => {
    const userDoc = doc(db, 'Books', id)
    const newField = { addUsers: [...addUsers, newUser] }
    await updateDoc(userDoc, newField)
    getBookCards()
  }
  const addBooksAvtor = async (id, booksAvtor, newBook) => {
    const userDoc = doc(db, 'Avtors', id)
    const newField = { booksAvtor: [...booksAvtor, newBook] }
    await updateDoc(userDoc, newField)
    getAvtors()
    }
    
  const editCardUser = async (id, collection, updateField) => {
    const userDoc = doc(db, collection, id)
    const newField = { ...updateField }
    await updateDoc(userDoc, newField)
    }
    
  const updateListUsers = async (id, updateList) => {
    const bookDoc = doc(db, 'Books', id)
    const newField = { addUsers: updateList }
    await updateDoc(bookDoc, newField)
    getBookCards()
  }
  
    const deleteBookOrUser = async (id,collection) =>{
        const userDoc = doc(db, collection, id)
        const deleteBook = await deleteDoc(userDoc)
        console.log(typeof deleteBook)
    }
    
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
      getUsers();
      monitorAuthState();
      getBookCards();
      getGenres();
      getAvtors();
    }, [usersAddBook]);
    
    return (
    <CardsUserContext.Provider
      value={{
        books,
        setBooks,
        users,
        user,
        setUser,
        genres,
        setGenres,
        userCurrent,
        setUserCurrent,
        userIdBooks,
        setUserIdBooks,
        commentIdBooks,
        setCommentIdBooks,
        bookId,
        setBookId,
        booksSort,
        setBooksSort,
        avtors,
        setAvtors,
        userId,
        setUserId,
        avtorId,
        setAvtorId,
        usersAddBook,
        setUsersAddBook,
        addBookComment,
        addBookUser,
        addBooksAvtor,
        deleteBookUser,
        editCardUser,
        deleteBookOrUser,
        updateListUsers,
        addBookIdUser,

        addCollection,
        booksCollectionRef,
        genresCollectionRef,
        avtorsCollectionRef,
        usersCollectionRef,
        updateArrays,
      }}
    >
      <NotificationProvider>{children}</NotificationProvider>
    </CardsUserContext.Provider>
  );
};
