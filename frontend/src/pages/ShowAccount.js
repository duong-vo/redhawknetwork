import React, { useState, useEffect } from 'react';
import withStyles from '@mui/styles/withStyles';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
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
} from '@mui/material';
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
    height: '100px',
    width: '100px',
    borderRadius: '50%',
    marginRight: theme.spacing(2),
  },
  editAccountModal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    width: '300px',
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
    // Implement followUser logic
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

  return (
    <>
      {user && (
        <div>
          <Container className={classes.content}>
            <div className={classes.profileCard}>
              <Card>
                <CardContent>
                  <div className={classes.profileHeader}>
                    <img src="profile_picture.jpg" alt="User Profile" className={classes.profilePhoto} />
                    <div>
                      <Typography variant="h5">{user.username}</Typography>
                      <Button color="secondary" onClick={() => setEditModalOpen(true)}>
                        Edit Account
                      </Button>
                      <Button className={classes.followBtn} onClick={followUser}>
                        Follow
                      </Button>
                    </div>
                  </div>
                  <Typography>
                    <strong>Followers:</strong> 1234
                  </Typography>
                  <Typography>
                    <strong>Following:</strong> 567
                  </Typography>
                  {/* Additional user information here */}
                </CardContent>
              </Card>
            </div>

            <div className={classes.userPosts}>
              <Typography variant="h6">User's Posts</Typography>
              {/* Iterate over user posts and display them */}
              <div className={classes.post}>
                <Typography variant="subtitle1">Post Title 1</Typography>
                <Typography>Post description...</Typography>
                {/* Additional post details */}
              </div>
              <div className={classes.post}>
                <Typography variant="subtitle1">Post Title 2</Typography>
                <Typography>Another post description...</Typography>
                {/* Additional post details */}
              </div>
            </div>
          </Container>

          {/* Edit Account Modal */}
          <Modal open={editModalOpen} onClose={() => setEditModalOpen(false)} className={classes.editAccountModal}>
            <div className={classes.modalContent}>
              <Typography variant="h6" id="editAccountModalLabel">
                Edit Account
              </Typography>
              <TextField
                id="username"
                label="New Username"
                variant="outlined"
                fullWidth
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
              />
              <Button variant="contained" color="primary" fullWidth onClick={handleSubmit}>
                Save changes
              </Button>
            </div>
          </Modal>
        </div>
      )}
    </>
  );
};

export default withStyles(styles)(ShowAccount);
