import React, { Component } from 'react';
import axios from "axios";
import { withStyles } from "@material-ui/core/styles";
import { Container, Grow, Paper, Typography } from '@material-ui/core';

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
      marginBottom: 20, 
      fontWeight: "bold",
    },
    labels: {
        fontSize: 20,
        
    },
    inputContainer: {
        margin: 10
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

class CreateUser extends Component {

    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: "",
        }
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value,
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const user ={
            username: this.state.username,
        }
        console.log(user);
        axios.post("http://localhost:5000/users/add", user)
            .then(res => console.log(res.data));
        alert("Utente Creato!");
        this.setState({
            username: "",
        })
    }

    render() {
        const { classes } = this.props;
        return (
            <Grow in>
            <Container className={classes.container}>
                <Paper className={classes.paper}>
                <Typography variant="h4" className={classes.text}>Create New User</Typography>
                <form onSubmit={this.onSubmit}>
                    <Container className={classes.inputContainer}>
                        <label className={classes.labels}>Username: </label>
                        <input
                            className="form-control"
                            type="text"
                            required
                            value={this.state.username}
                            onChange={this.onChangeUsername}
                        />
                    </Container>
                    <Container className={classes.inputContainer}>
                        <input
                            className={classes.submit}
                            type="submit"
                            value="Create User"
                        />
                    </Container>
                </form>
                </Paper>
            </Container>
            </Grow>            
        )
    }
}

export default withStyles(styles)(CreateUser);