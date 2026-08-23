import SideBar from '../SideBar/SideBar.jsx';
import ClothesSection from '../ClothesSection/ClothesSection.jsx';
import './Profile.css';

function Profile({
  clothingItems,
  onAddNewGarment,
  onCardClick,
  onCardLike,
  onEditProfile,
  onLogOut,
}) {
  return (
    <div className="profile">
      <SideBar onEditProfile={onEditProfile} onLogOut={onLogOut} />
      <ClothesSection
        clothingItems={clothingItems}
        onAddNewGarment={onAddNewGarment}
        onCardClick={onCardClick}
        onCardLike={onCardLike}
      />
    </div>
  );
}

export default Profile;
