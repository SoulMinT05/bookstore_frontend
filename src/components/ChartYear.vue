<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { BarChart } from '@/components/ui/chart-bar';
import { useToast } from 'vue-toastification';

type Data = { year: number; total: number };
type Order = { createdAt: string }; // Kiểu dữ liệu cho đơn hàng

const dataOrders = ref<Data[]>([]);
const toast = useToast();

const fetchData = async () => {
    try {
        const staffData = localStorage.getItem('staff');
        const staff = staffData ? JSON.parse(staffData) : null;
        const staffToken = staff?.accessToken ?? '';

        const res = await fetch(`${import.meta.env.VITE_API_BACKEND}/api/statistic/year`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${staffToken}`,
            },
        });

        const data = await res.json();
        console.log('Dữ liệu thống kê năm:', data);

        if (!data.success) {
            toast.error(data.message);
            return;
        }

        // Khởi tạo mảng yearlyData
        const yearlyData: Data[] = [];

        if (Array.isArray(data.orders?.populateOrders)) {
            (data.orders.populateOrders as Order[]).forEach((order) => {
                const year = new Date(order.createdAt).getFullYear();
                const existingYearData = yearlyData.find((item) => item.year === year);

                if (existingYearData) {
                    existingYearData.total += 1;
                } else {
                    yearlyData.push({ year, total: 1 });
                }
            });
        }

        dataOrders.value = yearlyData;
    } catch (error) {
        console.error('Lỗi khi lấy dữ liệu:', error instanceof Error ? error.message : error);
    }
};

onMounted(fetchData);
</script>

<template>
    <BarChart :data="dataOrders" :categories="['total']" :index="'year'" :rounded-corners="0" />
</template>
