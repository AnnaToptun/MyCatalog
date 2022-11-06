import { Box } from "@mui/material";
import { React, useContext } from "react";
import { useHistory } from "react-router-dom";
import { CardsUserContext } from "../../../Context/CardsUserProvider";
import {DetailsBookTitle} from "./DetailsBookTitle";
import { BookIcons } from "./BookIcons";
import "./book.css";
import {StateParamsContext} from "../../../Context/StateParamsProvider";

export const DetailsBook = () => {
    const { bookId, setAvtorId } = useContext(CardsUserContext);
    const {avtors} = useContext(StateParamsContext)
    
    const avtorIdCurrent = avtors.filter((avtor) => {
      if (avtor.avtor === bookId.avtor) return avtor;
    });

    const route = useHistory();

    const currentAvtor = avtorIdCurrent[0];  

    const detailsAvtor = () => {
        const booksAvtor = currentAvtor.booksAvtor;
        setAvtorId({ ...currentAvtor, booksAvtor: [...booksAvtor, bookId.id] });
        route.push(`/avtor/${currentAvtor.id}`);
    };
        
    return (
        <Box className="book-details">
            <DetailsBookTitle/>
            <span>
                Автор:
                <a className="book-avthor" onClick={detailsAvtor}>
                    {bookId.avtor}
                </a>
            </span>
            <span>Жанр: {bookId.genre.join(", ")}</span>
            <span>Рік: {bookId.year}</span>
            <p>Опис: {bookId.discribe}</p>
            <BookIcons />
        </Box>
    );
}; 