import React from 'react';


function Album({posts}){

    console.log("post data is", posts);

    
    return(
    <ul>
      {posts.map(post => (
        <li key={post.id}>
          <img src={post.url}></img>
        </li>
      ))}
    </ul>
 
    );
}

export default Album;