/* Name: Shinya Abe
   Date: 11/4/22
   Pledge: I pledge my honor that I have abided by the Stevens honors system
   Class: CS 554
   Assignment: lab5
*/

import React, {useState} from 'react';
import ReactModal from 'react-modal';
import {useMutation} from '@apollo/client';
import queries from '../queries';
import '../App.css';

ReactModal.setAppElement('#root');


const Button = props => {
    const {imageData, modal, bText} = props;
    const [buttonText, setButtonText] = useState(bText);

    const [binImage] = useMutation(queries.UPDATE_IMAGE);

    function handleClick1() {
        let id =  imageData.id;
        let description = imageData.description;
        let url =imageData.url;
        let posterName = imageData.posterName;
        let userPosted = imageData.userPosted;
        let binned =  imageData.binned;
        if(!binned){
            setButtonText("Remove from bin");
            binImage({
                variables:{
                    id: id,
                    url: url,
                    posterName: posterName,
                    description: description,
                    userPosted: userPosted,
                    binned: true
                }
            })
                    
            alert('Image Binned');
            if(props.refresh){
                props.refresh();
            }
            return (
                <button
                className="button"
                    onClick={handleClick1}
                >
                    {buttonText}
                </button>
            )
        } else {
            setButtonText('Add to Bin');
            binImage({
                variables:{
                    id: id,
                    url: url,
                    posterName: posterName,
                    description: description,
                    userPosted: userPosted,
                    binned: false
                }
            })
            alert('Image Removed from Binned');
            if(props.refresh){
                props.refresh();
            }
            return (
                <button
                className="button"
                    onClick={handleClick1}
                >
                    {buttonText}
                </button>
            )
        }
    }

    function handleClick2() {
        let id =  imageData.id;
        let description = imageData.description;
        let url =imageData.url;
        let posterName = imageData.posterName;
        let userPosted = imageData.userPosted;
        binImage({
            variables:{
                id: id,
                url: url,
                posterName: posterName,
                description: description,
                userPosted: userPosted,
                binned: false
            }
        })
        props.refresh();
        alert('Image Removed from Binned');
    }

    if(modal === 'Home' || modal === 'MyPosts'){
        return (
            <button
                className="button"
                    onClick={handleClick1}
            >
                {buttonText}
            </button>
        );
    } else {
        return (
            <button
                className="button"
                    onClick={handleClick2}
            >
                {buttonText}
            </button>
        );
    }

}



export default Button;