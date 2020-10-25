
//global
export const BASE_URL = "http://localhost:8080/socialCrap/api";

// user
export const USER = BASE_URL + "/user";

export const ADD_USER = BASE_URL + "/user/add";

export const USER_LOGIN = USER + "/login";

export const USER_SEARCH = USER + "/search/";

export const USER_RECOVERY = USER + "/recover/";

export const USER_ANSWER = USER + "/answer/";

export const USER_UPDATE_ABOUT = USER + "/updateAbout/";

export const USER_UPDATE_ADDRESS = USER + "/updateAddress/";

export const USER_UPDATE_RECOVERY_OPTIONS = USER + "/updateRecoveryOptions/";

export const USER_RESET_PASSWORD = USER + "/resetPassword/";

export const USER_CHANGE_PASSWORD = USER + "/changePassword/";

export const FRIEND_SEARCH = USER + "/search/friends/";

export const UPCOMING_BIRTHDAYS = USER + "/birthdays/";

export const FRIEND_SUGGESTIONS = USER + "/suggestions/";

export const SEND_FRIEND_REQUEST = USER + "/sendFriendRequest";

export const CONFIRM_FRIEND_REQUEST = USER + "/confirmFriendRequest/";

export const UN_FRIEND = USER + "/unFriend";

export const PENDING_FRIEND = USER + "/pendingFriends/";

export const USER_TOKEN = USER + "/byToken";

export const COMPLETE_USER_TOKEN = USER + "/CompleteUserbyToken";

export const ACTIVATE_DEACTIVATE_USER = USER + "/activateAndDeactivate/";

export const BLOCK_UNBLOCK_USER = USER + "/blockAndUnblock/";

// upload
export const FILE_UPLOAD = BASE_URL + "/file/upload";

export const UPLOAD = BASE_URL + "/upload";

export const UPLOAD_PHOTO = UPLOAD + "/photo/";

export const UPLOAD_VIDEO = UPLOAD + "/video/";

export const UPLOAD_PROFILE_PIC = UPLOAD + "/updateProfilePic/";

export const UPLOAD_COVER_PHOTO = UPLOAD + "/updateCoverPhoto/";

//post
export const POST = BASE_URL + "/post";
export const POST_CUSTOM = POST + "/custom?userId=";

export const POST_LIKE = POST + "/like";
export const ACTIVATE_DEACTIVATE_POST = POST + "/activateAndDeactivate/";

//comment
export const COMMENT = BASE_URL + "/comment";

//chat
export const CHAT = BASE_URL + "/chat";

//notification

export const NOTIFICATION = BASE_URL + "/notification";
export const NOTIFICATION_CLEAR_ALL = NOTIFICATION + "/clearAllByUserId/";
export const NOTIFICATION_ACTIVE = NOTIFICATION + "/active/";
export const NOTIFICATION_BY_ADMIN = NOTIFICATION + "/byAdmin";

//ticket

export const TICKET = BASE_URL + "/ticket";
export const TICKET_UPDATE_STATUS = TICKET + "/updateStatus";
export const TICKET_BY_USER = TICKET + "/byUser/";

// admin
export const ADMIN = BASE_URL + "/admin";

export const ADMIN_LOGIN = ADMIN + "/login";

