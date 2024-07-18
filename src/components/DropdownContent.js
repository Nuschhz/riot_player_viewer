import "../styles/DropdownContent.css";

import { useContext, useState } from "react";

import { ThemeContext } from "../context/ThemeContext";

export default function DropdownContent({ servers, setServer, setIsSelected }) {
  const [hover, setHover] = useState(-1);
  const { theme } = useContext(ThemeContext);

  const handleMouseEnter = (index) => {
    setHover(index);
  };
  const handleMouseLeave = () => {
    setHover(-1);
  };
  const handleMouseClick = (index) => {
    setServer(servers[index]);
    setIsSelected(false);
  };

  return (
    <div
      className="DropdownContent"
      style={{
        backgroundColor: theme.gray01,
      }}
    >
      {servers.map((item, index) => {
        return (
          <div
            key={index}
            className="content"
            style={
              hover === index
                ? { backgroundColor: theme.gray00 + "53" }
                : { backGroundColor: "transparent" }
            }
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={() => handleMouseLeave(index)}
            onClick={() => handleMouseClick(index)}
          >
            {item.serverName}
          </div>
        );
      })}
    </div>
  );
}
