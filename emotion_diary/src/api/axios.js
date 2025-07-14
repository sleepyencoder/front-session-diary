import axios from "axios";

// axios 인스턴스 생성
const instance = axios.create({
  baseURL: "http://3.34.199.68:8080", // API 서버 주소
  timeout: 1000, // 5초 타임아웃
});

export default instance;