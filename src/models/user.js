import { query as queryUsers } from '@/services/user';
import { history } from 'umi';
const UserModel = {
  namespace: 'user',
  state: {
    currentUser: {},
  },
  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },

    *fetchCurrent(_, { call, put }) {
      // const response = yield call(queryCurrent);
      const token = localStorage.getItem("tarsToken")
      const userInfo = localStorage.getItem("tarsUser")
      if (!token || !userInfo) {
        history.push("/user/login");
        return;
      }
      const info = JSON.parse(userInfo)
      yield put({
        type: 'saveCurrentUser',
        payload: info,
      });
    },
  },
  reducers: {
    saveCurrentUser(state, action) {
      return { ...state, currentUser: action.payload || {} };
    },

    changeNotifyCount(
      state = {
        currentUser: {},
      },
      action,
    ) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
  },
};
export default UserModel;
