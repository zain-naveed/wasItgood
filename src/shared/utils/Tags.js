import React, { useEffect, useState } from "react";
// import "../profile.css"
import { MdOutlineClose } from "react-icons/md"
// import { BsSearch } from "react-icons/bs";
import { notify } from "../utils/notify";
// import { Searchicon } from "../../../Assets";
import FreeSolo from '../utils/FreeSolo';


const Tags = ({ handleState, title, check, tags, formikField, form, setForm, tag, errors, touched, arr,jobtitleCheck }) => {
  console.log("errors from tagsss", errors?.tag)
  const [tagData, setTagData] = useState(tags ? tags : []);
  const [servicesTag, setServicesTags] = useState(tags ? tags : []);
  const [productsTag, setProductsTag] = useState([]);
  const [chemicalTag, setChemicalTag] = useState([]);
  const [bool, setBool] = useState(false);
  const [value, setValue] = useState({ title: "" });
  const [data, setData] = useState("")
  const removeTagData = indexToRemove => {
    setTagData([...tagData.filter((_, index) => index !== indexToRemove)]);
    // if (tagData.length == 1) {
    //   formikField("tag", []);
    // }
  };

  const addTagData = event => {
    // if (event.target.value !== '') {
    //   setTagData([...tagData, event.target.value]);
    //   event.target.value = '';
    // }
  };

  const addWithButton = (e) => {
    setBool(true)
    e.preventDefault();
    const result = tagData.filter(tag => tag.replace(/\s/g, '').toLowerCase() == data.replace(/\s/g, '').toLowerCase());

    if (result.length > 0) {
        notify('error', "Already Added")
      setData("")
    }
    else {

      if (data !== "") {
        let temp = [...tagData];
        temp.push(data);
        setTagData([...temp]);
        setData("")
        // formikField("tag", temp);
      }
      else {
        notify('error', "Enter from List")
        setData("")
      }
    }
    // setTagData("")
    // setForm({
    //   ...form,
    //   tag: e
    // });
    setData("")
    setValue({ title: "" })

  };
  handleState(title, tagData)

  console.log("data from tags", tagData)



  return (
    <>
      <div className={title == "posts" ? " " : "mt-5"} >
        <div className='headingDiv'>
          <h1 className='headingSection'>{title == "posts" ? "" : title}</h1>
        </div>
        <div className={title == "posts" ? "" : "backTag"}>
          <div>
            <div style={{ position: "relative", display: "flex",justifyContent:"space-between", alignItems: "center" }}>
              {/* <img src={Searchicon} className="SearchTag" style={title == "posts" ? { top: "23px" } : {}} /> */}
              {/* <input
                type="text"
                onKeyUp={event => (event.key === 'Enter' ? addTagData(event) : null)}
                className={title === "posts" ? "inputIndJob" : " paddingForTags inputInd"}
                style={{ marginTop: "2%" }}
                value={data}
                placeholder={title === "posts" ? "Search Services to add" : title === "Your Services" ? "Search service to add" : title === "Familiar Products" ? "Search products to add" : title === "Familiar Chemical Service Product" ? "Search chemical to add" : ""}
                onChange={(e) => setData(e.target.value)}
              /> */}
              <FreeSolo setData={setData} title1={title} value={value} setValue={setValue} data={data} tag={tag} errors={errors} touched={touched} arr={arr} jobtitleCheck/>
              <button style={{ background: "#2892D7" }} className={title === "posts" ? "btn btnTagsForJob" : "btn btnTags "} onClick={(e) => addWithButton(e)}> + Add</button>
            </div>
            <div className="formikerror_show w-100">{errors?.tag ? errors?.tag : ""}</div>
            <ul className={tagData == ""? "tags displynone" : "tags" }>
              {tagData.length === 0 ?
                <div className="NoProducts">
                  <p className="toBeAdded" style={{ padding: "10px" }}>{title === "posts" ? "No Services Added" : title === "Your Services" ? "No services added yet!" : title === "Familiar Products" ? "No product added yet!" : title === "Familiar Chemical Service Product" ? "No product added yet!" : title == "Job Title" ? "No job titles added yet!" : ""}</p>
                </div>
                :
                tagData.map((tag, index) => (
                  <li key={index} className="tag">
                    <span className="tag-title">{tag}</span>
                    <span
                      className=""
                      onClick={() => removeTagData(index)}
                    >
                      <MdOutlineClose style={{ color: "#FA4949", marginLeft: "65%", cursor: "pointer" }} />
                    </span>
                  </li>
                ))}
            </ul>
          </div>

        </div>
      </div>

    </>
  );
};

export default Tags;