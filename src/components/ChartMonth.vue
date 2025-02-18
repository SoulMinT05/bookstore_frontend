<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { BarChart } from '@/components/ui/chart-bar';
import { useToast } from 'vue-toastification';
type Data = { month: string; total: number };
const dataOrders = ref<Data[]>([]);

interface MonthStatistic {
    month: string;
    orders: { count: number };
}
const toast = useToast();

const fetchData = async () => {
    try {
        const staffData = localStorage.getItem('staff');
        const staff = staffData ? JSON.parse(staffData) : null;
        const staffToken = staff?.accessToken ?? '';

        const res = await fetch(`${import.meta.env.VITE_API_BACKEND}/api/statistic/month`, {
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
        // Tạo mảng monthlyData với 12 tháng, ban đầu tổng là 0 cho mỗi tháng
        const monthlyData: Data[] = Array.from({ length: 12 }, (_, index) => ({
            month: new Date(2000, index).toLocaleString('default', { month: 'short' }),
            total: 0,
        }));

        // if (Array.isArray(data.statisticsMonth)) {
        //     data.statisticsMonth.forEach((monthData) => {
        //         const date = new Date(`${monthData.month}`);
        //         const monthIndex = date.getMonth();

        //         if (monthIndex >= 0 && monthIndex < 12) {
        //             monthlyData[monthIndex].total = monthData.orders.count;
        //         }
        //     });
        // }

        if (Array.isArray(data.statisticsMonth)) {
            (data.statisticsMonth as MonthStatistic[]).forEach((monthData) => {
                const date = new Date(`${monthData.month}`);
                // const monthIndex = date.getMonth();

                if (!isNaN(date.getTime())) {
                    const monthIndex = date.getMonth();
                    if (monthIndex >= 0 && monthIndex < 12) {
                        monthlyData[monthIndex].total = monthData.orders.count;
                    }
                }
            });
        }

        dataOrders.value = monthlyData;
    } catch (error) {
        console.error('Error fetching data:', (error as Error).message);
    }
};

onMounted(() => {
    fetchData(); // Gọi hàm fetchData khi component được mounted
});
</script>

<template>
    <BarChart :data="dataOrders" :categories="['total']" :index="'month'" :rounded-corners="0" />
</template>
