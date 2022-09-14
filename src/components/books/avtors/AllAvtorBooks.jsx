import React from 'react'
import {Card, Box} from "@material-ui/core";
import './avtors.css'

export const AllAvtorBooks = ({ avtorBooks, detailsCard }) =>  (
    <Box className="avtor-books">
        {avtorBooks.map((book) => (
            <Box key={book.id} mx={2} my={2}>
                <Card className="avtors-card" onClick={() => detailsCard(book)}>
                    <div className="avtor-img">
                    <img src={book.img} style={{ width: "100%" }} alt="" />
                    </div>
                    <p className="avtor-book-name">{book.title}</p>
                </Card>
            </Box>
        ))}
    </Box>
);

