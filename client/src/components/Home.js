/* Name: Shinya Abe
   Date: 11/4/22
   Pledge: I pledge my honor that I have abided by the Stevens honors system
   Class: CS 554
   Assignment: lab5
*/

import React, {useState} from 'react';
import noImage from '../img/download.jpeg';
import BinButton from './BinButton'
import {useQuery} from '@apollo/client';
import queries from '../queries'
import '../App.css';


function  Home() {
    const [currentPage, setCurrentPage] = useState(0);

    let li = null;
    let img = null;
    let description = null;
    let posterName = null;
    let buttonText = null;
    
 
    const {loading, error, data, refetch} =  useQuery(queries.GET_UNSPLASHED_IMAGES, {
        variables: {pageNum: currentPage} , 
        fetchPolicy: 'network-only',
        nextFetchPolicy: 'cache-first' 
    });
       
    

    
    li = data && data.unsplashImages && 
        data.unsplashImages.map((image) => {
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
                            modal ='Home'
                        />
                        <br/>
                    </div>
                </div>
                
            )
        })
    
    let nextPage = currentPage + 1;
    let previousPage = currentPage - 1;

    function handleGetMoreClick() {
        refetch({pageNum: nextPage});
        setCurrentPage(currentPage + 1);
    }

    function handleGetPrevClick(){
        refetch({pageNum: previousPage});
        setCurrentPage(currentPage - 1);
    }

    if (loading){
        return <div className="App"> 
                    <h2> Loading...</h2>
                </div>
    } else if (error){
        return  <div className="App">
                    <h2> Unable to Retrieve Unsplash Images</h2>
                    <br/>
                    <h3>Error: {error.message}</h3>
                    <br/>
                    <br/>
                    <button
                        className="button"
                        onClick={handleGetPrevClick}
                    >
                        Get Prev
                    </button>
                </div>
    } else if (data){
        if(previousPage < 0){
            return (
                <div className="App">
                    <h2> Unsplash Images</h2>
                    <br/>
                    <button
                        className="button"
                        onClick={handleGetMoreClick}
                    >
                        Get More
                    </button>
                    <br/>
                    <br/>
                    {li}
                    <br/>
                    <button
                        className="button"
                        onClick={handleGetMoreClick}
                    >
                        Get More
                    </button>
                </div>
            );            
        } else {
            return (
                <div className="App">
                    <h2> Unsplash Images</h2>
                    <br/>
                    <button
                        className="button"
                        onClick={handleGetPrevClick}
                    >
                        Get Prev
                    </button>   
                    <p>{' '}</p>                 
                    <button
                        className="button"
                        onClick={handleGetMoreClick}
                    >
                        Get More
                    </button>
                    <br/>
                    <br/>
                    {li}
                    <br/>
                    <button
                        className="button"
                        onClick={handleGetPrevClick}
                    >
                        Get Prev
                    </button>   
                    <p>{' '}</p>                 
                    <button
                        className="button"
                        onClick={handleGetMoreClick}
                    >
                        Get More
                    </button>                  
                </div>
            );
        }
    }
    
}

export default Home;