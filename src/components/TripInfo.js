import React, { useState, useEffect } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import { TextField, Typography, Grid } from '@material-ui/core';
import { connect } from "react-redux";
import getNeededItems from '../logic/logic';
import '../css/tripInfo.css';

const TripInfo = ({ showItems }) => {
    const [kilometers, setKilometers] = useState(0);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    useEffect(() => {
        if (startDate > endDate)
            setEndDate(startDate);
     }, [startDate])

    const handleClick = () => {
        let neededItems = getNeededItems(kilometers, startDate, endDate);
        showItems(neededItems);
    }

    const handleChange = (event) => {
        setKilometers(event.target.value);
      };

    return (
        <div className='infoInputs'>
            <Typography variant="h3" className='tripDetailsTypography'>
                Trip details
            </Typography>
            <br/> 
            <Grid container direction='column'>
                <Grid container spacing={6} alignItems='center' justify='center'>
                    <Grid item xs={3}>
                        <Typography variant="h6">
                            Kilometers:
                        </Typography> 
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            variant='outlined'
                            type='number'
                            size='small'
                            InputProps={{ inputProps: { min: 0, max: Infinity,
                                              onKeyDown: (event) => {
                                                event.preventDefault();
                                                alert('Use arrows to change kilometers\' value!')
                                              }
                             } }}
                            value={kilometers}
                            onChange={handleChange}
                        />
                    </Grid>
                </Grid>
                <br/>
                <MuiPickersUtilsProvider utils={DateFnsUtils} >
                    <Grid container spacing={6} className='inputsContainer' alignItems='center' justify='center'>
                        <Grid item xs={3}>
                            <Typography variant="h6">
                                Start date:
                            </Typography> 
                        </Grid>
                        <Grid item xs={3}>
                            <KeyboardDatePicker
                                value={startDate}
                                onChange={newStartDate => setStartDate(newStartDate)}
                                format="yyyy/MM/dd"
                            />
                        </Grid>
                    </Grid>
                    <br/>
                    <Grid container spacing={6} className='inputsContainer' justify='center'>
                    <Grid item xs={3}>
                            <Typography variant="h6">
                                End date: 
                            </Typography> 
                        </Grid>
                        <Grid item xs={3}>
                            <KeyboardDatePicker
                                value={endDate >= startDate ? endDate : startDate}
                                minDate={startDate}
                                onChange={newEndDate => setEndDate(newEndDate)}
                                format="yyyy/MM/dd"
                            />
                        </Grid>
                    </Grid>
                </MuiPickersUtilsProvider>
             </Grid>
             <button onClick={handleClick} className='itemsButton'>GET NEEDED ITEMS</button>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => ({
    showItems: (items) => dispatch({ type: "SHOW", payload: items }),
  });

export default connect(null, mapDispatchToProps)(TripInfo);