import classNames from "classnames";
function Skeleton({ times }) {
  const outerClassNames = "";
  const innerClassNames = "";
  const boxes = Array(times)
    .fill(0)
    .map((_, i) => (
      <div key={i}>
        <div className="skeleton">
          <div className="skeleton__avatar"></div>
          <div className="skeleton__author"></div>
          <div className="skeleton__details"></div>
        </div>
      </div>
    ));
  return boxes;
}
export default Skeleton;
