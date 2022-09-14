import {React, useState, createContext, useContext, useEffect} from 'react'
import {collection,getDocs, query,orderBy,limit} from "firebase/firestore";
import {CardsUserContext} from './CardsUserProvider';
import {db} from '../firebase/firebase-config';
export const PaginationContext = createContext()

export const PaginationProvider = ({children}) => {
    const { setBooksSort, booksSort } = useContext(CardsUserContext);
    const [last, setLast] = useState({});
    const [first, setFirst] = useState({});
    const [active, setActive] = useState(true);
    const limitBooks = 12;
    const [booksPag, setBooksPag] = useState({
        order: "title",
        sort: "asc",
        start: "",
        before: "",
    });
    const booksStartRef = query(
        collection(db, "Books"),
        orderBy(booksPag.order, booksPag.sort),
        limit(limitBooks)
    );
    const getPagination = (allBook, firstBook, lastVisible) => {
        if (allBook.length > 0) {
            setBooksSort(allBook);
            setActive(true);
            if (booksPag.order === "title") {
                setLast(lastVisible.title);
                setFirst(firstBook.title);
            } else {
                setLast(lastVisible.avtor);
                setFirst(firstBook.avtor);
            }
        } else {
            setActive(false);
            setBooksSort(booksSort);
        }
    };

    const getBookLimit = async (pagination) => {
      const books = await getDocs(pagination);
      const allBook = books.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      getPagination(allBook, allBook[0], allBook[allBook.length - 1]);
    };

    useEffect(() => {
      getBookLimit(booksStartRef);
    }, [booksPag]);

    return (
        <PaginationContext.Provider
            value={{
                last,
                setLast,
                first,
                setFirst,
                booksPag,
                setBooksPag,
                getBookLimit,
                active,
                limitBooks,
            }}
        >
            {children}
        </PaginationContext.Provider>
    );
}
