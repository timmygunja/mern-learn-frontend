import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { uiActions } from "../../store/ui-slice";

export const useHttpClient = () => {
  // const [isLoading, setIsLoading] = useState(false);
  const isLoading = useSelector((state) => state.ui.isLoading);
  const dispatch = useDispatch();

  // const [error, setError] = useState(null);
  const error = useSelector((state) => state.ui.error);

  const activeHttpRequests = useRef([]);
  const history = useHistory();

  const sendRequest = useCallback(
    async (url, method = "GET", headers = {}, body = null) => {
      // setIsLoading(true);
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

        // setIsLoading(false);
        dispatch(uiActions.setIsLoading(false));

        return responseData;
      } catch (err) {
        // setIsLoading(false);
        dispatch(uiActions.setIsLoading(false));

        // setError(err.message);
        dispatch(uiActions.setError(err.message));

        throw err;
      }
    },
    []
  );

  const clearError = () => {
    // setError(null);
    dispatch(uiActions.setError(null));
  };

  useEffect(() => {
    return () => {
      activeHttpRequests.current.forEach((abortCntrl) => abortCntrl.abort());
    };
  }, []);

  return { isLoading, error, sendRequest, clearError };
};
