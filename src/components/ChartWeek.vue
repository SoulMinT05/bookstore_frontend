<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { BarChart } from '@/components/ui/chart-bar';
import { useToast } from 'vue-toastification';

type Data = { week: string; total: number };
const dataOrders = ref<Data[]>([]);

const fetchData = async () => {
    try {
        const staff = JSON.parse(localStorage.getItem('staff'));
        const staffToken = staff.accessToken;

        const res = await fetch('http://localhost:3001/api/statistic/week', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${staffToken}`,
            },
        });

        const data = await res.json();
        const toast = useToast();

        if (!data.success) {
            toast.error(data.message);
            return;
        }

        const weeklyData: Data[] = [];

        if (Array.isArray(data.statisticsWeek)) {
            data.statisticsWeek.forEach((weekData) => {
                // Thêm dữ liệu vào weeklyData từ backend
                weeklyData.push({
                    week: weekData.week,
                    total: weekData.orders.count,
                });
            });
        }
        dataOrders.value = weeklyData; // Lưu dữ liệu đã xử lý vào biến reactive
        console.log('dataOrders.valueeee: ', dataOrders.value);
    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
};

onMounted(() => {
    fetchData(); // Gọi hàm fetchData khi component được mounted
});
</script>

<template>
    <BarChart :data="dataOrders" :categories="['total']" :index="'week'" :rounded-corners="0" />
</template>
