import { useEffect, useState } from "react";
import { Form, Input, Button, Card } from "antd";
// import useNotification from "../customHooks/useNotification";
import axios from "axios";

import { useAuth } from "../customHooks/useCustomAuth";
import NavBar from "../layout/NavBar";
import Line from "../ui/Line";
import "../index.css";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [form] = Form.useForm();
  const [country, setCountry] = useState("");
  const [loading, setloading] = useState(false);
  const { onAuth } = useAuth();
  // console.log(fetchData);

  useEffect(() => {
    const fetchCountryFromIP = async () => {
      try {
        console.log("Testing");
        // const response = await fetchData(endpoints.getCountry);
        const response = await axios.get(
          "https://get.geojs.io/v1/ip/country.json"
        );

        // console.log("response", response.data?.name);
        setCountry(response.data?.name);
        form.setFieldsValue({ country: country });
      } catch (err) {
        console.error("Line 323 signup: ", err.message);
      }
    };
    fetchCountryFromIP();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form, country]);

  const onFinish = (values) => {
    // console.log(country);
    console.log("Form Values:", values);

    if (values.honeypot) {
      // If honeypot field is filled, it's a bot submission;
      // console.log("Bot detected!");
      return;
    }
    setloading(true);
    // onNotify("success", "Successful", "User addedd");

    onAuth(values);
    setloading(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Line 50 signup Failed:", errorInfo);
    setloading(false);
  };

  return (
    <div>
      <NavBar />
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-center text-3xl text-brown font-bold my-10">
          Sign Up
        </h1>
        <Card className="max-w-[40rem] w-[100%] mb-20 shadow-2xl bg-white">
          <Form
            form={form}
            name="signup"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            layout="vertical"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            initialValues={{
              prefix: "+",
              country: country,
            }}>
            <p className="text-xl font-semibold text-brown mb-3">
              Personal information
            </p>

            <div className="flex align-center justify-between gap-4 w-full">
              <Form.Item
                className="w-full"
                label="First Name"
                name="firstName"
                rules={[
                  { required: true, message: "Please enter your first name" },
                ]}>
                <Input className="input-style" />
              </Form.Item>

              <Form.Item
                className="w-full"
                label="Last Name"
                name="lastName"
                rules={[
                  { required: true, message: "Please enter your last name" },
                ]}>
                <Input className="input-style" />
              </Form.Item>
            </div>

            <Form.Item
              label="Username"
              name="userName"
              rules={[
                { required: true, message: "Please enter a unique username." },
              ]}>
              <Input className="input-style" />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please enter your email" },
                { type: "email", message: "Enter a valid email" },
              ]}>
              <Input className="input-style" />
            </Form.Item>

            <Form.Item
              label="Phone"
              name="phone"
              rules={[
                { required: true, message: "Please enter your phone number" },
                {
                  pattern: /^\d{10,15}$/,
                  message: "Enter a valid phone number",
                },
              ]}>
              <Input className="input-style !border-red-400" addonBefore="+" />
            </Form.Item>

            <Form.Item
              label="Date of Birth"
              name="dob"
              rules={[
                { required: true, message: "Please select your date of birth" },
              ]}>
              <Input className="input-style" type="date" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please enter your password" },
              ]}>
              <Input.Password className="input-style" />
            </Form.Item>

            <div className="my-10">
              <Line />
            </div>
            <p className="text-xl font-semibold text-brown mb-3">
              Address Information
            </p>

            {/* Address Fields */}
            <Form.Item
              label="Street"
              name="street"
              rules={[{ required: true, message: "Please enter your street" }]}>
              <Input className="input-style" />
            </Form.Item>

            <div className="flex items-center gap-2">
              <Form.Item className="w-full" label="apt" name="apt">
                <Input className="input-style" />
              </Form.Item>

              <Form.Item
                label="zip"
                name="zip"
                rules={[{ required: true, message: "Please enter your zip" }]}>
                <Input className="input-style" maxLength={5} />
              </Form.Item>
            </div>

            <div className="flex items-center gap-2">
              <Form.Item
                className="w-full"
                label="City"
                name="city"
                rules={[{ required: true, message: "Please enter your city" }]}>
                <Input className="input-style" />
              </Form.Item>

              <Form.Item
                className="w-full"
                label="State"
                name="state"
                rules={[
                  { required: true, message: "Please enter your state" },
                ]}>
                <Input className="input-style" />
              </Form.Item>
            </div>

            <Form.Item label="Country" name="country">
              <Input
                className="input-style"
                type="text"
                disabled
                minLength={2}
              />
            </Form.Item>

            {/* Honeypot Field */}
            <Form.Item name="honeypot" style={{ display: "none" }}>
              <Input className="input-style" />
            </Form.Item>

            <Form.Item className="text-center">
              <Button
                className="bg-brown hover:!bg-brown-dark text-xl py-6 px-8 font-semibold mt-8"
                type="primary"
                htmlType="submit"
                loading={loading}>
                Sign Up
              </Button>
            </Form.Item>
          </Form>
          <p className="flex items-center gap-2">
            Already have an account?
            <span className="text-brown-dark text-lg font-medium">
              <Link to="/signin" className="hover:text-brown-light">
                Signin
              </Link>
            </span>
          </p>
        </Card>
      </div>
    </div>
  );
};

export default SignUp;
