import { React, createContext, useState } from "react";

export const StateParamsContext = createContext();

export const StateParamsProvider = ({children}) => {
    const [books, setBooks] = useState([]);
    const [avtors, setAvtors] = useState([]);
    const [users, setUsers] = useState([]);
    const [genres, setGenres] = useState([]);
    const [userCurrent, setUserCurrent] = useState({});
    const [user, setUser] = useState(false);
    const [booksSort, setBooksSort] = useState([]);
   
  return (
    <StateParamsContext.Provider
        value={{
            books,
            setBooks,
            users,
            setUsers,
            user,
            setUser,
            genres,
            setGenres,
            userCurrent,
            setUserCurrent,
            booksSort,
            setBooksSort,
            avtors,
            setAvtors
      }}
    >
      {children}
    </StateParamsContext.Provider>
  );
};
