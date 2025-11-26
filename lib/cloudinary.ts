import {v2 as cloudinary} from "cloudinary";
import dotenv from "dotenv";

dotenv.config({ path: ".env"});

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
});

console.log("Cloudinary Config", {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY?'SET' :'NOT SET',
    api_secret:process.env.CLOUDINARY_API_SECRET?'SET':'NOT SET',
});

export default cloudinary;

// import {v2 as cloudinary} from "cloudinary";
// import dotenv from "dotenv";

// dotenv.config({ path: ".env.local"});

// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key:process.env.CLOUDINARY_API_KEY,
//     api_secret:process.env.CLOUDINARY_API_SECRET,
// });

// console.log("Cloudinary Config", {
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key:process.env.CLOUDINARY_API_KEY?'SET' :'NOT SET',
//     api_secret:process.env.CLOUDINARY_API_SECRET?'SET':'NOT SET',
// });

// export default cloudinary;

// import { v2 as cloudinary } from "cloudinary";

// // ❌ No dotenv import
// // ❌ No dotenv.config()
// // ❌ No manual path to .env.local

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// console.log("Cloudinary Config", {
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY ? "api" : "NOT SET",
//   api_secret: process.env.CLOUDINARY_API_SECRET ? "SET" : "NOT SET",
// });

// export default cloudinary;
