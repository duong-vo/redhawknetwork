import React, { useState, useEffect } from 'react';
import withStyles from '@mui/styles/withStyles';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {
  Avatar,
  AppBar,
  Toolbar,
  Divider,
  Typography,
  Button,
  IconButton,
  InputBase,
  Container,
  Card,
  CardContent,
  Modal,
  TextField,
  makeStyles,
  Grid,
} from '@mui/material';
import { auth } from '../shared/Firebase';
import Post from '../components/post/Post';
import { truncateString } from '../shared/Helper';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';

const styles =(theme) => ({
  navbar: {
    backgroundColor: theme.palette.primary.main,
  },
  logo: {
    height: '40px',
    width: '40px',
    marginRight: '10px',
  },
  content: {
    marginTop: theme.spacing(2),
  },
  profileHeader: {
    display: 'flex',
    alignItems: 'center',
  },
  profilePhoto: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    objectFit: 'cover',
    marginBottom: '20px',
  },
  editAccountModal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    width: '400px',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
});

const ShowAccount = (props) => {
  const { id } = useParams();
  const { classes } = props;
  const [user, setUser] = useState(null);
  console.log('user = ', user);
  const currentUser = auth.currentUser;
  const [newUsername, setNewUsername] = useState('');
  const [editModalOpen, setEditModalOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement logic to update the username
    axios({
      url: 'http://localhost:8000/api/users/' + id,
      method: 'PUT',
      data: {
        uid: user.id,
        username: newUsername,
      },
    }).then(() => {
      window.location.reload();
    });
    setEditModalOpen(false);
  };

  const followUser = () => {
    axios({
      url: 'http://localhost:8000/api/follow',
      method: 'POST',
      data: {
        uid: currentUser.uid,
        follow_uid: user.id,
      },
    }).then(() => {
      window.location.reload();
    });
  };

  useEffect(() => {
    axios({
      url: 'http://localhost:8000/api/users/' + id,
      method: 'GET',
    }).then(response => {
      setUser(response.data);
      setNewUsername(response.data.username);
    });
  }, []);
  const isFollowing = user && user.followers.some((obj) => (
    user && (obj.following_user == user.id)
  ));
  const deviceWidth = window.innerWidth;
  const averageCharWidth = 20;
  const maxChars = Math.floor(deviceWidth / averageCharWidth);

  return (
    <>
      {user && (
        <div>
          <Container className={classes.content}>
            <div className={classes.profileCard}>
              <Card>
                <CardContent>
                  <Grid container direction="column" alignItems="center" justifyContent="center">
                    <Grid item>
                      <Avatar src="profile_picture.jpg" alt={user.username} className={classes.profilePhoto} />
                    </Grid>
                    <Grid item>
                      <Typography variant="h3" sx={{ marginBottom: '16px' }}>{user.username}</Typography>
                    </Grid>
                    <Grid item sx={{ marginBottom: '16px' }}>
                      {user.id === currentUser.uid ? (
                        <Button variant="outlined" color="primary" className={classes.followBtn} onClick={() => setEditModalOpen(true)}>
                          Edit Account
                        </Button>

                      ) : isFollowing ? (
                        <Button className={classes.followBtn} onClick={followUser}>
                          Unfollow
                        </Button>
                      ): (
                        <Button className={classes.followBtn} onClick={followUser}>
                          Follow
                        </Button>
                      )}
                    </Grid>
                    <Typography>
                      <strong>Followers:</strong> {user.followers.length}
                    </Typography>
                    <Typography>
                      <strong>Following:</strong> {user.following.length}
                    </Typography>
                  </Grid>
                </CardContent>
              </Card>
            </div>
            <Typography variant="h4">
              User's Posts
            </Typography>
            <Grid container justifyContent="center" alignItems="center" spacing={2} >
              {user.posts && user.posts.map((post) => (
                <Grid item xs={6}>
                  <Post post={post} content={truncateString(post.content, maxChars)} />
                </Grid>
              ))}
            </Grid>
          </Container>

          <Modal open={editModalOpen} onClose={() => setEditModalOpen(false)} className={classes.editAccountModal}>
            <div className={classes.modalContent}>
              <Grid container direciton="column" spacing={5}>
                <Grid item>
                  <Typography variant="h6" id="editAccountModalLabel">
                    Edit Account
                  </Typography>
                </Grid>
                <Grid item>
                  <TextField
                    id="username"
                    label="New Username"
                    variant="outlined"
                    fullWidth
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                  />
                </Grid>
                <Grid item align="flex-end">
                  <Button variant="contained" color="primary" fullWidth onClick={handleSubmit}>
                    Save changes
                  </Button>
                </Grid>
              </Grid>
              </div>
          </Modal>
        </div>
      )}
    </>
  );
};

export default withStyles(styles)(ShowAccount);
