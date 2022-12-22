/* Name: Shinya Abe
   Date: 11/4/22
   Pledge: I pledge my honor that I have abided by the Stevens honors system
   Class: CS 554
   Assignment: lab5
*/

import React, {useState} from 'react';

import {useMutation} from '@apollo/client';
import queries from '../queries'
import '../App.css';
  

const NewPost = props => {
    
    const [url, setUrl] = useState('');
    const [description, setDescription] = useState('');
    const [posterName, setPosterName] = useState('');

    const [uploadImage] = useMutation(queries.UPLOAD_IMAGE);

    let body = null;
    
    body = (
        <form
            className = 'form'
            id= 'uploadImage-form'
            onSubmit = {(e) => {
                e.preventDefault();
                uploadImage({
                    variables: {
                        url: url,
                        description: description,
                        posterName: posterName
                    },
                });
                setUrl('');
                setDescription('');
                setPosterName('');
                alert('Successfully Uploaded Image');
                if(props.refresh){
                    props.refresh();
                }
            }}
        >
            <div className= 'form-group'>
                <label>
                    Url:
                    <br />
                    <input
                        type= "text"
                        placeholder = "URL"
                        required
                        autoFocus={true}
                        onChange = {(event) => {
                            setUrl(event.target.value);
                        }}
                    />
                </label>
            </div>
            <br />                    
            <div className= 'form-group'>
                <label>
                    Description:
                    <br />
                    <input
                        type= "text"
                        name = "description"
                        placeholder = "Description"
                        onChange = {(event) => {
                            setDescription(event.target.value);
                        }}
                    />
                </label>
            </div>
            <br />                    
            <div className= 'form-group'>
                <label>
                    Poster Name:
                    <br />
                    <input
                        type= "text"
                        name = "posterName"
                        placeholder = "Poster Name"
                        onChange = {(event) => {
                            setPosterName(event.target.value);
                        }}
                    />
                </label>
            </div>
            <br /> 
            <button className='button' type='submit'>
                Upload Image
            </button>
        </form>
    )
    return (  
        <div className= "App">
            {body}
        </div>
    );
}

export default NewPost;