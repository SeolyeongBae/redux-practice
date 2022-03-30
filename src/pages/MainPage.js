import React from "react";
import { Link } from "react-router-dom";
import AlbumContainer from "../containers/AlbumContainer";

function MainPage() {
  return (
    <ul>
      <li>
        <Link to="/gallery">갤러리 보기</Link>
      </li>
    </ul>
  );
}

export default MainPage;
