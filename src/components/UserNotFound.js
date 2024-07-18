import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function UserNotFound() {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      style={{
        color: theme.redText00,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        flex: 1,
      }}
    >
      <div>Usuário não encontrado.</div>
      <div>Verifique se os campos foram preenchidos corretamente.</div>
    </div>
  );
}
