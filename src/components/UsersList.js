import { useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchUsers, addUser } from "../store";
import Skeleton from "./Skeleton";
import Button from "./Button";
import useThunk from "../hooks/useThunk";
import User from "./User";

function UsersList() {
  const [fetchUsers_, isLoadingUsers, loadingUsersError] = useThunk(fetchUsers);
  const [addUser_, isLoadingAddingUser, loadingAddingUserError] =
    useThunk(addUser);

  const { data } = useSelector((state) => state.users);

  useEffect(() => {
    fetchUsers_();
  }, [fetchUsers_]);
  const handleAddUser = () => {
    addUser_();
  };
  let content;
  if (isLoadingUsers) {
    content = (
      <div>
        <Skeleton times={6} className={"h-10 w-full"}></Skeleton>
      </div>
    );
  } else if (loadingUsersError) {
    content = <div>{loadingUsersError.message}</div>;
  } else {
    content = data.map((u) => {
      return <User user={u} key={u.id}></User>;
    });
  }

  return (
    <div>
      <div className="flex flex-row justify-between m-3 items-center">
        {/* button to add user */}
        <h1 className="m-2 text-xl">Users</h1>
        <Button primary onClick={handleAddUser} loading={isLoadingAddingUser}>
          {isLoadingAddingUser || "+ Add User"}
          {isLoadingAddingUser && "Adding User..."}
        </Button>
        {loadingAddingUserError && "Error Creating User"}
      </div>
      {content}
    </div>
  );
}
export default UsersList;
