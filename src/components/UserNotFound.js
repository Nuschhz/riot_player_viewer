import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function UserNotFound() {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      style={{
        color: theme.tertiary,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div>Usuário não encontrado.</div>
      <div>Verifique se os campos estão preenchidos corretamente.</div>
    </div>
  );
}
