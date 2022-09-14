import  {React, createContext, useState } from 'react';
import { BrowserRouter } from 'react-router-dom'
import { Box } from '@mui/material';
import { MainLoyout } from './components/MainLoyout';
import { CardsUserProvider } from './Context/CardsUserProvider';
import { Loading } from './UI/loading/Loading';
import {BookUserProvider} from './Context/BookUserProvider';
import './App.css';


export const AllCards = createContext()
function App() {
  const [time, setTime]= useState(false)
  setTimeout(() => {
    console.log("Delayed for 1 second.");
    setTime(true)
  }, 1000)

    return (
        <BrowserRouter>
            <Box className='App'>
                { (time)
                    ?<CardsUserProvider>
                        <BookUserProvider>
                            <MainLoyout/>              
                        </BookUserProvider>
                    </CardsUserProvider>
                    : <Loading/>
                }
            </Box>
        </BrowserRouter>
    );
}

export default App;
