<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { BarChart } from '@/components/ui/chart-bar';

type Data = { week: string; total: number };
const dataOrders = ref<Data[]>([]);

const fetchData = async () => {
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        const userToken = user.accessToken;
        const res = await fetch('http://localhost:3001/api/statistic/week', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userToken}`,
            },
        });
        const data = await res.json();
        console.log('dataChartWeek: ', data);

        // Khởi tạo mảng weeklyData
        const weeklyData: Data[] = [];

        // Cập nhật số liệu từ API
        if (Array.isArray(data.orders.populateOrders)) {
            data.orders.populateOrders.forEach((order) => {
                const orderDate = new Date(order.createdAt);
                const weekRange = getWeekRange(orderDate); // Lấy khoảng thời gian tuần

                const existingWeekData = weeklyData.find((item) => item.week === weekRange);
                if (existingWeekData) {
                    existingWeekData.total += 1; // Tăng tổng số đơn hàng theo tuần
                } else {
                    weeklyData.push({ week: weekRange, total: 1 }); // Thêm mới nếu chưa có
                }
            });
        }

        // Lấy thêm dữ liệu cho 5 tuần trước
        const currentWeekRange = getCurrentWeekRange();
        for (let i = 1; i <= 4; i++) {
            const pastWeekRange = getWeekRange(
                new Date(currentWeekRange.startDate.getTime() - i * 7 * 24 * 60 * 60 * 1000),
            );
            if (!weeklyData.find((item) => item.week === pastWeekRange)) {
                weeklyData.push({ week: pastWeekRange, total: 0 }); // Thêm tuần trước với tổng số đơn hàng bằng 0
            }
        }

        // Sắp xếp mảng weeklyData theo thứ tự thời gian
        dataOrders.value = weeklyData.sort((a, b) => {
            const aDate = new Date(a.week.split(' - ')[0].split('/').reverse().join('/'));
            const bDate = new Date(b.week.split(' - ')[0].split('/').reverse().join('/'));
            return aDate.getTime() - bDate.getTime();
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

// Hàm lấy khoảng thời gian tuần từ một ngày
// const getWeekRange = (date: Date) => {
//     const startOfWeek = new Date(date);
//     startOfWeek.setDate(date.getDate() - date.getDay() + 1); // Thứ hai là ngày đầu tuần ở VN

//     const endOfWeek = new Date(startOfWeek);
//     endOfWeek.setDate(startOfWeek.getDate() + 6); // Chủ nhật là ngày cuối tuần

//     // Trả về định dạng tuần: từ ngày m/dd đến m/dd
//     return `${startOfWeek.getDate()}/${startOfWeek.getMonth() + 1} - ${endOfWeek.getDate()}/${endOfWeek.getMonth() + 1}`;
// };
const getWeekRange = (date: Date) => {
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - (date.getDay() === 0 ? 6 : date.getDay() - 1)); // Để thứ Hai là ngày đầu tuần

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6); // Chủ nhật là ngày cuối tuần

    // Trả về định dạng tuần: từ ngày m/dd đến m/dd
    return `${startOfWeek.getDate()}/${startOfWeek.getMonth() + 1} - ${endOfWeek.getDate()}/${endOfWeek.getMonth() + 1}`;
};

// Hàm lấy khoảng thời gian tuần hiện tại
const getCurrentWeekRange = () => {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay() + 1); // Thứ hai là ngày đầu tuần ở VN

    return {
        startDate: startOfWeek,
        endDate: new Date(startOfWeek.getTime() + 6 * 24 * 60 * 60 * 1000), // Chủ nhật là ngày cuối tuần
    };
};
onMounted(() => {
    fetchData(); // Gọi hàm fetchData khi component được mounted
});
</script>

<template>
    <BarChart :data="dataOrders" :categories="['total']" :index="'week'" :rounded-corners="0" />
</template>
