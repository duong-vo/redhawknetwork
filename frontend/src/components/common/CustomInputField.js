import TextField from '@mui/material/TextField';
import withStyles from '@mui/styles/withStyles';

export default withStyles({
  root: {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'red !important', // Set the outline color to red for all states
      },
    },
    '& .MuiInputLabel-root': {
      color: 'black', // Change the label color to black
    },
  },
})(TextField);
