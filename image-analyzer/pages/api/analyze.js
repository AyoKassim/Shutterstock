// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import nextConnect from "next-connect";
import multer from "multer";
import { resolve } from "path";
import { stringify } from "querystring";

//route setup with next connect
const apiRoute = nextConnect({
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

//save uploads to the filesystem
const storage = multer.diskStorage({
  destination: "./public",
  filename: (req, file, callback) => {callback(null, file.originalname)},
});
const upload = multer({ storage: storage });

const fs = require('fs')

const sharp = require('sharp') // sharp package to resize images

var resized = false;

//process a single image being uploaded
apiRoute.post(upload.single('image'), async (req, res, next) => {

  const response = {} //will contain data pertaining to different analysis performend on the image

  const metricFileNames = fs.readdirSync('./metrics')
  //await metrics(metricFileNames, req, response)

  response['name'] = req.file.originalname;
  for(const fileName of metricFileNames)
    {
	  resized = false;
      const metricName = fileName.split('.')[0] // only consider the name and ignore '.js' at the end of the file name, e.g. size in "size.js"
	  if(metricName == 'reverse-image-search' || metricName == 'nsfw' || metricName == 'type' || metricName == 'brisque' || metricName == 'tags'){
		resized = true;
		sharp(`./public/${req.file.originalname}`)
		.resize({
			// set width to 2000
			width: 2000,
			// set height to 2000
			height: 2000,
			// make image as large as possible without losing aspect ratio
			fit: sharp.fit.inside,
			// only shrink the image
			withoutEnlargement: true
		})
		.toFile(`./public/small_${req.file.originalname}`)
	  }
      const analyzer = require(`../../metrics/${fileName}`) //imports a function that uses filename to find upload and returns an analysis JSON
      const metric =  await analyzer(resized ? `small_${req.file.originalname}` : req.file.originalname)
      response[`${metricName}`] =  metric
	  console.log(`${metricName} complete.`)
    }

    const responseString = await JSON.stringify(response);
    
  fs.writeFileSync("./public/generated.json", responseString);

  fs.readFile("./pages/api/index.html", function (error, data) {
    if (error) {
      res.writeHead(404);
      res.write("not found");
    } else {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
    }
    res.end();
  });
});


export default apiRoute;

export const config = {
  api: {
    bodyParser: false,
  },
};
