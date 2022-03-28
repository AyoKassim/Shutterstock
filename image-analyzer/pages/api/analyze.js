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
  destination: "./uploads",
  filename: (req, file, callback) => {callback(null, file.originalname)},
});
const upload = multer({ storage: storage });

const fs = require('fs')

//process a single image being uploaded
apiRoute.post(upload.single('image'), async (req, res, next) => {
  const analyzer = require("../../metrics/exifdata.js")
      const metric =  await analyzer(req.file.originalname)
      console.log(metric) 
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
