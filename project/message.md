MessagePage
|
|-- Navbar
|   |-- Logo
|   |-- SearchBar
|   |-- NavigationIcons
|
|-- MessageList
|   |-- MessageThread (repeated for each thread)
|       |-- UserProfilePicture
|       |-- Username
|       |-- MessagePreview
|
|-- ChatBox
|   |-- ChatMessage (repeated for each message in the selected thread)
|       |-- MessageText
|       |-- Timestamp
|
|-- MessageInput