<script lang="ts" setup>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

import axios from '@/utils/axios';

import { ref, onMounted } from 'vue';
import { SlickCarousel } from 'vue-slick-carousel';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';

import { Heart, ShoppingCart } from 'lucide-vue-next';
const slides = ref([
    { image: 'https://via.placeholder.com/800x400?text=Slide+1' },
    { image: 'https://via.placeholder.com/800x400?text=Slide+2' },
    { image: 'https://via.placeholder.com/800x400?text=Slide+3' },
]);

const productsByPublisher = ref([]);

// const fetchProducts = async () => {
//     try {
//         const res = await axios.get('/book/getAllProducts'); // Access token đã được thêm tự động nếu có interceptor
//         products.value = res.data.products; // Gán dữ liệu trả về vào `products`
//         console.log('products.value: ', products.value);
//     } catch (error) {
//         console.error('Error fetching products:', error);
//     }
// };

const fetchProductsByPublisher = async () => {
    try {
        const res = await axios.get('/book/publisher/66c459aedad7de9f848ba263'); // Access token đã được thêm tự động nếu có interceptor
        productsByPublisher.value = res.data.products; // Gán dữ liệu trả về vào `productsByPublisher`
        console.log('productsByPublisher.value: ', productsByPublisher.value);
    } catch (error) {
        console.error('Error fetching products:', error);
    }
};

// Pipe formatting currency
const formatCurrentcy = (value: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
};
onMounted(() => {
    fetchProductsByPublisher();
});
</script>

<template>
    <div>
        <Header />
        <div class="container mx-auto p-4">
            <div class="slider-wrapper">
                <slick-carousel :autoplay="true" :autoplay-speed="3000" :dots="true">
                    <div v-for="(item, index) in slides" :key="index">
                        <img :src="item.image" alt="slide" class="w-full h-64 object-cover" />
                    </div>
                </slick-carousel>
            </div>

            <h2
                class="text-2xl font-bold text-gray-800 mt-16"
                v-if="productsByPublisher.length > 0 && productsByPublisher[0].publisherId"
            >
                {{ productsByPublisher[0].publisherId.name }}
            </h2>

            <Carousel
                class="relative w-full mt-2"
                :opts="{
                    align: 'start',
                }"
            >
                <CarouselContent>
                    <CarouselItem
                        v-for="(product, index) in productsByPublisher"
                        :key="index"
                        class="basis-1/5 flex-shrink-0"
                    >
                        <div class="p-1">
                            <Card>
                                <CardContent class="p-4">
                                    <img
                                        :src="product.images[0]"
                                        alt="product"
                                        class="w-full h-48 object-cover rounded-t-lg"
                                    />
                                    <h3 class="mt-4 text-xl font-semibold">{{ product.name }}</h3>

                                    <div class="mt-4 flex justify-between items-center">
                                        <p class="text-gray-500 whitespace-normal dark:text-gray-400">
                                            {{ product.author }}
                                        </p>
                                        <span class="text-lg font-medium text-red-600 dark:text-white">{{
                                            formatCurrentcy(product.price | currency)
                                        }}</span>
                                    </div>
                                    <div class="mt-4 flex justify-between items-center">
                                        <Heart class="cursor-pointer" />
                                        <ShoppingCart class="cursor-pointer" />
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </CarouselItem>
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
        <!-- <Footer /> -->
    </div>
</template>

<style scoped>
/* Customize the slide and product styles */
.slider-wrapper {
    max-width: 1200px;
    margin: 0 auto;
}

.slick-prev,
.slick-next {
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 50%;
    z-index: 10;
}

.slick-dots li button:before {
    font-size: 12px;
    color: white;
}
</style>
