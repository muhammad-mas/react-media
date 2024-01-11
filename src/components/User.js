import { GoTrashcan } from "react-icons/go";
import useThunk from "../hooks/useThunk";
import { deleteUser } from "../store";
import Button from "./Button";
import ExpandablePanel from "./ExpandablePanel";
import AlbumsList from "./AlbumsList";

function User({ user }) {
  const [deleteUser_, isLoadingDeletingUser, loadingDeletingUserError] =
    useThunk(deleteUser);
  const header = (
    <>
      <Button
        secondary
        loading={isLoadingDeletingUser}
        onClick={() => {
          deleteUser_(user.id);
        }}
      >
        {isLoadingDeletingUser ? "Deleting..." : <GoTrashcan />}
      </Button>
      {user.name}

      {loadingDeletingUserError && "Error Deleting User"}
    </>
  );
  return (
    <ExpandablePanel header={header}>
      <AlbumsList user={user} />
    </ExpandablePanel>
  );
}
export default User;
