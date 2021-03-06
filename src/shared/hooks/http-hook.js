import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { uiActions } from "../../store/ui-slice";

export const useHttpClient = () => {
  const isLoading = useSelector((state) => state.ui.isLoading);
  const dispatch = useDispatch();

  const error = useSelector((state) => state.ui.error);

  const activeHttpRequests = useRef([]);

  const sendRequest = useCallback(
    async (url, method = "GET", headers = {}, body = null) => {
      !isLoading && dispatch(uiActions.setIsLoading(true));
      dispatch(uiActions.setIsLoading(true));

      const httpAbortCtrl = new AbortController();
      activeHttpRequests.current.push(httpAbortCtrl);

      try {
        const response = await fetch(url, {
          method,
          headers,
          body,
          signal: httpAbortCtrl.signal,
        });

        const responseData = await response.json();

        activeHttpRequests.current = activeHttpRequests.current.filter(
          (reqCtrl) => reqCtrl !== httpAbortCtrl
        );

        if (!response.ok) {
          throw new Error(responseData.message);
        }

        dispatch(uiActions.setIsLoading(false));
        return responseData;
      } catch (err) {
        dispatch(uiActions.setIsLoading(false));
        dispatch(uiActions.setError(err.message));

        throw err;
      }
    },
    []
  );

  const clearError = () => {
    dispatch(uiActions.setError(null));
  };

  useEffect(() => {
    return () => {
      activeHttpRequests.current.forEach((abortCntrl) => abortCntrl.abort());
    };
  }, []);

  return { isLoading, error, sendRequest, clearError };
};
