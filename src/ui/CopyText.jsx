import { useState } from "react";
import { Tooltip } from "antd";
import PropTypes from "prop-types";

const CopyText = ({ text }) => {
  const [tooltipText, setTooltipText] = useState("Click to copy");

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setTooltipText("Copied!");
      setTimeout(() => setTooltipText("Click to copy"), 2000); // Reset tooltip after 2 seconds
    } catch (error) {
      console.error("Line 14 CopyText", error);
      setTooltipText("Failed to copy");
    }
  };

  return (
    <Tooltip title={tooltipText}>
      <span
        className="cursor-pointer text-red-900 text-3xl break-words whitespace-normal max-w-full"
        onClick={handleCopy}>
        {text}
      </span>
    </Tooltip>
  );
};

CopyText.propTypes = {
  text: PropTypes.string.isRequired,
};

export default CopyText;
