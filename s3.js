const aws = require("aws-sdk");
const fs = require("fs");
let s3;
if (process.env.AWS_KEY) {
    s3 = new aws.S3({
        accessKeyId: process.env.AWS_KEY,
        secretAccessKey: process.env.AWS_SECRET,
    });
} else {
    const secrets = require("./credentials.json"); // secrets
    s3 = new aws.S3({
        accessKeyId: secrets.AWS_KEY,
        secretAccessKey: secrets.AWS_SECRET,
    });
}

// it's a middleware: in the name of the request, the response and the next
function s3upload(request, response, next) {
    if (!request.file) {
        console.log("[social-network:s3] file not there");
        response.sendStatus(500);
        return;
    }
    const { filename, mimetype, size, path } = request.file;

    console.log("[social-network:s3] uploading to s3...", {
        Bucket: "spicedling",
        Key: filename,
        ContentType: mimetype,
        ContentLength: size,
    });

    s3.putObject({
        Bucket: "spicedling",
        ACL: "public-read",
        Key: filename,
        Body: fs.createReadStream(path),
        ContentType: mimetype,
        ContentLength: size,
    })
        .promise()
        .then(() => {
            console.log("[social-network:s3] uploaded to s3");
            next();
            // delete original file after upload
            fs.unlink(path, () => {});
        })
        .catch((error) => {
            console.log("[social-network:s3] error uploading to s3", error);
            response.sendStatus(500);
        });
}

module.exports = {
    s3upload,
};

/*

const aws = require("aws-sdk");
//const { S3 } = require("aws-sdk");
const fs = require("fs");

let secrets = require("./credentials.json"); // secrets

const s3 = new aws.S3({
    accessKeyId: secrets.AWS_KEY,
    secretAccessKey: secrets.AWS_SECRET,
});
*/
