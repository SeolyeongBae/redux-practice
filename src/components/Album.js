import React from 'react';


function Album({posts}){

    return(
    <ul>
      {posts.map(post => (
        <li key={post.id}>
          <img src={post.thumbnailUrl}></img>
          <a> Title : {post.title}</a>
        </li>
      ))}
    </ul>
 
    );
}

export default Album;