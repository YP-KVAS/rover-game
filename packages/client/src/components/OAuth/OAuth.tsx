import { FC } from "react";
import { Button } from "../Button/Button";
import { useAppDispatch } from "../../hooks/useStore";
import { onGetClientId } from "../../store/thunks/oauth-thunk";

export const OAuth: FC = () => {
  const dispatch = useAppDispatch();

  const useOAuth = () => {
    dispatch(onGetClientId());
  }

  return  (
    <Button type="primary" htmlType="button" clickHandler={useOAuth}>
      Войти c помощью Яндекс
    </Button>)
}
