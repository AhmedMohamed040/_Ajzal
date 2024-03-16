<template>
    <div>
        <!-- 1. Create the button that will be clicked to select a file -->
        <v-btn 
            :color="color" 
            :loading="isSelecting" 
            :append-icon="icon"
            outlined
            @click="handleFileImport"
        >
        <v-icon>{{icon}}</v-icon>
        {{ text }}
            
        </v-btn>

        <!-- Create a File Input that will be hidden but triggered with JavaScript -->
        <input 
            ref="uploader" 
            class="d-none" 
            type="file" 
            @change="onFileChanged"
        >
    </div>
</template>

<script>
    export default {
        name: 'SelectFile',
        props: {
            text: {
                type: String,
                default: 'Upload File'
            },
            color: {
                type: String,
                default: 'primary'
            },
            icon: {
                type: String,
                default: 'mdi-cloud-upload'
            },
        },
        data(){
            return {
                isSelecting: false,
                selectedFile: null
            }
        },
        methods: {
            handleFileImport() {
                this.isSelecting = true;

                // After obtaining the focus when closing the FilePicker, return the button state to normal
                window.addEventListener('focus', () => {
                    this.isSelecting = false
                }, { once: true });
                
                // Trigger click on the FileInput
                this.$refs.uploader.click();
            },
            onFileChanged(e) {
                this.selectedFile = e.target.files[0];
                this.$emit("returnFile", this.selectedFile);

                // Do whatever you need with the file, liek reading it with FileReader
            },
        }
    }
</script>