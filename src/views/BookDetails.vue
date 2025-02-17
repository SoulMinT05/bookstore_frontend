<template>
    <div class="mt-16">
        <Header />

        <div class="flex flex-col min-h-[100dvh]">
            <main class="flex-1 relative">
                <div class="container px-4 md:px-6">
                    <Breadcrumb class="px-4">
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink as-child>
                                    <RouterLink class="text-xl" to="/">Trang chủ</RouterLink>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator>/</BreadcrumbSeparator>
                            <BreadcrumbItem>
                                <BreadcrumbPage class="text-xl">{{ slug }} </BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>

                    <div class="flex flex-col">
                        <section class="py-4 md:py-6 lg:py-2">
                            <div class="container grid md:grid-cols-2 gap-8 px-4 md:px-6">
                                <div class="flex flex-col items-start gap-6" v-if="bookDetails.HinhAnhSach">
                                    <img
                                        :src="selectedImage"
                                        alt="Product Image"
                                        width="{600}"
                                        height="{600}"
                                        class="rounded-lg w-full aspect-square object-cover"
                                    />
                                    <div class="flex gap-4">
                                        <img
                                            v-for="(image, index) in bookDetails.HinhAnhSach.slice(0, 4)"
                                            :key="index"
                                            :src="image"
                                            alt="Thumbnail Image"
                                            :style="{ width: '153px', height: '153px' }"
                                            class="rounded-lg object-cover cursor-pointer transition-all duration-200 hover:scale-105 hover:ring-2 hover:ring-blue-500"
                                            @click="changeMainImage(image)"
                                        />
                                    </div>
                                </div>
                                <div class="flex flex-col items-start gap-6">
                                    <h1
                                        class="text-2xl sm:text-3xl md:text-3xl font-bold tracking-tight"
                                        v-if="bookDetails.TenSach"
                                    >
                                        {{ bookDetails.TenSach }}
                                    </h1>
                                    <p class="text-muted-foreground text-lg" v-if="bookDetails.description">
                                        {{ bookDetails.description }}
                                    </p>
                                    <p class="text-lg font-semibold" v-if="bookDetails.TacGia">
                                        Tác giả:
                                        {{ bookDetails.TacGia }}
                                    </p>
                                    <p class="text-lg font-semibold" v-if="bookDetails.MaNXB">
                                        Nhà xuất bản:
                                        {{ bookDetails.MaNXB.TenNXB }}
                                    </p>
                                    <p class="text-lg font-semibold" v-if="bookDetails.NamXuatBan">
                                        Năm xuất bản:
                                        {{ bookDetails.NamXuatBan }}
                                    </p>
                                    <div class="flex items-center gap-4">
                                        <h2 class="text-4xl font-bold text-red-600" v-if="bookDetails.DonGia">
                                            {{ formatCurrency(bookDetails.DonGia) }}
                                        </h2>
                                        <Button size="lg" @click="addToCart">Thêm vào giỏ hàng</Button>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section class="py-12 md:py-24 lg:py-16">
                            <div class="container grid gap-12 px-4 md:px-6">
                                <h2 class="text-2xl sm:text-3xl font-bold tracking-tight -mb-8">Sản phẩm tương tự</h2>
                                <Carousel
                                    v-if="relatedProducts.length > 0"
                                    class="relative w-full mt-2"
                                    :opts="{ align: 'start' }"
                                >
                                    <CarouselContent>
                                        <CarouselItem
                                            v-for="product in relatedProducts"
                                            :key="product._id"
                                            class="basis-1/5 flex-shrink-0 relative overflow-hidden transition-transform duration-300 ease-in-out rounded-lg shadow-lg group hover:shadow-xl hover:-translate-y-2 h-full"
                                        >
                                            <router-link
                                                v-if="product.slug"
                                                :to="`/bookDetails/${product.slug}`"
                                                class="h-full"
                                            >
                                                <Card class="h-full flex flex-col">
                                                    <CardContent class="p-4 flex flex-col justify-between h-full">
                                                        <img
                                                            :src="product.HinhAnhSach[0]"
                                                            alt="product"
                                                            class="w-full h-48 object-cover rounded-t-lg"
                                                        />
                                                        <!-- Đặt chiều cao tối thiểu cho tiêu đề -->
                                                        <h3
                                                            class="mt-4 text-xl font-semibold line-clamp-2 min-h-[56px]"
                                                        >
                                                            {{ product.TenSach }}
                                                        </h3>

                                                        <!-- Thông tin tác giả và giá -->
                                                        <div class="mt-4 flex justify-between">
                                                            <p
                                                                class="text-gray-500 whitespace-normal dark:text-gray-400 min-h-[48px]"
                                                            >
                                                                {{ product.TacGia }}
                                                            </p>
                                                            <span
                                                                class="text-lg font-medium text-red-600 dark:text-white"
                                                            >
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
                                    <CarouselPrevious />
                                    <CarouselNext />
                                </Carousel>
                            </div>
                        </section>

                        <!-- COmment -->
                        <section class="py-12 md:py-24 lg:py-16 w-full">
                            <div class="container flex flex-col gap-12 px-4 md:px-6 items-center w-full">
                                <div class="w-full space-y-8 py-8">
                                    <div class="space-y-4 w-full">
                                        <h2 class="text-2xl sm:text-3xl font-bold tracking-tight">Đánh giá sản phẩm</h2>
                                        <div class="grid gap-2 w-full">
                                            <Textarea
                                                placeholder="Bình luận gì đó..."
                                                class="w-full h-28 resize-none rounded-md border border-input bg-background p-3 text-sm shadow-sm"
                                            />
                                            <p class="text-gray-500 dark:text-gray-400 my-2">
                                                Chia sẻ cảm nhận và trải nghiệm về sản phẩm
                                            </p>
                                            <Button class="justify-cent r">Gửi</Button>
                                        </div>
                                    </div>
                                    <div class="space-y-6 w-full">
                                        <div class="flex items-start gap-4 w-full">
                                            <Avatar class="h-10 w-10 border">
                                                <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
                                                <AvatarFallback>CN</AvatarFallback>
                                            </Avatar>
                                            <div class="grid gap-1.5 w-full">
                                                <div class="flex items-center gap-2">
                                                    <div class="font-medium">Olivia Davis</div>
                                                    <div class="text-xs text-muted-foreground">2 days ago</div>
                                                </div>
                                                <div class="text-sm text-muted-foreground">
                                                    This is a great product! I've been using it for a week and it's been
                                                    a game-changer.
                                                </div>
                                                <!-- <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button
                                                        size="icon"
                                                        variant="outline"
                                                        className="ml-auto rounded-full"
                                                    >
                                                        <EllipsisVerticalIcon className="size-5" />
                                                        <span className="sr-only">Actions</span>
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent>
                                                    <DropdownMenuItem>Profile</DropdownMenuItem>
                                                    <DropdownMenuItem>Files</DropdownMenuItem>
                                                    <DropdownMenuItem>Share</DropdownMenuItem>
                                                    <DropdownMenuItem>Delete</DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu> -->
                                            </div>
                                        </div>
                                        <div class="flex items-start gap-4 w-full">
                                            <Avatar class="h-10 w-10 border">
                                                <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
                                                <AvatarFallback>CN</AvatarFallback>
                                            </Avatar>
                                            <div class="grid gap-1.5 w-full">
                                                <div class="flex items-center gap-2">
                                                    <div class="font-medium">Noah Williams</div>
                                                    <div class="text-xs text-muted-foreground">5 days ago</div>
                                                </div>
                                                <div class="text-sm text-muted-foreground">
                                                    I'm really impressed with the quality and performance of this
                                                    product. Highly recommended!
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-center">
                                <Button variant="outline">Tải thêm bình luận</Button>
                            </div>
                        </section>
                    </div>
                </div>
            </main>
        </div>

        <Footer />
    </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import axios from '@/utils/axios';

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

import { RouterLink } from 'vue-router';
import { onMounted, ref, watch } from 'vue';
import { Heart, ShoppingCart } from 'lucide-vue-next';
import { useToast } from 'vue-toastification';

// Lấy route để truy cập tham số URL
const route = useRoute();

// Lấy slug từ URL params
const slug = route.params.slug;
const toast = useToast();
const bookDetails = ref({});
const relatedProducts = ref([]);
const carts = ref([]);
const selectedImage = ref(null);

const changeMainImage = (image) => {
    selectedImage.value = image;
};

function formatCurrency(value: number | null | undefined): string {
    if (value == null || isNaN(value)) return '0 ₫'; // Xử lý trường hợp giá trị không hợp lệ
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        maximumFractionDigits: 0, // Không hiển thị phần thập phân
    }).format(value);
}
const fetchProductDetails = async () => {
    try {
        const res = await axios.get(`/book/${slug}`);
        bookDetails.value = res.data.product;
        console.log('bookDetails.value: ', bookDetails.value);

        fetchProductSimilarPublisher();
    } catch (error) {
        console.error('Error fetching products:', error);
    }
};

const fetchProductSimilarPublisher = async () => {
    if (!bookDetails.value || !bookDetails.value.MaNXB) {
        console.log('Publisher ID not available');
        return;
    }
    const { MaNXB } = bookDetails.value;

    try {
        const res = await axios.get('/book/relatedProducts', {
            params: {
                MaNXB, // Truyền MaNXB để lấy sản phẩm của cùng nhà xuất bản
            },
        });
        console.log('res.data: ', res.data);
        // relatedProducts.value = res.data.relatedProducts;
        relatedProducts.value = res.data.relatedProducts.filter((product) => product._id !== bookDetails.value._id);
        console.log('relatedProducts.value: ', relatedProducts.value);
    } catch (error) {
        console.error('Error fetching related products:', error);
    }
};

const addToCart = async () => {
    // const user = JSON.parse(localStorage.getItem('user') || '{}');

    // if (!user) {
    //     toast.warning('Ban cần đăng nhập');
    //     return router.push('/login');
    // }

    try {
        const res = await axios.post('/user/addToCart', {
            productId: bookDetails.value,
        });
        console.log('res.data: ', res.data);
        toast.success('Thêm vào giỏ hàng thành công');
    } catch (error) {
        console.error('Error fetching add to cart: ', error.message);
        toast.success('Thêm vào giỏ hàng thất bại');
    }
};
onMounted(() => {
    fetchProductDetails();
    console.log('scroll to top');
    setTimeout(() => {
        document.querySelector('#app')?.scrollTo({ top: 0, behavior: 'smooth' });
        document.querySelector('main')?.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);

    if (bookDetails.value.HinhAnhSach && bookDetails.value.HinhAnhSach.length > 0) {
        selectedImage.value = bookDetails.value.HinhAnhSach[0];
    }
});
watch(
    () => route.params.slug,
    (newSlug) => {
        fetchProductDetails(); // Gọi lại API khi slug thay đổi
    },
);
watch(
    () => bookDetails.value.HinhAnhSach,
    (newImages) => {
        if (newImages && newImages.length > 0) {
            selectedImage.value = newImages[0];
        }
    },
    { immediate: true }, // Đảm bảo hàm này chạy ngay khi component mount
);
console.log('Slug from URL:', slug); // Log slug ra console
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
