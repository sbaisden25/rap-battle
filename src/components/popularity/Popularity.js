import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 280,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };


export default function Popularity() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>


    <h3 class="desc">Based on Spotify data, who's more <Button variant="outlined" color="error" size="small" onClick={handleOpen}>popular?</Button></h3>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h5" component="h4">
            What is popularity?
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Spotify's artist and album popularity is derived from track popularity.  
          <br></br>
          <br></br>
          Track popularity is based on the total number of plays the track has had and how recent those plays are.
          <br></br>
          <br></br>
          Generally, songs that are being played a lot now will have a higher popularity than songs that were played a lot in the past.
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}