import { React, useContext, useState } from "react";
import { Buttons } from "../../../UI/button/Buttons";
import { MyModal } from "../../../UI/modal/myModal";
import { TextArea } from "../../../UI/textArea/TextArea";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { CardsUserContext } from "../../../Context/CardsUserProvider";
import "./avtors.css";
import {StateParamsContext} from "../../../Context/StateParamsProvider";

export const EditAvtor = () => {
    const { avtorId,setAvtorId, updateArrays } = useContext(CardsUserContext);
    const { avtors, setAvtors} = useContext(StateParamsContext)
    const [newFieldAvtor, setNewFieldAvtor] = useState({
        discribe: avtorId.discribe,
        img: avtorId.img,
    })

    const discribeHandle = (value) => {
        setNewFieldAvtor({ ...newFieldAvtor, discribe: value });
    }
    
    const imgHandle = (value) => {
        setNewFieldAvtor({ ...newFieldAvtor, img: value });
    }

    const updateAvtor = () => {
        setAvtorId({ ...avtorId, ...newFieldAvtor });
        setAvtors(
            avtors.map((avtor) => {
                if (avtor.id === avtorId.id) {
                return { ...avtor, ...newFieldAvtor };
                } else {
                return avtor;
                }
            })
        );
        updateArrays("Avtors", avtorId.id, { ...newFieldAvtor });
    };
    return (
        <MyModal title={<EditOutlinedIcon className="avtor-icons" />}>
            <h3 className="avtor-edit-title"> Редагування</h3>
            <TextArea
                value={newFieldAvtor.discribe}
                placeholder="Опис"
                type="text"
                onChange={(e) => discribeHandle(e.target.value)}
            />
            <TextArea
                value={newFieldAvtor.img}
                placeholder="Обкладинка"
                type="text"
                onChange={(e) => imgHandle(e.target.value)}
            />
            <Buttons onClick={() => updateAvtor(avtorId)}>Зберегти</Buttons>
        </MyModal>
    );
};

export default EditAvtor;
