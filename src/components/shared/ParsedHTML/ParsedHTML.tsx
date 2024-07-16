import React from "react";
import parse from "html-react-parser";

const ParsedHTML = ({
  data,
  isTitle = false,
}: {
  data: string;
  isTitle?: boolean;
}) => {
  return (
    <div>
      {isTitle ? (
        <h4 className="text-25">{parse(data)}</h4>
      ) : (
        <span className="text-18">{parse(data)}</span>
      )}
    </div>
  );
};

export default ParsedHTML;
