<template>
  <div class="page">
    <h4 class="mb-4">Chỉnh sửa Liên hệ</h4>
    <ContactForm v-if="contact" :contact="contact" @submit:contact="updateContact" />
    <p v-else>Đang tải thông tin...</p>
  </div>
</template>

<script>
import ContactForm from "@/components/ContactForm.vue";
import ContactService from "@/services/contact.service";

export default {
  components: { ContactForm },
  props: {
    id: { type: String, required: true },
  },
  data() {
    return {
      contact: null,
    };
  },
  async created() {
    try {
      this.contact = await ContactService.get(this.id);
    } catch (error) {
      alert("Không tìm thấy liên hệ!");
      this.$router.push({ name: "contactbook" });
    }
  },
  methods: {
    async updateContact(data) {
      try {
        await ContactService.update(this.id, data);
        alert("Cập nhật thành công!");
        this.$router.push({ name: "contactbook" });
      } catch (error) {
        alert("Lỗi khi cập nhật!");
      }
    },
  },
};
</script>

<style scoped>
.page {
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}
</style>