import { useState, useEffect, useContext } from "react";
import { DiaryStateContext } from "../App";
import Header from "../components/Header";
import Button from "../components/Button";
import DiaryList from "../components/DiaryList";
import axios from "../api/axios";

const getMonthlyData = (pivotDate, data) => {
  // beginTime에 저장되는 Date 객체 : pivotDate의 연도와 월인데, 해당하는 월의 1일의 0시 0분 0초에 해당하는 Date 객체
  // getTime() 메서드 : 숫자값 형식으로 저장
  const beginTime = new Date(
    pivotDate.getFullYear(),
    pivotDate.getMonth(),
    1,
    0,
    0,
    0
  ).getTime();
  const endTime = new Date(
    pivotDate.getFullYear(),
    pivotDate.getMonth() + 1,
    0,
    23,
    59,
    59
  ).getTime();

  console.log(beginTime);
  console.log(endTime);

  console.log(data);
  console.log(
    data.filter(
      (item) => beginTime <= item.createdDate && item.createdDate <= endTime
    )
  );

  return data.filter(
    (item) => beginTime <= item.createdDate && item.createdDate <= endTime
  );
};

const Home = () => {
            // Context가 공급하는 일기 데이터를 data라는 이름으로 받아오기
            const data = useContext(DiaryStateContext);
            console.log(data);
  // 변경되는 날짜 데이터를 저장하기 위해 홈 컴포넌트 안에 pivotDate라는 새로운 state를 만들어줌
  const [pivotDate, setPivotDate] = useState(new Date());
  const [monthlyData, setMonthlyData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
            console.log(pivotDate);
            // const monthlyData = getMonthlyData(pivotDate, data);
            console.log(monthlyData);





  const fetchMonthlyData = async (date) => {
  setIsLoading(true);
  const monthString = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
  try {
    const res = await axios.get("/api/diaries", {
      params: { month: monthString }
    });

    // 필드명 변환
    const normalized = res.data.map(item => ({
      id: item.id,
      content: item.content,
      emotionId: item.emotionId,
      createdDate: item.createDate // 서버 필드명 -> 클라이언트 필드명으로 통일
    }));

    setMonthlyData(normalized);
  } catch (err) {
    console.error(err);
    window.alert("데이터를 불러오지 못했습니다.");
    setMonthlyData([]);
  } finally {
    setIsLoading(false);
  }
};

  // 최초 로드 + pivotDate 바뀔 때마다 fetch
  useEffect(() => {
    fetchMonthlyData(pivotDate);
  }, [pivotDate]);     
  



  
  const onIncreaseMonth = () => {
    // 새로운 Date 객체를 만드는데 기존 pivotDate를 기준으로 연도는 동일한데 월은 한 달을 뒤로 미룬 데이터 객체가 값으로써 변경됨
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1));
  };

  const onDecreaseMonth = () => {
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() - 1));
  };

  return (
    <div>
      <Header
        title={`${pivotDate.getFullYear()}년 ${pivotDate.getMonth() + 1}월`}
        leftChild={<Button onClick={onDecreaseMonth} text={"<"} />}
        rightChild={<Button onClick={onIncreaseMonth} text={">"} />}
      />
      <DiaryList data={monthlyData} />
    </div>
  );
};

export default Home;
