<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { BarChart } from '@/components/ui/chart-bar';
import { useToast } from 'vue-toastification';
type Data = { month: string; total: number };
const dataOrders = ref<Data[]>([]);

const fetchData = async () => {
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        const userToken = user?.accessToken;

        if (!userToken) {
            throw new Error('Access token is missing');
        }

        const res = await fetch('http://localhost:3001/api/statistic/month', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userToken}`,
            },
        });

        const data = await res.json();
        const toast = useToast();

        if (!data.success) {
            toast.error(data.message);
            return;
        }
        // Tạo mảng monthlyData với 12 tháng, ban đầu tổng là 0 cho mỗi tháng
        const monthlyData: Data[] = Array.from({ length: 12 }, (_, index) => ({
            month: new Date(0, index).toLocaleString('default', { month: 'short' }),
            total: 0,
        }));

        if (Array.isArray(data.statisticsMonth)) {
            data.statisticsMonth.forEach((monthData) => {
                const date = new Date(`${monthData.month}`);
                const monthIndex = date.getMonth();

                if (monthIndex >= 0 && monthIndex < 12) {
                    monthlyData[monthIndex].total = monthData.orders.count;
                }
            });
        }
        dataOrders.value = monthlyData; // Lưu dữ liệu đã xử lý vào biến reactive
    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
};

onMounted(() => {
    fetchData(); // Gọi hàm fetchData khi component được mounted
});
</script>

<template>
    <BarChart :data="dataOrders" :categories="['total']" :index="'month'" :rounded-corners="0" />
</template>
