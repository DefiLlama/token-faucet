import React, {useState} from 'react';
import Layout from "../components/layout"

import { Typography, Switch, Button, Paper, TextField, InputAdornment } from '@material-ui/core';

import classes from '../components/header/header.module.css';
import {ethers} from "ethers"

function Input({term, setTerm, title, placeholder}){
    return (<Paper className={classes.searchPaper} style={{marginBottom: "0.5em"}}>
        <TextField
          fullWidth
          className={classes.searchContainer}
          variant="outlined"
          placeholder={placeholder}
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Typography className={classes.searchInputAdnornment}>{title}</Typography>
              </InputAdornment>
            ),
          }}
        />
      </Paper>)
}

async function create(name, symbol, decimals, limit){
  const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
  const signer = provider.getSigner();
  const contract = new ethers.Contract(
    "0x806720a305F100F08A48dC3E663C223A378Fe9F9",
    [
      "function createToken(string memory _name, string memory _symbol, uint _limit, uint8 _decimals) external returns (address tokenContract)",
      "function getTokenByParameters(address _creator, string memory _name, string memory _symbol, uint _limit, uint8 _decimals) external view returns(address predictedAddress, bool isDeployed)"
    ],
    signer
  )
  const limitWithDecimals = ethers.BigNumber.from(10).pow(decimals).mul(limit)
  let signerAddress
  try{
    signerAddress = await signer.getAddress()
  } catch(e){
      window.alert("Connect wallet first!")
      throw e
  }
  const token = await contract.getTokenByParameters(signerAddress, name, symbol, limitWithDecimals, decimals)
  await contract.createToken(name, symbol, limitWithDecimals, decimals);
  window.alert(`address of your token is ${token.predictedAddress}`)
}

function Home() {
  const [name, setName] = useState("")
  const [symbol, setSymbol] = useState("")
  const [decimals, setDecimals] = useState("")
  const [limit, setLimit] = useState("")
  return (
    <Layout searchEnabled={false}>
        <div>
        {[
            [symbol, setSymbol, "Symbol", "DAI, WBTC, ..."],
            [name, setName, "Name", "Wrapped Bitcoin"],
            [decimals, setDecimals, "Decimals", "18"],
            [limit, setLimit, "Limit", "1000"],
        ].map(t=><Input term={t[0]} setTerm={t[1]} title={t[2]} placeholder={t[3]} />)}
        <Button size="medium"
                color="primary"
                variant="contained" style={{width:"100%"}} onClick={()=>create(name, symbol, decimals, limit)}
                disabled={[name, symbol, decimals, limit].some(t=>t==="")}>
            Create
        </Button>
        </div>
    </Layout>
  );
}

export default Home;
