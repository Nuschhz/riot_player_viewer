import UserProfile from "./UserProfile";

import { useContext } from "react";
import { SearchContext } from "../context/SearchContext";

export default function UserData() {
  const { currentUser } = useContext(SearchContext);

  const NoData = () => {
    return <></>;
  };

  return <>{currentUser.exist ? <UserProfile /> : <NoData />}</>;
}
