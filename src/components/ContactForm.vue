<template>
  <form @submit.prevent="submitContact" class="p-3">
    <div class="mb-3">
      <label class="form-label">Tên</label>
      <input v-model="contactLocal.name" class="form-control" required />
    </div>
    <div class="mb-3">
      <label class="form-label">Email</label>
      <input v-model="contactLocal.email" type="email" class="form-control" />
    </div>
    <div class="mb-3">
      <label class="form-label">Địa chỉ</label>
      <input v-model="contactLocal.address" class="form-control" />
    </div>
    <div class="mb-3">
      <label class="form-label">Điện thoại</label>
      <input v-model="contactLocal.phone" class="form-control" />
    </div>
    <div class="form-check mb-3">
      <input v-model="contactLocal.favorite" type="checkbox" class="form-check-input" />
      <label class="form-check-label">Liên hệ yêu thích</label>
    </div>
    <div class="mb-3">
  <label class="form-label">Tình trạng gia đình</label>
  <select v-model="contactLocal.familyStatus" class="form-control">
    <option value="Độc thân">Độc thân</option>
    <option value="Đã kết hôn">Đã kết hôn</option>
    <option value="Ly hôn">Ly hôn</option>
  </select>
</div>

<div class="mb-3">
  <label class="form-label">Sở thích</label>
  <div>
    <div class="form-check form-check-inline">
      <input v-model="contactLocal.hobbies" value="Đánh cầu" type="checkbox" class="form-check-input" />
      <label class="form-check-label">Đánh cầu</label>
    </div>
    <div class="form-check form-check-inline">
      <input v-model="contactLocal.hobbies" value="Nghe nhạc" type="checkbox" class="form-check-input" />
      <label class="form-check-label">Nghe nhạc</label>
    </div>
    <div class="form-check form-check-inline">
      <input v-model="contactLocal.hobbies" value="Chơi game" type="checkbox" class="form-check-input" />
      <label class="form-check-label">Chơi game</label>
    </div>
  </div>
</div>
    <button type="submit" class="btn btn-primary">Lưu</button>
    <router-link to="/" class="btn btn-secondary ms-2">Hủy</router-link>
  </form>
</template>

<script>
export default {
  props: { contact: Object },
  emits: ["submit:contact"],
  data() {
    return {
      contactLocal: { ...this.contact },
    };
  },
  methods: {
    submitContact() {
      this.$emit("submit:contact", this.contactLocal);
    },
  },
};
</script>