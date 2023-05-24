import { FC } from "react";
import { Button } from "../Button/Button";
import { useAppDispatch } from "../../hooks/useStore";
import { onGetServiceId } from "../../store/thunks/oauth-thunk";

export const OAuth: FC = () => {
  const dispatch = useAppDispatch();

  const onGetOAuthCode = () => {
    dispatch(onGetServiceId());
    //TODO удалить
    console.log("OAuth");
  }

  return  (
    <Button type="primary" htmlType="button" clickHandler={onGetOAuthCode}>
      Войти c помощью Яндекс
    </Button>)
}
