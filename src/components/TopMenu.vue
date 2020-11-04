<template>
    <div>
        <div class="container-fluid top-img" :style="{'background-image': 'url(' + require('../assets/topmenu-background.jpg') + ')'}">
            <img alt="Vue logo" src="../assets/logo.png">
            </div>
        <ul>
            <li>News</li>
            <li>Tech</li>
            <li>Sport</li>
            <li>Philosophy</li>
            <li>Education</li>
        </ul>       
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
    ul {
        display: flex;
    }
    .top-img{
        height: 400px;
        background-position: left;
    }
</style>