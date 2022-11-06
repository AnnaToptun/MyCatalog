import { React, useContext, useState } from 'react'
import { Box, MenuItem } from '@mui/material'
import {StateParamsContext} from '../../../Context/StateParamsProvider'
import { PaginationContext } from '../../../Context/PaginationProvider'
import { MyInput } from '../../../UI/input/MyInput'
import { MySelect } from '../../../UI/select/MySelect'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import './sorted.css'

export const SortedBook = () => {
    const {booksPag, setBooksPag} = useContext(PaginationContext)
    const {books, genres, setBooksSort} = useContext(StateParamsContext)

    const [genre, setGenre] = useState('Оберіть жанр')
    const [search, setSearch] = useState('')
    const [sorts, setSort] = useState('Сортувати за...')
   
    const searchHandle = (value)=>{
        setSearch(value)
        if(value.length < 2){
           setBooksPag({ ...booksPag, order: "title", sort: "asc" });
        }else{
            setBooksSort(books.filter(book => book.title.toLowerCase().includes(value)))
        }
    }

    const sortGenre = (value)=>{
        setGenre(value)
        if(value==='Оберіть жанр' ){
            setBooksPag({ ...booksPag, order: "title", sort: "asc" });
        }else {
            setBooksSort(books.filter(book => book.genre.includes(value)))
        }
    }

    const sorted = (value)=>{
        setSort(value)

        if(value === 'Сортувати за...'){
            setBooksPag({...booksPag, order: 'title', sort:'asc'})
        } else if(value === 'За автором А-Я'){
            setBooksPag({...booksPag, order: 'avtor', sort:'asc'})
        }else if(value === 'За автором Я-А'){
            setBooksPag({...booksPag, order: 'avtor',sort:'desc'})
        }else if(value === 'За назвою А-Я'){
            setBooksPag({...booksPag, order: 'title', sort:'asc'})
        } else if(value === 'За назвою Я-А'){
            setBooksPag({...booksPag, order: 'title', sort:'desc'})
        }
    }
    return (
        <Box className='sorted'>
            <MyInput
                type="text" 
                value={search}
                placeholder='Пошук'
                onChange={(e)=>searchHandle(e.target.value)}
                label='Пошук'
            />
            <MySelect 
                value={sorts}
                labelId="demo-select-small"
                id="demo-select-small"
                label={sorts} 
                onChange={(e)=>sorted(e.target.value)}
                >
                    <MenuItem  value='Сортувати за...'>Сортувати за...</MenuItem>
                    <MenuItem  value='За автором А-Я' >За автором А-Я<ArrowDownwardIcon/></MenuItem>
                    <MenuItem  value='За автором Я-А'>За автором Я-А<ArrowUpwardIcon/></MenuItem>
                    <MenuItem  value='За назвою А-Я' >За назвою А-Я<ArrowDownwardIcon/></MenuItem>
                    <MenuItem  value='За назвою Я-А' >За назвою Я-А<ArrowUpwardIcon/></MenuItem>                    
            </MySelect>
            <MySelect 
                value={genre}
                labelId="demo-select-small"
                id="demo-select-small"
                label={genre}
                onChange={(e)=>sortGenre(e.target.value)}>
                <MenuItem  value='Оберіть жанр'>Оберіть жанр</MenuItem>
                {
                    genres.map((g)=>(
                        <MenuItem key={g.id} value={g.genre}>{g.genre}</MenuItem>
                    ))
                }
            </MySelect>
        </Box>
       
    )
}