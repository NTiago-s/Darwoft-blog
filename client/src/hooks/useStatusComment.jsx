import { useState } from "react";

const useStatusComment = () => {
  const [publicationComments, setPublicationComments] = useState({});

  const handleStatusComment = (id) => {
    setPublicationComments((prevComments) => ({
      ...prevComments,
      [id]: { comment: true, commentText: "" },
    }));
  };

  const handleStatusNoComment = (id) => {
    setPublicationComments((prevComments) => ({
      ...prevComments,
      [id]: { comment: false, commentText: "" },
    }));
  };

  return { publicationComments, handleStatusComment, handleStatusNoComment };
};

export default useStatusComment;
