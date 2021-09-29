import { useState } from "react";
import { userProfile } from "../types/userProfile";
import axios from "axios";
import { User } from "./types/api/user";

// 全ユーザー一覧を取得するカスタムフック

export const useAllUsers = () => {
  const [userProfiles, setuserProfiles] = useState<Array<userProfile>>([]);
  // ローディングの情報をもったstateを用意し、クリック時にloadingのフラグをtrueにして、処理が終わったらloadingをfaalseにする
  const [loading, setLoading] = useState(false);
  // エラーがあるのかどうかを判定するstete
  const [error, setError] = useState(false);

  //トリガーとなる関数を定義
  const getUsers = () => {
    setLoading(true); // ボタンが押下されるとloadingのフラグをtrueにする
    setError(false);
    axios
      .get<Array<User>>("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        const data = res.data.map((user) => ({
          id: user.id,
          name: `${user.name}${user.username}`,
          email: user.email,
          address: `${user.address.city}${user.address.suite}${user.address.street}`
        }));
        setuserProfiles(data);
      })
      .catch(() => {
        setError(true); // エラーがあった場合フラグをtrue
      })
      .finally(() => {
        setLoading(false);
      });
  };
  // 他のコンポーネントでステートと関数を使えるようにする
  return { getUsers, userProfiles, loading, error };
};
