import { Input } from "antd";
// import { Upload } from "antd";
import UploadFile from "../ui/UploadFile";
import { useContext, useState } from "react";
import { GlobalContext } from "../contexts/useGlobalContext";
import { endpoints } from "../api/endpoints";
import useNotification from "../customHooks/useNotification";

const Verification = () => {
  const firstName = localStorage.getItem("firstName");
  const lastName = localStorage.getItem("lastName");

  // State to hold the uploaded image URLs
  const [imageUrls, setImageUrls] = useState([]);
  const { postData, verification, setVerification } = useContext(GlobalContext);
  const { onNotify } = useNotification();

  // Callback to update imageUrls
  const handleImageUpload = (urls) => {
    setImageUrls((prevUrls) => [...prevUrls, ...urls]);
  };

  const handleSubmit = async () => {
    const dataToSubmit = {
      firstName,
      lastName,
      imageUrls: imageUrls,
      verificationStatus: "pending",
    };

    // API call to submit data
    await postData(endpoints.verification.start, dataToSubmit);
    onNotify("success", "Succesful", "Succesfully started verification");
    setVerification("pending");
    localStorage.setItem("verificationStatus", "pending");
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-10">Verification</h1>

      <div className="max-w-[500px]">
        <div className="flex items-center justify-between mb-12">
          <p className="text-xl font-medium">KYC Status</p>
          <p className="font-bold">{verification}</p>
        </div>
        {verification === "unverified" && (
          <div className="px-4">
            <div className="flex flex-wrap items-center gap-4 justify-between mb-8">
              <div className="min-w-5 w-full max-w-56">
                <p className="mb-1">First Name</p>
                <Input name="firstName" disabled defaultValue={firstName} />
              </div>
              <div className="min-w-5 w-full max-w-56">
                <p className="mb-1">Last Name</p>
                <Input name="lastName" disabled defaultValue={lastName} />
              </div>
            </div>

            <div className="mb-6">
              <h1 className="text-red-700 mb-4 font-bold text-lg">
                Submit a copy of your valid government issued ID
              </h1>

              <UploadFile
                onUploadComplete={handleImageUpload}
                imageUrls={imageUrls}
                setImageUrls={setImageUrls}
              />
            </div>

            <button
              onClick={handleSubmit}
              className="text-md font-bold bg-brown-dark hover:bg-brown transition-all duration-300 ease-in-out text-white py-2 px-4">
              Verify Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Verification;
