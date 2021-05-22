<template>
    <div class="zcard">
        <div class="card-body">
            <div class="card-header"> 
                <div class="card-meta">
                    <span class="card-meta-title">{{ title }}</span>
                    <span class="card-meta-action">
                        <slot name="action"></slot>    
                    </span>    
                </div>
                <div class="total"><span>{{total}}</span></div>
            </div>
            <div class="card-content">
                <div class="content-fix">
                    <slot></slot>
                </div>
            </div>
            <div class="card-footer">
                <slot name="footer"></slot>
            </div>
        </div>
        
    </div>
</template>

<script>
export default {
    props: {
        title: "",
        total: ""
    },
    data(){
        return {

        }
    }
}
</script>

<style lang="less">
.zcard{
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    color: rgba(0,0,0,.65);
    font-size: 14px;
    font-variant: tabular-nums;
    line-height: 1.5;
    list-style: none;
    -webkit-font-feature-settings: "tnum";
    font-feature-settings: "tnum";
    position: relative;
    background: #fff;
    border-radius: 2px;
    -webkit-transition: all .3s;
    transition: all .3s;

    .card-header{
        color: rgba(0,0,0,.45);
        font-size: 14px;
        line-height: 22px;
        .card-meta{
            position: relative;
            overflow: hidden;
            width: 100%;
            font-size: 14px;
            line-height: 22px;


            .card-meta-action{
                cursor: pointer;
                position: absolute;
                top: 0;
                right: 0;
            }
        }

        .total{
            color: rgba(0,0,0,.65);
            overflow: hidden;
            text-overflow: ellipsis;
            word-break: break-all;
            white-space: nowrap;
            margin-top: 4px;
            margin-bottom: 0;
            font-size: 30px;
            line-height: 38px;
            height: 38px;
        }
    
    }

    .card-body {
        padding: 24px;
        zoom: 1;

        /*.card-content{
            margin-bottom: 12px;
            position: relative;
            height: 46px;
            width: 100%;
        }*/
   }

   .card-footer{
        border-top: 1px solid #d9d9d9;
        padding-top: 9px;
        margin-top: 8px;
   }
}
</style>