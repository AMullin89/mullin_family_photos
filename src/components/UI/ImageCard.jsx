import './ImageCard.css'
import Comment from '../Comment'
import { useState, useEffect, useContext } from 'react'
import axios from 'axios';
import { UserContext } from '../../store/user-context';
import { APIContext } from '../../store/api-context';
import { useSocket } from '../../store/socket-context';
import { ImagesContext } from '../../store/images-context';
import ImageDetail from './ImageDetail';


export default function ImageCard({image, fetchImages}){

    const [commentOpen, setCommentOpen] = useState(false);
    const [comments, setComments] = useState([])
    const [favourite, setFavourite] = useState(false);
    const [liked, setLiked] = useState(false);
    const [imageIndex, setImageIndex] = useState();
    const [detailOpen, setDetailOpen] = useState(false)
    const [allComments, setAllComments] = useState([])

    const socket = useSocket();


    const userCTX = useContext(UserContext);
    const apiCtx = useContext(APIContext)
    const imagesCtx = useContext(ImagesContext)

    async function getComments(){
            const response = await axios.get(apiCtx + '/comments')
            setAllComments(response.data);
            const comments = response.data.filter(o => o.image_id === image.id);
            setComments(comments)
    }
    
    useEffect(() => {
        getComments();
        socket.on('update_comments', () => {
            getComments();
        })
        } 
    , [socket])

    useEffect(() => {
        function checkIfLikedByUser(){
            if(image.liker_id === userCTX.id && image.liked_image === image.id){
                setLiked(true);
            }
        }
        function checkIfFavouritedByUser(){
            if(image.favourite_user === userCTX.id && image.favourite_image === image.id){
                setFavourite(true);
            }
        }
        checkIfLikedByUser()
        checkIfFavouritedByUser();
    }, [image])

    async function handleClickFavourite(){

        const formData = new FormData();
        formData.append('image_id', image.id)
        formData.append('user_id', userCTX.id)

        const options = {
            headers: {
                'Content-Type': 'application/json',
            }
        };

        if(!favourite){
           formData.append('favourite', true)
           await axios.post(apiCtx + '/favourite', formData, options)
           setFavourite(true)
        } else {
            formData.append('favourite', false)
            await axios.post(apiCtx + '/favourite', formData, options)
            setFavourite(false)
        }

    }

    async function handleClickLiked(){
        const formData = new FormData();
        formData.append('image_id', image.id)
        formData.append('user_id', userCTX.id)

            
        const options = {
            headers: {
                'Content-Type': 'application/json',
            }
        };
        
        if(!liked){
            formData.append('liked', true)
            await axios.post(apiCtx + '/liked', formData, options)
            setLiked(true);

            formData.append('activity', 'liked a photo.');
            await axios.post(apiCtx + '/activity', formData, options);
        }else{
            formData.append('liked', false)
            await axios.post(apiCtx + '/liked', formData, options)
            setLiked(false);
        }

        socket.emit('liked_image');
        socket.emit('new_activity');
    }

    function openCommentDialog(){
        setCommentOpen(true);
    }

    function closeCommentDialog(){
        setCommentOpen(false);
    }

    function getImageIndex(){
       const result =  imagesCtx.findIndex(i => i.id === image.id)
       setImageIndex(result);
       setDetailOpen(true)
    }

    function handleCloseDetail(){
        setDetailOpen(false);
    }

    async function deleteImage(){
        const formData = new FormData();
        formData.append('image_id', image.id);
        const options = {
            headers: {
                'Content-Type': 'application/json',
            }
        };
        await axios.post(apiCtx + '/deleteimage', formData, options)
                   .then(res => {
                    console.log("Axios response:", res);
                    })
        getComments();
        fetchImages();
    }


    return (
        <div className="image-container">
            <h4>{image.title}</h4>
            <div>
                <img onClick={getImageIndex} src={image.file_path} alt={image.title}/>
                <div className="img-info">
                    <p>{image.likes} likes!</p>
                    <p>Uploaded by {image.first_name}</p>
                </div>  
            </div>
            <div className="img-actions">
                <i class="fi fi-ts-comment-alt-dots" onClick={openCommentDialog}></i>
                {liked ? <i onClick={handleClickLiked} class="fi fi-ss-heart liked"></i> : <i onClick={handleClickLiked} class="fi fi-rs-heart"></i>}
                {favourite ? <i onClick={handleClickFavourite}  class="fi fi-sr-star favourited"></i> : <i onClick={handleClickFavourite} class="fi fi-rr-star"></i> }
                {userCTX.id === image.user_id && <i onClick={deleteImage} class="fi fi-rs-trash"></i>}
            </div>
        <Comment image={image} open={commentOpen} closeCommentDialog={closeCommentDialog} comments={comments} getComments={getComments} />
        <ImageDetail handleCloseDetail={handleCloseDetail} imageIndex={imageIndex} open={detailOpen} allComments={allComments} image={image} />
        </div>
    )
}