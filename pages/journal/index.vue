<template>
  <div>
    <h2>
      Journal page
    </h2>
    <upload-file-form :dialog="showUploadForm"></upload-file-form>
  </div>
</template>

<script>
import UploadFileForm from '@/components/UploadFileForm.vue'
export default {
  components: {
    UploadFileForm
  },

  data () {
    return {
      showUploadForm: true
    }
  }

}
</script>

<style lang="scss" scoped>
</style>
