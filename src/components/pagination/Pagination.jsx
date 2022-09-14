import { React, useContext} from 'react'
import { Box } from '@mui/material'
import { db } from '../../firebase/firebase-config'
import { collection, limitToLast, endAt, query, orderBy, limit, startAfter} from 'firebase/firestore'
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { PaginationContext } from '../../Context/PaginationProvider'
import './pagination.css'

export const Pagination= ({children}) => {
    const { last, first, booksPag, getBookLimit, active, limitBooks } = useContext(PaginationContext);

    const next = query(
        collection(db, "Books"),
        orderBy(booksPag.order, booksPag.sort),
        startAfter(last),
        limit(limitBooks)
    );

    const prev = query(
        collection(db, "Books"),
        orderBy(booksPag.order, booksPag.sort),
        endAt(first),
        limitToLast(limitBooks)
    );

    return (
        <Box className="pagination">
            <ArrowBackIosNewIcon
                className={active ? "pagination-icons" : "pagination-icons-disable"}
                onClick={() => getBookLimit(prev)}
            />
            {children}
            <ArrowForwardIosIcon
                className={active ? "pagination-icons" : "pagination-icons-disable"}
                onClick={() => getBookLimit(next)}
            />
        </Box>
    );
}
