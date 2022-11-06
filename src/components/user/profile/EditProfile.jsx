import { React, useContext, useState } from "react";
import {FormGroup, MenuItem} from "@mui/material";
import { CardsUserContext } from "../../../Context/CardsUserProvider";
import {StateParamsContext} from "../../../Context/StateParamsProvider";
import { MyInput } from "../../../UI/input/MyInput";
import { MyModal } from "../../../UI/modal/myModal";
import { Buttons } from "../../../UI/button/Buttons";
import {MySelect} from "../../../UI/select/MySelect";
import BuildCircleIcon from "@mui/icons-material/BuildCircle";
import "./profile.css";


export const EditProfile = () => {
    const { userId, setUserId, updateArrays } = useContext(CardsUserContext);
    const { userCurrent, setUserCurrent } = useContext(StateParamsContext)
   
    const [newFieldUser, setNewFieldUser] = useState({
        fistName: userCurrent.fistName,
        lastName: userCurrent.lastName,
        birthday: userCurrent.birthday,
        img: userCurrent.img,
        about: userCurrent.about,
        status: userCurrent.status
    });
    

    const updateUser = async () => {
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

    const statusHandler = (value) => {
        setNewFieldUser({ ...newFieldUser, status: value });
    }
    return (
        <MyModal title={<BuildCircleIcon className="profile-icons" />}>
            <h3 className="book-edit-title">Редагування</h3>
            <FormGroup>
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
                {
                    (userCurrent.status === "superadmin")
                        ?
                        <MySelect  value={newFieldUser.status} onChange={(e)=>statusHandler(e.target.value)} sx={{width: '100%'}}>
                            <MenuItem value="superadmin">superadmin</MenuItem>
                            <MenuItem value="admin">admin</MenuItem>
                            <MenuItem value="user">user</MenuItem>
                        </MySelect>
                    : ""
                }
                <Buttons onClick={() => updateUser(userId)}>Зберегти</Buttons>
            </FormGroup>
             
        </MyModal>
    );
};
