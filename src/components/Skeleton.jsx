const Skeleton = ({ type }) => {
  if (type === "header") {
    return (
      <div className="skeleton-wrapper header-center">
        <div className="skeleton-avatar shimmery" />
        <div
          className="skeleton-line title shimmery"
          style={{ width: "150px" }}
        />
        <div
          className="skeleton-line bio shimmery"
          style={{ width: "540px" }}
        />
        <div className="skeleton-line bio shimmery" style={{ width: "60%" }} />
      </div>
    );
  }

  return (
    <div className="skeleton-wrapper card-layout">
      <div className="skeleton-icon-box shimmery" />
      <div className="skeleton-info">
        <div
          className="skeleton-line shimmery"
          style={{ width: "100px", height: "18px" }}
        />
        <div
          className="skeleton-line shimmery"
          style={{ width: "160px", height: "12px" }}
        />
      </div>
      <div className="skeleton-actions">
        <div className="skeleton-btn shimmery" />
        <div className="skeleton-btn shimmery" />
        <div className="skeleton-square shimmery" />
      </div>
    </div>
  );
};

export default Skeleton;
