import { Box } from "@mui/material";
import { React, useContext } from "react";
import { Link } from "react-router-dom";
import { CardsUserContext } from "../../../Context/CardsUserProvider";
import { MyModal } from "../../../UI/modal/myModal";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import "./book.css";

export const BookLikes = () => {
    const { users, setUserId, usersAddBook, bookId } =
        useContext(CardsUserContext);

    const addUsers = bookId.addUsers;

    const detailsUser = (card) => {
        setUserId(card);
    };

    const activeUsers = users.filter((user) => {
        if (usersAddBook.includes(user.id)) {
            return user;
        }
    });

    const startUsers = users.filter((user) => {
        if (addUsers.includes(user.id)) {
            return user;
        }
    });

    return (
        <MyModal title={<ThumbUpOutlinedIcon className="book-icons" />}>
        <h3 className="book-edit-title">Сподобалась книга</h3>
        {activeUsers.length > 0
            ? activeUsers.map((userActive) => (
                <Box key={userActive.id}>
                    <Link
                        to={`/user/profile/${userActive.id}`}
                        onClick={() => detailsUser(userActive)}
                        className="book-users-box"
                    >
                        <Box className="book-user-img">
                            <img src={userActive.img} alt="" className="image-user" />
                        </Box>
                        <span>{userActive.fistName} {userActive.lastName}</span>
                    </Link>
                </Box>
            ))
            :''
        }
            
        </MyModal>
    );
};
