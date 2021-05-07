import React, { Component } from 'react';
import axios from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import { Container, Grow, Paper, Typography } from "@material-ui/core";
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import { withStyles } from "@material-ui/core/styles";
import Exercise from "./exercise";

const styles = theme => ({
  container: {
    textAlign:"center",
    padding:10
  },
  paper: {
    padding:20, 
    backgroundColor:"rgb(200,200,200)",
  },
  text: {
    fontFamily: "Jura", 
    marginBottom:20, 
    fontWeight: "bold"
  },
  mainTable: {
    textAlign:"center"
  },
  tableRow: {
    backgroundColor:"rgb(40,40,40)"
  },
  tableCell: {
    color:"white"
  },
})


class ExercisesList extends Component {
  constructor(props) {
    super(props);

    this.deleteExercise = this.deleteExercise.bind(this)

    this.state = {exercises: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/exercises/')
      .then(response => {
        this.setState({ exercises: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteExercise(id) {
    axios.delete('http://localhost:5000/exercises/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      exercises: this.state.exercises.filter(el => el._id !== id)
    })
  }

  exerciseList() {
    return this.state.exercises.map(currentexercise => {
      return <Exercise exercise={currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id}/>;
    })
  }

  render() {
    const { classes } = this.props;
    return (
      <Grow in>
      <Container className={classes.container}>
        <Paper className={classes.paper}>
        <Typography variant="h4" className={classes.text}>Logged Exercises</Typography>
        <TableContainer>
        <Table className={classes.mainTable}>
          <TableHead>            
          <TableRow className={classes.tableRow}>
              <TableCell className={classes.tableCell}>Username</TableCell>
              <TableCell className={classes.tableCell}>Description</TableCell>
              <TableCell className={classes.tableCell}>Duration / Date</TableCell>
              <TableCell className={classes.tableCell}>Actions</TableCell>
              </TableRow>
            </TableHead>   
          <TableBody>
            { this.exerciseList() }
            </TableBody>
          </Table>
          </TableContainer>
        </Paper>
        </Container>
      </Grow>
    )
  }
}

export default withStyles(styles)(ExercisesList);