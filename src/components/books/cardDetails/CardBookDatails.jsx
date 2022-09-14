import { Box, Container } from '@mui/material'
import { React, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { FormComment } from '../comment/FormComment'
import { Comments } from '../comment/Comments'
import {EditBook} from './EditBook'
import {CardsUserContext} from '../../../Context/CardsUserProvider'
import {BookIcons} from './BookIcons'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import bookIMG from '../../../img/book.jpg'
import './book.css'
import {NotificationContext} from '../../../Context/NotificationProvider';

export const CardBookDatails = () => {
    const {
      updateListUsers,
      deleteBookUser,
      user,
      avtors,
      userCurrent,
      userIdBooks,
      usersAddBook,
      setUsersAddBook,
      bookId,
      setAvtorId,
        updateArrays,
      setUserIdBooks
    } = useContext(CardsUserContext); 
    const {createNotification} = useContext(NotificationContext)
    

    const route = useHistory()
       
    const avtorIdCurrent = avtors.filter(avtor =>{
        if(avtor.avtor === bookId.avtor)
        return (avtor)
    })

    const addUsers = bookId.addUsers 

    const currentAvtor = avtorIdCurrent[0]  

    const detailsAvtor = ()=>{
        const booksAvtor = currentAvtor.booksAvtor
        setAvtorId({...currentAvtor, booksAvtor: [...booksAvtor,bookId.id]})
        route.push(`/avtor/${currentAvtor.id}`)
    }

    const addBookIdUser = (card) => {
        userIdBooks.includes(card.id)
          ? setUserIdBooks([...userIdBooks])
          : setUserIdBooks([...userIdBooks, card.id]);
        const updateUser = { userBooks: [...userIdBooks, card.id] };
        updateArrays("Users", userCurrent.id, updateUser);
        
    }
    const addUserIdBook = () => {
        const arrayUsers = [...usersAddBook, userCurrent.id]; 
        const updateBook = { addUsers: arrayUsers };
        updateArrays("Books", bookId.id, updateBook);
        setUsersAddBook(arrayUsers);
    };

    const addBook = async (card) => {
        
        addBookIdUser(card);
        addUserIdBook();
        createNotification(
          "success",
          `Ви успішно додали книгу ${card.title} до свого каталогу`
        );
    }

    const delBookUser = async card => {
        const field = addUsers.filter(user => {
            if(user !== userCurrent.id){
                return user
            }
        }) 
        setUsersAddBook([...field])
        updateListUsers(card.id, field) 
        deleteBookUser(userCurrent.id, userCurrent.userBooks, card.id); 
        createNotification('warning', `Ви видалили книгу ${card.title} зі свого каталогу`)
    }
    
    return (
        <Container p={10} my={4}>
            <Box  >
                <Box className='book'>
                    <Box className='book-img-box'>
                        {
                        (bookId.img ) 
                        ? <img src={bookId.img || bookIMG} className='book-img' alt=''/>
                        : <img src={bookIMG}  className='book-img'/>
                        }
                    </Box> 
                    <Box className='book-details'> 
                        <Box className='book-edit'>
                            <span className='book-title'>{bookId.title}</span>
                            <Box className='book-icons-box'>
                                {
                                (user)
                                    ? (userCurrent.status==="admin")
                                        ?<EditBook/>
                                        :''
                                    :''
                                }
                                {
                                (user) 
                                ?
                                    <Box>
                                    {
                                        (!userIdBooks.includes(bookId.id))
                                        ? <AddOutlinedIcon  className='book-icons' sx={{fontSize: '2em'}} onClick={()=>addBook(bookId)}/>
                                        : <RemoveOutlinedIcon  className='book-icons' sx={{fontSize: '2em'}} onClick={()=> delBookUser(bookId)}/>
                                    }
                                    </Box>
                                :''
                                }
                            </Box>
                        </Box>
                        <span> Автор: 
                        <a className='book-avthor' onClick={detailsAvtor}> {bookId.avtor}</a>                  
                        </span>
                        <span>Жанр: {bookId.genre.join(', ')}</span>
                        <span>Рік: {bookId.year}</span>
                        <p>Опис: {bookId.discribe}</p>
                        <BookIcons/>
                    </Box>
                </Box> 
                <Comments bookId={bookId} />
                {
                    (user)
                        ? <FormComment bookCurrent={bookId}/>
                        : <p>Незареєстровані користувачі не можуть залишати коментарі</p>
                }
            </Box>
        </Container>
    
    )
}
