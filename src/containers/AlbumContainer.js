import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Album from "../components/Album";
import { getPosts } from "../modules/albums";

function AlbumContainer() {
  const { data, loading, error } = useSelector(
    (state) => state.photoReducer.photos,
  );
  const dispatch = useDispatch();

  console.log("데이터", data);
  // 컴포넌트 마운트 후 포스트 목록 요청

  useEffect(() => {
    console.log("컨테이너 실행");
    dispatch(getPosts());
  }, [dispatch]);

  if (loading && !data) return <div>로딩중...</div>; // 로딩중이면서, 데이터가 없을 때에만 로딩중... 표시
  if (error) return <div>에러 발생!</div>;
  if (!data) return null;

  return <Album posts={data} />;

  //return <Album posts={data} />;
}

export default AlbumContainer;
