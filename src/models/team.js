import { fakeTeamCreate, fakeTeamList, fakeTeamMembers } from '@/services/api';
import router from 'umi/router';
import { currentTeamSet, currentTeamGet } from '@/utils/team';

export default {
  namespace: 'team',

  state: {
    list: [],
    members: [],
  },

  effects: {
    *create({ payload }, { call }) {
      const response = yield call(fakeTeamCreate, payload);
      if (response.status === '__OK__') {
        currentTeamSet(response.team_id);
        router.push('/');
      }
    },
    *list(_, { call, put }) {
      const response = yield call(fakeTeamList);

      yield put({
        type: 'queryTeams',
        payload: Array.isArray(response.teams) ? response.teams : [],
      });
    },
    *members(_, { call, put }) {
      const response = yield call(fakeTeamMembers, {
        team_id: currentTeamGet(),
      });
      yield put({
        type: 'queryMembers',
        payload: Array.isArray(response.members) ? response.members : [],
      });
    },
    *select({ payload }) {
      currentTeamSet(payload.team_id);
      yield router.push('/');
    },
  },

  reducers: {
    queryTeams(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    queryMembers(state, action) {
      return {
        ...state,
        members: action.payload,
      };
    },
  },
};
