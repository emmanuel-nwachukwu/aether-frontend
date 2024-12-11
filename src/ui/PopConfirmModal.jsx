import { Modal, message } from "antd";
import PropTypes from "prop-types";

const PopConfirmModal = ({
  isModalOpen,
  setIsModalOpen,
  postData,
  endpoint,
  setMessages,
}) => {
  const handleOk = async () => {
    try {
      await postData(endpoint, {});
      setMessages([]);
      message.success("Chat ended succefully.");
    } catch (err) {
      console.error("Line 17 popconfirm: ", err.message);
      message.error("Chat close failed.");
    } finally {
      setIsModalOpen(false);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal
      title="Confirm End Chat"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}>
      <p>Are you sure you want close this chat?</p>
      <p>Clicking OK will end the chat.</p>
    </Modal>
  );
};

PopConfirmModal.propTypes = {
  isModalOpen: PropTypes.bool,
  setIsModalOpen: PropTypes.node,
  postData: PropTypes.func,
  endpoint: PropTypes.string,
  setMessages: PropTypes.array,
};

export default PopConfirmModal;
