
import { Reducer } from 'redux';
import { Subscription } from 'dva';
import { query } from '@/services/api';
import { Effect } from '@/models/connect';

export interface AntdModelState {
  name: string;
}

export interface AntdModelType {
  namespace: 'antd';
  state: AntdModelState;
  effects: {
    query: Effect;
  };
  reducers: {
    save: Reducer<AntdModelState>;
  };
  subscriptions: { setup: Subscription };
}


const AntdModel: AntdModelType = {
  namespace: 'antd',

  state: {
    name: '',
  },

  effects: {
    *query({ payload }, { call, put }) {
      const data = yield call(query, payload);
      console.log(data)
      yield put({
        type: 'save',
        payload: { name: data.text },
      });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/') {
          dispatch({
            type: 'query',
          })
        }
      });
    },
  },
  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};

export default AntdModel;
