import axios from "axios";

// axios 인스턴스 생성
const instance = axios.create({
  baseURL: "",
  timeout: 5000, // 5초 타임아웃
});

export default instance;