import {React, useContext,} from "react";
import {Box} from "@mui/material";
import { useHistory } from "react-router-dom";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import ChromeReaderModeOutlinedIcon from "@mui/icons-material/ChromeReaderModeOutlined";
import { CardsUserContext } from "../../../Context/CardsUserProvider";
import { Buttons } from "../../../UI/button/Buttons";
import { BookLikes } from "./BookLikes";
import "./book.css";

export const BookIcons = () => {
    const {
        user,
        usersAddBook,
        bookId
    } = useContext(CardsUserContext);
    const route = useHistory();

    const back = () => {
        user ? route.push("/user/home") : route.push("/quest/home");
    };
    
    const readBuy = (url) => {
        console.log(url);
        window.open(`${url}`);
    };
    const bookIdUsers = () => {
        if (usersAddBook.length) {
            
        }
    }; 
    console.log("bookId", bookId);
    console.log("bookIdUsers", bookIdUsers);
    return (
      <Box className="book-block">
        <Buttons onClick={back}>Назад</Buttons>
        <Box className="book-block">
          {bookId.read ? (
            <ChromeReaderModeOutlinedIcon
              className="book-icons"
              onClick={() => readBuy(bookId.read)}
            />
          ) : (
            ""
          )}
          {bookId.buy ? (
            <ShoppingCartOutlinedIcon
              className="book-icons"
              onClick={() => readBuy(bookId.buy)}
            />
          ) : (
            ""
          )}
          <Box className="book-add-user">
            <BookLikes />
            <span>
              {usersAddBook.length}
            </span>
          </Box>
        </Box>
      </Box>
    );
};
