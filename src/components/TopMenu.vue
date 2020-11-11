<template>
    <div>
        <div class="container-fluid top-img"
            :style="{'background-image': 'url(' + require('../assets/topmenu-background.jpg') + ')'}">
            <div class="row">
                <nav class="navbar navbar-expand-lg navbar-light position-relative w-100">

                    <div class="row position-relative w-100">

                        <a class="navbar-brand text-center col" href="/"><img alt="postApp logo"
                                src="../assets/logo.png" class="logo"></a>

                        <a class="admin col" href="#" type="button" data-toggle="collapse" data-target="#adminNav"
                            aria-controls="adminNav" aria-expanded="false" aria-label="Toggle navigation"
                            @click="toggleAdminMenu($event)">
                            <img src="../assets/profile.png" alt="admin">
                        </a>

                        <button class="navbar-toggler col" type="button" data-toggle="collapse" data-target="#navbarNav"
                            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                    </div>
                    <div class="collapse position-absolute" id="adminNav">
                        <ul class="bg-light">
                            <router-link to="/dashboard" tag="li">Dashboard</router-link>
                        </ul>
                    </div>
                    <!-- <div class="collapse navbar-collapse position-absolute" id="navbarNav">
                        <ul class="navbar-nav bg-light">
                            <li class="nav-item active" @click="filterCats($event)">
                                <a class="nav-link" href="#" data-category=0 >All</a>
                            </li>
                            <li class="nav-item" v-for="cat in categories" :key="cat.id"
                            @click="filterCats($event)" >
                                <a class="nav-link" :data-category="cat.id"
                                 href="#">{{ cat.name }}</a>
                            </li>

                        </ul>
                    </div> -->
                </nav>
            </div>
        </div>
    </div>
</template>

<script>
    import $ from 'jquery';
    export default {
        methods: {
            toggleAdminMenu(e) {
                e.preventDefault();
                var id = $(e.target).parent().attr('data-target');
                $(id + ':visible') ? $(id).removeClass('collapse') : $(id).addClass('collapse');
                console.log(id);
            }
        }
    }
</script>

<style lang="scss">
    ul {
        z-index: 1;
    }


    .top-img {
        height: 180px;
        background-size: cover;
        background-position: left;
        box-shadow: 2px 2px 25px #F2BD00;

        .navbar {
            max-height: 70%;

            #navbarNav,
            #adminNav {
                top: 100px;
                right: 10px;
            }

            .navbar-brand img,
            .admin img {
                width: auto;
                max-width: 100%;
            }
        }

    }

    @media screen and (max-width: 991.99px) {
        .navbar-nav {
            width: 100vw;
            height: auto;
            min-height: 70vh;
            padding-left: 20vw;
            padding-top: 10vh;
            margin-top: 150px;
            position: relative;
        }
    }

    @media screen and (min-width: 992px) {
        .top-img {
            height: 220px;
            background-position: left;
        }

        #navbarNav {
            top: 10px;
            right: 10px;

            .navbar-nav {
                position: absolute !important;
                right: 0;
                top: -80px;
                border: 2px solid #F2BD00;

                .nav-item {
                    width: auto;
                    min-width: 100px;
                    text-align: center;
                }
            }
        }

        .admin,
        .admin img {
            width: 50px;
            height: 50px;
            position: absolute;
            right: 5px;
            top: 5px;
        }
    }
</style>