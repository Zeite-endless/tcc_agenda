import { saveUserData } from "../user/userInfo";
import { saveFriendData } from "../user/modalFriend";

export const saveToUser = res => {
    return saveUserData(res);
}

export const saveToFriend = res => {
    return saveFriendData(res);
}