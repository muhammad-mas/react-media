import { GoTrashcan } from "react-icons/go";
import useThunk from "../hooks/useThunk";
import { deleteUser } from "../store";
import Button from "./Button";

function User({ user }) {
  const [deleteUser_, isLoadingDeletingUser, loadingDeletingUserError] =
    useThunk(deleteUser);
  return (
    <div className={"mb-2 border rounded"}>
      <div className="flex p-2 justify-between items-center cursor-pointer">
        {user.name}
        <Button
          secondary
          loading={isLoadingDeletingUser}
          onClick={() => {
            deleteUser_(user.id);
          }}
        >
          {isLoadingDeletingUser ? "Deleting..." : <GoTrashcan />}
        </Button>
        {loadingDeletingUserError && "Error Deleting User"}
      </div>
    </div>
  );
}
export default User;
