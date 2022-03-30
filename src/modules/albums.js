import { getPhotos, getPhotoById } from "../api/getPhotos"; // api/posts 안의 함수 모두 불러오기
import {
  reducerUtils,
  handleAsyncActions,
  createPromiseSaga,
  createPromiseSagaById,
  handleAsyncActionsById,
} from "../lib/asyncUtils";
import { call, put, takeEvery } from "redux-saga/effects";

//액션 타입

const GET_PHOTOS = "GET_PHOTOS";
const GET_PHOTOS_SUCCESS = "GET_PHOTOS_SUCCESS";
const GET_PHOTOS_ERROR = "GET_PHOTOS_ERROR";

const GET_PHOTO = "GET_PHOTO";
const GET_PHOTO_SUCCESS = "GET_PHOTO_SUCCESS";
const GET_PHOTO_ERROR = "GET_PHOTO_ERROR";

//saga
export const getPosts = () => ({ type: GET_PHOTOS });
//get photos를 발생시켰다면!?

// const getPhotosSaga = createPromiseSaga(GET_PHOTOS, postsAPI.getPhotos);

function* getPhotosSaga() {
  try {
    console.log("try start");
    const posts = yield call(getPhotos); // call 을 사용하면 특정 함수를 호출하고, 결과물이 반환 될 때까지 기다려줄 수 있습니다.
    yield put({
      type: GET_PHOTOS_SUCCESS,
      payload: posts.data,
    }); // 성공 액션 디스패치
  } catch (e) {
    yield put({
      type: GET_PHOTOS_ERROR,
      error: true,
      payload: e,
    }); // 실패 액션 디스패치
  }
}
export const getPost = (id) => ({ type: GET_PHOTO, payload: id, meta: id });
const getPhotoSaga = createPromiseSagaById(GET_PHOTO, getPhotoById);

// 사가들을 합치기
export function* postsSaga() {
  yield takeEvery(GET_PHOTOS, getPhotosSaga);
  yield takeEvery(GET_PHOTO, getPhotoSaga);
  //yield takeEvery(GET_POST, getPostSaga);
}

// initialState 쪽도 반복되는 코드를 initial() 함수를 사용해서 리팩토링 했습니다.
const initialState = {
  //   posts: reducerUtils.initial(),
  //   post: reducerUtils.initial(),
  photos: reducerUtils.initial(),
  photo: reducerUtils.initial(),
};

//posts로 인해 state.posts...
//리네이밍
export default function photoReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PHOTOS:
    case GET_PHOTOS_SUCCESS:
    case GET_PHOTOS_ERROR:
      console.log("action type is", action.type);
      return handleAsyncActions(GET_PHOTOS, "photos", true)(state, action);
    case GET_PHOTO:
    case GET_PHOTO_SUCCESS:
    case GET_PHOTO_ERROR:
      console.log("state is", state);
      return handleAsyncActionsById(GET_PHOTO, "photo", true)(state, action);
    default:
      return state;
  }
}
