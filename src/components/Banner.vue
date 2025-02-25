<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const adSlides = [
    { img: 'https://img.buoucoding.com/image/3.jpg', label: 'img ad1' },
    { img: 'https://img.buoucoding.com/image/4.jpg', label: 'img ad2' },
    { img: 'https://img.buoucoding.com/image/6.jpg', label: 'img ad3' },
];

const currentSlide = ref(0);
let timer = null;

onMounted(() => {
    timer = setInterval(() => {
        currentSlide.value = (currentSlide.value + 1) % adSlides.length;
    }, 5000);
});

onUnmounted(() => {
    clearInterval(timer);
});
</script>

<template>
    <Card class="w-full overflow-hidden mt-16 border-0 shadow-none">
        <CardContent class="relative px-1">
            <div class="relative h-[300px]">
                <div
                    v-for="(slide, index) in adSlides"
                    :key="index"
                    class="absolute top-0 left-0 size-full transition-opacity duration-500"
                    :class="{ 'opacity-100': index === currentSlide, 'opacity-0': index !== currentSlide }"
                >
                    <img :src="slide.img" :alt="slide.label" class="size-full object-cover rounded-lg" />
                </div>
            </div>
            <div class="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-2">
                <button
                    v-for="(slide, index) in adSlides"
                    :key="index"
                    class="h-2 rounded-full"
                    :class="index === currentSlide ? 'bg-white w-8' : 'bg-gray-400 w-2'"
                    @click="currentSlide = index"
                />
            </div>
        </CardContent>
    </Card>
</template>
