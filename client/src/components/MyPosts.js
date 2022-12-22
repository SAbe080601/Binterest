/* Name: Shinya Abe
   Date: 11/4/22
   Pledge: I pledge my honor that I have abided by the Stevens honors system
   Class: CS 554
   Assignment: lab5
*/

import React from 'react';
import noImage from '../img/download.jpeg';
import NewPost from './NewPost'
import {useQuery} from '@apollo/client';
import DeleteButton from './DeleteButton';
import BinButton from './BinButton';
import queries from '../queries'
import '../App.css';


function MyPosts() {
    let li = null;
    let img = null;
    let description = null;
    let posterName = null;
    let deleteButton = "Delete";
    let buttonText = null;
    const {loading, error, data, refetch} = useQuery(queries.GET_USERPOSTED_IMAGES, {fetchPolicy: 'network-only'});

    li = data && data.userPostedImages && 
        data.userPostedImages.map((image) => {
            if(image.url){
                img = <img alt="Image" src={image.url}/>
            } else {
                img = <img alt="Image" src={noImage}/>
            }

            if(image.description){
                description = image.description;
            } else {
                description = "N/A";
            }

            if(image.posterName){
                posterName = image.posterName;
            } else {
                posterName = "N/A";
            }

            if(image.binned) {
                buttonText = "Remove from bin" 
            } else {
                buttonText = "Add to Bin" 
            }

            return (
                <div className='card' key={image.id}>
                    <div className= "card-body">
                        {img}
                        <br/>
                        <br/>
                        Author: {posterName}
                        <br/>
                        <br/>
                        Description: {description}
                        <br/>
                        <br/>
                        <DeleteButton 
                            imageData = {image} 
                            bText={deleteButton}
                            refresh= {refetch}
                        />
                        <p>{' '}</p>
                        <BinButton 
                            imageData = {image} 
                            bText={buttonText}
                            modal='MyPosts'
                            refresh= {refetch}
                        />
                    </div>
                </div>
            )
        })
        
    if (loading){
        return <div className="App"> 
                    <h2> Loading...</h2>
                </div>
    } else if (error){
        return  <div className="App">
                    <h2> Unable to Retrieve User's Posts</h2>
                    <br/>
                    <h3>{error.message}</h3>
                </div>
    } else if(data.userPostedImages.length === 0) {
        return  <div className="App"> 
                    <NewPost 
                        refresh = {refetch}
                    />
                    <br/>
                    <h2>User Did Not Post any Images</h2>
                </div>
    }else {
        return (
            <div className="App">
                <h3> Upload New Image </h3>
                <br/>
                <NewPost 
                    refresh = {refetch}
                />
                <br/>
                <h2>My Posts</h2>
                <br/>
                {li}
                <br/>
                
            </div>     
        );
    }
}

export default MyPosts;