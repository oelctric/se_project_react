import SideBar from '../SideBar/SideBar.jsx';
import ClothesSection from '../ClothesSection/ClothesSection.jsx';
import './Profile.css';

function Profile({ clothingItems, onAddNewGarment, onCardClick }) {
  return (
    <div className="profile">
      <SideBar />
      <ClothesSection
        clothingItems={clothingItems}
        onAddNewGarment={onAddNewGarment}
        onCardClick={onCardClick}
      />
    </div>
  );
}

export default Profile;
