const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} = require('@aws-sdk/client-s3');
require('dotenv').config();
const { v4: uuid } = require('uuid');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

// Validate credentials before creating client
if (!process.env.B2_ACCESS_KEY || !process.env.B2_SECRET_KEY) {
  throw new Error('B2 credentials are not configured. Check your .env file.');
}

const s3 = new S3Client({
  endpoint: process.env.B2_ENDPOINT,
  region: 'us-east-005',
  credentials: {
    accessKeyId: process.env.B2_ACCESS_KEY,
    secretAccessKey: process.env.B2_SECRET_KEY,
  },
  forcePathStyle: true,
  requestChecksumCalculation: 'WHEN_REQUIRED',
  responseChecksumValidation: 'WHEN_REQUIRED',
});

const bucket = process.env.BUCKET;

async function uploadMediaToBucket(fileBuffer) {
  console.log('i am here')
  const uid = uuid();
  
  try {
    
    // File-type is an ES module and doesn't support CommonJS module
    const FileTypeModule = await import('file-type');
    const fileType = await FileTypeModule.fileTypeFromBuffer(fileBuffer);
    
    if (!fileType) throw new Error('Could not determine mime type');
    
    const mimeType = fileType.mime;
    const extension = mimeType.split('/')[1];
    const fileKey = uid + '.' + extension;
    
    console.log(`Uploading file: ${fileKey} to bucket: ${bucket}`);
    
    await s3.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: fileKey,
        Body: fileBuffer,
        ContentType: mimeType,
        ChecksumAlgorithm: undefined,
      })
    );
    
    console.log(`Successfully uploaded: ${fileKey}`);
    return fileKey;
  } catch (err) {
    console.error('Error uploading picture to bucket:', err);
    throw err;
  }
}
async function getSignedUrlForMedia(fileKey){
    const command = new GetObjectCommand({
        Bucket: bucket,
        Key: fileKey
    })
    try{
        const signedUrl = await getSignedUrl(s3, command, {expiresIn: 3600});
        return signedUrl;
    }catch (err){
        console.error("Error generating signed url", err)
    }
}

module.exports = { uploadMediaToBucket, getSignedUrlForMedia };