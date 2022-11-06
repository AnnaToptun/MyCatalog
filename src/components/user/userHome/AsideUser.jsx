import React from 'react';
import { useState, useContext } from 'react';
import { Tabs, Box } from '@mui/material'
import { BookUserContext } from '../../../Context/BookUserProvider';
import { CardsUserContext } from '../../../Context/CardsUserProvider'
import {StateParamsContext} from '../../../Context/StateParamsProvider';
import { SortedArray } from '../../books/sorted/SortedArray'
import { AllCard } from '../../books/AllCard';
import { AllAvtors } from '../../books/avtors/AllAvtors';
import { UserAllBook } from '../UserAllBook';
import { AsideTab } from '../../../UI/Tab/AsideTab';
import { TabPanel } from './TabPanel';
import './userHome.css'
import {AllUsers} from '../../users/AllUsers';


export const AsideUser = () => {
    const { userIdBooks } = useContext(CardsUserContext);
    const { avtors, genres, books, users} = useContext(StateParamsContext)
    const { usersBooks } = useContext(BookUserContext);
    
    const [value, setValue] = React.useState(0)

    const [sortBooks, setSortBooks] = useState([])
    
    const handleChange = (event: SyntheticEvent, newValue: number) => {
        setValue(newValue);
    }

    const sortBooksGenre = sort => {
        setSortBooks(
            usersBooks.filter(book => {
                return book.genre.includes(sort);
            })
        )
    }
    return (
        <Box className="home-aside">
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                textColor="inherit"
                className="home-tabs">
                
                <AsideTab label={`Книги (${books.length})`} />
                <AsideTab label={`Користувачі (${users.length})`} />
                <AsideTab label={`Автори (${avtors.length})`} />
                <AsideTab label={`Мої книги (${userIdBooks.length})`} />
                {genres.map((g) => (
                    <AsideTab
                        key={g.id}
                        label={g.genre}
                        onClick={() => sortBooksGenre(g.genre)}
                    />
                ))}
            </Tabs>
            <TabPanel value={value} index={0}>
                <AllCard />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <AllUsers />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <AllAvtors />
            </TabPanel>
            <TabPanel value={value} index={3}>
                <UserAllBook />
            </TabPanel>        
           {genres.map((g, index) => (
                <TabPanel value={value} key={g.id} index={index + 4}>
                    <SortedArray
                        books={sortBooks}
                    />
                </TabPanel>
            ))}
 
        </Box>
    );
}
