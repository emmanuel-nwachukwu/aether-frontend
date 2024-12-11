import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import { endpoints } from "../api/endpoints";
import { useContext } from "react";
import { GlobalContext } from "../contexts/useGlobalContext";
import PropTypes from "prop-types";

const { Dragger } = Upload;

const UploadFile = ({ onUploadComplete }) => {
  const { postData } = useContext(GlobalContext);

  const props = {
    name: "images",
    multiple: true,
    accept: "image/*", // Accept only image files
    beforeUpload: (file) => {
      // Validate file type
      const isImage = file.type.startsWith("image/");
      if (!isImage) {
        message.error(`${file.name} is not a valid image file.`);
        return Upload.LIST_IGNORE; // Prevent the file from being added
      }
      return true;
    },
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
    customRequest: async ({ file, onSuccess, onError }) => {
      try {
        // Prepare form data
        const formData = new FormData();
        formData.append("images", file);

        // Use your custom postData function
        const response = await postData(endpoints.upload, formData);
        console.log("line 48 Uploadfel.jsx", response); //debug line
        if (response) {
          // Notify Verification of the new URLs
          onUploadComplete(response);
        }
        // Handle success
        onSuccess(response);
        message.success(`${file.name} file uploaded successfully.`);
      } catch (error) {
        // Handle error
        console.error("Upload error:", error);
        onError(error);
        message.error(`${file.name} file upload failed.`);
      }
    },
    // // Handling file removal
    // onRemove(file) {
    //   const updatedUrls = imageUrls.filter(url => url !== file.url);
    //   setImageUrls(updatedUrls); // Update state when a file is removed
    //   console.log("Updated URLs after removal:", updatedUrls);
    // },
  };

  return (
    <Dragger {...props}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">
        Click or drag file to this area to upload
      </p>
      <p className="ant-upload-hint">
        Ensure your document image is legible and taken under good lighting
        condition.
      </p>
    </Dragger>
  );
};

UploadFile.propTypes = {
  onUploadComplete: PropTypes.func,
};

export default UploadFile;
