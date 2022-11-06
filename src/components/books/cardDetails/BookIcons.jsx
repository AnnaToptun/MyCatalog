import {React, useContext,} from "react";
import {Box} from "@mui/material";
import { useHistory } from "react-router-dom";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import ChromeReaderModeOutlinedIcon from "@mui/icons-material/ChromeReaderModeOutlined";
import { CardsUserContext } from "../../../Context/CardsUserProvider";
import { Buttons } from "../../../UI/button/Buttons";
import { BookLikes } from "./BookLikes";
import "./book.css";
import {StateParamsContext} from "../../../Context/StateParamsProvider";

export const BookIcons = () => {
    const { usersAddBook, bookId} = useContext(CardsUserContext);
    const{ user } = useContext(StateParamsContext)
    const route = useHistory();

    const back = () => {
        user ? route.push("/user/home") : route.push("/quest/home");
    };
    
    const readBuy = (url) => {
        window.open(`${url}`);
    };
   
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
