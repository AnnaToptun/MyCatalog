import { React, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Card, Box } from "@material-ui/core";
import { CardsUserContext } from "../../../Context/CardsUserProvider";
import { Buttons } from "../../../UI/button/Buttons";
import EditAvtor from "./EditAvtor";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import "./avtors.css";
import {AllAvtorBooks} from "./AllAvtorBooks";
import {StateParamsContext} from "../../../Context/StateParamsProvider";

export const CardAvtors = () => {
    const {setBookId, setCommentIdBooks, avtorId } = useContext(CardsUserContext);
    const {books, user, userCurrent } = useContext(StateParamsContext)
    const route = useHistory();

    const avtorBooksId = avtorId.booksAvtor;

    const avtorBooks = books.filter((book) => {
        if (avtorBooksId.includes(book.id)) {
            return book;
        }
    })

    const detailsCard = (card) => {
        route.push(`/book/${card.id}`);
        setBookId(card);
        setCommentIdBooks([...card.comments]);
    }

    const back = () => {
        user ? route.push("/user/home") : route.push("/quest/home");
    }

    return (
        <Box className="avtor">
            <Box>
                {(avtorId.img === "")
                ? 
                    <AccountCircleIcon style={{ fontSize: "250px" }} className="avtors-img-load"/>
                : 
                    <Card className="avtors-img-box ">
                        <img src={avtorId.img} alt="" />
                    </Card>
                }
            </Box>
            <Box className="avtor-details">
                <Box className="avtor-edit">
                    <h1 className="avtor-name ">{avtorId.avtor}</h1>
                    <Box>
                        {user ? userCurrent.status === "admin" ? <EditAvtor /> : "" : ""}
                    </Box>
                </Box>
                <p className="avtor-discribe">{avtorId.discribe}</p>
                <Buttons onClick={back}> Назад</Buttons>
                <AllAvtorBooks avtorBooks={avtorBooks} detailsCard={detailsCard} />
            </Box>
        </Box>
    );
}
