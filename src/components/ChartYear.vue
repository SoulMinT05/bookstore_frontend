<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { BarChart } from '@/components/ui/chart-bar';

type Data = { year: number; total: number };
const dataOrders = ref<Data[]>([]);

const fetchData = async () => {
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        const userToken = user.accessToken;
        const res = await fetch('http://localhost:3001/api/statistic/year', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userToken}`,
            },
        });
        const data = await res.json();
        console.log('dataChartYearrrrr: ', data);

        // Giả định rằng data.orders.populateOrders là mảng các đơn hàng với thuộc tính createdAt
        // Khởi tạo mảng yearlyData với một số năm cần so sánh
        const yearlyData: Data[] = [];

        // Cập nhật số liệu từ API
        if (Array.isArray(data.orders.populateOrders)) {
            data.orders.populateOrders.forEach((order) => {
                const year = new Date(order.createdAt).getFullYear();
                const existingYearData = yearlyData.find((item) => item.year === year);

                if (existingYearData) {
                    existingYearData.total += 1; // Tăng tổng số đơn hàng theo năm
                } else {
                    yearlyData.push({ year, total: 1 }); // Thêm mới nếu chưa có
                }
            });
        }

        dataOrders.value = yearlyData; // Lưu dữ liệu vào biến reactive
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

onMounted(() => {
    fetchData(); // Gọi hàm fetchData khi component được mounted
});
</script>

<template>
    <BarChart :data="dataOrders" :categories="['total']" :index="'year'" :rounded-corners="0" />
</template>
