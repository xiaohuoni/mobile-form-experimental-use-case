
import { Reducer } from 'redux';
import { Subscription } from 'dva';
import { query } from '@/services/api';
import { Effect } from '@/models/connect';

export interface FieldModelState {
  name: string;
}

export interface FieldModelType {
  namespace: 'field';
  state: FieldModelState;
  effects: {
    query: Effect;
  };
  reducers: {
    save: Reducer<FieldModelState>;
  };
  subscriptions: { setup: Subscription };
}


const FieldModel: FieldModelType = {
  namespace: 'field',

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

export default FieldModel;
