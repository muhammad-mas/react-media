import { GoTrashcan } from "react-icons/go";
import {
  useAddPhotoMutation,
  useDeletePhotoMutation,
  useFetchPhotosQuery,
} from "../store";
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

  const [deletePhoto, deletePhotoResult] = useDeletePhotoMutation();
  console.log(deletePhotoResult);
  function handleDeletePhoto(photo) {
    deletePhoto(photo);
  }
  function handleAddPhoto() {
    addPhoto(album);
  }
  let content;
  if (isLoading || isFetching) {
    content = <Skeleton times={2} className={"w-10 h-10"} />;
  } else if (error) {
    content = <div>Error Fetching Photos ... {error.message}</div>;
  } else {
    content = photos.map((photo) => {
      return (
        <div key={photo.id} className="flex flex-col gap-2">
          <div className="flex flex-row justify-center">
            {/* <Button
              loading={
                deletePhotoResult.isLoading &&
                deletePhotoResult.originalArgs?.id === photo.id
              }
             
            >
              <GoTrashcan />
            </Button> */}
            <div
              className="relative cursor-pointer m-2"
              onClick={() => {
                handleDeletePhoto(photo);
              }}
            >
              <img
                className="w-20 h-20"
                src={photo.thumbnailUrl}
                alt={photo.title}
              />
              <div className="absolute inset-0 flex items-center justify-center hover:bg-gray-200 opacity-0 hover:opacity-80">
                <GoTrashcan className="text-3xl" />
              </div>
            </div>
          </div>
          <div>
            <p>{photo.title}</p>
          </div>
        </div>
      );
    });
  }
  return (
    <div>
      <div className="m-2 flex flex-row justify-between items-center ">
        <h3 className="text-lg font-bold">
          The Album Contains Following Photos
        </h3>
        <Button loading={addPhotoResult.isLoading} onClick={handleAddPhoto}>
          + Add Photo
        </Button>
      </div>

      <div className="mx-8 flex flex-row flex-wrap justify-around">
        {content}
      </div>
    </div>
  );
}
export default Photos;
