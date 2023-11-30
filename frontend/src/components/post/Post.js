import React, { useState } from 'react';
import axios from 'axios';
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Link,
  Button,
} from '@mui/material';
import { auth } from '../../shared/Firebase';
import { CATEGORY_LABELS } from '../../shared/Constants';

const Post = (props) => {
  const { post } = props;
  console.log('each post = ', post);
  const { id, title, content, author, reactions, comments, category } = post;
  const currentUser = auth.currentUser;
  var currentReaction = [];
  var updateReaction = [];
  var reactionCount = [];
  var setReactionCount = [];
  [reactionCount['like'], setReactionCount['like']] = useState(reactions.filter(reaction => reaction.reaction_type === 'like').length);
  [reactionCount['dislike'], setReactionCount['dislike']] = useState(reactions.filter(reaction => reaction.reaction_type === 'dislike').length);
  [currentReaction['like'], updateReaction['like']] = useState(reactions.some(reaction => reaction.user_id === currentUser?.uid && reaction.reaction_type === 'like'));
  [currentReaction['dislike'], updateReaction['dislike']] = useState(reactions.some(reaction => reaction.user_id === currentUser?.uid && reaction.reaction_type === 'dislike'));

  const handleReactionClick = (type) => {
    try {
      // Toggle the reaction based on the user's current reactions
      var notType = (type === 'like') ? 'dislike' : 'like';
      if(currentReaction[type]) {
        setReactionCount[type](reactionCount[type] - 1);
        updateReaction[type](false);
        type = 'delete';
      } else {
        if (currentReaction[notType]) {
          updateReaction[notType](false);
          setReactionCount[notType](reactionCount[notType] - 1);
        }
        updateReaction[type](true);
        setReactionCount[type](reactionCount[type] + 1);
      }
      axios({
        url: 'http://localhost:8000/api/reaction/add',
        method: 'POST',
        data: {
          uid: currentUser.uid,
          post_id: post.id,
          type: type,
        }
      });
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
        <span>Posted by 
          <Link href={"/users/" + author.id}>
            {author.username}
          </Link>
        </span>
        <a href="#">{comments && comments.length} comment(s)</a>
        <div className="voting">
          <Button className="btn-vote upvote" onClick={m => handleReactionClick('like')}>
            🔺
          </Button>
          <span className="upvote-count"> {reactionCount['like']} </span>
          <Button className="btn-vote downvote" onClick={() => handleReactionClick('dislike')}>
            🔻
          </Button>
          <span className="downvote-count"> {reactionCount['dislike']} </span>
        </div>
      </CardActions>
    </Card>
  );
}

export default Post;
