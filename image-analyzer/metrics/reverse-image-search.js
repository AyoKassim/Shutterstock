const sstk = require("shutterstock-api"); // set the Shutterstock API for use
const fs = require("fs"); // set file system for use

const applicationClientId = process.env.SHUTTERSTOCK_ID; // set the consmumer ID for Shutterstock API
const applicationClientSecret = process.env.SHUTTERSTOCK_SECRET; // set the consumer secret for the Shutterstock API
sstk.setBasicAuth(applicationClientId, applicationClientSecret); // pass the consumer ID and consumer secret

const computerVisionApi = new sstk.ComputerVisionApi(); // initialise Shutterstock Computer Vision

// reverse image search method
module.exports = async function reverseImageSearch(uploadName){
	const imageFile = fs.readFileSync(`./uploads/${uploadName}`); // return the contents of uploadName
	const base64File = Buffer.from(imageFile).toString("base64"); // encode the image to Base 64

	const body = new sstk.ImageCreateRequest(base64File); // request to create the Base 64 encoded image
	
	let data = await computerVisionApi.uploadImage(body); // upload the image
	let imageSearch = await computerVisionApi.getSimilarImages(data.upload_id); // get images similar to the one uploaded

	return imageSearch.total_count; // return number of images found
}