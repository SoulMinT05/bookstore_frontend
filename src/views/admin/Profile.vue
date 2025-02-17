<template>
    <section class="bg-gray-50 dark:bg-gray-900 flex items-center justify-center m-12">
        <div class="w-full max-w-md p-6 bg-white rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <h1 class="text-xl font-bold text-gray-900 md:text-2xl dark:text-white text-center">
                Thông tin người dùng
            </h1>
            <form @submit.prevent="updateInfo">
                <div class="mb-4">
                    <label for="editHo" class="block text-sm font-medium text-gray-900 dark:text-white">Họ</label>
                    <input
                        v-model="userToEdit.Ho"
                        type="text"
                        id="editHo"
                        class="w-full p-2.5 mt-1 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        required
                    />
                </div>
                <div class="mb-4">
                    <label for="editTen" class="block text-sm font-medium text-gray-900 dark:text-white">Tên</label>
                    <input
                        v-model="userToEdit.Ten"
                        type="text"
                        id="editTen"
                        class="w-full p-2.5 mt-1 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        required
                    />
                </div>
                <div class="mb-4">
                    <label for="editEmail" class="block text-sm font-medium text-gray-900 dark:text-white">Email</label>
                    <input
                        v-model="userToEdit.email"
                        type="email"
                        id="editEmail"
                        class="w-full p-2.5 mt-1 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        required
                        disabled
                    />
                </div>
                <div class="mb-4">
                    <label for="editNgaySinh" class="block text-sm font-medium text-gray-900 dark:text-white"
                        >Ngày sinh</label
                    >
                    <input
                        v-model="userToEdit.NgaySinh"
                        type="date"
                        id="editNgaySinh"
                        class="w-full p-2.5 mt-1 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                </div>

                <div class="mb-4">
                    <label for="editDiaChi" class="block text-sm font-medium text-gray-900 dark:text-white"
                        >Địa chỉ</label
                    >
                    <input
                        v-model="userToEdit.DiaChi"
                        type="text"
                        id="editDiaChi"
                        class="w-full p-2.5 mt-1 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                </div>
                <div class="mb-4">
                    <label for="editDienThoai" class="block text-sm font-medium text-gray-900 dark:text-white"
                        >Số điện thoại</label
                    >
                    <input
                        v-model="userToEdit.DienThoai"
                        type="text"
                        id="editDienThoai"
                        aria-describedby="helper-text-explanation"
                        class="w-full p-2.5 mt-1 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-blue-500 focus:border-blue-500 block dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        pattern="[0-9]{10}"
                    />
                </div>
                <div class="mb-4">
                    <label for="editPhai" class="block text-sm font-medium text-gray-900 dark:text-white"
                        >Giới tính</label
                    >
                    <select
                        v-model="userToEdit.Phai"
                        id="Phai"
                        class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                        <option value="" disabled selected>Chọn giới tính</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                <div class="flex justify-end mt-6">
                    <button
                        type="submit"
                        class="cursor-pointer hover:opacity-95 px-4 py-2 bg-blue-500 text-white rounded-md"
                    >
                        Cập nhật
                    </button>
                </div>
            </form>
        </div>
    </section>
</template>

<script>
import { useToast } from 'vue-toastification';

export default {
    data() {
        return {
            userToEdit: {
                Ho: '',
                Ten: '',
                email: '',
                NgaySinh: '',
                DiaChi: '',
                DienThoai: '',
                Phai: '',
            },
        };
    },
    methods: {
        fetchStaff() {
            const user = JSON.parse(localStorage.getItem('staff'));
            console.log('user.userData: ', user.userData);
            if (user && user.userData) {
                this.userToEdit.Ho = user.userData.Ho || '';
                this.userToEdit.Ten = user.userData.Ten || '';
                this.userToEdit.email = user.userData.email || '';
                // this.userToEdit.NgaySinh = user.userData.NgaySinh || '';
                this.userToEdit.NgaySinh = this.formatNgaySinh(user.userData.NgaySinh);
                this.userToEdit.DiaChi = user.userData.DiaChi || '';
                this.userToEdit.DienThoai = user.userData.DienThoai || '';
                this.userToEdit.Phai = user.userData.Phai || '';
            }
        },
        formatNgaySinhHtml(dateString) {
            if (!dateString) return ''; // Trả về chuỗi rỗng nếu không có ngày sinh
            const date = new Date(dateString); // Chuyển đổi chuỗi thành đối tượng Date
            const day = String(date.getDate()).padStart(2, '0'); // Lấy ngày và thêm 0 nếu cần
            const month = String(date.getMonth() + 1).padStart(2, '0'); // Lấy tháng (tháng bắt đầu từ 0)
            const year = date.getFullYear(); // Lấy năm
            return `${day}/${month}/${year}`; // Trả về định dạng dd/mm/yyyy
        },
        formatNgaySinh(NgaySinh) {
            if (!NgaySinh) return '';
            const date = new Date(NgaySinh); // Chuyển đổi thành đối tượng Date
            if (isNaN(date)) return ''; // Kiểm tra nếu ngày không hợp lệ
            const day = String(date.getDate()).padStart(2, '0'); // Lấy ngày
            const month = String(date.getMonth() + 1).padStart(2, '0'); // Lấy tháng (tháng 0-11)
            const year = date.getFullYear(); // Lấy năm
            return `${year}-${month}-${day}`;
        },

        async updateInfo() {
            const updatedUserData = this.userToEdit;
            const staff = JSON.parse(localStorage.getItem('staff'));
            const staffToken = staff.accessToken;
            try {
                const res = await fetch(`${import.meta.env.VITE_API_BACKEND}/api/staff/updateInfoFromUser`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${staffToken}`,
                    },
                    body: JSON.stringify(updatedUserData),
                });
                const data = await res.json();
                console.log('dataUpdateInfo: ', data);
                const toast = useToast();
                if (!data.success) {
                    toast.error(data.message);
                    return;
                }
                const updatedUser = {
                    ...staff,
                    userData: {
                        ...staff.userData,
                        ...updatedUserData,
                    },
                };
                localStorage.setItem('staff', JSON.stringify(updatedUser));
                toast.success('Cập nhật thông tin thành công!');
            } catch (error) {
                console.error('Lỗi khi cập nhật thông tin:', error);
                const toast = useToast();
                toast.error('Cập nhật thông tin thất bại.');
            }
        },
    },
    mounted() {
        this.fetchStaff();
    },
};
</script>
