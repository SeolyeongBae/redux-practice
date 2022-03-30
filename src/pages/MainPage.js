import React from "react";
import { Link } from "react-router-dom";

function MainPage() {
  return (
    <ul>
      <li>
        <Link to="/gallery">갤러리 보기</Link>
      </li>
      <li>
        <Link to="/search">검색하기</Link>
      </li>
    </ul>
  );
}

export default MainPage;
