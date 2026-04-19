export default function ProfileHeader({ name, bio, avatar }) {
  return (
    <div className="portfolio-header">
      <img src={avatar} />
      <h4>{name}</h4>
      <p>{bio}</p>
    </div>
  );
}
