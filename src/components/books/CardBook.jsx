import { React, useContext, useState } from 'react'
import { Card, Box } from '@mui/material'
import { useHistory } from 'react-router-dom'
import { CardsUserContext } from '../../Context/CardsUserProvider'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import BookOutlinedIcon from '@mui/icons-material/BookOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import './cards.css'
import {BookUserContext} from '../../Context/BookUserProvider'

export function CardBook ({card }) {
    const { user, userIdBooks, setBookId, avtors,  setCommentIdBooks, setUsersAddBook, setAvtorId, addBooksAvtor, userCurrent } = useContext(CardsUserContext)
    
    const { deleteBook, addBook, delBookUser } = useContext(BookUserContext);
    const route = useHistory()

    const detailsCard =()=>{
        route.push(`/book/${card.id}`)
        setBookId(card)
        setCommentIdBooks([...card.comments])
        setUsersAddBook(card.addUsers);
    }
    
    const avtor = avtors.filter(avtor =>{
        if(avtor.avtor === card.avtor){
            return (avtor)
        }
    })

    const currentAvtor = avtor[0]

    const detailsAvtor = ()=>{
        const booksAvtor = currentAvtor.booksAvtor
        setAvtorId({...currentAvtor, booksAvtor: [...booksAvtor, card.id]})
        const id = currentAvtor.id
        addBooksAvtor(id, booksAvtor, card.id)
        route.push(`/avtor/${currentAvtor.id}`)
    } 
  
    return (
        <Card className='card'> 
            { 
                (user)
                ?
                    <Box>
                    {
                        (userCurrent.status === 'admin')
                        ? <Box>
                            <CloseOutlinedIcon className='card-delete-book' sx={{fontSize: '50px'}} onClick={()=>deleteBook(card.id)}/>
                        </Box>
                        :'' 
                    }
                    </Box>
                :''
            }  
            <Box className='card-img-box' onClick={detailsCard}>
                {
                (card.img)
                    ? <img src={card.img} className='card-img' alt=''/>
                    : <BookOutlinedIcon/> 
                }
            </Box>
            <Box className='card-info'>
                <span className='card-title'>Назва: {card.title}</span>
                <span>Автор:
                    <a className='card-avtor' onClick={detailsAvtor}> {card.avtor} </a> 
                </span>
                {
                (!userIdBooks.includes(card.id))
                    ? <AddOutlinedIcon  className='card-add' sx={{fontSize: '50px'}} onClick={()=>addBook(card)}/>
                    : <RemoveOutlinedIcon className='card-delete' sx={{fontSize: '50px'}} onClick={()=> delBookUser(card)}/>
                }
            </Box>
        </Card>
    )
}
