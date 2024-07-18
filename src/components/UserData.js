import UserProfile from "./UserProfile";

import { useContext } from "react";
import { SearchContext } from "../context/SearchContext";
import { LoadingContext } from "../context/LoadingContext";

import Loading from "./Loading";
import UserNotFound from "./UserNotFound";

export default function UserData() {
  const { currentUser } = useContext(SearchContext);
  const { loading } = useContext(LoadingContext);

  const Data = () => {
    return currentUser.exist ? <UserProfile /> : <UserNotFound />;
  };

  const LoadUser = () => {
    return loading ? <Loading /> : <Data />;
  };

  const NoData = () => {
    return <div style={{ flex: 1 }}></div>;
  };

  return <>{currentUser.searching === false ? <NoData /> : <LoadUser />}</>;
}
