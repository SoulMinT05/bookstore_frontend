<template>
    <div>
        <Header />
        <div class="container mx-auto p-4 min-h-[250px]">
            <!-- <div class="slider-wrapper">
                <slick-carousel :autoplay="true" :autoplay-speed="3000" :dots="true">
                    <div v-for="(item, index) in slides" :key="index">
                        <img :src="item.image" alt="slide" class="w-full h-64 object-cover" />
                    </div>
                </slick-carousel>
            </div> -->
            <Banner />

            <div class="mx-auto" v-for="(books, category) in booksByCategory" :key="category">
                <h2 class="text-2xl font-bold text-gray-800 mt-16">
                    {{ category }}
                </h2>

                <Carousel class="relative w-full mt-2" :opts="{ align: 'start' }">
                    <CarouselContent>
                        <CarouselItem
                            v-for="product in books"
                            :key="product._id"
                            class="basis-1/5 flex-shrink-0 relative overflow-hidden transition-transform duration-300 ease-in-out rounded-lg shadow-lg group hover:shadow-xl hover:-translate-y-2 h-full"
                        >
                            <router-link v-if="product.slug" :to="`/bookDetails/${product.slug}`" class="h-full">
                                <Card class="h-full flex flex-col">
                                    <CardContent class="p-4 flex flex-col justify-between h-full">
                                        <img
                                            :src="product.HinhAnhSach[0]"
                                            alt="product"
                                            class="w-full h-48 object-cover rounded-t-lg"
                                        />
                                        <!-- Đặt chiều cao tối thiểu cho tiêu đề -->
                                        <h3 class="mt-4 text-xl font-semibold line-clamp-2 min-h-[56px]">
                                            {{ product.TenSach }}
                                        </h3>

                                        <!-- Thông tin tác giả và giá -->
                                        <div class="mt-4 flex justify-between">
                                            <p class="text-gray-500 whitespace-normal dark:text-gray-400 min-h-[48px]">
                                                {{ product.TacGia }}
                                            </p>
                                            <span class="text-lg font-medium text-red-600 dark:text-white">
                                                {{ formatCurrency(product.DonGia) }}
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
                        </CarouselItem>
                    </CarouselContent>
                    <CarouselPrevious class="absolute z-10" style="margin-left: 2px" />
                    <CarouselNext class="absolute z-10" style="margin-right: 2px" />
                </Carousel>
            </div>
        </div>
        <Footer />
    </div>
</template>

<script lang="ts" setup>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import Banner from '@/components/Banner.vue';

import axios from '@/utils/axios';

import { ref, onMounted, watch } from 'vue';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';

import { Heart, ShoppingCart } from 'lucide-vue-next';

interface Book {
    _id: string;
    slug: string;
    HinhAnhSach: string[];
    TenSach: string;
    TacGia: string;
    DonGia: number;
}

const booksByCategory = ref<Record<string, Book[]>>({});

const fetchProductsByAutoPublisher = async () => {
    try {
        const res = await axios.get('/book/auto-publishers');
        // if (Array.isArray(res.data.data)) {
        //     booksByCategory.value = res.data.data as Record<string, Book[]>;
        // } else {
        //     console.error('Dữ liệu không hợp lệ:', res.data.data);
        // }
        booksByCategory.value = res.data.data as Record<string, Book[]>;
        console.log('booksByCategory.value: ', booksByCategory.value);
    } catch (error: any) {
        console.error('Error fetching home:', error);
    }
};

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
};
onMounted(() => {
    fetchProductsByAutoPublisher();
});
</script>
 

<style scoped>
.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2; /* Hiển thị tối đa 2 dòng */
    -webkit-box-orient: vertical;
    overflow: hidden; /* Ẩn nội dung dư */
    text-overflow: ellipsis; /* Thêm dấu "..." */
}
.custom-min-height {
    min-height: 56px;
}
</style>
