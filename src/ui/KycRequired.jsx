import { NavLink } from "react-router-dom";
import { LockOutlined } from "@ant-design/icons";
const KycRequired = () => {
  return (
    <div className="flex gap-2 border-solid border-2 border-red-900">
      <div className="self-center">
        <LockOutlined style={{ fontSize: "2rem" }} />
      </div>
      <div className="w-full flex flex-col">
        <h2 className="font-bold">KYC Verification Required</h2>
        <p>
          Please submit the required KYC information to verify yourself.
          Otherwise, you couldn&apos;t make any withdrawal requests to the
          system.{" "}
        </p>
        <span>
          <NavLink to="../verification" className="text-blue-600">
            Click here
          </NavLink>{" "}
          to submit your KYC information
        </span>
      </div>
    </div>
  );
};

export default KycRequired;
