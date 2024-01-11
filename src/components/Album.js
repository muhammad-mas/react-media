import { GoTrashcan } from "react-icons/go";
import Button from "./Button";
import ExpandablePanel from "./ExpandablePanel";
import { useDeleteAlbumMutation } from "../store";

function Album({ album }) {
  const [deleteAlbum, results] = useDeleteAlbumMutation();
  const handleDeleteAlbum = (e) => {
    deleteAlbum(album);
  };
  const header = (
    <div className="flex flex-row gap-2">
      <Button danger onClick={handleDeleteAlbum} loading={results.isLoading}>
        <GoTrashcan />
      </Button>

      <h2>{album.title}</h2>
    </div>
  );
  return <ExpandablePanel key={album.id} header={header}></ExpandablePanel>;
}
export default Album;
