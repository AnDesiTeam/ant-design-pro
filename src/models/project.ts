import { queryProjectNotice } from '@/services/api';
import { Effect } from 'dva';
import { Reducer } from 'redux';

export interface ProjectModelState {
  notice: any[];
}

export interface ProjectModel {
  namespace: 'project';
  state: ProjectModelState;
  effects: {
    fetchNotice: Effect;
  };
  reducers: {
    saveNotice: Reducer<any>;
  };
}
const ProjectModel: ProjectModel = {
  namespace: 'project',

  state: {
    notice: [],
  },

  effects: {
    *fetchNotice(_, { call, put }) {
      const response = yield call(queryProjectNotice);
      yield put({
        type: 'saveNotice',
        payload: Array.isArray(response) ? response : [],
      });
    },
  },

  reducers: {
    saveNotice(state, action) {
      return {
        ...state,
        notice: action.payload,
      };
    },
  },
};

export default ProjectModel;
