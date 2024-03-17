import { UserProfile } from "@clerk/nextjs";

const UserProfilePage = () => (
  <UserProfile
    path="/user-profile"
    routing="path"
    appearance={{
      elements: {
        badge: {
          backgroundColor: "#0084FF",
          color: "#FFFFFF",
        },
        headerTitle: {
          color: "#FFFFFF",
        },
        headerSubtitle: {
          color: "#C7C7C7",
        },
        card: {
          marginLeft: 0,
          marginRight: 0,
          borderRadius: 0,
          boxShadow: "none",
          backgroundColor: "#16181F",
          minHeight: "100%",
        },
        formFieldInput__username: {
          backgroundColor: "#121318",
        },
        formInputGroup: {
          backgroundColor: "#121318",
        },
        formButtonPrimary: {
          backgroundColor: "#0084FF",
        },
        formButtonReset: {
          color: "#0084FF",
        },
        navbar: {
          backgroundColor: "#121318",
          borderRightColor: "#C7C7C7",
          minHeight: "100vh",
        },
        navbarButton__active: {
          backgroundColor: "#0084FF",
        },
        profileSectionPrimaryButton__username: {
          color: "#0084FF",
        },
        profileSectionPrimaryButton__emailAddresses: {
          color: "#0084FF",
        },
        profileSectionPrimaryButton__connectedAccounts: {
          color: "#0084FF",
        },
        profileSectionPrimaryButton__password: {
          color: "#0084FF",
        },
      },
    }}
  />
);
export default UserProfilePage;
