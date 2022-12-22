/* Name: Shinya Abe
   Date: 11/4/22
   Pledge: I pledge my honor that I have abided by the Stevens honors system
   Class: CS 554
   Assignment: lab5
*/

import { gql } from '@apollo/client'

const GET_UNSPLASHED_IMAGES = gql`
    query unsplashImages($pageNum: Int) {
        unsplashImages(pageNum: $pageNum){
            id
            url
            posterName
            description
            userPosted
            binned
        }
    }
`;

const GET_BINNED_IMAGES = gql`
    query {
        binnedImages {
            id
            url
            posterName
            description
            userPosted
            binned
        }
    }
`;

const GET_USERPOSTED_IMAGES = gql`
    query {
        userPostedImages {
            id
            url
            posterName
            description
            userPosted
            binned
        }   
    }
`;

const UPLOAD_IMAGE = gql`
    mutation uploadImage($url: String!, $description: String, $posterName: String){
        uploadImage(url: $url, description: $description, posterName: $posterName){
            id
            url
            posterName
            description
            userPosted
            binned  
        }
    }
`;

const DELETE_IMAGE = gql`
    mutation deleteImage($id: ID!){
        deleteImage(id: $id){
            id
            url
            posterName
            description
            userPosted
            binned
        }
        
    }
`;

const UPDATE_IMAGE = gql`
    mutation updateImage($id: ID!, $url: String, $posterName: String, $description: String, $userPosted: Boolean, $binned: Boolean){
        updateImage(id: $id, url: $url, posterName: $posterName, description: $description, userPosted: $userPosted, binned: $binned ){
            id
            url
            posterName
            description
            userPosted
            binned
        }
    }
`;

export default {
    GET_UNSPLASHED_IMAGES, 
    GET_BINNED_IMAGES, 
    GET_USERPOSTED_IMAGES, 
    UPLOAD_IMAGE, 
    DELETE_IMAGE, 
    UPDATE_IMAGE
};