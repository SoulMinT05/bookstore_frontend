<script setup lang="ts">
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DateRangePicker } from '@/components/ui/daterange-picker';
import StatisticWeek from './StatisticWeek.vue';
import StatisticMonth from './StatisticMonth.vue';
import StatisticYear from '@/views/admin/StatisticYear.vue';

import { ref, onMounted, computed } from 'vue';
import { useToast } from 'vue-toastification';

interface WeekData {
    week: string;
    users: { title: string; count: number; growthRate: number };
    products: { title: string; count: number; growthRate: number };
    orders: { title: string; count: number; growthRate: number };
    publishers: { title: string; count: number; growthRate: number };
}

interface MonthData {
    month: string;
    users: { title: string; count: number; growthRate: number };
    products: { title: string; count: number; growthRate: number };
    orders: { title: string; count: number; growthRate: number };
    publishers: { title: string; count: number; growthRate: number };
}

const statistics = ref({
    // Week
    currentWeek: {
        users: 0,
        products: 0,
        orders: 0,
        publishers: 0,
    },
    growthRatesWeek: {
        users: 0,
        products: 0,
        orders: 0,
        publishers: 0,
    },
    // Month
    currentMonth: {
        users: 0,
        products: 0,
        orders: 0,
        publishers: 0,
    },
    growthRatesMonth: {
        users: 0,
        products: 0,
        orders: 0,
        publishers: 0,
    },
    // Year
    currentYear: {
        users: 0,
        products: 0,
        orders: 0,
        publishers: 0,
    },
    growthRatesYear: {
        users: 0,
        products: 0,
        orders: 0,
        publishers: 0,
    },
    statisticsWeek: [] as WeekData[],
    statisticsMonth: [] as MonthData[],
});

const fetchStatisticsWeek = async () => {
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
        const toast = useToast();
        console.log('dataWeek: ', data);

        if (!data.success) {
            toast.error(data.message);
            return;
        }
        statistics.value.statisticsWeek = data.statisticsWeek.map((weekData: WeekData) => ({
            week: weekData.week,
            users: {
                title: weekData.users.title,
                count: weekData.users.count,
                growthRate: weekData.users.growthRate,
            },
            products: {
                title: weekData.products.title,
                count: weekData.products.count,
                growthRate: weekData.products.growthRate,
            },
            orders: {
                title: weekData.orders.title,
                count: weekData.orders.count,
                growthRate: weekData.orders.growthRate,
            },
            publishers: {
                title: weekData.publishers.title,
                count: weekData.publishers.count,
                growthRate: weekData.publishers.growthRate,
            },
        }));
        console.log('statistics.value.statisticsWeek: ', statistics.value.statisticsWeek);
    } catch (error: any) {
        console.error('Failed to fetch statistics:', error);
    }
};

const fetchStatisticsMonth = async () => {
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
        const toast = useToast();
        console.log('dataMonth: ', data);

        if (!data.success) {
            toast.error(data.message);
            return;
        }
        statistics.value.statisticsMonth = data.statisticsMonth.map((monthData: MonthData) => ({
            month: monthData.month,
            users: {
                title: monthData.users.title,
                count: monthData.users.count,
                growthRate: monthData.users.growthRate,
            },
            products: {
                title: monthData.products.title,
                count: monthData.products.count,
                growthRate: monthData.products.growthRate,
            },
            orders: {
                title: monthData.orders.title,
                count: monthData.orders.count,
                growthRate: monthData.orders.growthRate,
            },
            publishers: {
                title: monthData.publishers.title,
                count: monthData.publishers.count,
                growthRate: monthData.publishers.growthRate,
            },
        }));
    } catch (error: any) {
        console.error('Failed to fetch statistics:', error);
    }
};

const fetchStatisticsYear = async () => {
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
        const toast = useToast();
        console.log('dataYear: ', data);

        if (!data.success) {
            toast.error(data.message);
            return;
        }
        statistics.value.currentYear = {
            users: data.users,
            products: data.products,
            orders: data.orders,
            publishers: data.publishers,
        };
        statistics.value.growthRatesYear = {
            users: data.users.growthRate,
            products: data.products.growthRate,
            orders: data.orders.growthRate,
            publishers: data.publishers.growthRate,
        };
    } catch (error: any) {
        console.error('Failed to fetch statistics:', error);
    }
};

onMounted(() => {
    fetchStatisticsWeek();
    fetchStatisticsMonth();
    fetchStatisticsYear();
});
</script>

<template>
    <div>
        <page-header title="Dashboard">
            <div class="flex items-center space-x-2">
                <DateRangePicker />
                <Button>Download</Button>
            </div>
        </page-header>

        <Tabs default-value="monthly" class="space-y-4">
            <TabsList>
                <TabsTrigger value="weekly">Tuần </TabsTrigger>
                <TabsTrigger value="monthly">Tháng </TabsTrigger>
                <TabsTrigger value="yearly">Năm </TabsTrigger>
            </TabsList>
            <TabsContent value="weekly" class="space-y-4">
                <StatisticWeek :statistics="statistics" />
            </TabsContent>
            <TabsContent value="monthly" class="space-y-4">
                <StatisticMonth :statistics="statistics" />
            </TabsContent>
            <TabsContent value="yearly" class="space-y-4">
                <StatisticYear :statistics="statistics" />
            </TabsContent>
        </Tabs>
    </div>
</template>
