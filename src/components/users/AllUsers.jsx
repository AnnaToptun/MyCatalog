import { React, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Box, Card } from "@material-ui/core";
import { CardsUserContext } from "../../Context/CardsUserProvider";
import {StateParamsContext} from "../../Context/StateParamsProvider";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import "./users.css";

export const AllUsers = () =>{
    const { setUserId } = useContext(CardsUserContext);
    const {users} = useContext(StateParamsContext)
    const route = useHistory();

    const detailsAvtor = (card) => {
        setUserId(card)
        route.push(`/user/profile/${card.id}`)
    }

    return (
        <Box className="users">
            {users.map((card) => (
                <Box key={card.id} my={2} mx={2}>
                    <Card className="users-card" onClick={() => detailsAvtor(card)}>
                        <div className="users-img-box">
                            {!card.img ? (
                                <AccountCircleOutlinedIcon className="avtors-img-load" />
                            ) : (
                                <img src={card.img} style={{ height: "100%"}} alt="" />
                            )}
                        </div>
                        <div>
                            <h1 className="avtors-name">{card.fistName} {card.lastName}</h1>
                            <span className="avtors-name">{card.status}</span>
                        </div>
                    </Card>
                </Box>
            ))}
        </Box> 
    );
}
