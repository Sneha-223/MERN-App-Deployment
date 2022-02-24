import { useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const Register = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [number, setNumber] = useState("");
  const [date, setDate] = useState(null);

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [batch, setBatch] = useState("");
  const [wallet, setWallet] = useState("");

  const [manager, setManager] = useState("");
  const [shop, setShopName] = useState("");
  const [OpenTime, setOpenTime] = useState("");
  const [CloseTime, setCloseTime] = useState("");

  const [type, setType] = useState("");

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

  const onChangeShopName = (event) => {
    setShopName(event.target.value);
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

  const onChangeType = (event) => {
    setType(event.target.value);
  };

  const resetInputs = () => {
    setName("");
    setEmail("");
    setPassword("");
    setDate(null);
    setNumber("");
    setAge("");
    setManager("");
    setBatch("");
    setShopName("");
    setOpenTime("");
    setCloseTime("");
    setWallet("");
    setType("Buyer");
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
      wallet: 0,
      type: type,
    };

    axios
      .post("/api/user/register", newUser)
      .then((response) => {
        alert("Created\t" + response.data.name);
        console.log(response.data);
      });

    resetInputs();
  };

  return (
    <Grid container align={"center"} spacing={2}>

      <Grid item xs={12}>
        <h2>REGISTER</h2>
      </Grid>

      <Grid item xs={12}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">User-Type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={type}
            label="User-Type"
            onChange={onChangeType}
          >
            <MenuItem value={"Buyer"}>Buyer</MenuItem>
            <MenuItem value={"Vendor"}>Vendor</MenuItem>

          </Select>
        </FormControl>
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

      {type == "Buyer" &&
        <Grid item xs={12}>
          <TextField
            label="Name"
            variant="outlined"
            value={name}
            onChange={onChangeName}
          />
        </Grid>
      }
      {type == "Buyer" &&
        <Grid item xs={12}>
          <TextField
            label="Age"
            variant="outlined"
            value={age}
            onChange={onChangeAge}
          />
        </Grid>
      }
      {/* {type == "Buyer" &&
        <Grid item xs={12}>
          <TextField
            label="Batch"
            variant="outlined"
            value={batch}
            onChange={onChangeBatch}
          />
        </Grid>
      } */}

      {
        type == "Buyer" &&
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Batch</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={batch}
              label="Batch"
              onChange={onChangeBatch}
            >
              <MenuItem value={"UG1"}>UG1</MenuItem>
              <MenuItem value={"UG2"}>UG2</MenuItem>
              <MenuItem value={"UG3"}>UG3</MenuItem>
              <MenuItem value={"UG4"}>UG4</MenuItem>
              <MenuItem value={"UG5"}>UG5</MenuItem>

            </Select>
          </FormControl>
        </Grid>
      }

      {type == "Vendor" &&
        <Grid item xs={12}>
          <TextField
            label="Manager"
            variant="outlined"
            value={manager}
            onChange={onChangeManager}
          />
        </Grid>
      }
      {type == "Vendor" &&
        <Grid item xs={12}>
          <TextField
            label="Shop-Name"
            variant="outlined"
            value={name}
            onChange={onChangeName}
          />
        </Grid>
      }
      {type == "Vendor" &&
        <Grid item xs={12}>
          <TextField
            label="Open-Time"
            variant="outlined"
            value={OpenTime}
            onChange={onChangeOpenTime}
          />
        </Grid>
      }
      {type == "Vendor" &&
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
          Register
        </Button>
      </Grid>
    </Grid>
  );
};

export default Register;
