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
    statisticsMonth: [],
});

const fetchStatisticsWeek = async () => {
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
        const toast = useToast();
        console.log('dataWeek: ', data);

        if (!data.success) {
            toast.error(data.message);
            return;
        }
        statistics.value.currentWeek = {
            users: data.users,
            products: data.products,
            orders: data.orders,
            publishers: data.publishers,
        };
        statistics.value.growthRatesWeek = {
            users: data.users.growthRate,
            products: data.products.growthRate,
            orders: data.orders.growthRate,
            publishers: data.publishers.growthRate,
        };
    } catch (error) {
        console.error('Failed to fetch statistics:', error);
    }
};

const fetchStatisticsMonth = async () => {
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
        const toast = useToast();
        console.log('dataMonth: ', data);

        if (!data.success) {
            toast.error(data.message);
            return;
        }
        statistics.value.statisticsMonth = data.statisticsMonth.map((monthData) => ({
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
        console.log('statistics.value.statisticsMonth: ', statistics.value.statisticsMonth);
    } catch (error) {
        console.error('Failed to fetch statistics:', error);
    }
};

const fetchStatisticsYear = async () => {
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
    } catch (error) {
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
