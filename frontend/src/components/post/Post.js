import React, { useState } from 'react';
import axios from 'axios';
import {
  Card,
  CardHeader,
  CardActions,
  CardContent,
  Typography,
  Link,
  Button,
  Grid,
} from '@mui/material';
import { auth } from '../../shared/Firebase';
import { CATEGORY_LABELS } from '../../shared/Constants';

const Post = (props) => {
  const { post, content, single } = props;
  console.log('each post = ', post);
  const { id, title, author, reactions, comments, category, created_date: createdDate } = post;
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
  const isAfterTenMin = (created) => {
    const currentDate = new Date();
    const differenceInMilliseconds = currentDate - created;
    console.log('diff in miliseconds', differenceInMilliseconds);
    const differenceInMinutes = differenceInMilliseconds / (1000 * 60);

    return differenceInMinutes <= 10;
  };


  return (
    <Card>
      <CardHeader
        title={title}
        subheader={CATEGORY_LABELS[category]}
        onClick={() => { window.location.href = '/posts/' + id; }}
        sx={{ cursor: 'pointer' }}
        action={!single && isAfterTenMin(new Date(createdDate)) && (
          <div style={{ backgroundColor: '#da3238', color: 'white', padding: 5 }}>NEW</div>
        )}
      />
      <CardContent onClick={() => { window.location.href = '/posts/' + id; }} sx={{ cursor: 'pointer' }}>
        <Typography variant="body1" sx={{ color: '#94969b' }}> {content} </Typography>
      </CardContent>
      <CardActions>
        <Grid container justifyContent="center" alignItems="center" sx = {{ paddingLeft: !single && 1 }}>
          <Grid item xs={3} align={single && "center"}>
            <Link href={"/users/" + author.id} underline="none">
              {author.username}
            </Link>
          </Grid>
          <Grid item xs={3} align={single && "center"}>
            <Link href="#" underline="none">{comments && comments.length} comment(s)</Link>
          </Grid>
          <Grid item xs={6} align={single && "center"}>
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
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
}

export default Post;
