import React, { useState, useEffect } from "react"; 
import './styles.css';
import axios from 'axios'; 
import { TypeFormatFlags } from "typescript";

export default function Photo (){

    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate() - 1;
    var year = dateObj.getUTCFullYear();
    var todays_date = year + "-" + month + "-" + day;
    console.log(todays_date)
 
    function randomDate(start, end) {
        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    }

    function getRandomDate(){
        var date_obj = randomDate(new Date(2012, 0, 1), new Date())

        var month = date_obj.getUTCMonth() + 1; //months from 1-12
        var day = date_obj.getUTCDate() - 1;
        var year = date_obj.getUTCFullYear();
        var random_date = year + "-" + month + "-" + day;

        setRequest({...request, params: { ...request.params, date: random_date }})
        console.log(random_date); 
        setCounter(counter + 1)
    }  

    const [request, setRequest] = useState({params: 
        {api_key: 'hq6OfwnUZFXxyaBdHUtJxGMV5CUIRo049M2SrdFd', date: todays_date}
        // , concept_tags: true, count: 1, thumbs: true} 
    })
    const [photo, setPhoto] = useState({}); 
    const [counter, setCounter] = useState(0); 

    // NASA API Guidelines
    //     api_key | demo: DEMO_KEY | https://api.nasa.gov/#signUp
    
    // date A string in YYYY-MM-DD format indicating the date of the APOD image (example: 2014-11-03). Defaults to today's date. Must be after 1995-06-16, the first day an APOD picture was posted. There are no images for tomorrow available through this API.
    
    // concept_tags A boolean True|False indicating whether concept tags should be returned with the rest of the response. The concept tags are not necessarily included in the explanation, but rather derived from common search tags that are associated with the description text. (Better than just pure text search.) Defaults to False.
    
    // hd A boolean True|False parameter indicating whether or not high-resolution images should be returned. This is present for legacy purposes, it is always ignored by the service and high-resolution urls are returned regardless.
    
    // count A positive integer, no greater than 100. If this is specified then count randomly chosen images will be returned in a JSON array. Cannot be used in conjunction with date or start_date and end_date.
    
    // start_date A string in YYYY-MM-DD format indicating the start of a date range. All images in the range from start_date to end_date will be returned in a JSON array. Cannot be used with date.
    
    // end_date A string in YYYY-MM-DD format indicating that end of a date range. If start_date is specified without an end_date then end_date defaults to the current date.
    // thumbs A boolean parameter True|False inidcating whether the API should return a thumbnail image URL for video files. If set to True, the API returns URL of video thumbnail. If an APOD is not a video, this    parameter is ignored.

    useEffect(()=>{
        axios.get(`https://api.nasa.gov/planetary/apod`, request)
        .then(response =>{
            console.log(response.data)
            if(Array.isArray(response.data)){
                console.log(`This is an array`)
                console.log(`This is an `, typeof(response.data), ` of length `, response.data.length)
                setPhoto(response.data[0])
            }else{
                console.log(`This is an `, typeof(response.data))
                setPhoto(response.data)
            }
        })
        .catch(error =>{
            console.log(error)
        })
        console.log("API Hits: ", counter);
    }, [counter])

    return (
        <div className="main-container">
            <div className='photo-container'>
                <img src={photo.url} alt={photo.title}></img>
            </div>
            <div className="text-container">
                <div className="button-container"><button className="button" onClick={getRandomDate}>New Universe<div className="click">Click me!</div></button></div>
                <div className="photo-title"><h1>{photo.title}</h1></div>
                <div className="photo-copyright"><h2>{photo.copyright}</h2></div>
                <div className="photo-date"><h2>{photo.date}</h2></div>
                <div className="photo-caption"><h3>{photo.explanation}</h3></div>
            </div>
        </div>
    )
}