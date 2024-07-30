ProfilePage
|
|-- Navbar
|   |-- Logo
|   |-- SearchBar
|   |-- NavigationIcons
|
|-- ProfileHeader
|   |-- UserProfilePicture
|   |-- Username
|   |-- PostCount
|   |-- FollowerCount
|   |-- FollowingCount
|
|-- Bio
|
|-- FollowButton
|
|-- PostGrid
    |-- GridItem (repeated for each post)
        |-- PostImage
        |-- LikeCount (on hover)
        |-- CommentCount (on hover)


-----------------------------------
| ProfileHeader                   |
|---------------------------------|
| PostCount | FollowerCount | FollowingCount |
|---------------------------------|
| Bio                             |
|---------------------------------|
| PostsGrid                       |
-----------------------------------

ProfileHeader: This component will display the user's profile picture, username, and a button for editing the profile. If the profile belongs to another user, this button could be used for following/unfollowing.

PostCount: This component will display the number of posts the user has made.

FollowerCount: This component will display the number of followers the user has.

FollowingCount: This component will display the number of users the user is following.

Bio: This component will display the user's bio.

PostsGrid: This component will display the user's posts in a grid layout.

FollowDialog: This dialog will be displayed when the follow button is clicked. It will ask the user to confirm if they want to follow the other user.

UnfollowDialog: This dialog will be displayed when the unfollow button is clicked. It will ask the user to confirm if they want to unfollow the other user.

Here's a simple diagram