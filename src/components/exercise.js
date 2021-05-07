import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    editButton: {
        backgroundColor:"rgb(40,40,40)", 
        margin: 2,
        "&:hover": {
            backgroundColor:"rgb(40,40,40)"
        }
      },
    link: {
        color:"white",
        textDecoration:"none",
        "&:hover": {
            textDecoration:"none",
            color:"orange"
        }
    },
    row: {
        "&:hover": {
            backgroundColor:"rgb(180,180,180)"
        }
    }
}))

export default function Exercise(props) {

    const classes = useStyles();

    return (
        <TableRow className={classes.row}>
    <TableCell>{props.exercise.username}</TableCell>
    <TableCell>{props.exercise.description}</TableCell>
    <TableCell>{props.exercise.duration} min. / {props.exercise.date.substring(0,10)}</TableCell>
    
    <TableCell>
      <Button size="small" className={classes.editButton}>
      <Link className={classes.link} to={"/edit/"+props.exercise._id}>edit</Link>
      </Button >  
      <Button size="small" className={classes.editButton}> <a className={classes.link} href="#" onClick={() => { props.deleteExercise(props.exercise._id) }}>delete</a></Button>
    </TableCell>
    </TableRow>
    )
}
