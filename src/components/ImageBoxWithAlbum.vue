<!--拍照及图片组件-->
<template>
    <div class="image-box">
        <div class="header">
            <span class="title">{{title}}({{qty}})</span>
            <span class="remark" v-if="editable"> {{$t("ImageBox.title.photosNum.seq1")}}{{max}}{{$t("ImageBox.title.photosNum.seq2")}}</span>
        </div>
        <!--图片展示区域-->
        <div style="height: 85px;">
            <div class="box">
                <div class="box-item" @click="takePhoto()" v-if="editable && list.length < max" style="margin-right: 5px;margin-top:5px;">
                    <span class="iconfont icon-camera" style="display: flex;margin-left: 5px;"></span>
                </div>
                <div style="margin-right: 5px;margin-top:5px;" class="box-item" v-for="(item,i) in list" :key="i" @click="OpenBigImg(i,item.url)" @touchstart.stop='longPressImg(i)' @touchend="songkai">
                    <img :src="item.thumburl" :onerror="errImg" />
                </div>
            </div>
        </div>

        <!--点击图片  显示大图-->
        <div v-transfer-dom>
            <x-dialog v-model="showBigImg" class="dialog-demo  img-dialog" :hideOnBlur="true">
                <div class="img-box img-tu" :style="isOnline?imgBoxStyle:imgBoxErrStyle"  v-swipeleft="(e)=>vueTouch('左滑',e)"
                     v-swiperight="(e)=>vueTouch('右滑',e)">
                    <img :src="bigImageSrc" ref="digImg" :onerror="errImg" :style="isOnline?bigImgStyle:bigImgErrStyle">
                    <div v-if="!isOnline" style="padding-bottom:15px;background-color: #e5e5e5;color:#666;font-size:16px;">{{$t("ImageBox.title.unloadImage")}}</div>
                </div>
                <div @click="onHide()">
                    <span class="vux-close"></span>
                </div>
            </x-dialog>
        </div>

        <!--提示是否删除照片-->
        <div v-transfer-dom>
            <confirm v-model="showDeleteImg" @on-confirm="deleteImage" @on-cancel="showDeleteImg=false" :title="this.$t('common.title.operationTips')" theme="android">
                <p style="text-align:center;">{{$t("ImageBox.title.isDeletePhoto")}}？</p>
            </confirm>
        </div>
    </div>
</template>

<script>
    import { TransferDom, Group, XDialog, Scroller, XButton, Confirm, AlertModule } from 'vux';
    import '../libs/touch.js'
    export default {
        directives: { TransferDom },
        components: {
            Group,
            XDialog,
            Scroller,
            XButton,
            Confirm
        },
        props: {
            type: { //拍照类型，1代表返回Base64，2：代表直接上传，返回上传记录。
                type: Number,
                required: false,
                default: 2
            },
            title: { //标签
                type: String,
                required: true
            },
            max: { //标签
                type: Number,
                required: false,
                default: 5
            },
            list: { //图片列表
                type: Array,
                required: true
            },
            editable: { //是否可编辑
                type: Boolean,
                required: false,
                default: true
            },
            userId: {
                type: String,
                required: false
            },
            checkDelAuth: { //是否需要校验删除权限
                type: Boolean,
                required: false,
                default: false
            },
            delImage: {
                type: Function,
                required: false,
            },
            params: {
                type: Object,
                required: true
            },
            callback: {
                type: Function,
                required: false
            },
            offlineIsUploadImage:{
                type: Boolean,
                required: false,
                default: true
            }
        },
        computed: {
            qty: function () {
                return this.list.length;
            },
            listChange: function () {
                this.currentList = this.list;
            }
        },
        data() {
            return {
                showBigImg: false,
                showPopup: false,
                showDeleteImg: false,
                bigImageSrc: '',
                isOnline:true,
                toBeDeleteIndex: -1,
                currentList: [],
                text: '',
                bigImgStyle:{
                    "width":"100%"
                },
                bigImgErrStyle:{
                    "width":"80%"
                },
                imgBoxStyle:{
                    "background-color": "#e5e5e5"
                },
                imgBoxErrStyle:{
                    "background-color": "#e5e5e5",
                    "padding": "20px 0"
                },
                inde:0,
                errImg:'this.src="' + require('../assets/pic_damage.svg') + '"'
            }
        },
        created(){
            if(!NETWORK_ONLINE){
                this.isOnline = false;
            }
        },
        mounted(){
            const _this = this;
            document.addEventListener('networkOffline', () => {
                _this.isOnline = false;
            }, false);
            document.addEventListener('networkOnline', () => {
                _this.isOnline = true;
            }, false);
        },
        methods: {
            onHide() {
                this.showBigImg = false;
            },
            takePhoto(index) { // 调用原生接口进行拍照
                if (!this.editable) {
                    return;
                }
                if (this.params.ownerId == null || !this.params.ownerId || this.params.ownerId == "undefined" || this.params.ownerId == "") {
                    AlertModule.show({ title: this.$t('translate.tiaoyognpaizhao'), content: this.$t('translate.canshuqueshi') })
                    return;
                }
                if (this.qty >= this.max) {
                    AlertModule.show({ title:this.$t('translate.yichaoguozuida'), content: this.$t('translate.nikeyishangchutup') })
                } else {
                    // 在此处调用原生接口进行拍照，并将拍照后的图片压缩、base64编码后，
                    // 在回调函数中放入item.images对象数组中
                    // 调用拍照接口

                    //let _img = document.createElement("img");
                    //    _img.setAttribute("src", "http://www.w3school.com.cn/ui2017/compatible_safari.png");
                    //    _img.appendTo($("#d" + index));
                    /**
                     * 返回格式1：obj:{"code":2,"type":1,"data":[{"size":"xxx","content":"xxx"}]},base64 code必须取得头部信息，因为json解析会失败。
                     * 图片地址       返回格式2：obj:{"code":1/0/2,msg:'',"type":2,"data":[{"id":xxx,"url":xxx,"thumburl":xxx}]}
                     * code:0代表失败, 1代表成功，2代表离线状态拍照成功，照片已存储在本地；type:1代表返回Base64，2：代表直接上传，返回上传记录。
                     */
                        //Vue.prototype.takephoto_callback_handler = function(){
                        //    console.log('空的拍照回调接口');
                        // }
                    let type_ = this.type;
                    const _this = this;
                    let cb = function (obj) {
                        try {
                            if (Number(obj.code) == 1 || Number(obj.code) == 2) { //code等于1时拍照成功
                                if (Number(obj.code) == 2 && obj.data.length > 0) {
                                    // alert(JSON.stringify(obj.data[0]))
                                    let imgId = obj.data[0].id;
                                    let base64 = "data:image/jpeg;base64," + obj.data[0].content;
                                    let imgObj = { id: imgId, url: base64, thumburl: base64 };
                                    _this.list.push(imgObj);
                                    if (!!_this.callback) {
                                        _this.callback(obj, "noUrl");
                                    }
                                } else if (Number(obj.code) == 1 && Number(obj.type) == 2 && obj.data.length > 0) {
                                    _this.list.push(obj.data[0]);
                                    if (!!_this.callback) {
                                        _this.callback(obj.data[0], "hasUrl");
                                    }
                                    printLogMsg("info", "上传完成");
                                } else {
                                    AlertModule.show({ title: this.$t('translate.paizhaofanhui'), content:this.$t('translate.meityoyfanghui')})
                                }
                            } else {
                                AlertModule.show({ title:this.$t('translate.paizhaoshibai'), content: obj.msg })
                            }

                        } catch (e) {
                            AlertModule.show({ title: this.$t('translate.paizhaofanhuijiex'), content: e.message })
                        }
                    };
                    try {
                        printLogMsg("info", "takePhotoByNative", this.params);
                        takePhotoByNative(this.type, this.max, this.params.ownerObject, this.params.ownerType, this.params.ownerId, cb, this.offlineIsUploadImage, () => {}, "1");
                    } catch (e) {
                        AlertModule.show({
                            title:this.$t('translate.tuiayuanshengpai'),
                            content: e.message
                        })
                        //this.list.push({url:"http://www.w3school.com.cn/ui2017/compatible_safari.png", thumbUrl:"http://www.w3school.com.cn/ui2017/compatible_safari.png"})
                    }
                }
            },
            OpenBigImg(i,url) { // 显示大图
                this.bigImageSrc = url;
                this.inde = i ;
                console.log("当前是第几张",i)
                this.showBigImg = true;
            },
            vueTouch:function(txt,e){
                console.log("滑动",txt)
                if(txt=='右滑'){
                    console.log("右滑动了")
                    this.down();

                }
                if(txt=='左滑'){
                    console.log("左滑动了")
                    this.up();
                }
            },
            up(){
                this.inde--;
                if(this.inde<0){
                    this.inde = this.list.length-1;
                }
                this.$refs.digImg.src = this.list[this.inde].url;
                console.log("上一张",this.list[this.inde].url)
            },
            down(){
                this.inde++;
                if(this.inde==this.list.length){
                    this.inde=0;
                }
                this.$refs.digImg.src = this.list[this.inde].url;
                console.log("下一张",this.list[this.inde].url)
            },
            longPressImg(index) {
                if (this.editable) {
                    this.timer = setTimeout(() => {
                        this.toBeDeleteIndex = index;
                        this.showDeleteImg = true;
                    }, 800);
                }
            },
            songkai() {
                if (this.editable) {
                    clearTimeout(this.timer);
                }
            },
            deleteImage() {
                if (this.editable) {
                    if (this.checkDelAuth) {
                        if (this.userId == this.list[this.toBeDeleteIndex].createBy || !this.list[this.toBeDeleteIndex].createBy) {
                            let id = this.list[this.toBeDeleteIndex].id;
                            this.delImage(id);
                            this.list.splice(this.toBeDeleteIndex, 1);
                        } else {
                            this.$vux.toast.show({
                                text: this.$t("ImageBox.tips.onlyDelete"),     //只能删除自己上传的图片
                                type: 'warn',
                                position: 'middle'
                            });
                        }
                    } else {
                        let imgType;
                        if (this.list[this.toBeDeleteIndex].thumburl.indexOf('data:image/png;base64') != -1) {
                            imgType = "noUrl";
                        } else {
                            imgType = "hasUrl";
                        }
                        let id = this.list[this.toBeDeleteIndex].id;
                        this.delImage(id, imgType);
                        this.list.splice(this.toBeDeleteIndex, 1);
                        if (imgType == "noUrl") {
                            deleteImgCache(id); //调用原生删除接口
                        }
                    }
                }
            }
        }
    }
</script>

<style scoped>
    .image-box {
        padding: 5px;
        width: 100%;
    }

    .image-box .header {
        height: 25px;
        line-height: 25px;
        margin-bottom: 5px;
    }

    .image-box .header .remark {
        float: right;
        color: #969595;
    }

    .image-box .box .box-item {
        width: 60px;
        height: 80px;
        float: left;
        border: 1px solid #cacaca;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .image-box .box .box-item img {
        max-height: 80px;
        max-width: 60px;
        -webkit-touch-callout: none
    }

</style>
<style>
    .img-dialog .weui-dialog{
        overflow: inherit;
    }
    .img-dialog .weui-dialog .img-tu{
        position: relative;


    }
    .img-dialog .weui-dialog .img-tu .up{
        position: absolute;
        left: -60px;
        top:50%;
    }
    .img-dialog .weui-dialog .img-tu .down{
        position: absolute;
        right:-60px;
        top:50%;
    }
</style>
