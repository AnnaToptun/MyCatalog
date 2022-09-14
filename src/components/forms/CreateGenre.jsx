import { Box, FormGroup } from '@mui/material'
import { React, useContext, useState } from 'react'
import { CardsUserContext } from '../../Context/CardsUserProvider'
import {NotificationContext} from '../../Context/NotificationProvider'
import { Buttons } from '../../UI/button/Buttons'
import { MyInput } from '../../UI/input/MyInput'
import "./create.css";

export const CreateGenre = () => {
    const { setGenres, genres, addCollection, genresCollectionRef } = useContext(CardsUserContext);
    const { createNotification } = useContext(NotificationContext);
    const [genre, setGenre] = useState({
        genre: ''
    })
    
    const newGenreHandler =(value)=>{
        setGenre({...genre, genre: value})
    }
    
    const createGenre = ()=>{
        addCollection(genresCollectionRef, genre);
        setGenre({...genre, genre: ''})
        setGenres([...genres, genre])
        createNotification('success', ' ', `Вітаємо ви успішно додали жанр ${genre.genre}` )
    }
    
    return (
        <Box className="create">
            <FormGroup className="create-form">
                <MyInput
                    type="text"
                    value={genre.genre}
                    placeholder="Назва жанру"
                    label="genre"
                    onChange={(e) => newGenreHandler(e.target.value)}
                />
                <Buttons onClick={createGenre}>Create Genre</Buttons>
            </FormGroup>
        </Box>
    );
}
