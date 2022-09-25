import { Box } from "@mui/material";
import { React, useContext } from "react";
import { EditBook } from "./EditBook";
import { CardsUserContext } from "../../../Context/CardsUserProvider";
import { BookUserContext } from "../../../Context/BookUserProvider";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import "./book.css";

export const DetailsBookTitle = () => {
    const { user,  userCurrent, userIdBooks, bookId} =
        useContext(CardsUserContext);
    const { addBook, delBookUser } = useContext(BookUserContext);


    return (
        <Box className="book-edit">
            <span className="book-title">{bookId.title}</span>
            <Box className="book-icons-box">
                {user ? userCurrent.status === "admin" ? <EditBook /> : "" : ""}
                {user
                    ? (<Box>
                                {
                                !userIdBooks.includes(bookId.id)
                                    ? (<AddOutlinedIcon
                                        className="book-icons"
                                        sx={{ fontSize: "2em" }}
                                        onClick={() => addBook(bookId)}
                                        />)
                                    : (<RemoveOutlinedIcon
                                            className="book-icons"
                                            sx={{ fontSize: "2em" }}
                                            onClick={() => delBookUser(bookId)}
                                        />)
                                }
                        </Box>)
                    : ("")
                }
            </Box>
        </Box>
    );
}; 
