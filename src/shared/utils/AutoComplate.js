import React, { useEffect, useState } from 'react'
import PlacesAutocomplete, {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,

} from "react-places-autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  List,
  ListItem,
  Divider,
  ListItemText,
} from "@material-ui/core";
// import {  geocodeByPlaceId } from 'react-places-autocomplete';
import { HiOutlineLocationMarker } from 'react-icons/hi';

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "36ch",
    cursor: "pointer",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
}));
function AutoComplete({ form, formikField, setForm, check, check1,check3 }) {
  const classes = useStyles();
  const [state, setState] = useState({ addrss: "941 Bourbon St New Orleans", bool: true });
  const [suggestn, setSuggestion] = useState([]);

  const handleChange = (addrss) => {

    setForm({
      ...form,
      address: addrss
    });
  };


  const handleSelect = (address) => {

    geocodeByAddress(address)
      .then((resp) => {
        // console.log(resp,"responseeeeAddress")
        // placeid= 

        var coordinates = "";
        var addrs = "";
        var country = "";
        getLatLng(resp[0]).then((info) => {
          console.log("plaaceee", resp)
          coordinates = [info?.lng, info?.lat];
          const address = resp[0].formatted_address.split(",");
          country = address[address.length - 1];




          console.log('resp[0].formatted_address', resp[0].formatted_address)
          addrs = address[1] ? address[0]?.concat(address[1]) : address[0];
          formikField && formikField("location", resp[0].formatted_address)
          setForm({ ...form, address: resp[0].formatted_address, coordinates: coordinates });
          setSuggestion([]);

        });
      })
      .catch((error) => {
        console.error("Error", error);
      });
  };

  return (
    <>
      <PlacesAutocomplete
        value={form?.address ? form?.address : ""}
        onChange={handleChange}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => {
          if (suggestions.length > 0) {
            setSuggestion(suggestions);
          }
          return (
            <div>
              {check ? <div className="iptAuth field w-100" style={{ width: "400px !important" }}>
                <HiOutlineLocationMarker />
                <input
                 {...getInputProps({
                   placeholder: "Enter Location",
                 })}
                 className="autocomplete_input"
                 value={form.address}
                 
                 // onError={this._handleError}
                 //  clearItemsOnError={true}
               /> 
              </div>: <div className={check1 ? "profil_locat w-100" : check3 ? "profil_locat w-100" : "profil_locat w-68"} style={{ width: "387px",paddingLeft:"2%" }}>
              <HiOutlineLocationMarker/>
                <input
                  {...getInputProps({
                    placeholder: "Enter Location",
                  })}
                  className="autocomplete_input"
                  value={form.address}
                />
              </div>
              }

              <div className="autocomplete-dropdown-container">
                {loading && <List className={classes.root} style={{ width: "500px" }}>
                  <ListItem alignItems="flex-start">
                    <ListItemText primary={"Loading..."} />
                  </ListItem>
                </List>}

                {suggestn.map((suggestion) => {
                  return (
                    <div {...getSuggestionItemProps(suggestion, {})}>
                      <List className={classes.root} style={{ width: "500px" }}>
                        <ListItem alignItems="flex-start">
                          <ListItemText primary={suggestion.description} />
                        </ListItem>
                      </List>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        }}
      </PlacesAutocomplete>
    </>
  )
}

export default AutoComplete
