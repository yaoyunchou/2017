<template>
  <div id="app">
    <!--Header-part-->
    <div id="header">
      <h1>
        <a href="dashboard.html">Matrix Admin</a>
      </h1>
    </div>
    <!--close-Header-part-->

    <!--top-Header-menu-->
    <div id="user-nav" class="navbar navbar-inverse">
      <ul class="nav">
        <li class="">
          <a title="" href="#">
            <i class="icon icon-cog"></i>
            <span class="text">Settings</span>
          </a>
        </li>
        <li class="">
          <a title="" href="login.html">
            <i class="icon icon-share-alt"></i>
            <span class="text">Logout</span>
          </a>
        </li>
      </ul>
    </div>
    <!--close-top-Header-menu-->
    <!--start-top-serch-->
    <div id="search">
      <input type="text" placeholder="Search here..." />
      <button type="submit" class="tip-bottom" title="Search">
        <i class="icon-search icon-white"></i>
      </button>
    </div>
    <!--close-top-serch-->
    <!--sidebar-menu-->
    <div id="sidebar">
      <ul>
        <li class="active">
          <a href="#/rss-list">
            <i class="icon icon-home"></i>
            <span>Dashboard</span>
          </a>
        </li>
        <li>
          <a href="#/demo">
            <i class="icon icon-signal"></i>
            <span>Charts &amp; graphs</span>
          </a>
        </li>
        <li>
          <a href="#/form">
            <i class="icon icon-inbox"></i>
            <span>Widgets</span>
          </a>
        </li>
        <li>
          <a href="#/form">
            <i class="icon icon-th"></i>
            <span>Tables</span>
          </a>
        </li>
        <li>
          <a href="#/forml">
            <i class="icon icon-fullscreen"></i>
            <span>Full width</span>
          </a>
        </li>
        <li>
          <a href="#/form">
            <i class="icon icon-tint"></i>
            <span>Buttons &amp; icons</span>
          </a>
        </li>
        <li>
          <a href="#/form">
            <i class="icon icon-pencil"></i>
            <span>Eelements</span>
          </a>
        </li>
        <li class="submenu" v-on:click ="setTimeCont()">
          <a>
            <i class="icon icon-file"></i>
            <span>Addons</span>
            <span class="label label-important">{{timeCont}}</span>
          </a>
        </li>
        
      </ul>
    </div>
    <!--sidebar-menu-->
    <div id="content">

      <div id="content-header">
        <div id="breadcrumb">
          <a href="index.html" title="Go to Home" class="tip-bottom">
            <i class="icon-home"></i> Home</a>
        </div>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
export default {
  name: "app",
  // computed: mapState([
  //   // 映射 this.count 为 store.state.count
  //   "timeCont"
  // ])
  computed: {
    // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters([
      "timeCont",
      "anotherGetter"
      // ...
    ])
  },
  methods: {
    ...mapMutations(["setTimeCont"])
  },
  created: function() {
    console.log(this.$store.state.timeCont);
  }
};
</script>

<style lang="scss" scopeed>
#app {
  padding: 0;
  margin: 0;
}

/* Header */

#header {
  height: 77px;
  position: relative;
  width: 100%;
  z-index: -9;
  h1 {
    //background: url("../img/logo.png") no-repeat scroll 0 0 transparent;
    height: 31px;
    left: 20px;
    line-height: 600px;
    overflow: hidden;
    position: relative;
    top: 26px;
    width: 191px;
    a {
      display: block;
    }
  }
}

/* Search input */

#search {
  position: absolute;
  z-index: 25;
  top: 6px;
  right: 10px;
  input[type="text"] {
    padding: 4px 10px 5px;
    border: 0;
    width: 100px;
  }
  button {
    border: 0;
    margin-left: -3px;
    margin-top: -11px;
    padding: 5px 10px 4px;
    i {
      opacity: 0.8;
      color: #fff;
    }
    &:hover,
    &:active {
      i {
        opacity: 1;
      }
    }
  }
}

/* Top user navigation */

#user-nav {
  position: absolute;
  left: 220px;
  top: 0px;
  z-index: 20;
  margin: 0;
  > ul {
    margin: 0;
    padding: 0;
    list-style: none;
    border-right: 1px solid #2e363f;
    border-left: 1px solid #000;
    > li {
      float: left;
      list-style-type: none;
      margin: 0;
      position: relative;
      padding: 0;
      border-left: 1px solid #2e363f;
      border-right: 1px solid #000;
      > a {
        padding: 9px 10px;
        display: block;
        font-size: 11px;
      }
    }
  }
}

#user-nav > ul > li > #user-nav > ul > li > a:hover,
#user-nav > ul > li.open > a {
  color: #ffffff;
  background: #000;
}

#user-nav > ul > li > a > i,
#sidebar li a i {
  opacity: 0.5;
  margin-top: 2px;
}

#user-nav > ul > li > a:hover > i,
#user-nav > ul > li.open > a > i {
  opacity: 1;
}

#user-nav > ul > li > a > .label {
  vertical-align: middle;
  padding: 1px 4px 1px;
  margin: -2px 4px 0;
  display: inline-block;
}

#user-nav > ul ul > li > a {
  text-align: left;
}

/* Sidebar Navigation */

#sidebar {
  display: block;
  float: left;
  position: relative;
  width: 220px;
  z-index: 16;
  > ul {
    list-style: none;
    margin: 0px 0 0;
    padding: 0;
    position: absolute;
    width: 220px;
    > li {
      display: block;
      position: relative;
      > a {
        padding: 10px 0 10px 15px;
        display: block;
        color: #939da8;
        > i {
          margin-right: 10px;
        }
      }
    }
  }
}

#sidebar > ul > li > #sidebar > ul > li > a #sidebar > ul > li.active > a {
  //background: url("../img/menu-active.png") no-repeat scroll right center transparent !important;
  text-decoration: none;
}

#sidebar > ul > li > a > .label {
  margin: 0 20px 0 0;
  float: right;
  padding: 3px 5px 2px;
}

#sidebar > ul li ul {
  display: none;
  margin: 0;
  padding: 0;
}

#sidebar > ul li.open ul {
  display: block;
}

#sidebar > ul li ul li a {
  padding: 10px 0 10px 25px;
  display: block;
  color: #777777;
}

#sidebar > ul li ul li:first-child a {
  border-top: 0;
}

#sidebar > ul li ul li:last-child a {
  border-bottom: 0;
}

/* Content */

#content {
  background: none repeat scroll 0 0 #eeeeee;
  margin-left: 220px;
  margin-right: 0;
  padding-bottom: 25px;
  position: relative;
  min-height: 100%;
  width: auto;

  .navbar .nav > li > a {
    float: none;
    padding: 10px 15px 10px;
    color: #777;
    text-decoration: none;
    text-shadow: 0 1px 0 #fff;
  }
  #content-header {
    position: abslute;
    width: 100%;
    margin-top: -38px;
    z-index: 20;
  }
  /* Breadcrumb */
  #breadcrumb {
    line-height: 20px;
    background-color: #fff;
    border-bottom: 1px solid #e3ebed;
    a {
      padding: 8px 20px 8px 10px;
      display: inline-block; // background-image: url('../img/breadcrumb.png');
      background-position: center right;
      background-repeat: no-repeat;
      font-size: 11px;
      color: #666666;
      &:hover {
        color: #333333;
        i {
          margin-right: 5px;
          opacity: 0.8;
        }
      }
      &.current {
        font-weight: bold;
        color: #444444;
      }
      i {
        margin-right: 5px;
        opacity: 0.6;
      }
    }
  }
}
</style>
