import "../styles/Dropdown.css";

import { useContext, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronUp,
} from "@fortawesome/fontawesome-free-solid";

import DropdownContent from "./DropdownContent";

export default function Dropdown({ server, setServer, servers }) {
  const [isSelected, setIsSelected] = useState(false);

  const handleSelectServer = () => setIsSelected(!isSelected);

  const { theme } = useContext(ThemeContext);

  return (
    <div className="DropdownContainer">
      <button
        style={{ color: theme.displayColor }}
        className="DropdownButton"
        onClick={handleSelectServer}
      >
        <span>{server.serverName}</span>
        {isSelected ? (
          <FontAwesomeIcon icon={faChevronDown} />
        ) : (
          <FontAwesomeIcon icon={faChevronUp} />
        )}
      </button>
      {isSelected ? (
        <DropdownContent
          servers={servers}
          setServer={setServer}
          setIsSelected={setIsSelected}
        />
      ) : null}
    </div>
  );
}
