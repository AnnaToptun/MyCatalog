import { React, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FormControl, FormHelperText } from '@material-ui/core';
import { Box, FormGroup } from "@mui/material";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { CardsUserContext } from '../../Context/CardsUserProvider';
import { Buttons } from '../../UI/button/Buttons';
import {  MyCheckBox } from '../../UI/checkbox/CheckBox';
import { MyInput } from '../../UI/input/MyInput';
import './create.css'
import {StateParamsContext} from '../../Context/StateParamsProvider';
import {auth} from '../../firebase/firebase-config';

export const Register = () => {
    const { addCollection,  usersCollectionRef } = useContext(CardsUserContext);
    const { setUser} = useContext(StateParamsContext)
    const emailReg =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,2}\.[0-9]{1,3}\.[0-9]{1,2}\.[0-9]{1,2}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const passSimpleReg = /(?=.*[a-z])(?=.*[A-Z])[a-zA-Z]{6,}/g;
    const passAvarageReg = /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}/g;
    const passStrongReg = /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}/g;
    const isEmailValid = () => emailReg.test(fieldsForm.email);
    const isPassValid = () => passSimpleReg.test(fieldsForm.password);
    const isPassAvarageValid = () => passAvarageReg.test(fieldsForm.password);
    const isPassStrongValid = () => passStrongReg.test(fieldsForm.password);
    const route = useHistory();
    const [errorEmail, setErrorEmail] = useState(false);
    const [errorName, setErrorName] = useState(false);
    const [errorLastName, setErrorLastName] = useState(false);
    const [errorDate, setErrorDate] = useState(false);
    const [errorPass, setErrorPass] = useState(false);
    const [passCheckbox, setPassCheckbox] = useState(false);
    const [passOpen, setPassOpen] = useState('password');
    const [errorConfirmPass, setErrorConfirmPass] = useState(false);
    const [accept, setAccept] = useState(false);
    const [fieldsForm, setFildsForm] = useState({
        fistName: '',
        lastName: '',
        birthday: '1998-04-05',
        email: '',
        img: '',
        status: 'user',
        password: '',
        userBooks: [],
        id: Date.now(),
    });

    const firstNameHandler = name => {
       ( name.length < 4) ? setErrorName(true) : setErrorName(false);
        setFildsForm({ ...fieldsForm, fistName: name });
    };

    const lastNameHandler = lastname => {
        (lastname.length < 4) ? setErrorLastName(true) : setErrorLastName(false);
        setFildsForm({ ...fieldsForm, lastName: lastname });
    };
    
    const dateHandler = dateUser => {
        const age = new Date().getFullYear() - Number(dateUser.substr(0, 4));
        (age < 18) ? setErrorDate(true): setErrorDate(false);
        setFildsForm({ ...fieldsForm, birthday: dateUser });
    };

    const emailHandler = valueEmail => {
        isEmailValid();
        setFildsForm({ ...fieldsForm, email: valueEmail });
        setErrorEmail(!isEmailValid());
    };

    const passHandler = pass => {
        setFildsForm({ ...fieldsForm, password: pass });
        if (!isPassValid()) {
            setErrorPass(!isPassValid());
            return 'Simple password';
        } else if (!isPassAvarageValid()) {
            setErrorPass(!isPassAvarageValid());
            return 'Avarage password';
        } else {
            setErrorPass(!isPassStrongValid());
            return 'Strong password';
        }
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

    const passConfirmHandler = confirm => {
        fieldsForm.password !== confirm ? setErrorConfirmPass(true) : setErrorConfirmPass(false);
    };

    const CheckHandler = () => {
        accept ? setAccept(false) : setAccept(true);
    };

    const disabledButton = (!isEmailValid ||
        !isPassStrongValid ||
        errorConfirmPass ||
        errorDate ||
        errorName ||
        errorLastName ||
        !accept)
    
    const createAccount = async () => {
        const loginEmail = fieldsForm.email
        const loginPassword = fieldsForm.password
        try{
            await createUserWithEmailAndPassword(auth, loginEmail, loginPassword)
            setUser(true)
            addCollection(usersCollectionRef, { ...fieldsForm });
        }
            catch(error){
            console.log(error)
        }
    }

    const statusPass =() =>{
        if (!isPassValid()) {
            return "Simple password"
        } else if (!isPassAvarageValid()){
            return "Avarage password"
        } else if(!isPassStrongValid()){ 
            return "Strong password"
        }else{
            return "Excallent"
        }
    }

    return (
        <Box className="create">
            <FormGroup className="create-form">
                <h1 className="create-title-form">Реєстрація</h1>
                <FormControl variant="standard">
                    <MyInput
                        value={fieldsForm.fistName}
                        error={errorName}
                        required={true}
                        type="text"
                        placeholder="First Name"
                        label="First Name"
                        onChange={(event) => firstNameHandler(event.target.value)}
                    />
                    <FormHelperText id="component-helper-text">{errorName && "Inccorect name"}</FormHelperText>
                </FormControl>
                <FormControl variant="standard">
                    <MyInput
                        value={fieldsForm.lastName}
                        error={errorLastName}
                        required={true}
                        type="text"
                        placeholder="Last Name"
                        label="LastName"
                        onChange={(event) => lastNameHandler(event.target.value)}
                    />
                    <FormHelperText id="component-helper-text">{errorLastName && "Inccorect lastname"}</FormHelperText>
                </FormControl>
                <FormControl variant="standard">
                    <MyInput
                        value={fieldsForm.birthday}
                        error={errorDate}
                        required={true}
                        type="date"
                        placeholder="Дата народження"
                        label="Дата народження"
                        onChange={(event) => dateHandler(event.target.value)}
                    />
                    <FormHelperText id="component-helper-text">{errorDate && "You can`t registrate"}</FormHelperText>
                </FormControl>
                <FormControl variant="standard">
                    <MyInput
                        required
                        value={fieldsForm.email}
                        error={errorEmail}
                        type="text"
                        placeholder="Email"
                        label="Email"
                        onChange={(event) => emailHandler(event.target.value)}
                    />
                    <FormHelperText id="component-helper-text">{errorEmail && "Incorrect email"}</FormHelperText>
                </FormControl>
                <FormControl variant="standard">
                    <MyInput
                        value={fieldsForm.password}
                        required
                        error={errorPass}
                        type={passOpen}
                        placeholder="Пароль"
                        label="Пароль"
                        onChange={(event) => passHandler(event.target.value)}
                    />
                    <FormHelperText id="component-helper-text">{statusPass()}</FormHelperText>
                </FormControl>
                <FormControl variant="standard">
                    <MyInput
                        value={fieldsForm.passwordComf}
                        error={errorConfirmPass}
                        required
                        type={passOpen}
                        placeholder="Підтвердіть пароль"
                        label="Підтвердіть пароль"
                        onChange={(event) => passConfirmHandler(event.target.value)}
                    />
                    <FormHelperText id="component-helper-text">{errorConfirmPass && "Passwords don't match"}</FormHelperText>
                </FormControl>
                <MyCheckBox
                    checked={passCheckbox}
                    onChange={passCheckHandler}
                    name="checked"
                    label="Показати пароль"
                />
                <MyCheckBox
                    checked={accept}
                    onChange={CheckHandler}
                    name="checked"
                    label="Я приймаю умови використання"
                />
                <Buttons disabled={!disabledButton ? false : true} onClick={createAccount}>
                    Реєстрація
                </Buttons>
                <Buttons onClick={() => route.push("/")}>Вхід</Buttons>
            </FormGroup>
        </Box>
    );
}
