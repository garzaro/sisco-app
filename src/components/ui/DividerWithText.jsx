import * as React from "react";

const DividerWithText = ({ title }) => {
  return (
    <div className="flex items-center my-4">
      <div className="flex-grow mr-2 border-t  border-gray-600"></div>
      <span className="text-zinc-100">
        { title }
      </span>
      <div className="flex-grow ml-2 border-t border-gray-600"></div>
    </div>
    )
}
export default DividerWithText;