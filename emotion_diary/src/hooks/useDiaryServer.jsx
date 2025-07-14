import { useEffect, useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

const useDiaryServer = (id) => {
  const [diary, setDiary] = useState();
  const nav = useNavigate();

  useEffect(() => {
    const fetchDiary = async () => {
      try {
        const res = await axios.get(`/api/diaries/${id}`);
        setDiary({
          id: res.data.id,
          createdDate: res.data.createDate, // 서버는 createDate 이름으로 보냄
          emotionId: res.data.emotionId,
          content: res.data.content
        });
      } catch (err) {
        console.error(err);
        window.alert("존재하지 않는 일기입니다.");
        nav("/", { replace: true });
      }
    };

    fetchDiary();
  }, [id, nav]);

  return diary;
};

export default useDiaryServer;