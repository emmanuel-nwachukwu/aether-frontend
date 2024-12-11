import { useState } from "react";
import { Form, Input, Button, Card } from "antd";
import { useAuth } from "../customHooks/useCustomAuth";
import { Link } from "react-router-dom";
import NavBar from "../layout/NavBar";

const SignIn = () => {
  const [loading, setloading] = useState(false);
  const { onAuth } = useAuth();

  const onFinish = async (values) => {
    console.log("Form Values:", values);
    if (values.honeypot) {
      // If honeypot field is filled, it's a bot submission
      // console.log("Bot detected!");
      return;
    }

    setloading(true);
    // onNotify("success", "Successful", "User addedd");

    try {
      await onAuth(values); // Await the auth function to ensure it completes before stopping loading
    } finally {
      setloading(false); // Ensure loading state is reset no matter what
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.error("Line 30 signin Failed:", errorInfo);
    setloading(false);
  };

  return (
    <div>
      <NavBar />
      <div className="min-h-[90svh] flex flex-col items-center justify-center">
        <h1 className="text-center text-3xl text-brown font-bold my-10">
          Welcome Back
        </h1>
        <Card className="max-w-[40rem] w-[100%] shadow-2xl bg-white ">
          <Form
            // form={form}
            name="signup"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            layout="vertical"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}>
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
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please enter your password" },
              ]}>
              <Input.Password className="input-style" />
            </Form.Item>

            {/* Honeypot Field */}
            <Form.Item name="honeypot" style={{ display: "none" }}>
              <Input />
            </Form.Item>

            <Form.Item className="text-center">
              <Button
                className="bg-brown hover:!bg-brown-dark text-xl py-6 px-8 font-semibold mt-8"
                type="primary"
                htmlType="submit"
                loading={loading}>
                Sign In
              </Button>
            </Form.Item>
          </Form>
          <p className="flex items-center gap-2">
            Don&apos;t have an account?
            <span className="text-brown-dark text-lg font-medium">
              <Link to="/signup" className="hover:text-brown-light">
                Signup
              </Link>
            </span>
          </p>
        </Card>
      </div>
    </div>
  );
};

export default SignIn;
