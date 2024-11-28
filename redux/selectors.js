//get state out of the reducer
export const getUserSelector = (state) => state.userSlice.userInfo;
export const getUserLoadingSelector = (state) => state.userSlice.loading;

// EVENT
export const getAllStadiumByUserSelector = (state) =>
  state.eventSlice.stadiumListByUser;
export const getAllPlayersSelector = (state) => state.eventSlice.userList;
export const getEventSelector = (state) => state.eventSlice.event;
export const getEventListSelector = (state) => state.eventSlice.eventList;
export const getMyEventListSelector = (state) => state.eventSlice.myEventList;
export const getEventLoadingtSelector = (state) => state.eventSlice.loading;

// MESSAGE / CHAT
export const getListMessageSelector = (state) => state.messageSlice;

//YARD OWNER
export const getByOwnerSelector = (state) => state.yardSlice.stadiumList;
export const getDetailByOwnerSelector = (state) => state.yardSlice.stadium;
export const getLoadingSelector = (state) => state.yardSlice.loading;
export const getAllSportSelector = (state) => state.yardSlice.sports;
export const getAllYardByOwnerSelector = (state) =>
  state.yardSlice.yardListByOwner;
export const getDetailYardByOwnerSelector = (state) => state.yardSlice.yard;
export const getAllYardSelector = (state) => state.yardSlice.yardList;

// SEARCH STADIUM
export const getAllYardByUserSelector = (state) =>
  state.yardSlice.yardListByUser;
export const getStadiumDetailByUserSelector = (state) =>
  state.yardSlice.stadiumByUser;

//PROFILE
export const getBookedByUserSelector = (state) => state.bookSlice.booked;

//BLOG
export const getBlogLoadingSelector = (state) => state.blogSlice.loading;
export const getBlogListSelector = (state) => state.blogSlice.blogList;
export const getMyBlogListSelector = (state) => state.blogSlice.myBlogList;
export const getBlogDetailSelector = (state) => state.blogSlice.blogDetail;
export const getBlogReactListSelector = (state) =>
  state.blogSlice.blogReactList;
export const getBlogCommentListSelector = (state) =>
  state.blogSlice.blogCommentList;
