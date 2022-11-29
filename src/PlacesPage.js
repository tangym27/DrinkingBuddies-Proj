
// import React, { Component } from 'react';

import { useState } from "react";
import * as React from 'react';
import axios from "axios";
import Carousel from "react-material-ui-carousel";
import Button from '@mui/material/Button';


const divStyle = {
  margin: "15px",
  width: "70vh",
  height: "65vh",
  borderRadius: "20px",
  borderColor: "#d2b7e5",
  fontFamily: "Garamond",
  fontSize: "20px",
  backgroundColor: "#dec9e9",  
  
};
const pStyle = {
  margin: "5px",
  textAlign: "center",
  backgroundColor: "#dec9e9",  
};

const pageStyle = {
  height: "90vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const carouselStyle = {
  border: "1px solid #e5d9f2",
  borderRadius: "10px",
  height: "45vh",
  margin: "10px",
  
};

const h1Style = {
    fontWeight: "bolder",
}

const imgStyle = {
  width: "120px",
  height: "120px",
};


function App() {
  const [zipcode, setZipcode] = useState("");
  const [places, setPlaces] = useState(['']);


  function Example(content) {
    return (
      <Carousel
        NavButton={({ onClick, className, style, next, prev }) => {
          return (
            <Button onClick={onClick} id="buttonStyle">
              {next && "Next"}
              {prev && "Prev"}
            </Button>
          );
        }}
        NextIcon="next" // Change the "inside" of the next button to "next"
        PrevIcon="prev" // Change the "inside of the prev button to "prev"
      >
        {content.map((item) => (
        <Item place={item} />
      ))}
      </Carousel>
    );
  }
  
  function Item(props) {
    return (
      <div style={pStyle}>
        <h2>{props["place"].name}</h2>
        <p>
          {" "}
          Address: {props["place"].address} {" "}
        </p>
        <p>{props["place"].rating}</p>

        <br />
      </div>
    );
  }


  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=bars%20in%20${zipcode.trim()}&key=AIzaSyDJyQraEDSqatjKqzQlMApq0DbcR73D6WA`, {
        method: "GET"})
      let result = await res.data;
      let results = result['results'].splice(0, 5)
      let placesArray = []
      console.log(placesArray)
      if (res.status === 200) {
        for (var i = 0; i < results.length; i++) {
          placesArray.push({'name': results[i]['name'], 'address': results[i]['address'], 'rating': results[i]['rating']})
        }
        setPlaces(placesArray)
        console.log(placesArray)
      } else {
        console.log("Some error occured");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <><div style={pageStyle} className="App">
        <form onSubmit={handleSubmit}>
          <h4>Enter Your Zipcode Below To Find Bars Near You!</h4>
          <input
            type="text"
            value={zipcode}
            placeholder="Zipcode"
            onChange={(e) => setZipcode(e.target.value)} />

          <button type="submit">Search</button>


          <div style={divStyle}>
        <br />
          <h1 style={h1Style}> Place </h1>

          <div style={carouselStyle}>{Example(places ?? [])}</div>
          <br />
          <hr />
          {/* <Button
            as="a"
            variant="outline-secondary"
            size="lg"
            href={vodka_wiki}
          >
            Learn More
          </Button> */}
        </div>
        </form>
      </div></>
  );
}


export default App;