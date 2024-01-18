import Modal from "./Modal";
import { useContext, useEffect, useState } from "react";
import { ImagesContext } from "../../store/images-context";
import DialogHeader from "./DialogHeader";
import './ImageDetail.css'
import { useSocket } from "../../store/socket-context";
import CommentCard from "./CommentCard";

export default function ImageDetail({ open, imageIndex, handleCloseDetail, allComments }) {
  const [index, setIndex] = useState(imageIndex);
  const [comments, setComments] = useState([])
  const imagesCtx = useContext(ImagesContext);
  const socket = useSocket();
  

  useEffect(() => {
    setIndex(imageIndex); // Ensure index is updated when imageIndex changes
  }, [imageIndex]);

  const currentImage = imagesCtx[index];

  useEffect(() => {
    function filterComments(){
        if (currentImage) {
            const imageComments = allComments.filter(o => o.image_id === currentImage.id);
            setComments(imageComments)
        }
    }

    socket.on('update_comments', () => {
      filterComments();
    })
    
    filterComments()
  }, [index, socket]);

  function nextImage() {
    setIndex((prevIndex) => (prevIndex + 1) % imagesCtx.length);
  }

  function previousImage(){
    setIndex((prevIndex) => (prevIndex - 1) % imagesCtx.length);
  }



  return (
    <Modal className="dialog img-upload-dialog img-detail" id="comment-dialog" open={open}>
      {currentImage && (
        <>
          <DialogHeader close={handleCloseDetail}>{currentImage.title}</DialogHeader>
          <div id="img-detail">
            <i class="fi fi-rr-angle-left" onClick={previousImage}></i>
            <img src={currentImage.file_path} alt={currentImage.title} />
            <i class="fi fi-rr-angle-right" onClick={nextImage} ></i>
          </div>
        <div className="img-detail-info">
            <p>{currentImage.likes} likes!</p>
            <p>Uploaded by {currentImage.first_name}</p>
        </div>  
        {comments.length > 0 ? comments.map((comment) => <CommentCard key={comment.id} comment={comment}/>) : <p>Be the first to comment!</p>}
        </>
      )}
    </Modal>
  );
}
