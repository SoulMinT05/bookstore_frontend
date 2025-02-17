// vite.config.ts
import path from "path";
import { defineConfig, loadEnv } from "file:///Users/mac/Desktop/CT449_PTUDW/SoulStore/bookstore-admin/node_modules/vite/dist/node/index.js";
import vue from "file:///Users/mac/Desktop/CT449_PTUDW/SoulStore/bookstore-admin/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import tailwind from "file:///Users/mac/Desktop/CT449_PTUDW/SoulStore/bookstore-admin/node_modules/tailwindcss/lib/index.js";
import autoprefixer from "file:///Users/mac/Desktop/CT449_PTUDW/SoulStore/bookstore-admin/node_modules/autoprefixer/lib/autoprefixer.js";
import dotenv from "file:///Users/mac/Desktop/CT449_PTUDW/SoulStore/bookstore-admin/node_modules/dotenv/lib/main.js";
var __vite_injected_original_dirname = "/Users/mac/Desktop/CT449_PTUDW/SoulStore/bookstore-admin";
dotenv.config();
var vite_config_default = defineConfig(({ mode }) => {
  const rootDir = path.resolve(__vite_injected_original_dirname, "src");
  const env = loadEnv(mode, process.cwd(), "");
  const production = env.NODE_ENV === "production";
  return {
    root: rootDir,
    base: "/",
    appType: "spa",
    plugins: [vue()],
    css: {
      postcss: {
        plugins: [autoprefixer(), tailwind()]
      }
    },
    resolve: {
      alias: {
        "@": rootDir
      }
    },
    build: {
      minify: production,
      sourcemap: production,
      outDir: path.resolve(rootDir, "..", "dist")
    },
    server: {
      port: env.VITE_PORT_FRONTEND,
      // Thiết lập cổng chạy cho máy chủ Vite (frontend)
      proxy: {
        "/api": {
          // Đường dẫn bắt đầu bằng "/api" sẽ được chuyển tiếp qua proxy
          target: env.VITE_API_BACKEND,
          changeOrigin: true,
          // Thay đổi origin của request thành URL của máy chủ backend để tránh lỗi CORS
          secure: false
          // Bỏ qua kiểm tra chứng chỉ SSL nếu backend dùng HTTPS nhưng không có chứng chỉ hợp lệ
        }
      }
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvbWFjL0Rlc2t0b3AvQ1Q0NDlfUFRVRFcvU291bFN0b3JlL2Jvb2tzdG9yZS1hZG1pblwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL21hYy9EZXNrdG9wL0NUNDQ5X1BUVURXL1NvdWxTdG9yZS9ib29rc3RvcmUtYWRtaW4vdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL21hYy9EZXNrdG9wL0NUNDQ5X1BUVURXL1NvdWxTdG9yZS9ib29rc3RvcmUtYWRtaW4vdml0ZS5jb25maWcudHNcIjtpbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCB7IGRlZmluZUNvbmZpZywgbG9hZEVudiB9IGZyb20gJ3ZpdGUnO1xuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnO1xuaW1wb3J0IHRhaWx3aW5kIGZyb20gJ3RhaWx3aW5kY3NzJztcbmltcG9ydCBhdXRvcHJlZml4ZXIgZnJvbSAnYXV0b3ByZWZpeGVyJztcbmltcG9ydCBkb3RlbnYgZnJvbSAnZG90ZW52JztcblxuZG90ZW52LmNvbmZpZygpOyAvLyBUXHUxRUEzaSAuZW52IHZcdTAwRTBvXG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoeyBtb2RlIH0pID0+IHtcbiAgICBjb25zdCByb290RGlyID0gcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ3NyYycpO1xuICAgIGNvbnN0IGVudiA9IGxvYWRFbnYobW9kZSwgcHJvY2Vzcy5jd2QoKSwgJycpO1xuICAgIGNvbnN0IHByb2R1Y3Rpb24gPSBlbnYuTk9ERV9FTlYgPT09ICdwcm9kdWN0aW9uJztcblxuICAgIHJldHVybiB7XG4gICAgICAgIHJvb3Q6IHJvb3REaXIsXG4gICAgICAgIGJhc2U6ICcvJyxcbiAgICAgICAgYXBwVHlwZTogJ3NwYScsXG4gICAgICAgIHBsdWdpbnM6IFt2dWUoKV0sXG4gICAgICAgIGNzczoge1xuICAgICAgICAgICAgcG9zdGNzczoge1xuICAgICAgICAgICAgICAgIHBsdWdpbnM6IFthdXRvcHJlZml4ZXIoKSwgdGFpbHdpbmQoKV0sXG4gICAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICByZXNvbHZlOiB7XG4gICAgICAgICAgICBhbGlhczoge1xuICAgICAgICAgICAgICAgICdAJzogcm9vdERpcixcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIGJ1aWxkOiB7XG4gICAgICAgICAgICBtaW5pZnk6IHByb2R1Y3Rpb24sXG4gICAgICAgICAgICBzb3VyY2VtYXA6IHByb2R1Y3Rpb24sXG4gICAgICAgICAgICBvdXREaXI6IHBhdGgucmVzb2x2ZShyb290RGlyLCAnLi4nLCAnZGlzdCcpLFxuICAgICAgICB9LFxuXG4gICAgICAgIHNlcnZlcjoge1xuICAgICAgICAgICAgcG9ydDogZW52LlZJVEVfUE9SVF9GUk9OVEVORCwgLy8gVGhpXHUxRUJGdCBsXHUxRUFEcCBjXHUxRUQ1bmcgY2hcdTFFQTF5IGNobyBtXHUwMEUxeSBjaFx1MUVFNyBWaXRlIChmcm9udGVuZClcbiAgICAgICAgICAgIHByb3h5OiB7XG4gICAgICAgICAgICAgICAgJy9hcGknOiB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFx1MDExMFx1MDFCMFx1MUVERG5nIGRcdTFFQUJuIGJcdTFFQUZ0IFx1MDExMVx1MUVBN3UgYlx1MUVCMW5nIFwiL2FwaVwiIHNcdTFFQkQgXHUwMTExXHUwMUIwXHUxRUUzYyBjaHV5XHUxRUMzbiB0aVx1MUVCRnAgcXVhIHByb3h5XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldDogZW52LlZJVEVfQVBJX0JBQ0tFTkQsXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSwgLy8gVGhheSBcdTAxMTFcdTFFRDVpIG9yaWdpbiBjXHUxRUU3YSByZXF1ZXN0IHRoXHUwMEUwbmggVVJMIGNcdTFFRTdhIG1cdTAwRTF5IGNoXHUxRUU3IGJhY2tlbmQgXHUwMTExXHUxRUMzIHRyXHUwMEUxbmggbFx1MUVEN2kgQ09SU1xuICAgICAgICAgICAgICAgICAgICBzZWN1cmU6IGZhbHNlLCAvLyBCXHUxRUNGIHF1YSBraVx1MUVDM20gdHJhIGNoXHUxRUU5bmcgY2hcdTFFQzkgU1NMIG5cdTFFQkZ1IGJhY2tlbmQgZFx1MDBGOW5nIEhUVFBTIG5oXHUwMUIwbmcga2hcdTAwRjRuZyBjXHUwMEYzIGNoXHUxRUU5bmcgY2hcdTFFQzkgaFx1MUVFM3AgbFx1MUVDN1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgIH07XG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBMFYsT0FBTyxVQUFVO0FBQzNXLFNBQVMsY0FBYyxlQUFlO0FBQ3RDLE9BQU8sU0FBUztBQUNoQixPQUFPLGNBQWM7QUFDckIsT0FBTyxrQkFBa0I7QUFDekIsT0FBTyxZQUFZO0FBTG5CLElBQU0sbUNBQW1DO0FBT3pDLE9BQU8sT0FBTztBQUVkLElBQU8sc0JBQVEsYUFBYSxDQUFDLEVBQUUsS0FBSyxNQUFNO0FBQ3RDLFFBQU0sVUFBVSxLQUFLLFFBQVEsa0NBQVcsS0FBSztBQUM3QyxRQUFNLE1BQU0sUUFBUSxNQUFNLFFBQVEsSUFBSSxHQUFHLEVBQUU7QUFDM0MsUUFBTSxhQUFhLElBQUksYUFBYTtBQUVwQyxTQUFPO0FBQUEsSUFDSCxNQUFNO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixTQUFTO0FBQUEsSUFDVCxTQUFTLENBQUMsSUFBSSxDQUFDO0FBQUEsSUFDZixLQUFLO0FBQUEsTUFDRCxTQUFTO0FBQUEsUUFDTCxTQUFTLENBQUMsYUFBYSxHQUFHLFNBQVMsQ0FBQztBQUFBLE1BQ3hDO0FBQUEsSUFDSjtBQUFBLElBQ0EsU0FBUztBQUFBLE1BQ0wsT0FBTztBQUFBLFFBQ0gsS0FBSztBQUFBLE1BQ1Q7QUFBQSxJQUNKO0FBQUEsSUFDQSxPQUFPO0FBQUEsTUFDSCxRQUFRO0FBQUEsTUFDUixXQUFXO0FBQUEsTUFDWCxRQUFRLEtBQUssUUFBUSxTQUFTLE1BQU0sTUFBTTtBQUFBLElBQzlDO0FBQUEsSUFFQSxRQUFRO0FBQUEsTUFDSixNQUFNLElBQUk7QUFBQTtBQUFBLE1BQ1YsT0FBTztBQUFBLFFBQ0gsUUFBUTtBQUFBO0FBQUEsVUFFSixRQUFRLElBQUk7QUFBQSxVQUNaLGNBQWM7QUFBQTtBQUFBLFVBQ2QsUUFBUTtBQUFBO0FBQUEsUUFDWjtBQUFBLE1BQ0o7QUFBQSxJQUNKO0FBQUEsRUFDSjtBQUNKLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
