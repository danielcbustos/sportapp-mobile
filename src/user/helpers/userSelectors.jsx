

export const selectUserId = (state) => state.sessionUser.userInfo.id;
export const selectUserName = (state) => state.sessionUser.userInfo.name;
export const selectUserLastName = (state) => state.sessionUser.userInfo.lastName;
export const selectUserEmail = (state) => state.sessionUser.userInfo.email;
export const selectUserToken = (state) => state.sessionUser.userInfo.token;