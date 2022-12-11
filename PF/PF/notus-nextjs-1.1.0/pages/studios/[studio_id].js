import { useRouter } from 'next/router'
import Admin from "layouts/Admin.js";
import React, { useState, useEffect } from 'react';
import ClassList from 'components/ClassList';
import Link from "next/link";
import authHeader from 'services/authHeader';


const studioViewApi = async (studio_id) => {
	if (studio_id === '') {
		return null
	}
	
	const url = 'http://localhost:8000/studios/' + studio_id
	const response = await fetch(url);
    const jsonResponse = await response.json();
	console.log(jsonResponse)
	return jsonResponse

};

const studioAmenitiesApi = async (studio_id) => {
	if (studio_id === '') {
		return null
	}
	
	const url = 'http://localhost:8000/studios/' + studio_id + '/amenities'
	const response = await fetch(url);
    const jsonResponse = await response.json();

	console.log(jsonResponse)
	if (jsonResponse.count === 0) {
		return (	<div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 ">
			<div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 ">
        <div className="flex-auto p-4">
          <div className="flex flex-wrap">
            <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
	      <p className="font-semibold text-xl text-blueGray-400"> no amenities to show. </p>
	      {/*
		<small className="font-semibold text-blueGray-400">{key.phone_number}</small>
		*/}
		</div>
		</div>
		</div>
		</div>
		</div>
      )
	}
	const amenityArray = jsonResponse.results.map(
      key => (	<div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 ">
			<div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 ">
        <div className="flex-auto p-4">
          <div className="flex flex-wrap">
            <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
		<h6 className="font-semibold text-blueGray-700">{key.amenity_type} (count: {key.quantity})</h6>
	      {/*
		<small className="font-semibold text-blueGray-400">{key.phone_number}</small>
		*/}
		</div>
		</div>
		</div>
		</div>
		</div>
      )
    )
	return amenityArray;
};

const studioImagesApi = async (studio_id) => {
	if (studio_id === '') {
		return null
	}

	const url = 'http://localhost:8000/studios/' + studio_id + '/images'
	const response = await fetch(url);
    const jsonResponse = await response.json();
	console.log(jsonResponse)
	if (jsonResponse.count === 0) {
		return (	<div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 ">
			<div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 ">
        <div className="flex-auto p-4">
          <div className="flex flex-wrap">
            <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
	      <p className="font-semibold text-xl text-blueGray-400"> no images to show. </p>
	      {/*
		<small className="font-semibold text-blueGray-400">{key.phone_number}</small>
		*/}
		</div>
		</div>
		</div>
		</div>
		</div>
      )
	}

	const imageArray = jsonResponse.results.map(
      key => (	            <div className="relative w-full pr-4 max-w-full flex-grow m-4 flex-1">
	      <img src={key.image} className="max-w-full h-auto transition-shadow rounded-lg"/>
	      {/*
		<small className="font-semibold text-blueGray-400">{key.phone_number}</small>
		*/}
		</div>
      )
    )
	return imageArray;
};

const Post = () => {
	const [studioInfo, setStudioInfo] = useState({
		name: '',
		address: '',
		postal_code: '',
		phone_number: ''});
	const [studioAmenities, setStudioAmenities] = useState('');
	const [studioImages, setStudioImages] = useState('');
	const [loggedIn, setLoggedIn] = useState(false);
  const router = useRouter()
  const { studio_id } = router.query
  useEffect(() => {
		const auth = authHeader()
		if (auth){
			setLoggedIn(true);
		}
      studioViewApi(studio_id).then(
          result => setStudioInfo(result));
      studioAmenitiesApi(studio_id).then(
          result => setStudioAmenities(result));
      studioImagesApi(studio_id).then(
          result => setStudioImages(result));
  },[studio_id]);


  return (
	  <>
      	<div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 shadow-lg">
			<div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
        <div className="flex-auto p-4">
          <div className="flex flex-wrap">
            <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
		<h1 className="font-semibold text-4xl text-blueGray-700">{studioInfo.name} - {studioInfo.address}</h1>
		<p className="font-semibold text-xl text-blueGray-400">Phone: {studioInfo.phone_number} Postal Code: {studioInfo.postal_code}</p>
	  	</div>
	  		<div className="text-right my-4">
			  {loggedIn? <Link href={`/classes/${studio_id}/schedule`}>
	                  <button
                  className="bg-orange-500 text-blueGray-200 active:bg-blueGray-50 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150"
                  type="button"
                >
                  <i className="fas fa-calendar"></i> My Class History
                </button>
			</Link> : <></>}
		</div>
		</div>
		</div>
		</div>
		</div>
      	<div className="flex flex-wrap">
	<div className="flex-auto p-4 w-6/12">
      	<div className="relative flex flex-col min-w-0 break-words bg-white w-full rounded mb-6 shadow-lg">
		<h1 className="font-semibold p-4 text-2xl w-full text-blueGray-700">Amenities</h1>
	  {studioAmenities}
	  </div>
	  </div>
	<div className="flex-auto p-4 w-6/12">
      	<div className="relative flex flex-col min-w-0 break-words bg-white w-full rounded mb-6 shadow-lg">
		<h6 className="font-semibold p-4 text-2xl w-full text-blueGray-700">Gallery</h6>
      	<div className="relative flex flex-row min-w-0 break-words bg-white w-full rounded mb-6 ">
	  {studioImages}
	  </div>
	  </div>
	  </div>
	  </div>
	  <ClassList studio_id={studio_id}/>
	  </>
  )
}

Post.layout = Admin
export default Post

