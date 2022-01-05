import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../store/ui-slice";

let logoutTimer;

export const useAuth = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.ui.user.token);
  const tokenExpirationDate = useSelector(
    (state) => state.ui.user.tokenExpirationDate
  );

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();

      logoutTimer = setTimeout(uiActions.logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, uiActions.logout, tokenExpirationDate]);

  useEffect(() => {
    const userStorageData = JSON.parse(localStorage.getItem("userData"));

    if (
      userStorageData &&
      userStorageData.token &&
      new Date(userStorageData.tokenExpirationDate) > new Date()
    ) {
      dispatch(
        uiActions.login({
          user: {
            id: userStorageData.userId,
            username: userStorageData.username,
            token: userStorageData.token,
            tokenExpirationDate: new Date(userStorageData.tokenExpirationDate),
          },
        })
      );
    }
  }, []);

  return { token }
};
