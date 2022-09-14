import { React, useContext, useState } from 'react'
import { Box, FormGroup } from '@mui/material'
import { sendPasswordResetEmail } from 'firebase/auth'
import {NotificationContext} from '../../Context/NotificationProvider'
import { Buttons } from '../../UI/button/Buttons'
import { MyInput } from '../../UI/input/MyInput'
import {auth} from '../../firebase/firebase-config'
import './create.css'

export const ResetPassword = () => {
    const {createNotification} = useContext(NotificationContext)
    const [email, setEmail] = useState('') 
    const emailHandler = (value)=>{
        setEmail(value)
    }

    const resetPassword = async()=>{
        await sendPasswordResetEmail(auth, email)
        .then(() => {
            console.log('Password reset email sent!')
            createNotification('success', `На вашу адресу відправлене повідомлення`, 'Запит на зміну пароля пройшов успішно')
        })
        .catch((error) => {
            const errorMessage = error.message;
            console.log(errorMessage)
            createNotification('error', `Виникла помилка ${errorMessage}`, 'Такої елетронної адреси не зареєстровано')
        })
        
    }
    return (
        <Box className="create">
            <FormGroup className="create-form">
                <h1 className="create-title-form">Відновлення паролю</h1>
                <MyInput
                    value={email}
                    type="text"
                    placeholder="Введіть свій e-mail"
                    label="Введіть свій e-mail"
                    onChange={(e) => emailHandler(e.target.value)}
                />
                <Buttons onClick={resetPassword}>Відправити</Buttons>
            </FormGroup>
        </Box>
    );
}
