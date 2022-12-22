/* Name: Shinya Abe
   Date: 11/4/22
   Pledge: I pledge my honor that I have abided by the Stevens honors system
   Class: CS 554
   Assignment: lab5
*/

import React, {useState} from 'react';
import noImage from '../img/download.jpeg';
import {useQuery} from '@apollo/client';
import BinButton from './BinButton';
import queries from '../queries';
import '../App.css';


function MyBin() {
    let li = null;
    let img = null;
    let description = null;
    let posterName = null;
    let buttonText = null;
    const {loading, error, data, refetch} = useQuery(queries.GET_BINNED_IMAGES, {fetchPolicy: 'network-only'});

    li = data && data.binnedImages && 
        data.binnedImages.map((image) => {
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
                        <BinButton 
                            imageData = {image} 
                            bText={buttonText}
                            modal ='MyBin'
                            refresh = {refetch}
                        />
                        <br/>
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
                    <h2> Unable to Retrieve Binned Images</h2>
                    <br/>
                    <h3>{error.message}</h3>
                </div>
    } else if(data.binnedImages.length === 0) {
        return <div className="App"> <h2>User Does not have any Binned Images</h2></div>
    }else {
        return (
            <div className="App">
                <h2> My Bin</h2>
                <br/>
                <br/>
                {li}
                <br/>
                <br/>
            </div>     
        );
    }
}

export default MyBin;