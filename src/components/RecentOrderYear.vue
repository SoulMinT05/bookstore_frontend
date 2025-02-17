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
        const staff = JSON.parse(localStorage.getItem('staff'));
        const staffToken = staff.accessToken;

        const res = await fetch(`${import.meta.env.VITE_API_BACKEND}/api/statistic/year`, {
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

const getStatusMessage = (TinhTrang) => {
    switch (TinhTrang) {
        case 'pending':
            return 'Đang xử lý';
        case 'accepted':
            return 'Chấp nhận';
        case 'rejected':
            return 'Từ chối';
        case 'cancel':
            return 'Huỷ đơn';
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
        <!-- <div v-if="statistics.currentYear.populateOrders.length === 0" class="text-center text-gray-500">
            Chưa có đơn hàng
        </div>
        <div v-else> -->
        <div
            v-for="(order, index) in statistics.currentYear.orders.populateOrders"
            :key="index"
            class="flex items-center"
        >
            <Avatar class="h-9 w-9">
                <AvatarImage :src="order.MaDocGia.avatarUrl || '/avatars/default.png'" alt="Avatar" />
                <AvatarFallback>{{ order.MaDocGia.Ho.charAt(0) }}{{ order.MaDocGia.Ten.charAt(0) }}</AvatarFallback>
            </Avatar>
            <div class="ml-4 space-y-1">
                <p class="text-sm font-medium leading-none">{{ order.MaDocGia.Ho }} {{ order.MaDocGia.Ten }}</p>
                <p class="text-sm text-muted-foreground">{{ order.MaDocGia.email }}</p>
            </div>
            <div class="ml-auto">
                <span
                    :class="{
                        'bg-blue-500 text-white': order.TinhTrang === 'pending',
                        'bg-green-500 text-white': order.TinhTrang === 'accepted',
                        'bg-red-500 text-white': order.TinhTrang === 'rejected',
                        'bg-gray-500 text-white': order.TinhTrang === 'cancel',
                    }"
                    class="px-3 py-1 rounded-full text-sm font-medium"
                >
                    {{ getStatusMessage(order.TinhTrang) }}
                </span>
            </div>
        </div>
        <!-- </div> -->
    </div>
</template>
