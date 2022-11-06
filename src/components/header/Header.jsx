import { React, useContext } from 'react'
import { BrowserRouter as Router, Link} from 'react-router-dom';
import { Box, Container } from '@mui/material';
import { CardsUserContext } from '../../Context/CardsUserProvider';
import { StateParamsContext } from '../../Context/StateParamsProvider';
import { signOut } from 'firebase/auth'
import { useHistory } from 'react-router-dom';
import { auth } from '../../firebase/firebase-config';
import './Header.css'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'

export const Header = ({children}) => {
    const { setUserId} = useContext(CardsUserContext)
    const { user, setUser, userCurrent} = useContext(StateParamsContext)
    
    const route = useHistory()
    const logOut = async () =>{
        setUser(false)
        await signOut(auth)
        route.push('/quest/login')
    }
    
    const myProfile = ()=>{
        setUserId(userCurrent)
    }
    return (
        <Router>
            <nav className="header">
                <Container className="box-header">
                    <Link to={(user) ? "/user/home" : "/quest/home"}> <span className="logo">MyCatalog</span></Link>
                    {(user) 
                        ?
                            <Box className="box-header">
                                {(!userCurrent.img)
                                    ?
                                        <Link to={`/user/profile/${userCurrent.id}`}>
                                            <AccountCircleIcon
                                                onClick={myProfile}
                                                className='header-account'
                                                style={{fontSize: '2.8em'}}
                                            />
                                        </Link>
                                    : 
                                        <Link to={`/user/profile/${userCurrent.id}`} className="avatarUserBox">
                                            <img className="avatarUser" src={userCurrent.img} alt="" onClick={myProfile}/>
                                        </Link>
                                }

                                <ul className="header-links">
                                    <li><Link to="/user/create">Додати...</Link></li>
                                    <li><Link to="/" onClick={logOut}> Вихід </Link></li>
                                </ul>
                            </Box>                    
                        : 
                            <Box className="header-adaptive">
                                <ul className="header-links">
                                <li><Link to="/quest/home">Головна</Link></li>
                                <li><Link to="/">Вхід</Link></li>
                                <li><Link to="/quest/register">Регістрація</Link></li>
                                </ul>
                            </Box>
                    }
                </Container>
            </nav>
            <main>
                <Container className="box-main">{children}</Container>
            </main>
        </Router>
    );
}
