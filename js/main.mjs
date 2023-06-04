import * as Vue from './node_modules/vue3/vue.esm-browser.mjs';
import * as Element from './node_modules/element-plus/index.full.mjs';
import {taikoBase64Str} from "./taiko.mjs";

// import
let {ref, onMounted, onUnmounted} = Vue;


let app = Vue.createApp({
    setup() {
        const fileName = ref(null);

        const canvas = ref(HTMLCanvasElement);

        const result = ref("");


        onMounted(async () => {
            canvas.value = document.getElementById("canvas");
        });

        onUnmounted(() => {
            console.log("delete rec");
        });

        const uploadImg = () => {
            /**
             * 这里由于操作是绑定在 el-input 上；因此需要在内部重新获取 input 再拿到 file
             */
            const reader = new FileReader();
            // 用于展示
            const showImg = document.getElementById("show-img");
            // 用于识别
            const rawImg = document.getElementById("raw-img");
            const inputElement = document
                .getElementsByClassName("el-input")[0]
                .getElementsByTagName("input")[0];

            try {
                const file = inputElement.files[0];
                reader.onload = () => {
                    showImg.src = URL.createObjectURL(file);
                    rawImg.src = URL.createObjectURL(file);
                };
                reader.readAsDataURL(file);
            } catch (err) {
                console.error(err);
            }
        };

        const recognize = async (image, options) => {
            // 获取图像识别的结果
            return {text: ["1", "2", "3"], points: "ok"};
        }

        const predict = async () => {
            const img = document.getElementById("raw-img");
            const res = await recognize(img, {canvas: canvas.value});
            console.log(res);
            if (res.text?.length) {
                // 页面展示识别内容
                result.value = res.text.reduce((total, cur) => total + `<p>${cur}</p>`);
            }
        };

        return {fileName,uploadImg,predict,result}
    },
});

app.use(Element);

app.mount('#app');
