import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

const BlogPost = (props) => {
  const posts = [
    {
      title: 'Title',
      date: 'date',
      content: 'content',
    },
    {
      title: 'Title2',
      date: 'date2',
      content: 'content2',
    },
  ];
  return (
    <Container maxWidth="sm">
      <Grid
        container
        direction="column"
        justifyContent="center"
        spacing={3}
      >
        {posts.map((post, index) => (
          <Grid item key={index} zeroMinWidth>
            <Card>
              <CardContent>
                <Typography variant="h3" component="div">
                  {post.title}
                </Typography>
                <Typography color="text.secondary">{post.date}</Typography>
                <Typography variant="body2">{post.content}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default BlogPost;
