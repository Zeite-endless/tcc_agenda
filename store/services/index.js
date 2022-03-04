import { saveUserData } from "../user/userInfo";

export const saveToUser = res => {
    return saveUserData(res);
}