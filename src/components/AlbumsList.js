import { useAddAlbumMutation, useFetchAlbumsQuery } from "../store";
import Album from "./Album";
import Button from "./Button";
import ExpandablePanel from "./ExpandablePanel";
import Skeleton from "./Skeleton";

function AlbumsList({ user }) {
  const { data, error, isLoading, isFetching } = useFetchAlbumsQuery(user);
  const [addAlbum, results] = useAddAlbumMutation();
  const handleAddAlbum = () => {
    addAlbum(user);
  };
  let content;
  if (isLoading || isFetching) {
    content = <Skeleton times={3} className={"h-10 w-full"}></Skeleton>;
  } else if (error) {
    content = <div>{error.message}</div>;
  } else {
    content = data.map((album) => {
      return <Album key={album.id} album={album}></Album>;
    });
  }
  return (
    <div>
      <div className="m-2 flex flex-row items-center justify-between">
        <h3 className="text-lg font-bold"> Albums for {user.name}</h3>
        <Button loading={results.isLoading} onClick={handleAddAlbum} outline>
          + Add Album
        </Button>
      </div>
      <div>{content}</div>
    </div>
  );
}
export default AlbumsList;
