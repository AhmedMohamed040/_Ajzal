### to download pdf use the component download-pdf

``` javascript
...
<download-pdf title="pdf-name" ref="downloadPdf">
    <template v-slot:default>
        <p>This is content passed from the parent component</p>
    </template>
</download-pdf>
...
```
#### and create a button 

``` javascript
...
<v-btn color="success" @click="$refs.downloadPdf.generateReport()">download</v-btn>
...
```
``` javascript
...
<script>
import DownloadPdf from "@@/components/DownloadPdf.vue"
export default {
    components: {DownloadPdf},
...
</script>

```