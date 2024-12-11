import { useContext, useEffect, useRef, useState } from "react";
import { GlobalContext } from "../contexts/useGlobalContext";
import { endpoints } from "../api/endpoints";
import { Button, Input, message } from "antd"; // Import Ant Design components
import { SendOutlined, CloseOutlined } from "@ant-design/icons";
import PopConfirmModal from "./PopConfirmModal";

const ChatComponent = () => {
  const { postData, fetchData } = useContext(GlobalContext);
  const [messageText, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sendStatus, setSendStatus] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // Manage modal visibility
  // const [submitMessage, setSubmitMessage] = useState("");

  const messagesEndRef = useRef(null); // Ref for the bottom of the chat messages

  // Fetch new messages from the backend
  const fetchMessages = async () => {
    try {
      const newMessages = await fetchData(endpoints.message.getMessages);
      console.log("line 19", newMessages);
      if (newMessages?.length > 0) {
        setMessages((prev) => [...prev, ...newMessages]);
      }
    } catch (err) {
      console.error("Line 28 chatComponent Error fetching messages:", err);
    }
  };

  // Scroll to the bottom of the messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom(); // Scroll whenever messages change
  }, [messages]);

  // Poll for new messages every 5 seconds
  useEffect(() => {
    // fetchMessages();
    const interval = setInterval(fetchMessages, 10000);
    return () => clearInterval(interval); // Clean up on component unmount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await postData(endpoints.message.send, {
        message: messageText,
      });
      setSendStatus("✔");

      setMessages((prevMessages) => [
        ...prevMessages,
        { text: messageText, isOwnMessage: true, isSent: true },
      ]);

      setLoading(false);
      setMessage("");
    } catch (err) {
      setSendStatus("x");
      console.error(err.message);
      message.error("Failed to send message.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadChatHistory = async () => {
      try {
        const chat = await fetchData(endpoints.message.getHistory);
        if (chat?.messages) {
          setMessages(chat.messages);
        }
      } catch (err) {
        console.error("Line 82 chatComponent Error loading chat history:", err);
      }
    };
    loadChatHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCloseChat = async () => {
    try {
      setIsModalOpen(true);
      // message.success("Chat marked as closed.");
    } catch (err) {
      console.error("Line 93 chatComponent Error closing chat:", err);
      message.error("Failed to close chat.");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 border border-white rounded-lg bg-white shadow-md relative">
      <div className="bg-brown text-white py-2 px-4 rounded-t-lg text-center font-bold">
        Live Chat
      </div>
      <div className="p-4 text-green-dark font-bold text-lg bg-white mb-2">
        <p>
          Please Leave a message, a customer support agent will respond shortly.
        </p>
      </div>
      <Button
        type="default"
        className="flex items-center justify-center text-white rounded-lg  text-2xl border-2 border-transparent hover:!border-white hover:!bg-brown-dark hover:!text-white font-extrabold bg-brown-dark transition-all duration-300 ease-in-out absolute top-5 right-5"
        onClick={handleCloseChat}>
        <CloseOutlined />
      </Button>
      <div className="p-2 h-64 overflow-y-auto flex flex-col gap-2">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg ${
              msg.isOwnMessage
                ? "bg-brown text-white self-end"
                : "bg-white-dark text-black self-start"
            }`}>
            {msg.text}
            {msg.isSent && (
              <span className="text-sm text-gray-700 ml-2">{sendStatus}</span>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} /> {/* This keeps track of the bottom */}
      </div>
      <form className="flex gap-2 mt-2" onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Enter message"
          value={messageText}
          onChange={(e) => setMessage(e.target.value)}
          required
          className="flex-1 border-brown-light hover:border-brown active:border-brown focus:border-brown active:outline-none focus:outline-none"
        />
        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
          disabled={loading}
          className="bg-brown hover:!bg-brown-dark">
          {loading ? "Sending..." : <SendOutlined />}
        </Button>
        <PopConfirmModal
          postData={postData}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          setMessages={setMessages}
          endpoint={endpoints.message.close}
          // submitMessage={submitMessage}
          // setSubmitMessage={setSubmitMessage}
        />
      </form>
    </div>
  );
};

export default ChatComponent;
