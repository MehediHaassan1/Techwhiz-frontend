import axios from "axios";
import { toast } from "sonner";

const uploadImageToCloudinary
  = async (imageFiles: FileList | null): Promise<string[] | undefined> => {
    const cloudName = "dpdfti8b0";
    const uploadPreset = "randomImages";
    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

    if (!imageFiles || imageFiles.length === 0) {
      return undefined;
    }

    const uploadedImageUrls: string[] = [];

    try {
      for (const imageFile of Array.from(imageFiles)) {
        const formData = new FormData();
        formData.append("file", imageFile);
        formData.append("upload_preset", uploadPreset);

        const response = await axios.post(cloudinaryUrl, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        uploadedImageUrls.push(response.data.secure_url);
      }

      return uploadedImageUrls;
    } catch (error) {
      toast.error("Image upload failed! Try again later!");
      return undefined;
    }
  };

export default uploadImageToCloudinary;
