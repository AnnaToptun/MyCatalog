import { React, useContext } from "react";
import { CardsUserContext } from "../../../Context/CardsUserProvider";
import {StateParamsContext} from "../../../Context/StateParamsProvider";
import { Box } from "@mui/material";
import { useHistory } from "react-router-dom";
import { Buttons } from "../../../UI/button/Buttons";
import { EditProfile } from "./EditProfile";
import { ProfileBooks } from "./ProfileBooks";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import "./profile.css";

export const Profile = () => {
    const { userId } = useContext(CardsUserContext);
    const { user, userCurrent } = useContext(StateParamsContext)
  
    const route = useHistory();

    const back = () => {
        user ? route.push("/user/home") : route.push("/quest/home");
    };

  return (
    <Box>
      {userId ? (
        <Box className="profile">
            <Box className="profile-img-box">
                    {userId.img ? (
                    <img src={userId.img} alt="" />
                    ) : (
                    <AccountCircleIcon
                        style={{ fontSize: "250px" }}
                        className="profile-icons"
                    />
                    )}
            </Box>
            <Box className="profile-details">
                <Box className="profile-title">
                    <h1>
                        {userId.fistName} {userId.lastName}
                    </h1>
                    {(userCurrent.status==="superadmin"||userCurrent.status==="admin"||userCurrent.id === userId.id )? <EditProfile /> : ""}
                </Box>
                <Box className="profile-data">
                    <p >Статус:{" " + userId.status}</p>
                    <span >Email:<span> {" " + userId.email}</span></span>
                    <p>Дата народження:<span> {userId.birthday}</span></p>
                    <p>Про себе:</p> 
                    <span className="profile-about">
                        {userId.about ? userId.about : "Додайте інформацію про себе"}
                    </span>
                </Box>
                <Buttons onClick={back}> Назад</Buttons>
                <ProfileBooks />
            </Box>
        </Box>
      ) : (
        ""
      )}
    </Box>
  );
}
