import { React, useContext, useState} from 'react';
import { FormGroup, Box } from '@mui/material';
import { useHistory, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { StateParamsContext } from '../../Context/StateParamsProvider';
import { NotificationContext} from '../../Context/NotificationProvider';
import { Buttons } from '../../UI/button/Buttons';
import { MyCheckBox } from '../../UI/checkbox/CheckBox';
import { MyInput } from '../../UI/input/MyInput';
import { auth } from '../../firebase/firebase-config';
import 'react-notifications/lib/notifications.css';
import './create.css'

export const Login = () => {
    const { users, setUser } = useContext(StateParamsContext);
    const {createNotification} = useContext(NotificationContext);
    
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [errorLogin, setErrorLogin] = useState(false);
    const [errorPass, setErrorPass] = useState(false);
    const [passCheckbox, setPassCheckbox] = useState(false);
    const [passOpen, setPassOpen] = useState('password');
    const [userId, setUserId] = useState({});
    const route = useHistory();
    
    const loginUse = e => {
        setLogin(e);
        users.filter(user =>{ 
            if(user.email === e){
                setErrorLogin(false)
                setUserId(user)
            } else {
                setErrorLogin(true)
                
            }
        })
    };

    const passwordUser = e => {
        setPassword(e);
        (userId.pasword===e)? setErrorPass(false): setErrorPass(true)
    };

    const passCheckHandler = () => {
        if (passCheckbox) {
            setPassOpen('password');
            setPassCheckbox(false);
        } else {
            setPassOpen('text');
            setPassCheckbox(true);
        }
    };

    const signIn = () => {
        route.push('/quest/register');
    };

    const loginEmailPassword = async () => {
        const loginEmail = login;
        const loginPassword = password;
        try {
            await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
            createNotification('success', 'Раді знову бачити Вас', 'Ласкаво просимо')
            setUser(true)
        } catch (error) {
            createNotification('error', 'Логін чи пароль не вірні', 'Помилка входу' )
        }
    };
  
    return (
        <Box className="create">
            <FormGroup className="create-form">
                <h1 className="create-title-form">Авторизація</h1>
                <MyInput
                    error={errorLogin}
                    value={login}
                    type="text"
                    placeholder="Login"
                    label="Login"
                    onChange={(e) => loginUse(e.target.value)}
                />
                <MyInput
                    error={errorPass}
                    value={password}
                    type={passOpen}
                    placeholder="Password"
                    label="Password"
                    onChange={(e) => passwordUser(e.target.value)}
                />
                <MyCheckBox
                    checked={passCheckbox}
                    onChange={passCheckHandler}
                    name="checked"
                    label="Показати пароль"
                />
                <Link to="/quest/resetParol" className="create-link">
                Забули пароль
                </Link>
                <Box className="create-form-buttons">
                    <Buttons onClick={signIn}>Реєстрація</Buttons>
                    <Buttons onClick={loginEmailPassword}>Вхід</Buttons>
                </Box>
            </FormGroup>
        </Box>
    );
}
