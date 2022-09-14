import { React, useContext, useState } from "react";
import { Buttons } from "../../../UI/button/Buttons";
import { MyModal } from "../../../UI/modal/myModal";
import { TextArea } from "../../../UI/textArea/TextArea";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { CardsUserContext } from "../../../Context/CardsUserProvider";
import "./avtors.css";

export const EditAvtor = () => {
    const {avtors, setAvtors, editCardUser, avtorId, setAvtorId} = useContext(CardsUserContext);
    
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
        const id = avtorId.id;
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
        editCardUser(id, "Avtors", newFieldAvtor);
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
