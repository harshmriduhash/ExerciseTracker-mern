import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { Container, Grow, Paper, Typography } from '@material-ui/core';
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
    container: {
      textAlign:"center",
      padding:10,
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
    labels: {
        fontSize: 20,
        marginRight: 20,
        
    },
    inputContainer: {
        margin: 10,
    },
    submit: {
        border: "none",
        fontSize: 18,
        padding: 10,
        borderRadius: 5,
        backgroundColor:"rgb(60,60,60)",
        color:"orange",
        "&:hover": {
            boxShadow: "0px 0px 5px black"
        }
    }
  })

class CreateExercise extends Component {

    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: "",
            description: "",
            duration: 0,
            date: new Date(),
            users: []
        }
    }

    componentDidMount() {
        axios.get("http://localhost:5000/users/")
            .then(response => {
                if(response.data.length > 0) {
                    this.setState({
                        users: response.data.map(user => user.username),
                        username: response.data[0].username,
                    })
                }
            })
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value,
        });
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value,
        });
    }

    onChangeDuration(e) {
        this.setState({
            duration: e.target.value,
        });
    }

    onChangeDate(date) {
        this.setState({
            date: date,
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const exercise ={
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date
        }
        console.log(exercise);
        axios.post("http://localhost:5000/exercises/add", exercise)
            .then(res => console.log(res.data));
        window.location = "/";
    }


    render() {
        const { classes } = this.props;
        return (
            <Grow in>
            <Container className={classes.container}>
                <Paper className={classes.paper}>
                <Typography className={classes.text} variant="h4">Create New Exercise Log</Typography>
                <form onSubmit={this.onSubmit}>
                    <Container className={classes.inputContainer}>
                        <label className={classes.labels}>Username: </label>
                        <select
                            className="form-control"
                            ref="userInput"
                            required
                            value={this.state.username}
                            onChange={this.onChangeUsername}>
                                {
                                    this.state.users.map(function(user) {
                                        return <option 
                                        key={user}
                                        value={user}>
                                            {user}
                                        </option>
                                    })
                                }
                            </select>
                    </Container>
                    <Container className={classes.inputContainer}>
                        <label className={classes.labels}>
                            Description: 
                        </label>
                        <input
                            className="form-control"
                            type="text"
                            required
                            value={this.state.description}
                            onChange={this.onChangeDescription}
                             />
                    </Container>
                    <Container className={classes.inputContainer}>
                        <label className={classes.labels}>
                            Duration (in minutes): 
                        </label>
                        <input
                            className="form-control"
                            type="text"
                            value={this.state.duration}
                            onChange={this.onChangeDuration}
                            />
                    </Container>
                    <Container className={classes.inputContainer}>
                        <label className={classes.labels}>Date: </label>
                        
                            <DatePicker
                                className="form-control"
                                selected={this.state.date}
                                onChange={this.onChangeDate}
                            />
                        
                    </Container>
                    <Container className={classes.inputContainer}>
                        
                        <input className={classes.submit} type="submit" value="Create Exercise" />
                        
                    </Container>

                </form>
                </Paper>
            </Container>
            </Grow>
        )
    }
}

export default withStyles(styles)(CreateExercise);
