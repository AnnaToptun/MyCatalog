import { Box, FormGroup, MenuItem } from '@mui/material'
import { React,  useContext, useState } from 'react'
import { CardsUserContext } from '../../Context/CardsUserProvider'
import { NotificationContext } from '../../Context/NotificationProvider';
import {StateParamsContext} from '../../Context/StateParamsProvider';
import { Buttons } from '../../UI/button/Buttons'
import { MyInput } from '../../UI/input/MyInput'
import { MySelect } from '../../UI/select/MySelect' 
import { TextArea } from '../../UI/textArea/TextArea'
import './create.css'

export function CreateCard () {
    const { addCollection, booksCollectionRef} = useContext(CardsUserContext);
    const { createNotification } = useContext(NotificationContext)
    const { avtors, genres, setBooksSort, booksSort } = useContext(StateParamsContext)
    const [cardBook, setCardBook] = useState({
        title: '',
        avtor: '',
        genre: [],
        comments: [],
        year: 2022,
        discribe: '',
        img: '',
        addUsers: []
    })

    const titleHandle = (value)=>{
        setCardBook({...cardBook, title: value})
    }
    const avtorHandle = (event)=>{
        setCardBook({...cardBook, avtor: event.target.value})
    }
    const yearHandle = (value)=>{
        setCardBook({...cardBook, year: value})
    }
    const discribeHandle = (value)=>{
        setCardBook({...cardBook, discribe: value})
    }
    const imgHandle = (value)=>{
        setCardBook({...cardBook, img: value})
    }
    
    const createCard = ()=>{
        setBooksSort([...booksSort, {...cardBook}])
        addCollection(booksCollectionRef, cardBook);
        createNotification('success', ' ', `Вітаємо ви успішно додали книгу ${cardBook.title}` )
        setCardBook({...cardBook, 
            title: '',
            avtor: '',
            genre: [],
            comments: [],
            year: 2022,
            discribe: '',
            img: ''
        })
    }
    const handleChange = (e) => {
        setCardBook({...cardBook, genre: e.target.value})
    }
    
    return (
        <Box className="create">
            <FormGroup className="create-form">
                <MyInput
                    type="text"
                    value={cardBook.title}
                    placeholder="Назва книги"
                    onChange={(e) => titleHandle(e.target.value)}
                    label="Title"
                />
                <MySelect value={cardBook.avtor} onChange={avtorHandle}>
                    {avtors.map((avtor) => (
                        <MenuItem key={avtor.id} value={avtor.avtor}>
                        {avtor.avtor}
                        </MenuItem>
                    ))}
                </MySelect>
                <MySelect multiple value={cardBook.genre} onChange={handleChange}>
                    {genres.map((g) => (
                        <MenuItem key={g.id} value={g.genre}>
                        {g.genre}
                        </MenuItem>
                    ))}
                </MySelect>
                <MyInput
                    type="number"
                    min="1000"
                    step="1"
                    value={cardBook.year}
                    placeholder="Рік створення"
                    onChange={(e) => yearHandle(e.target.value)}
                    label="Рік створення"
                />
                <TextArea
                    type="text"
                    value={cardBook.discribe}
                    placeholder="Опис"
                    onChange={(e) => discribeHandle(e.target.value)}
                    label="Опис"
                />
                <MyInput
                    type="text"
                    value={cardBook.img}
                    placeholder="URL-посилання на картинку"
                    onChange={(e) => imgHandle(e.target.value)}
                    label="URL-посилання на картинку"
                />
                <Buttons onClick={createCard}> Створити </Buttons>
            </FormGroup>
        </Box>
    );
}
