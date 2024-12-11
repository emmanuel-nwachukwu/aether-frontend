import { useState } from "react";
import { Form, Input, Button, Card } from "antd";
import { useAuth } from "../customHooks/useCustomAuth";

const AdminSignIn = () => {
  const [loading, setloading] = useState(false);
  const { onAuth } = useAuth();

  const onFinish = (values) => {
    setloading(true);
    // onNotify("success", "Successful", "User addedd");

    onAuth(values);
    setloading(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.error("Line 18 admin signin Failed:", errorInfo);
    setloading(false);
  };

  return (
    <div className="min-h-[100svh] flex flex-col gap-y-8 items-center justify-center">
      <h1 className="text-center text-3xl font-bold text-brown">
        WELCOME BACK
      </h1>

      <Card className="max-w-[40rem] w-[100%] bg-white shadow-2xl">
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
            rules={[{ required: true, message: "Please enter your password" }]}>
            <Input.Password className="input-style" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="bg-brown hover:!bg-brown-dark">
              Sign In
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default AdminSignIn;
