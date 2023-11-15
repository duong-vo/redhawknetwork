import React from 'react';
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Button,
} from '@mui/material';

const Post = (props) => {
  const { title, date, content } = props;
  return (
    <Card>
      <CardContent>
        <Typography variant="h5"> title </Typography>
        <Typography variant="body1"> content </Typography>
      </CardContent>
      <CardActions>
        <span>Posted by user123</span>
        <a href="#">20 comments</a>
        <div className="voting">
          <Button className="btn-vote upvote">
            🔺
          </Button>
          <span className="upvote-count">0</span>
          <Button className="btn-vote downvote">
            🔻
          </Button>
          <span className="downvote-count">0</span>
        </div>
      </CardActions>
    </Card>

  );
}

export default Post;
