/* Name: Shinya Abe
   Date: 11/4/22
   Pledge: I pledge my honor that I have abided by the Stevens honors system
   Class: CS 554
   Assignment: lab5
*/

import React  from 'react';
import ReactModal from 'react-modal';
import {useMutation} from '@apollo/client';
import queries from '../queries';
import '../App.css';

ReactModal.setAppElement('#root');



const DeleteButton = props => {
    const {imageData, bText} = props;
    let buttonText = bText;

    const [deleteImage] = useMutation(queries.DELETE_IMAGE);

    let id =  imageData.id;
    
    function handleClick(e) {
        deleteImage({
            variables:{
                id: id
            }
        })
                    
        alert('Image Deleted');
        props.refresh();
    }
    
    return (
        <button
            className="button"
                onClick={handleClick}
        >
            {buttonText}
        </button>
    );
}



export default DeleteButton;