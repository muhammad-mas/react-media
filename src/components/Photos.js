import { useAddPhotoMutation, useFetchPhotosQuery } from "../store";
import Button from "./Button";
import Skeleton from "./Skeleton";

function Photos({ album }) {
  const [addPhoto, addPhotoResult] = useAddPhotoMutation();
  const {
    data: photos,
    error,
    isFetching,
    isLoading,
  } = useFetchPhotosQuery(album);

  function handleAddPhoto() {
    addPhoto(album);
  }
  let content;
  if (isLoading || isFetching) {
    content = <Skeleton times={2} className={"w-10 h-10"} />;
  } else if (error) {
    content = <div>{error.message}</div>;
  } else {
    content = photos.map((photo) => {
      return (
        <div key={photo.id} className="flex flex-row gap-2">
          <img
            src={photo.thumbnailUrl}
            alt={photo.title}
            className="w-10 h-10"
          />
          <p>{photo.title}</p>
        </div>
      );
    });
  }
  return (
    <div>
      <div className="flex flex-row justify-between w-full items-center ">
        <h3>The Album Contains Following Photos</h3>
        <Button loading={addPhotoResult.isLoading} onClick={handleAddPhoto}>
          + Add Photo
        </Button>
      </div>

      <div>{content}</div>
    </div>
  );
}
export default Photos;