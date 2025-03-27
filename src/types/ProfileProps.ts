import CardProps from "./CardProps";

interface ProfileData {
  username: string;
  playerId: string;
  displayName: string;
  profilePicture: string;
  ducats: number;
  tickets: number;
  experience: number;
  featuredCards: CardProps[];
}

export default ProfileData;
