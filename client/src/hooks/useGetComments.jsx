import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchComments } from "../store/httpCommentSlice";

export const useComments = () => {
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.comment.comments);
  const isLoading = useSelector((state) => state.comment.isLoading);
  const error = useSelector((state) => state.comment.error);

  const getComments = useCallback(async () => {
    dispatch(fetchComments());
  }, [dispatch]);

  return { comments, isLoading, error, getComments };
};
