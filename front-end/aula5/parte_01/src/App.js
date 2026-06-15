import { useState } from "react";


function App() {
  const [comment, setComment] = useState("");
  const [listOfComments, setListOfComments] = useState([]);

  const recordComment = (event) => {
    event.preventDefault();
    setListOfComments([...listOfComments, comment]);
    setComment("");
  }

  const commentList = listOfComments.map((comment, index) => (
    <li key={index}>{comment}</li>
  ));


  return (
    <>
      <form onSubmit={recordComment}>
        <p>Enter you Comment </p>
        <textarea value={comment} onChange={(event) => setComment(event.target.value)} />
        <button type="submit">Add Comment</button>
      </form>
      <p>All comments</p>
      <ul>
        {commentList}
      </ul>
    </>
  );
}

export default App;
