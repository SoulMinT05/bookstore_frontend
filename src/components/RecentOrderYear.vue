<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from 'vue-toastification';

const statistics = ref({
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
});
const fetchData = async () => {
    try {
        const user = JSON.parse(localStorage.getItem('user') || '{}'); // Xử lý khi không có user
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
        if (!data.success) {
            toast.error(data.message);
            return;
        }

        statistics.value = {
            currentYear: {
                users: data.users,
                products: data.products,
                orders: data.orders,
                publishers: data.publishers,
            },
            growthRatesYear: {
                users: data.users.growthRate,
                products: data.products.growthRate,
                orders: data.orders.growthRate,
                publishers: data.publishers.growthRate,
            },
        };
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

const getStatusMessage = (status) => {
    switch (status) {
        case 'pending':
            return 'Đang xử lý';
        case 'accepted':
            return 'Chấp nhận';
        case 'rejected':
            return 'Từ chối';
        default:
            return '';
    }
};

onMounted(() => {
    fetchData(); // Gọi hàm fetchData khi component được mounted
});
</script>

<template>
    <div class="space-y-8">
        <div
            v-for="(order, index) in statistics.currentYear.orders.populateOrders"
            :key="index"
            class="flex items-center"
        >
            <Avatar class="h-9 w-9">
                <AvatarImage :src="order.orderBy.avatarUrl || '/avatars/default.png'" alt="Avatar" />
                <AvatarFallback
                    >{{ order.orderBy.firstName.charAt(0) }}{{ order.orderBy.lastName.charAt(0) }}</AvatarFallback
                >
            </Avatar>
            <div class="ml-4 space-y-1">
                <p class="text-sm font-medium leading-none">
                    {{ order.orderBy.firstName }} {{ order.orderBy.lastName }}
                </p>
                <p class="text-sm text-muted-foreground">{{ order.orderBy.email }}</p>
            </div>
            <div class="ml-auto">
                <span
                    :class="{
                        'bg-blue-500 text-white': order.status === 'pending',
                        'bg-green-500 text-white': order.status === 'accepted',
                        'bg-red-500 text-white': order.status === 'rejected',
                    }"
                    class="px-3 py-1 rounded-full text-sm font-medium"
                >
                    {{ getStatusMessage(order.status) }}
                </span>
            </div>
        </div>
    </div>
</template>
