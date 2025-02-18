<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { BarChart } from '@/components/ui/chart-bar';
import { useToast } from 'vue-toastification';

type Data = { week: string; total: number };

const dataOrders = ref<Data[]>([]);
type WeekData = {
    week: string;
    orders: {
        count: number;
    };
};
const toast = useToast();

const fetchData = async () => {
    try {
        const staffData = localStorage.getItem('staff');
        const staff = staffData ? JSON.parse(staffData) : null;
        const staffToken = staff?.accessToken ?? '';

        const res = await fetch(`${import.meta.env.VITE_API_BACKEND}/api/statistic/week`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${staffToken}`,
            },
        });

        const data = await res.json();

        if (!data.success) {
            toast.error(data.message);
            return;
        }

        // Tạo mảng weeklyData
        const weeklyData: Data[] = (Array.isArray(data.statisticsWeek) ? data.statisticsWeek : []).map(
            (weekData: WeekData) => ({
                week: weekData.week,
                total: weekData.orders.count,
            }),
        );

        dataOrders.value = weeklyData; // Cập nhật dữ liệu cho biểu đồ
        console.log('Dữ liệu tuần:', dataOrders.value);
    } catch (error) {
        console.error('Lỗi khi lấy dữ liệu:', error instanceof Error ? error.message : error);
    }
};

onMounted(fetchData);
</script>

<template>
    <BarChart :data="dataOrders" :categories="['total']" :index="'week'" :rounded-corners="0" />
</template>
