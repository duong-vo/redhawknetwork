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
import { CATEGORY_LABELS } from '../../shared/Constants';

const Post = (props) => {
  const { post } = props;
  console.log('each post = ', post);
  const { id, title, content, author, reactions, comments, category } = post;
  const currentUser = auth.currentUser;
  const [likeCount, setLikeCount] = useState(reactions.filter(reaction => reaction.reaction_type === 'like').length);
  const [dislikeCount, setDislikeCount] = useState(reactions.filter(reaction => reaction.reaction_type === 'dislike').length);
  const [userLiked, setUserLiked] = useState(reactions.some(reaction => reaction.user_id === currentUser?.uid && reaction.reaction_type === 'like'));
  const [userDisliked, setUserDisliked] = useState(reactions.some(reaction => reaction.user_id === currentUser?.uid && reaction.reaction_type === 'dislike'));

  const handleReactionClick = (type) => {
    try {
      // Toggle the reaction based on the user's current reactions
      if (type === 'like') {
        if (userLiked) {
          setLikeCount(likeCount - 1); // Remove the like
          setUserLiked(false);
          axios({
            url: 'http://localhost:8000/api/reaction/add',
            method: 'POST',
            data: {
              uid: currentUser.uid,
              post_id: post.id,
              type: 'delete',
            }
          });
        } else if (userDisliked) {
          setLikeCount(likeCount + 1); // Increase the like after unliking
          setDislikeCount(dislikeCount - 1); // Decrease the dislike
          setUserLiked(true);
          setUserDisliked(false);
          axios({
            url: 'http://localhost:8000/api/reaction/add',
            method: 'POST',
            data: {
              uid: currentUser.uid,
              post_id: post.id,
              type: 'like',
            }
          });
        } else {
          setLikeCount(likeCount + 1); // Add the like
          setUserLiked(true);
          axios({
            url: 'http://localhost:8000/api/reaction/add',
            method: 'POST',
            data: {
              uid: currentUser.uid,
              post_id: post.id,
              type: 'like',
            }
          });
        }
      } else if (type === 'dislike') {
        if (userDisliked) {
          setDislikeCount(dislikeCount - 1); // Remove the dislike
          setUserDisliked(false);
          axios({
            url: 'http://localhost:8000/api/reaction/add',
            method: 'POST',
            data: {
              uid: currentUser.uid,
              post_id: post.id,
              type: 'delete',
            }
          });
        } else if (userLiked) {
          setDislikeCount(dislikeCount + 1); // Increase the dislike after un-disliking
          setLikeCount(likeCount - 1); // Decrease the like
          setUserDisliked(true);
          setUserLiked(false);
          axios({
            url: 'http://localhost:8000/api/reaction/add',
            method: 'POST',
            data: {
              uid: currentUser.uid,
              post_id: post.id,
              type: 'dislike',
            }
          });
        } else {
          setDislikeCount(dislikeCount + 1); // Add the dislike
          setUserDisliked(true);
          axios({
            url: 'http://localhost:8000/api/reaction/add',
            method: 'POST',
            data: {
              uid: currentUser.uid,
              post_id: post.id,
              type: 'dislike',
            }
          });
        }
      }
    }
    catch (error) {
      console.error('Error adding reaction:', error);
    }
  };
  return (
    <Card>
      <CardContent>
        <Typography varaint="h4" sx={{ fontWeight: 300 }}> {CATEGORY_LABELS[category]} </Typography>
        <Typography variant="h5"> {title} </Typography>
        <Typography variant="body1"> {content} </Typography>
      </CardContent>
      <CardActions>
        <span>Posted by {author.username} </span>
        <a href="#">{comments && comments.length} comment(s)</a>
        <div className="voting">
          <Button className="btn-vote upvote" onClick={m => handleReactionClick('like')}>
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
