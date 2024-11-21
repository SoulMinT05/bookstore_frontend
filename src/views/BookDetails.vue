<template>
    <div class="mt-16">
        <Header />

        <div class="flex flex-col min-h-[100dvh]">
            <main class="flex-1 relative">
                <Breadcrumb :style="{ marginLeft: '124px', marginTop: '20px', marginBottom: '20px' }">
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

                <div className="flex flex-col">
                    <section className="py-4 md:py-6 lg:py-2">
                        <div className="container grid md:grid-cols-2 gap-8 px-4 md:px-6">
                            <div className="flex flex-col items-start gap-6" v-if="bookDetails.HinhAnhSach">
                                <img
                                    :src="bookDetails.HinhAnhSach[0]"
                                    alt="Product Image"
                                    width="{600}"
                                    height="{600}"
                                    className="rounded-lg w-full aspect-square object-cover"
                                />
                                <div class="flex gap-4">
                                    <img
                                        v-for="(image, index) in bookDetails.HinhAnhSach.slice(1, 5)"
                                        :key="index"
                                        :src="image"
                                        alt="Thumbnail Image"
                                        :style="{ width: '153px', height: '153px' }"
                                        class="rounded-lg object-cover cursor-pointer transition-all duration-200 hover:scale-105 hover:ring-2 hover:ring-blue-500"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col items-start gap-6">
                                <h1
                                    className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight"
                                    v-if="bookDetails.TenSach"
                                >
                                    {{ bookDetails.TenSach }}
                                </h1>
                                <p className="text-muted-foreground text-lg" v-if="bookDetails.description">
                                    {{ bookDetails.description }}
                                </p>
                                <p className="text-lg font-semibold" v-if="bookDetails.TacGia">
                                    Tác giả:
                                    {{ bookDetails.TacGia }}
                                </p>
                                <p className="text-lg font-semibold" v-if="bookDetails.MaNXB">
                                    Nhà xuất bản:
                                    {{ bookDetails.MaNXB.TenNXB }}
                                </p>
                                <p className="text-lg font-semibold" v-if="bookDetails.NamXuatBan">
                                    Năm xuất bản:
                                    {{ bookDetails.NamXuatBan }}
                                </p>
                                <div className="flex items-center gap-4">
                                    <h2 className="text-4xl font-bold text-red-600" v-if="bookDetails.DonGia">
                                        {{ formatCurrency(bookDetails.DonGia) }}
                                    </h2>
                                    <Button size="lg" @click="addToCart">Thêm vào giỏ hàng</Button>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="py-12 md:py-24 lg:py-16">
                        <div className="container grid gap-12 px-4 md:px-6">
                            <!-- <div className="grid gap-6">
                                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Product Details</h2>
                                <div className="grid gap-4 text-muted-foreground">
                                    <p>
                                        The Acme Prism T-Shirt is a stylish and comfortable addition to your wardrobe.
                                        Crafted with a unique prism-inspired pattern, this tee adds a modern touch to
                                        your everyday look.
                                    </p>
                                    <p>
                                        Made with a blend of 60% combed ringspun cotton and 40% polyester jersey, the
                                        Acme Prism T-Shirt is soft, breathable, and durable. The fabric is designed to
                                        keep you cool and comfortable throughout the day.
                                    </p>
                                </div>
                            </div>
                            <div className="grid gap-6">
                                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                                    Product Specifications
                                </h2>
                                <div className="grid sm:grid-cols-2 gap-6">
                                    <div className="grid gap-2">
                                        <h3 className="text-lg font-semibold">Material</h3>
                                        <p className="text-muted-foreground">
                                            60% combed ringspun cotton, 40% polyester jersey
                                        </p>
                                    </div>
                                    <div className="grid gap-2">
                                        <h3 className="text-lg font-semibold">Fit</h3>
                                        <p className="text-muted-foreground">Regular fit, true to size</p>
                                    </div>
                                    <div className="grid gap-2">
                                        <h3 className="text-lg font-semibold">Care Instructions</h3>
                                        <p className="text-muted-foreground">Machine wash cold, tumble dry low</p>
                                    </div>
                                    <div className="grid gap-2">
                                        <h3 className="text-lg font-semibold">Origin</h3>
                                        <p className="text-muted-foreground">Made in USA</p>
                                    </div>
                                </div>
                            </div> -->
                            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight -mb-8">Sản phẩm tương tự</h2>
                            <Carousel class="relative w-full mt-2" :opts="{ align: 'start' }">
                                <CarouselContent>
                                    <CarouselItem
                                        v-for="(product, index) in relatedProducts"
                                        :key="product.slug"
                                        class="basis-1/5 flex-shrink-0 relative overflow-hidden transition-transform duration-300 ease-in-out rounded-lg shadow-lg group hover:shadow-xl hover:-translate-y-2"
                                    >
                                        <router-link v-if="product.slug" :to="`/bookDetails/${product.slug}`">
                                            <div class="p-1">
                                                <Card>
                                                    <CardContent class="p-4">
                                                        <img
                                                            :src="product.HinhAnhSach[0]"
                                                            alt="product"
                                                            class="w-full h-48 object-cover rounded-t-lg"
                                                        />
                                                        <h3
                                                            class="mt-4 text-xl font-semibold line-clamp-2 custom-min-height"
                                                        >
                                                            {{ product.name }}
                                                        </h3>

                                                        <div class="mt-4 flex justify-between items-center">
                                                            <p class="text-gray-500">{{ product.TacGia }}</p>
                                                            <span class="text-lg font-medium text-red-600">{{
                                                                formatCurrency(product.DonGia)
                                                            }}</span>
                                                        </div>

                                                        <div class="mt-4 flex justify-between items-center">
                                                            <Heart class="cursor-pointer" />
                                                            <ShoppingCart class="cursor-pointer" />
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            </div>
                                        </router-link>
                                    </CarouselItem>
                                </CarouselContent>

                                <CarouselPrevious />
                                <CarouselNext />
                            </Carousel>
                        </div>
                    </section>
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
import { RouterLink } from 'vue-router';
import { Button } from '@/components/ui/button';
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
});
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
