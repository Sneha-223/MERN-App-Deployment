import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

function Profile() {

  const navigate = useNavigate();

  const onSubmit = () => {
    navigate("../edit");
  }

  let userID = ""
  const [user, setUser] = useState("")
  useEffect(() => {
    userID = localStorage.getItem("USER_ID")

    axios.get('/api/user/' + userID)
      .then(response => {
        console.log(response.data)
        setUser(response.data)
      })
      .catch(error => {
        console.log(error.response.data)
        localStorage.setItem('USER_ID', 0)
      })
  }, [])

  return (

    <Grid container align={"center"} spacing={2}>

      <Grid item xs={12}>
        <h2>PROFILE DETAILS</h2>
      </Grid>

      <Grid item xs={12}>
        Name: {user.name}
      </Grid>
      <Grid item xs={12}>
        Email: {user.email}
      </Grid>
      <Grid item xs={12}>
        Phone number: {user.number}
      </Grid>
      <Grid item xs={12}>
        User type: {user.type}
      </Grid>

      <Grid item xs={12}>
        <Button variant="contained" onClick={onSubmit}>
          Edit Details
        </Button>
      </Grid>
    </Grid>

  )
}
export default Profile
