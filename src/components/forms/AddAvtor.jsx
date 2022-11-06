
import {React,  useContext, useState } from 'react'
import { Box, FormGroup} from '@mui/material'
import { Buttons } from '../../UI/button/Buttons'
import { MyInput } from '../../UI/input/MyInput'
import { TextArea } from '../../UI/textArea/TextArea'
import {NotificationContext} from '../../Context/NotificationProvider';
import { CardsUserContext } from '../../Context/CardsUserProvider'
import './create.css'
import {StateParamsContext} from '../../Context/StateParamsProvider'

export const AddAvtor = () => {
    const {addCollection,  avtorsCollectionRef} = useContext(CardsUserContext);
    const {setAvtors, avtors,} = useContext(StateParamsContext)
    const { createNotification } = useContext(NotificationContext);
    const [avtor, setAvtor] = useState({
        avtor: '',
        booksAvtor: [],
        discribe: '',
        img: ''
    })

    const avtorHandle = (value)=>{
        setAvtor({...avtor, avtor: value})
    }

    const discribeHandle = (value)=>{
        setAvtor({...avtor, discribe: value})
    }

    const imgHandle = (value)=>{
        setAvtor({...avtor, img: value})
    }

    const addNewAvtor = ()=>{
        createNotification('success', ' ', `Вітаємо ви успішно додали автора ${avtor.avtor}` )
        setAvtors([...avtors, avtor])
        addCollection(avtorsCollectionRef,avtor);
        setAvtor({...avtor, 
            avtor: '',
            discribe: '',
            img: ''
        })
    }

    const errorNewAvtor = ()=>{
        createNotification('error', "Перевірте чи правильно введене ім'я автора", 'Помилка додавання автора' )
    }

    const avtorCreate = avtor.avtor

    return (
        <Box className='create'>
            <FormGroup className='create-form'>
                <MyInput
                    type='text'
                    value={avtor.avtor}
                    placeholder="Ім'я та прізвище автора"
                    onChange={(e)=>avtorHandle(e.target.value)}
                    label="Ім'я та прізвище автора"
                />
                <TextArea
                    type='text'
                    value={avtor.discribe}
                    placeholder="Про автора"
                    onChange={(e)=>discribeHandle(e.target.value)}
                    label="Про автора"
                />
                <MyInput
                    type='text'
                    value={avtor.img}
                    placeholder="Фото автора"
                    onChange={(e)=>imgHandle(e.target.value)}
                    label="Фото автора"
                />
                <Buttons onClick={(avtorCreate.length > 4)? addNewAvtor : errorNewAvtor}>Створити</Buttons>
            </FormGroup>
        </Box>
    )
}
