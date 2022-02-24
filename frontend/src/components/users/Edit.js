import { useState, useEffect } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const Edit = (props) => {

  let userID = localStorage.getItem("USER_ID");
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

  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState(user.password);
  const [number, setNumber] = useState(user.number);
  const [date, setDate] = useState(null);

  const [name, setName] = useState(user.name);
  const [age, setAge] = useState(user.age);
  const [batch, setBatch] = useState(user.batch);

  const [manager, setManager] = useState(user.manager);
  const [shop, setShopName] = useState(user.shop);
  const [OpenTime, setOpenTime] = useState(user.OpenTime);
  const [CloseTime, setCloseTime] = useState(user.CloseTime);

  const [type, setType] = useState(user.type);

  const onChangeName = (event) => {
    setName(event.target.value);
  };

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const onChangeNumber = (event) => {
    setNumber(event.target.value);
  };

  const onChangeAge = (event) => {
    setAge(event.target.value);
  };

  const onChangeBatch = (event) => {
    setBatch(event.target.value);
  };

  const onChangeManager = (event) => {
    setManager(event.target.value);
  };

  const onChangeOpenTime = (event) => {
    setOpenTime(event.target.value);
  };
  const onChangeCloseTime = (event) => {
    setCloseTime(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    const newUser = {
      name: name,
      email: email,
      password: password,
      date: Date.now(),
      number: number,
      age: age,
      manager: manager,
      batch: batch,
      shop: shop,
      OpenTime: OpenTime,
      CloseTime: CloseTime,
      type: user.type,
    };

    console.log(user.type);
    axios
      .post("/api/user/edit/" + userID, newUser)
      .then((response) => {
        alert("Edited\t" + response.data);
        console.log(response.data);
        //console.log('/api/user/edit' + userID)
        console.log("here");
      });
  };

  return (
    <Grid container align={"center"} spacing={2}>

      <Grid item xs={12}>
        <h2>EDIT DETAILS</h2>
      </Grid>

      <Grid item xs={12}>
        <TextField
          label="Email"
          variant="outlined"
          value={email}
          onChange={onChangeEmail}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Password"
          variant="outlined"
          value={password}
          onChange={onChangePassword}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Number"
          variant="outlined"
          value={number}
          onChange={onChangeNumber}
        />
      </Grid>

      {user.type == "Buyer" &&
        <Grid item xs={12}>
          <TextField
            label="Name"
            variant="outlined"
            value={name}
            onChange={onChangeName}
          />
        </Grid>
      }
      {user.type == "Buyer" &&
        <Grid item xs={12}>
          <TextField
            label="Age"
            variant="outlined"
            value={age}
            onChange={onChangeAge}
          />
        </Grid>
      }
      {user.type == "Buyer" &&
        <Grid item xs={12}>
          <TextField
            label="Batch"
            variant="outlined"
            value={batch}
            onChange={onChangeBatch}
          />
        </Grid>
      }

      {user.type == "Vendor" &&
        <Grid item xs={12}>
          <TextField
            label="Manager"
            variant="outlined"
            value={manager}
            onChange={onChangeManager}
          />
        </Grid>
      }
      {user.type == "Vendor" &&
        <Grid item xs={12}>
          <TextField
            label="Shop-Name"
            variant="outlined"
            value={name}
            onChange={onChangeName}
          />
        </Grid>
      }
      {user.type == "Vendor" &&
        <Grid item xs={12}>
          <TextField
            label="Open-Time"
            variant="outlined"
            value={OpenTime}
            onChange={onChangeOpenTime}
          />
        </Grid>
      }
      {user.type == "Vendor" &&
        <Grid item xs={12}>
          <TextField
            label="Close-Time"
            variant="outlined"
            value={CloseTime}
            onChange={onChangeCloseTime}
          />
        </Grid>
      }

      <Grid item xs={12}>
        <Button variant="contained" onClick={onSubmit}>
          Submit
        </Button>
      </Grid>
    </Grid>
  );
};

export default Edit;
