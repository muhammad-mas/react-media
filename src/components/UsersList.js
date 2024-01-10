import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, addUser } from "../store";
import Skeleton from "./Skeleton";
import Button from "./Button";

function UsersList() {
  const { data, isLoading, error } = useSelector((state) => state.users);
  console.log(data, isLoading, error);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);
  const handleAddUser = () => {
    dispatch(addUser());
  };
  if (isLoading) {
    return (
      <div>
        <Skeleton times={6} className={"h-10 w-full"}></Skeleton>
      </div>
    );
  }
  if (error) {
    return <div>{error.message}</div>;
  }
  return (
    <div>
      <div>
        {/* button to add user */}
        <Button primary onClick={handleAddUser}>
          Add User
        </Button>
      </div>
      <div>
        {data.map((u) => {
          return (
            <div key={u.id} className={"mb-2 border rounded"}>
              <div className="flex p-2 justify-between items-center cursor-pointer">
                {u.name}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default UsersList;
