<template>
    <div style="margin-top: 60px">
        <Header />
        <div class="flex flex-col w-full max-w-6xl mx-auto px-4 md:px-6 py-8">
            <div class="flex items-center justify-between mb-6">
                <h1 class="text-2xl font-bold">Có {{ searchResults.length }} kết quả tìm kiếm cho từ {{ keyword }}</h1>
            </div>

            <div
                v-if="searchResults.length > 0"
                class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            >
                <div
                    v-for="book in searchResults"
                    :key="book._id"
                    class="bg-card rounded-lg overflow-hidden shadow-sm flex flex-col justify-between h-full transition-transform duration-300 ease-in-out group hover:-translate-y-2 active:scale-95"
                >
                    <router-link v-if="book.slug" :to="`/bookDetails/${book.slug}`" class="h-full">
                        <Card class="h-full">
                            <CardContent class="p-4">
                                <img
                                    :src="book.HinhAnhSach[0]"
                                    alt="book"
                                    class="w-full h-48 object-cover rounded-t-lg"
                                />

                                <!-- Đảm bảo tiêu đề có chiều cao cố định -->
                                <h3 class="mt-4 text-xl font-semibold line-clamp-2 min-h-[56px]">
                                    {{ book.TenSach }}
                                </h3>

                                <!-- Thông tin tác giả và giá -->
                                <div class="mt-4 flex justify-between">
                                    <p class="text-gray-500 whitespace-normal dark:text-gray-400 min-h-[48px]">
                                        {{ book.TacGia }}
                                    </p>
                                    <span class="text-lg font-medium text-red-600 dark:text-white">
                                        {{ formatCurrency(book.DonGia) }}
                                    </span>
                                </div>

                                <!-- Biểu tượng yêu thích và giỏ hàng -->
                                <div class="mt-4 flex justify-between items-center">
                                    <Heart class="cursor-pointer" />
                                    <ShoppingCart class="cursor-pointer" />
                                </div>
                            </CardContent>
                        </Card>
                    </router-link>
                </div>
            </div>

            <p v-else class="text-gray-500 text-center mt-4">Không có kết quả nào.</p>
        </div>
        <Footer />
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

import { Heart, ShoppingCart } from 'lucide-vue-next';

import axiosUser from '@/utils/axiosUser';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

interface Book {
    _id: string;
    slug: string;
    HinhAnhSach: string[];
    TenSach: string;
    TacGia: string;
    DonGia: number;
}

const route = useRoute();
const searchResults = ref<Book[]>([]); // 🛠 Dữ liệu sẽ nằm trong searchResults.value
const keyword = ref(route.params.keyword);
console.log('keyword: ', keyword);

onMounted(async () => {
    try {
        const response = await axiosUser.get(`/book/search?keyword=${encodeURIComponent(route.params.keyword)}`);
        searchResults.value = response.data.books || [];
        console.log('Dữ liệu searchResults:', searchResults.value);
    } catch (error: any) {
        console.error('Lỗi khi tìm kiếm:', error);
    }
});

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
};
</script>
