import "./styles.css";
import { UserCard } from "./components/UserCard";
import axios from "axios";
import { User } from "./types/api/user";
import { userProfile } from "./types/userProfile";
import { useState } from "react";

export default function App() {
  const [userProfiles, setuserProfiles] = useState<Array<userProfile>>([]);
  // ローディングの情報をもったstateを用意し、クリック時にloadingのフラグをtrueにして、処理が終わったらloadingをfaalseにする
  const [loading, setLoading] = useState(false);
  // エラーがあるのかどうかを判定するstete
  const [error, setError] = useState(false);
  const onClickFetchUser = () => {
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
      }); // finally()は何が起きようが一番最後に処理を実行するメソッド
  };
  return (
    <div className="App">
      <button onClick={onClickFetchUser}>データ取得</button>
      <br />

      {error ? (
        <p>データの取得に失敗しました</p>
      ) : loading ? (
        <p>ロード中..</p>
      ) : (
        <>
          {userProfiles.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </>
      )}
    </div>
  );
}
