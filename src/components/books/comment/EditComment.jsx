import { React, useContext, useState } from "react";
import { Box } from "@mui/material";
import { MyModal } from "../../../UI/modal/myModal";
import { Buttons } from "../../../UI/button/Buttons";
import { TextArea } from "../../../UI/textArea/TextArea";
import { CardsUserContext } from "../../../Context/CardsUserProvider";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import "./comment.css";

export const EditComment = ({ comment, bookId }) => {
    const { commentIdBooks, setCommentIdBooks, updateArrays } = useContext(CardsUserContext);
    
    const [editComment, setEditComment] = useState(comment.comment);

    const commentBook = (value) => {
        setEditComment(value);
    };
    const fieldChange = commentIdBooks.map((com) => {
        if (com.id === comment.id) {
            return { ...com, comment: editComment };
        } else {
            return com;
        }
    });
    
    const field = commentIdBooks.filter((com) => {
        if (com.id !== comment.id) {
        return com;
        }
    });

    const updateComment = () => {
        const updateComment = { ...bookId, comments: fieldChange };
        setCommentIdBooks(fieldChange);
        updateArrays("Books", bookId.id, updateComment);
    };

    const deleteComment = () => {
        const deleteComment = { ...bookId, comments: field };
        setCommentIdBooks(field);
        updateArrays("Books", bookId.id, deleteComment);
    };

    return (
        <Box className="comments-icons-box">
            <MyModal title={<EditOutlinedIcon className="comments-icons" />}>
                <TextArea
                    value={editComment}
                    type="text"
                    onChange={(e) => commentBook(e.target.value)}
                />
                <Box className="comments-edit-box">
                    <Buttons onClick={updateComment}>Зберегти</Buttons>
                </Box>
            </MyModal>
            <CloseOutlinedIcon className="comments-icons" onClick={deleteComment} />
        </Box>
    );
};
