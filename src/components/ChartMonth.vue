<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { BarChart } from '@/components/ui/chart-bar';

type Data = { month: string; total: number };
const dataOrders = ref<Data[]>([]);

const fetchData = async () => {
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        const userToken = user.accessToken;
        const res = await fetch('http://localhost:3001/api/statistic/month', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userToken}`,
            },
        });
        const data = await res.json();
        console.log('dataChart: ', data);

        // Khởi tạo mảng monthlyData với 12 tháng
        const monthlyData: Data[] = Array(12)
            .fill(0)
            .map((_, index) => ({
                month: new Date(0, index).toLocaleString('default', { month: 'short' }), // Tên tháng viết tắt
                total: 0,
            }));

        // Cập nhật số liệu từ API
        if (Array.isArray(data.orders.populateOrders)) {
            data.orders.populateOrders.forEach((order) => {
                const monthIndex = new Date(order.createdAt).getMonth();
                monthlyData[monthIndex].total += 1; // Tăng tổng số đơn hàng theo tháng
            });
        }

        dataOrders.value = monthlyData; // Lưu dữ liệu vào biến reactive
        console.log('dataOrdersCharttttt: ', dataOrders.value);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

onMounted(() => {
    fetchData(); // Gọi hàm fetchData khi component được mounted
});
</script>

<template>
    <BarChart :data="dataOrders" :categories="['total']" :index="'month'" :rounded-corners="0" />
</template>
