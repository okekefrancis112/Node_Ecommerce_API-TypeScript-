import cloudinary from 'cloudinary';


cloudinary.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
  });


export const cloudinaryUploadImg = async (fileToUploads:any, folder:any) => {
    return new Promise(resolve => {
        cloudinary.v2.uploader.upload(fileToUploads, (result:any) => {
            resolve ({
                    url: result.secure_url,
                    id: result.public_id
                    });
        },
        // {
        //     resource_type: 'auto',
        //     folder:folder
        // }
        );
    });
};
