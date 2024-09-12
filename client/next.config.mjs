/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        domains:[`${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com`]
      },
};

export default nextConfig;
