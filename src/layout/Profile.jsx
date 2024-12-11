import { useContext, useEffect, useState } from "react";
import { Input, Form, Spin } from "antd";
import { GlobalContext } from "../contexts/useGlobalContext";

const Profile = () => {
  const { userData } = useContext(GlobalContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay or wait for userData to load
    if (userData) {
      setIsLoading(false);
    } else {
      setTimeout(() => setIsLoading(false), 1000); // Adjust timeout as needed
    }
  }, [userData]);

  const {
    firstName,
    lastName,
    userName,
    email,
    dob,
    phone,
    address,
    verificationStatus,
  } = userData || {}; // Destructure userData

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  console.log("line 19", userData);
  return (
    <div className="max-w-[600px] mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Profile</h1>
      <Form layout="vertical">
        <div className="flex items-center justify-center gap-4 font-bold">
          <Form.Item>
            {/* <Input value={firstName} disabled /> */}
            <h1 className="text-3xl text-brown">{firstName.toUpperCase()}</h1>
          </Form.Item>

          <Form.Item>
            {/* <Input value={lastName} disabled /> */}
            <h1 className="text-3xl text-brown">{lastName.toUpperCase()}</h1>
          </Form.Item>
        </div>

        <Form.Item label="Username">
          <Input value={userName} disabled />
        </Form.Item>

        <Form.Item label="Email">
          <Input value={email} disabled />
        </Form.Item>

        <Form.Item label="Date of Birth">
          <Input value={new Date(dob).toLocaleDateString()} disabled />
        </Form.Item>

        <Form.Item label="Phone">
          <Input value={phone} disabled />
        </Form.Item>

        <Form.Item label="Address">
          <Input.TextArea
            value={`${address?.street}, ${
              address?.apt ? address.apt + "," : ""
            } ${address?.city}, ${address?.state}, ${address?.zip}, ${
              address?.country
            }`}
            disabled
            rows={3}
          />
        </Form.Item>

        <Form.Item label="Verification Status">
          <Input value={verificationStatus} disabled />
        </Form.Item>
      </Form>
    </div>
  );
};

export default Profile;
