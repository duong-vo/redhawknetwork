import React, { useState } from 'react';
import axios from 'axios';
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Button,
} from '@mui/material';
import { auth } from '../../shared/Firebase';

const Post = (props) => {
  const { post } = props;
  console.log('each post = ', post);
  const { title, content, author, reactions } = post;
  const currentUser = auth.currentUser;
  const [likeCount, setLikeCount] = useState(reactions.filter(reaction => reaction.reaction_type === 'like').length);
  const [dislikeCount, setDislikeCount] = useState(reactions.filter(reaction => reaction.reaction_type === 'dislike').length);
  const [userLiked, setUserLiked] = useState(reactions.some(reaction => reaction.user_id === currentUser.uid && reaction.reaction_type === 'like'));
  const [userDisliked, setUserDisliked] = useState(reactions.some(reaction => reaction.user_id === currentUser.uid && reaction.reaction_type === 'dislike'));

  const handleReactionClick = (type) => {
    axios({
      url: 'http://localhost:8000/api/reaction/add',
      method: 'POST',
      data: {
        uid: currentUser.uid,
        post_id: post.id,
        type: type,
      }
    }).then(() => {
      // Toggle the reaction based on the user's current reactions
      if (type === 'like') {
        if (userLiked) {
          setLikeCount(likeCount - 1); // Remove the like
          setUserLiked(false);
        } else if (userDisliked) {
          setLikeCount(likeCount + 1); // Increase the like after unliking
          setDislikeCount(dislikeCount - 1); // Decrease the dislike
          setUserLiked(true);
          setUserDisliked(false);
        } else {
          setLikeCount(likeCount + 1); // Add the like
          setUserLiked(true);
        }
      } else if (type === 'dislike') {
        if (userDisliked) {
          setDislikeCount(dislikeCount - 1); // Remove the dislike
          setUserDisliked(false);
        } else if (userLiked) {
          setDislikeCount(dislikeCount + 1); // Increase the dislike after un-disliking
          setLikeCount(likeCount - 1); // Decrease the like
          setUserDisliked(true);
          setUserLiked(false);
        } else {
          setDislikeCount(dislikeCount + 1); // Add the dislike
          setUserDisliked(true);
        }
      }
    }).catch(error => {
      console.error('Error adding reaction:', error);
    });
  };
  return (
    <Card>
      <CardContent>
        <Typography variant="h5"> {title} </Typography>
        <Typography variant="body1"> {content} </Typography>
      </CardContent>
      <CardActions>
        <span>Posted by {author.username} </span>
        <a href="#">20 comments</a>
        <div className="voting">
          <Button className="btn-vote upvote" onClick={() => handleReactionClick('like')}>
            🔺
          </Button>
          <span className="upvote-count"> {likeCount} </span>
          <Button className="btn-vote downvote" onClick={() => handleReactionClick('dislike')}>
            🔻
          </Button>
          <span className="downvote-count"> {dislikeCount} </span>
        </div>
      </CardActions>
    </Card>

  );
}

export default Post;
