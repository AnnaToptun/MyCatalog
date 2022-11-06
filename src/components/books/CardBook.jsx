import { React, useContext} from 'react'
import { Card, Box } from '@mui/material'
import { useHistory } from 'react-router-dom'
import { CardsUserContext } from '../../Context/CardsUserProvider'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import BookOutlinedIcon from '@mui/icons-material/BookOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import './cards.css'
import {BookUserContext} from '../../Context/BookUserProvider'
import {StateParamsContext} from '../../Context/StateParamsProvider'

export function CardBook ({card }) {
    const { userIdBooks, setBookId, setCommentIdBooks, setUsersAddBook, setAvtorId, updateArrays } = useContext(CardsUserContext);
    const { avtors, user, userCurrent } = useContext(StateParamsContext)
    const { deleteBook, addBook, delBookUser } = useContext(BookUserContext);
    const route = useHistory()

    const detailsCard =(card)=>{
        route.push(`/book/${card.id}`)
        setBookId(card)
        setCommentIdBooks([...card.comments])
    }
    
    const avtor = avtors.filter(avtor =>avtor.avtor === card.avtor)

    const currentAvtor = avtor[0]

    const detailsAvtor = ()=>{
        const booksAvtor = currentAvtor.booksAvtor
        setAvtorId({...currentAvtor, booksAvtor: [...booksAvtor, card.id]})
        const arrayBooks = { booksAvtor: [...booksAvtor, card.id] };
        updateArrays("Avtors", currentAvtor.id, arrayBooks);
        route.push(`/avtor/${currentAvtor.id}`)
    } 
  
    return (
        <Card className="card">
            {user ? (
                <Box>
                    {userCurrent.status === "admin" ? (
                    <Box>
                        <CloseOutlinedIcon
                        className="card-delete-book"
                        sx={{ fontSize: "50px" }}
                        onClick={() => deleteBook(card.id)}
                        />
                    </Box>
                    ) : (
                    ""
                    )}
                </Box>
                ) : (
                ""
                )}
                <Box className="card-img-box" onClick={() => detailsCard(card)}>
                    {card.img ? (
                        <img src={card.img} className="card-img" alt="" />
                    ) : (
                        <BookOutlinedIcon />
                    )}
                </Box>
            <Box className="card-info">
                <span className="card-title">Назва: {card.title}</span>
                <span>
                    Автор:
                    <a className="card-avtor" onClick={detailsAvtor}>
                    {card.avtor}
                    </a>
                </span>
                {!userIdBooks.includes(card.id) ? (
                    <AddOutlinedIcon
                    className="card-add"
                    sx={{ fontSize: "50px" }}
                    onClick={()=>addBook(card)}
                    />
                ) : (
                    <RemoveOutlinedIcon
                    className="card-delete"
                    sx={{ fontSize: "50px" }}
                    onClick={()=>delBookUser(card)}
                    />
                )}
            </Box>
        </Card>
    );
}
