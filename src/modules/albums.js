import * as postsAPI from '../api/getPhotos'; // api/posts 안의 함수 모두 불러오기
import {
  reducerUtils,
  handleAsyncActions,
  createPromiseSaga,
} from '../lib/asyncUtils';
import { call, put, takeEvery } from 'redux-saga/effects';

//액션 타입

const GET_PHOTOS = 'GET_PHOTOS';
const GET_PHOTOS_SUCCESS = 'GET_PHOTOS_SUCCESS';
const GET_PHOTOS_ERROR = 'GET_PHOTOS_ERROR';

//saga
export const getPosts = () => ({ type: GET_PHOTOS });
//get photos를 발생시켰다면!?

const getPhotosSaga = createPromiseSaga(GET_PHOTOS, postsAPI.getPhotos);

// 사가들을 합치기
export function* postsSaga() {
  yield takeEvery(GET_PHOTOS, getPhotosSaga);
  //yield takeEvery(GET_POST, getPostSaga);
}

// initialState 쪽도 반복되는 코드를 initial() 함수를 사용해서 리팩토링 했습니다.
const initialState = {
  posts: reducerUtils.initial(),
  post: reducerUtils.initial(),
  photos : reducerUtils.initial()
};

export default function posts(state = initialState, action) {
  switch (action.type) {
    case GET_PHOTOS:
    case GET_PHOTOS_SUCCESS:
    case GET_PHOTOS_ERROR:
      return handleAsyncActions(GET_PHOTOS, 'photos', true)(state, action);
    default:
      return state;
  }
}