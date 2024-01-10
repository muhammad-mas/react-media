import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../store";
import Skeleton from "./Skeleton";

function UsersList() {
  const { data, isLoading, error } = useSelector((state) => state.users);
  console.log(data, isLoading, error);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);
  if (isLoading) {
    return (
      <div>
        <Skeleton></Skeleton>
      </div>
    );
  }
  if (error) {
    return <div>{error}</div>;
  }
  return (
    <div>
      {data.map((u) => {
        return <div key={u.id}>{u.name}</div>;
      })}
    </div>
  );
}
export default UsersList;
