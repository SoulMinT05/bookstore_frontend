import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import tailwind from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import dotenv from 'dotenv';

dotenv.config(); // Tải .env vào

export default defineConfig(({ mode }: { mode: string }) => {
    const rootDir = path.resolve(__dirname, 'src');
    const env = loadEnv(mode, process.cwd(), '');
    const production = env.NODE_ENV === 'production';

    return {
        root: rootDir,
        base: '/',
        appType: 'spa' as const,
        plugins: [vue()],
        css: {
            postcss: {
                plugins: [autoprefixer(), tailwind()],
            },
        },
        resolve: {
            alias: {
                '@': rootDir,
            },
        },
        build: {
            minify: production,
            sourcemap: production,
            outDir: path.resolve(rootDir, '..', 'dist'),
            emptyOutDir: true,
        },

        server: {
            port: Number(env.VITE_PORT_FRONTEND), // Thiết lập cổng chạy cho máy chủ Vite (frontend)
            proxy: {
                '/api': {
                    // Đường dẫn bắt đầu bằng "/api" sẽ được chuyển tiếp qua proxy
                    target: env.VITE_API_BACKEND,
                    changeOrigin: true, // Thay đổi origin của request thành URL của máy chủ backend để tránh lỗi CORS
                    secure: false, // Bỏ qua kiểm tra chứng chỉ SSL nếu backend dùng HTTPS nhưng không có chứng chỉ hợp lệ
                },
            },
        },
    };
});
