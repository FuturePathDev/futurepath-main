import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-provider-cognito-identity";
import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity";

const REGION = "us-east-1";
const BUCKET_NAME = "futurepath-student-avatars-723";
const IDENTITY_POOL_ID = "us-east-1:0e8c9735-27e1-4dca-b98b-9d1a4bb65e8d"; // replace with your actual identity pool

const s3 = new S3Client({
  region: REGION,
  credentials: fromCognitoIdentityPool({
    client: new CognitoIdentityClient({ region: REGION }),
    identityPoolId: IDENTITY_POOL_ID,
  }),
});

export const uploadAvatarToS3 = async (file, userId) => {
  const fileName = `${userId}/${file.name}`;
  const uploadParams = {
    Bucket: BUCKET_NAME,
    Key: fileName,
    Body: file,
    ContentType: file.type,
  };

  try {
    await s3.send(new PutObjectCommand(uploadParams));
    return `https://${BUCKET_NAME}.s3.${REGION}.amazonaws.com/${fileName}`;
  } catch (err) {
    console.error("Error uploading to S3:", err);
    return null;
  }
};
