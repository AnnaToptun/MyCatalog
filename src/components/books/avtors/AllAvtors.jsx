import { React, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Box, Card } from "@material-ui/core";
import { CardsUserContext } from "../../../Context/CardsUserProvider";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import "./avtors.css";
import {StateParamsContext} from "../../../Context/StateParamsProvider";

export const AllAvtors = () =>{
    const {  setAvtorId } = useContext(CardsUserContext);
    const {avtors} = useContext(StateParamsContext)
    const route = useHistory();

    const detailsAvtor = (card) => {
        setAvtorId(card)
        route.push(`/avtor/${card.id}`)
    }

    return (
        <Box className="avtors">
            {avtors.map((card) => (
                <Box key={card.id} my={2} mx={2}>
                    <Card className="avtors-card" onClick={() => detailsAvtor(card)}>
                        <div className="avtors-img-box">
                            {!card.img ? (
                                <AccountCircleOutlinedIcon className="avtors-img-load" />
                            ) : (
                                <img src={card.img} style={{ height: "320px" }} alt="" />
                            )}
                        </div>
                        <a className="avtors-name">{card.avtor}</a>
                    </Card>
                </Box>
            ))}
        </Box>
    );
}
