import { React, useContext } from 'react'
import { Link } from 'react-router-dom'
import { Box } from '@mui/material'
import { CardsUserContext } from '../../../Context/CardsUserProvider'
import { EditComment } from './EditComment'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import './comment.css'
import {StateParamsContext} from '../../../Context/StateParamsProvider'

export const NewComment = ({comment, bookId}) => {
    const { setUserId} = useContext(CardsUserContext)
    const {userCurrent, users, user } = useContext(StateParamsContext)
        
    const userComment = users.filter(user => {
        if(user.id ===comment.userId){
            return user
        }
    })

    const userId = userComment[0]

    const detailsUser = ()=>{
        setUserId(userId)
    }

    return (
        <Box className='comments'>
            <Box className='comments-box'>
                <Box className='comments-user'>
                    {
                        (!userId.img)
                        ?
                            <Link to={`/user/profile/${comment.userId}`}>
                                <AccountCircleIcon 
                                    className='comments-icon'
                                    onClick={detailsUser}
                                />
                            </Link>
                        :<Link to={`/user/profile/${comment.userId}`} className='comment-img-box'>
                            <img 
                                className='comment-img'
                                src={userId.img} 
                                alt=''
                                onClick={detailsUser}
                            />
                        </Link>
                    }
                    <span>{userId.fistName} </span>
                </Box>
                <Box>{comment.comment}</Box>
            </Box>
            <Box>
                {
                    (user)
                        ?(userCurrent.status==="admin" || userCurrent.id === comment.userId)
                            ? <EditComment comment={comment} bookId={bookId}/>
                            :''
                        :''
                }
            </Box>
        </Box>
    )
}
