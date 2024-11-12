<template>
    <section class="bg-gray-50 dark:bg-gray-900 flex items-center justify-center m-12">
        <div class="w-full max-w-md p-6 bg-white rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <h1 class="text-xl font-bold text-gray-900 md:text-2xl dark:text-white text-center">
                Thông tin người dùng
            </h1>
            <form @submit.prevent="updateInfo">
                <div class="mb-4">
                    <label for="editFirstName" class="block text-sm font-medium text-gray-900 dark:text-white"
                        >Họ</label
                    >
                    <input
                        v-model="userToEdit.firstName"
                        type="text"
                        id="editFirstName"
                        class="w-full p-2.5 mt-1 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        required
                    />
                </div>
                <div class="mb-4">
                    <label for="editLastName" class="block text-sm font-medium text-gray-900 dark:text-white"
                        >Tên</label
                    >
                    <input
                        v-model="userToEdit.lastName"
                        type="text"
                        id="editLastName"
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
                    />
                </div>
                <div class="mb-4">
                    <label for="editBirthday" class="block text-sm font-medium text-gray-900 dark:text-white"
                        >Ngày sinh</label
                    >
                    <input
                        v-model="userToEdit.birthday"
                        type="date"
                        id="editBirthday"
                        class="w-full p-2.5 mt-1 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                </div>

                <div class="mb-4">
                    <label for="editAddress" class="block text-sm font-medium text-gray-900 dark:text-white"
                        >Địa chỉ</label
                    >
                    <input
                        v-model="userToEdit.address"
                        type="text"
                        id="editAddress"
                        class="w-full p-2.5 mt-1 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                </div>
                <div class="mb-4">
                    <label for="editPhoneNumber" class="block text-sm font-medium text-gray-900 dark:text-white"
                        >Số điện thoại</label
                    >
                    <input
                        v-model="userToEdit.phoneNumber"
                        type="text"
                        id="editPhoneNumber"
                        aria-describedby="helper-text-explanation"
                        class="w-full p-2.5 mt-1 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-blue-500 focus:border-blue-500 block dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        pattern="[0-9]{10}"
                    />
                </div>
                <div class="mb-4">
                    <label for="editGender" class="block text-sm font-medium text-gray-900 dark:text-white"
                        >Giới tính</label
                    >
                    <select
                        v-model="userToEdit.gender"
                        id="gender"
                        class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                        <option value="" disabled selected>Choose a gender</option>
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
                firstName: '',
                lastName: '',
                email: '',
                birthday: '',
                address: '',
                phoneNumber: '',
                gender: '',
            },
        };
    },
    methods: {
        fetchUser() {
            const user = JSON.parse(localStorage.getItem('user'));
            console.log('user.userData: ', user.userData);
            if (user && user.userData) {
                this.userToEdit.firstName = user.userData.firstName || '';
                this.userToEdit.lastName = user.userData.lastName || '';
                this.userToEdit.email = user.userData.email || '';
                // this.userToEdit.birthday = user.userData.birthday || '';
                this.userToEdit.birthday = this.formatBirthday(user.userData.birthday);
                this.userToEdit.address = user.userData.address || '';
                this.userToEdit.phoneNumber = user.userData.phoneNumber || '';
                this.userToEdit.gender = user.userData.gender || '';
            }
        },
        formatBirthdayHtml(dateString) {
            if (!dateString) return ''; // Trả về chuỗi rỗng nếu không có ngày sinh
            const date = new Date(dateString); // Chuyển đổi chuỗi thành đối tượng Date
            const day = String(date.getDate()).padStart(2, '0'); // Lấy ngày và thêm 0 nếu cần
            const month = String(date.getMonth() + 1).padStart(2, '0'); // Lấy tháng (tháng bắt đầu từ 0)
            const year = date.getFullYear(); // Lấy năm
            return `${day}/${month}/${year}`; // Trả về định dạng dd/mm/yyyy
        },
        formatBirthday(birthday) {
            if (!birthday) return '';
            const date = new Date(birthday); // Chuyển đổi thành đối tượng Date
            if (isNaN(date)) return ''; // Kiểm tra nếu ngày không hợp lệ
            const day = String(date.getDate()).padStart(2, '0'); // Lấy ngày
            const month = String(date.getMonth() + 1).padStart(2, '0'); // Lấy tháng (tháng 0-11)
            const year = date.getFullYear(); // Lấy năm
            return `${year}-${month}-${day}`;
        },

        async updateInfo() {
            const updatedUserData = this.userToEdit;
            const user = JSON.parse(localStorage.getItem('user'));
            const userToken = user.accessToken;
            try {
                const res = await fetch('http://localhost:3001/api/user/updateInfoFromUser', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${userToken}`,
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
                    ...user,
                    userData: {
                        ...user.userData,
                        ...updatedUserData,
                    },
                };
                localStorage.setItem('user', JSON.stringify(updatedUser));
                toast.success('Cập nhật thông tin thành công!');
            } catch (error) {
                console.error('Lỗi khi cập nhật thông tin:', error);
                const toast = useToast();
                toast.error('Cập nhật thông tin thất bại.');
            }
        },
    },
    mounted() {
        this.fetchUser();
    },
};
</script>
