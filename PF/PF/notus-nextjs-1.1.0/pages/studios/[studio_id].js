import { useRouter } from 'next/router'
import Admin from "layouts/Admin.js";
import React, { useState, useEffect } from 'react';

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
		return (	<div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 shadow-lg">
			<div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
        <div className="flex-auto p-4">
          <div className="flex flex-wrap">
            <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
	      <p> no amenities to show </p>
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
      key => (	<div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 shadow-lg">
			<div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
        <div className="flex-auto p-4">
          <div className="flex flex-wrap">
            <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
		<h6 className="font-semibold text-blueGray-700">{key.amenity_type} - {key.quantity}</h6>
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
		return (	<div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 shadow-lg">
			<div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
        <div className="flex-auto p-4">
          <div className="flex flex-wrap">
            <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
	      <p> no images to show </p>
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
      key => (	<div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 shadow-lg">
			<div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
        <div className="flex-auto p-4">
          <div className="flex flex-wrap">
            <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
	      <img src={key.image}/>
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

const Post = () => {
	const [studioInfo, setStudioInfo] = useState({
		name: '',
		address: '',
		postal_code: '',
		phone_number: ''});
	const [studioAmenities, setStudioAmenities] = useState('');
	const [studioImages, setStudioImages] = useState('');
  const router = useRouter()
  const { studio_id } = router.query
  useEffect(() => {
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
		<h6 className="font-semibold text-blueGray-700">{studioInfo.name} - {studioInfo.address}</h6>
		<small className="font-semibold text-blueGray-400">{studioInfo.phone_number}</small>
		</div>
		</div>
		</div>
		</div>
		</div>
	  {studioAmenities}
	  {studioImages}
	  </>
  )
}

Post.layout = Admin
export default Post

