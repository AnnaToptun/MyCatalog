import {React, createContext} from 'react'

const FirebaseContext = createContext()

export const FirebaseProvider = () => {
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
  return (
    <div>FirebaseProvider</div>
  )
}
