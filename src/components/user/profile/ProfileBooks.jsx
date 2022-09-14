import { React, useContext } from "react";
import { useHistory } from "react-router-dom";
import { CardsUserContext } from "../../../Context/CardsUserProvider";
import { Box, Card } from "@mui/material";
import "./profile.css";

export const ProfileBooks = () => {
    const {
        setBookId,
        setCommentIdBooks,
        books,
        userIdBooks,
    } = useContext(CardsUserContext);

    const usersBooks = books.filter((book) => {
        if (userIdBooks.includes(book.id)) {
            return book;
        }
    });
    
    const route = useHistory();

    const detailsCard = (card) => {
        route.push(`/book/${card.id}`);
        setBookId(card);
        setCommentIdBooks([...card.comments]);
    };

    return (
        <Box className="profile-books-box">
            <h4>Додані книги:</h4>
            <Box className="profile-books">
                {usersBooks.map((book) => (
                    <Card key={book.id} className="profile-books-card" onClick={() => detailsCard(book)}>
                        <Box className="profile-img-box">
                            <img src={book.img} alt="" />
                        </Box>
                        <Box className="profile-books-title">
                            <span>{book.avtor}</span>
                            <span>{book.title}</span>
                        </Box>
                    </Card>
                ))}
            </Box>
        </Box>
    );
};
