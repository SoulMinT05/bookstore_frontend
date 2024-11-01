<script setup lang="ts">
import { ref, onMounted } from 'vue';
// import { ChartContainer, BarChart, CartesianGrid, XAxis, Bar, ChartTooltip } from '@shadcn/ui';
import { ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

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
        const monthlyData: Data[] = Array(12)
            .fill(0)
            .map((_, index) => ({
                month: new Date(0, index).toLocaleString('default', { month: 'short' }),
                total: 0,
            }));

        if (Array.isArray(data.orders.populateOrders)) {
            data.orders.populateOrders.forEach((order) => {
                const monthIndex = new Date(order.createdAt).getMonth();
                monthlyData[monthIndex].total += 1;
            });
        }
        dataOrders.value = monthlyData;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

onMounted(() => {
    fetchData();
});
</script>

<template>
    <ChartContainer class="h-[200px] w-full">
        <BarChart accessibilityLayer :data="dataOrders">
            <CartesianGrid vertical="{false}" />
            <XAxis
                dataKey="month"
                :tickLine="false"
                :tickMargin="10"
                :axisLine="false"
                :tickFormatter="(value) => (typeof value === 'string' ? value.slice(0, 3) : '')"
            />

            <ChartTooltip :content="{ total: d.total, month: d.month }" />
            <Bar dataKey="total" fill="var(--color-desktop)" radius="{4}" />
        </BarChart>
    </ChartContainer>
</template>
