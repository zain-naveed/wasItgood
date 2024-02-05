import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import moment from 'moment';
import { CheckDate } from '../../utils/checkDate';
import { notify } from '../../utils/notify';
export default function FormDialog({open,handleClose,startDate,setStartDate,endDate,setEndDate,callback}) {
  const handleSubmit = ()=>{
    if(startDate && endDate){
      let startdates =   moment(startDate).format("YYYY-MM-DD")
      let enddates =   moment(endDate).format("YYYY-MM-DD");
      let checkBool = CheckDate(startdates,enddates);
      if(checkBool){
        callback(startdates,enddates)
      }
  
    }else{
      notify(`${!startDate ? "Start Date is Required Field":!endDate && "End Date is Required Field" }`)
    }
  
  
  }
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Filter</DialogTitle>
        <DialogContent>
          <DialogContentText className='my-2'>
          Start Date
          </DialogContentText>
          {/* <DialogTitle>Start Date</DialogTitle> */}
          <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label="Start Date"
        value={startDate}
        onChange={(newValue) => {
            setStartDate(newValue);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
    <DialogContentText className='my-2'>
          End Date
          </DialogContentText>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label="End Date"
      
        value={endDate}
        onChange={(newValue) => {
            setEndDate(newValue);
        }}
        
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
