import * as Vue from './node_modules/vue3/vue.esm-browser.mjs';
import * as Element from './node_modules/element-plus/index.full.mjs';
import jquery from 'https://cdn.jsdelivr.net/npm/jquery@3.7.0/+esm'

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


        const getToken = async () => {
            let urlStr = "https://aip.baidubce.com/oauth/2.0/token?client_id=DKw3aSToLoEt8THq8MzLqP7U&client_secret=EEvkjM1geOuGbTUSlvHtR44cXTE4KNnN&grant_type=client_credentials";


            fetch(urlStr, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }).then(res => {
                return res.json();
            }).then(json => {
                console.log('获取的结果', json.data);
                return json;
            }).catch(err => {
                console.log('请求错误', err);
            })

        }


        const recognize = async (image, options) => {
            // 获取图像识别的结果
            var token = getToken();


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

        return {fileName, uploadImg, predict, result}
    },
});

app.use(Element);

app.mount('#app');
