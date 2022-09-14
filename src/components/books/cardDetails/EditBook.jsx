import {React, useContext, useState} from "react";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import {FormGroup, MenuItem} from "@mui/material";
import { Buttons } from "../../../UI/button/Buttons";
import { CardsUserContext } from "../../../Context/CardsUserProvider";
import { MyInput } from "../../../UI/input/MyInput";
import { MyModal } from "../../../UI/modal/myModal";
import { MySelect } from "../../../UI/select/MySelect";
import { TextArea } from "../../../UI/textArea/TextArea";
import "./book.css";

export const EditBook = () => {
    const {
        editCardUser,
        genres,
        avtors,
        booksSort,
        setBooksSort,
        bookId,
        setBookId,
    } = useContext(CardsUserContext);

    const [newFieldBook, setNewFieldBook] = useState({
        title: bookId.title,
        year: bookId.year,
        genre: bookId.genre,
        discribe: bookId.discribe,
        img: bookId.img,
        read: bookId.read,
        buy: bookId.buy,
    });

    const updateBook = async () => {
        setBookId({ ...bookId, ...newFieldBook });
        setBooksSort(
        booksSort.map((book) => {
            if (book.id === bookId.id) {
            return { ...book, ...newFieldBook };
            } else {
            return book;
            }
        })
        );
        editCardUser(bookId.id, "Books", newFieldBook);
    };
    
    const titleHandler = (value) => {
        setNewFieldBook({ ...newFieldBook, title: value });
    };

    const yearHandler = (value) => {
        setNewFieldBook({ ...newFieldBook, year: value });
    };

    const discribeHandler = (value) => {
        setNewFieldBook({ ...newFieldBook, discribe: value });
    };

    const imgHandler = (value) => {
        setNewFieldBook({ ...newFieldBook, img: value });
    };

    const readHandler = (value) => {
        setNewFieldBook({ ...newFieldBook, read: value });
    };
    const buyHandler = (value) => {
        setNewFieldBook({ ...newFieldBook, buy: value });
    };

    const handleChange = (e) => {
        setNewFieldBook({ ...newFieldBook, genre: e.target.value });
    };

   return (
    <MyModal
      title={
        <EditOutlinedIcon className="book-icons" sx={{ fontSize: "2em" }} />
      }
    >
        <h3 className="book-edit-title">Редагування</h3>
        <FormGroup>
            <MyInput
                value={newFieldBook.title}
                placeholder="Назва"
                type="text"
                onChange={(e) => titleHandler(e.target.value)}
            />
            <MyInput
                value={newFieldBook.year}
                placeholder="Рік"
                type="number"
                onChange={(e) => yearHandler(e.target.value)}
            />
            <MySelect multiple value={newFieldBook.genre} onChange={handleChange} sx={{width: '100%'}}>
                {genres.map((g) => (
                    <MenuItem key={g.id} value={g.genre}>
                        {g.genre}
                    </MenuItem>
                ))}
            </MySelect>
            <TextArea
                value={newFieldBook.discribe}
                placeholder="Опис"
                type="text"
                onChange={(e) => discribeHandler(e.target.value)}
            />
            <TextArea
                value={newFieldBook.img}
                placeholder="Обкладинка"
                type="text"
                onChange={(e) => imgHandler(e.target.value)}
            />
            <TextArea
                value={newFieldBook.buy}
                placeholder="buy"
                type="text"
                onChange={(e) => buyHandler(e.target.value)}
            />
            <TextArea
                value={newFieldBook.read}
                placeholder="read"
                type="text"
                onChange={(e) => readHandler(e.target.value)}
            />
            <Buttons onClick={() => updateBook(bookId)}>Зберегти</Buttons> 
        </FormGroup>
    </MyModal>
  );
};
