import { Add } from '@mui/icons-material';
import { IconButton, InputBase } from '@mui/material';
import EmojiPicker from 'emoji-picker-react';

export default ({ message, setMessage, sendMessage }) => {
  return <>
    <div className="chat_input">
      <div className='login-input'>
        <IconButton sx={{ p: '10px' }}>
          <Add />
        </IconButton>
        <InputBase
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          type='Enter Message'
          sx={{ ml: 1, flex: 1 }}
          placeholder="Enter Message"
        />
      </div>
      <button className='form-btn-capsel-active' onClick={sendMessage}><span className='form-btn-text-active'>Send</span></button>
    </div>
  </>
}