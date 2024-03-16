<template>
   <client-only>
    <vue-html2pdf
        :show-layout="false"
        :float-layout="true"
        :enable-download="true"
        :preview-modal="false"
        :paginate-elements-by-height="1400"
        :filename="message"
        :pdf-quality="2"
        :manual-pagination="false"
        pdf-format="a4"
        pdf-orientation="portrait"
        pdf-content-width="100%"

        @progress="onProgress($event)"
        ref="html2Pdf"
        >
        <section slot="pdf-content">
            <slot></slot>
        </section>
    </vue-html2pdf>
</client-only>
</template>

<script>
export default {
    name: "download-pdf",
    props: {
        message: {
            type: String,
            default: 'invoice-download'
        }
    },
    methods: {
        generateReport () {
            this.$refs.html2Pdf.generatePdf()
        },
        onProgress(event){
            console.log(event)
        },
    },
}
</script>
