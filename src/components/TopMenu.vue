<template>
    <div>
        <div class="container-fluid top-img" :style="{'background-image': 'url(' + require('../assets/topmenu-background.jpg') + ')'}">
            <div class="row">
                <img alt="postApp logo" src="../assets/logo.png" class="logo col-6 col-md-2 offset-6 offset-md-0">
            </div>
            <div class="row" >
                <ul class="p-0  position-absolute col-md-6 offset-md-6" style="top:250px">
                    <li>News</li>
                    <li>Tech</li>
                    <li>Sport</li>
                    <li>Philosophy</li>
                    <li>Education</li>
                </ul>    
            </div>
        </div>
   
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>

    .top-img {
        height: 80px;
        background-size: 100%;
        background-position: left;
        ul {
            display: flex;
            flex-direction: row;
            justify-content: space-around;
        }
    }
    @media screen and (min-width: 992px) {
        .top-img{
            height: 300px;
            background-position: left;
        }

    }
</style>