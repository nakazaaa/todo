import axios from 'axios'; // Axios本体をインポート

const instance = axios.create(); // Axiosインスタンスを生成

instance.interceptors.request.use(
    (config) => {
        // 認証トークンをヘッダーに付与
        config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`; // この例ではBearerトークンを設定
        return config;
    }
);

export default instance;