import { React, useContext, useState } from "react";
import { CardsUserContext } from "../../../Context/CardsUserProvider";
import { MyInput } from "../../../UI/input/MyInput";
import { MyModal } from "../../../UI/modal/myModal";
import { Buttons } from "../../../UI/button/Buttons";
import BuildCircleIcon from "@mui/icons-material/BuildCircle";
import "./profile.css";
import {StateParamsContext} from "../../../Context/StateParamsProvider";

export const EditProfile = () => {
    const { userId, setUserId, updateArrays } = useContext(CardsUserContext);
    const { userCurrent, setUserCurrent } = useContext(StateParamsContext)
   
    const [newFieldUser, setNewFieldUser] = useState({
        fistName: userCurrent.fistName,
        lastName: userCurrent.lastName,
        birthday: userCurrent.birthday,
        img: userCurrent.img,
        about: userCurrent.about
    });
    

    const updateUser = async () => {
        const id = userId.id;
        setUserId({ ...userId, ...newFieldUser });
        setUserCurrent({ ...userCurrent, ...newFieldUser });
        updateArrays("Users", userCurrent.id, { ...newFieldUser });
    };

    const nameHandler = (value) => {
        setNewFieldUser({ ...newFieldUser, fistName: value });
    };

    const lastNameHandler = (value) => {
        setNewFieldUser({ ...newFieldUser, lastName: value });
    };

    const birthdayHandler = (value) => {
        setNewFieldUser({ ...newFieldUser, birthday: value });
    };

    const imgHandler = (value) => {
        setNewFieldUser({ ...newFieldUser, img: value });
    };

    const aboutHandler = (value) => {
        setNewFieldUser({ ...newFieldUser, about: value });
    };

    return (
        <MyModal title={<BuildCircleIcon className="profile-icons" />}>
            <MyInput
                value={newFieldUser.fistName}
                type="text"
                onChange={(e) => nameHandler(e.target.value)}
            />
            <MyInput
                value={newFieldUser.lastName}
                type="text"
                onChange={(e) => lastNameHandler(e.target.value)}
            />
            <MyInput
                value={newFieldUser.birthday}
                type="date"
                onChange={(e) => birthdayHandler(e.target.value)}
            />
            <MyInput
                value={newFieldUser.about}
                type="text"
                onChange={(e) => aboutHandler(e.target.value)}
            />
            <MyInput
                value={newFieldUser.img}
                type="text"
                onChange={(e) => imgHandler(e.target.value)}
            />
            <Buttons onClick={() => updateUser(userId)}>Зберегти</Buttons>
        </MyModal>
    );
};
