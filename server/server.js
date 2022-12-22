/* Name: Shinya Abe
   Date: 11/4/22
   Pledge: I pledge my honor that I have abided by the Stevens honors system
   Class: CS 554
   Assignment: lab5
*/

const {ApolloServer, gql} = require("apollo-server");

const uuid = require("uuid");
const redis = require ("redis");
const axios = require("axios");

const client = redis.createClient();
client.connect().then(() => {});
const AccessKey = "KtjU195pj_UywPKoDfrwWJwh7Dohy4ygYhRrvTSgXYc";
const check = require('./check');

const typeDefs = gql`
    type Query {
        unsplashImages(pageNum: Int): [ImagePost]
        binnedImages: [ImagePost]
        userPostedImages: [ImagePost]
    }

    type ImagePost {
        id: ID!
        url: String!
        posterName: String!
        description: String
        userPosted: Boolean!
        binned: Boolean!
    }

    type Mutation {
        uploadImage(url: String!, description: String, posterName: String): ImagePost
        updateImage(id: ID!, url: String, posterName: String, description: String, userPosted: Boolean, binned: Boolean): ImagePost
        deleteImage(id: ID!): ImagePost
    }
`;

const resolvers = {
    Query: {
        unsplashImages: async (_,args) => {
            const { data } = await axios.get(`https://api.unsplash.com/photos?page=${args.pageNum}&per_page=30&client_id=${AccessKey}`);
            let result = [];
            data.forEach((image) =>{
                let newPostId = uuid.v4();
                let url = undefined;
                let posterName = undefined;
                let description = undefined;
                if(image.urls && image.urls.small){
                    url = image.urls.small;
                }
                if(image.user && image.user.name){
                    posterName = image.user.name;
                }
                if(image.description){
                    description = image.description;
                }
                let newImagePost = {
                    id: newPostId, 
                    url: url, 
                    posterName: posterName, 
                    description: description,
                    userPosted: false,
                    binned: false
                }
                result.push(newImagePost);
            })
            for(let i = 0; i<result.length; i++){
                await client.set(result[i].id, JSON.stringify(result[i]));
            }
            return result;
        }, 
        binnedImages: async () => {
            let imagePosts = await client.hVals("Binned");
            for (let i = 0; i< imagePosts.length; i ++){
                imagePosts[i] = JSON.parse(imagePosts[i]);
            }
            const result = imagePosts.filter((image) => image.binned === true);
            if(result.length === 0){
                return [];
            } else{
                return result;
            }
        } ,
        userPostedImages: async () => {
            let imagePosts = await client.hVals("UserPosted");
            for (let i = 0; i< imagePosts.length; i ++){
                imagePosts[i] = JSON.parse(imagePosts[i]);
            }
            const result = imagePosts.filter((image) => image.userPosted === true);
            if(result.length === 0){
                return [];
            } else{
                return result;
            }
            
        }
    },
    Mutation: { 
        uploadImage: async (_, args) => {
            let newPostId = uuid.v4();
            
            // args.url = check.check_string(args.url);
            // args.posterName = check.check_string(args.posterName);
            // args.description = check.check_string(args.description);
           
            const newImage = {
                id: newPostId,
                url: args.url,
                posterName: args.posterName,
                description: args.description,
                userPosted: true,
                binned: false
            }

            await client.set(newPostId, JSON.stringify(newImage));
            await client.hSet("UserPosted", newPostId, JSON.stringify(newImage));
            return newImage;
        },
        deleteImage: async (_,args) =>{
            let imagePost = await client.get(args.id);
            if(imagePost === null){
                throw `Error: Image with id: ${args.id} does not exist`;
            }
            await client.del(args.id);
            await client.hDel("Binned", args.id);
            await client.hDel("UserPosted", args.id);
            return JSON.parse(imagePost); 
        }, 
        updateImage: async (_,args) =>{
            let binnedStatus = false;
            let userPostedStatus = false;

            let newImagePost = await client.get(args.id);
            
            if(newImagePost === null){
                throw `Error: Image with id: ${args.id} does not exist`;
            }

            newImagePost = JSON.parse(newImagePost);

            await client.hDel("Binned", args.id);
            await client.hDel("UserPosted", args.id);

            
            if(args.url){
                newImagePost.url = args.url;
            }
            if(args.posterName){
                newImagePost.posterName = args.posterName;
            }
            if(args.description){
                newImagePost.description = args.description;
            }
           
           
            if(args.binned === true){
                binnedStatus = true;
                newImagePost.binned = args.binned;   
            } else {
                newImagePost.binned = args.binned;    
            }   


            if(args.userPosted === true){
                userPostedStatus = true;
                newImagePost.userPosted = args.userPosted;
            } else{
                newImagePost.userPosted = args.userPosted;
            }
            
            if(binnedStatus){
                await client.hSet("Binned", args.id, JSON.stringify(newImagePost));
            }

            if(userPostedStatus){
                await client.hSet("UserPosted", args.id, JSON.stringify(newImagePost));
            }
            return newImagePost;
        }
    }
}

const server = new ApolloServer ({typeDefs, resolvers});

server.listen().then(async ({url}) => {
    await client.flushAll();
    console.log(`Server Ready at ${url}`);
})