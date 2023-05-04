import axios from 'axios'; // Axios本体をインポート



export default function instance () {
    const instance = axios.create(); // Axiosインスタンスを生成

    instance.interceptors.request.use(
        (config) => {
            // 認証トークンをヘッダーに付与
            config.headers.common['Authorization'] = 'Bearer ' + process.env.TOKEN; // この例ではBearerトークンを設定
            return config;
        }
    );
}