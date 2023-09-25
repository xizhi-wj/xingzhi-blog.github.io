function checkOpen() {}
function addStylesheetRule(e) {
    document.styleSheets[0].addRule(":root", e);
  // document.styleSheets[0].insertRule(":root", e);
}
function handleStyles(e) {
  "light" == getContrastYIQ(e) && (e = LightenDarkenColor(colorHex(e), -50)),
    addStylesheetRule(`--xingzhi-main:${e}!important`),
    addStylesheetRule(`--xingzhi-main-op:${e}23!important`),
    addStylesheetRule(`--xingzhi-main-op-deep:${e}dd!important`),
    addStylesheetRule(`--xingzhi-main-op-light:${e}0d!important`),
    addStylesheetRule(`--xingzhi-main-none:${e}00!important`),
    xingzhi.initThemeColor(),
    document.getElementById("coverdiv").classList.add("loaded");
}
function handleDefaultStyles() {
  addStylesheetRule("--xingzhi-main: var(--xingzhi-theme)!important"),
    addStylesheetRule("--xingzhi-main-op: var(--xingzhi-theme-op)!important"),
    addStylesheetRule(
      "--xingzhi-main-op-deep:var(--xingzhi-theme-op-deep)!important"
    ),
    addStylesheetRule(
      "--xingzhi-main-op-light:var(--xingzhi-theme-op-light)!important"
    ),
    addStylesheetRule(
      "--xingzhi-main-none: var(--xingzhi-theme-none)!important"
    ),
    xingzhi.initThemeColor();
}
async function coverColor() {
  const e = document.getElementById("post-cover")?.src;
  if (e)
    try {
      const t = await fetch(e + "?imageAve");
      if (t.ok) {
        // handleStyles("#" + (await t.json()).RGB.slice(2));
      }
    } catch (e) {
      console.error("Failed to fetch the image", e);
    }
  else handleDefaultStyles();
}
function padZero(e, t = 2) {
  return (Array(t).join("0") + e).slice(-t);
}
function colorHex(e) {
  if (/#([0-9a-f]{3}|[0-9a-f]{6})/i.test(e)) return e;
  if (/^(rgb|RGB)/.test(e)) {
    let t = e.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(","),
      o = "#";
    for (let e of t) {
      o += padZero((+e).toString(16));
    }
    return o;
  }
  return e;
}
function colorRgb(e) {
  let t = e.toLowerCase();
  if (t && /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(t)) {
    if (4 === t.length) {
      let e = "#";
      for (let o = 1; o < 4; o += 1) e += t.slice(o, o + 1).repeat(2);
      t = e;
    }
    let e = [];
    for (let o = 1; o < 7; o += 2) e.push(parseInt("0x" + t.slice(o, o + 2)));
    return `rgb(${e.join(",")})`;
  }
  return t;
}
function LightenDarkenColor(e, t) {
  let o = !1;
  "#" == e[0] && ((e = e.slice(1)), (o = !0));
  let n = parseInt(e, 16),
    a = (n >> 16) + t,
    i = ((n >> 8) & 255) + t,
    r = (255 & n) + t;
  return (
    (a = Math.min(255, Math.max(0, a))),
    (i = Math.min(255, Math.max(0, i))),
    (r = Math.min(255, Math.max(0, r))),
    (o ? "#" : "") + (r | (i << 8) | (a << 16)).toString(16).padStart(6, "0")
  );
}
function getContrastYIQ(e) {
  let t = colorRgb(e).match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
  return (299 * t[1] + 587 * t[2] + 114 * t[3]) / 255e3 >= 0.5
    ? "light"
    : "dark";
}
function navTitle() {
  // var e = document.title.replace(" | 张洪xingzhi", "");
  // document.getElementById("page-name-text").innerHTML = "";
}
function showcopy() {
  if (void 0 !== GLOBAL_CONFIG.Snackbar)
    btf.snackbarShow(GLOBAL_CONFIG.copy.success);
  else {
    const e = ctx.previousElementSibling;
    (e.innerText = GLOBAL_CONFIG.copy.success),
      (e.style.opacity = 1),
      setTimeout(() => {
        e.style.opacity = 0;
      }, 700);
  }
}
(checkOpen.toString = function () {
  this.opened = !0;
}),
  (window.onload = function () {
    for (
      var e = document.getElementsByClassName("copybtn"), t = 0;
      t < e.length;
      t++
    )
      document
        .getElementsByClassName("copybtn")
        [t].addEventListener("click", function () {
          showcopy();
        });
    xingzhi.initThemeColor();
  });
var getTimeState = () => {
    var e = new Date().getHours(),
      t = "";
    return (
      e >= 0 && e <= 5
        ? (t = "睡个好觉，保证精力充沛")
        : e > 5 && e <= 10
        ? (t = "一日之计在于晨")
        : e > 10 && e <= 14
        ? (t = "吃饱了才有力气干活")
        : e > 14 && e <= 18
        ? (t = "集中精力，攻克难关")
        : e > 18 && e <= 24 && (t = "不要太劳累了，早睡更健康"),
      t
    );
  },
  switchDarkMode = () => {
    "dark" === document.documentElement.getAttribute("data-theme")
      ? (activateLightMode(),
        saveToLocal.set("theme", "light", 2),
        void 0 !== GLOBAL_CONFIG.Snackbar &&
          btf.snackbarShow(GLOBAL_CONFIG.Snackbar.night_to_day, !1, 2e3),
        $(".menu-darkmode-text").text("深色模式"))
      : (activateDarkMode(),
        saveToLocal.set("theme", "dark", 2),
        void 0 !== GLOBAL_CONFIG.Snackbar &&
          btf.snackbarShow(GLOBAL_CONFIG.Snackbar.day_to_night, !1, 2e3),
        $(".menu-darkmode-text").text("浅色模式")),
      handleCases();
    //   updateCharts();
  },
  handleCases = () => {
    "function" == typeof utterancesTheme && utterancesTheme(),
      "object" == typeof FB && window.loadFBComment(),
      window.DISQUS &&
        document.getElementById("disqus_thread").children.length &&
        setTimeout(() => window.disqusReset(), 200);
  },
  updateCharts = () => {
    let e =
      "light" === document.documentElement.getAttribute("data-theme")
        ? "#363636"
        : "#F7F7FA";
    [
      { id: "posts-chart", options: postsOption, instance: postsChart },
      { id: "tags-chart", options: tagsOption, instance: tagsChart },
      {
        id: "categories-chart",
        options: categoriesOption,
        instance: categoriesChart,
      },
    ].forEach((t) => {
      if (document.getElementById(t.id)) {
        let o = { ...t.options };
        (o.textStyle.color = e),
          (o.title.textStyle.color = e),
          o.xAxis &&
            ((o.xAxis.axisLine.lineStyle.color = e),
            (o.yAxis.axisLine.lineStyle.color = e)),
          o.legend && (o.legend.textStyle.color = e),
          t.instance.setOption(o);
      }
    });
  },
  navFn = { switchDarkMode: switchDarkMode };
function RemoveRewardMask() {
  $(".reward-main").attr("style", "display: none"),
    $("#quit-box").attr("style", "display: none");
}
function AddRewardMask() {
  $(".reward-main").attr("style", "display: flex"),
    $("#quit-box").attr("style", "display: flex");
}
function travelling() {
  fetch("https://moments.zhxingzhi.com/randomfriend")
    .then((e) => e.json())
    .then((e) => {
      var t = e.link,
        o =
          "点击前往按钮进入随机一个友链，不保证跳转网站的安全性和可用性。本次随机到的是本站友链：「" +
          e.name +
          "」";
      document.styleSheets[0].addRule(
        ":root",
        "--xingzhi-snackbar-time:8000ms!important"
      ),
        Snackbar.show({
          text: o,
          duration: 8e3,
          pos: "top-center",
          actionText: "前往",
          onActionClick: function (e) {
            $(e).css("opacity", 0), window.open(t, "_blank");
          },
        });
    });
}
function toforeverblog() {
  Snackbar.show({
    text: "点击前往按钮进入「十年之约」项目中的成员博客，不保证跳转网站的安全性和可用性",
    duration: 8e3,
    pos: "top-center",
    actionText: "前往",
    onActionClick: function (e) {
      $(e).css("opacity", 0),
        window.open(link, "https://www.foreverblog.cn/go.html");
    },
  });
}
function totraveling() {
  btf.snackbarShow(
    "即将跳转到「开往」项目的成员博客，不保证跳转网站的安全性和可用性",
    !1,
    5e3
  ),
    setTimeout(function () {
      window.open("https://www.travellings.cn/go.html");
    }, "5000");
}
function removeLoading() {
  setTimeout(function () {
    preloader.endLoading();
  }, 3e3);
}
function addFriendLink() {
  var e = document.getElementsByClassName("el-textarea__inner")[0];
  let t = document.createEvent("HTMLEvents");
  t.initEvent("input", !0, !0),
    (e.value =
      "昵称（请勿包含博客等字样）：\n网站地址（要求博客地址，请勿提交个人主页）：\n头像图片url（请提供尽可能清晰的图片，我会上传到我自己的图床）：\n描述：\n类型（生活类或者技术类）：）"),
    e.dispatchEvent(t),
    xingzhi.scrollTo("友情链接申请"),
    e.focus(),
    e.setSelectionRange(-1, -1);
}
function getArrayItems(e, t) {
  var o = [];
  for (var n in e) o.push(e[n]);
  for (var a = [], i = 0; i < t && o.length > 0; i++) {
    var r = Math.floor(Math.random() * o.length);
    (a[i] = o[r]), o.splice(r, 1);
  }
  return a;
}
function bindTodayCardHoverEvent() {
  $(".topGroup").hover(
    function () {},
    function () {
      (hoverOnCommentBarrage = !1),
        document.getElementById("todayCard").classList.remove("hide"),
        (document.getElementById("todayCard").style.zIndex = 1);
    }
  );
}
function owoBig() {
  new MutationObserver((e) => {
    for (let t of e)
      if ("childList" === t.type)
        for (let e of t.addedNodes)
          if (e.classList && e.classList.contains("OwO-body")) {
            let t = e,
              o = "",
              n = !0,
              a = document.createElement("div");
            (a.id = "owo-big"),
              document.querySelector("body").appendChild(a),
              t.addEventListener("contextmenu", (e) => e.preventDefault()),
              t.addEventListener("mouseover", (e) => {
                "LI" === e.target.tagName &&
                  n &&
                  ((n = !1),
                  (o = setTimeout(() => {
                    let t = 3 * e.target.clientWidth,
                      o = e.x - e.offsetX - (t - e.target.clientWidth) / 2,
                      n = e.y - e.offsetY;
                    (a.style.height = 3 * e.target.clientHeight + "px"),
                      (a.style.width = t + "px"),
                      (a.style.left = o + "px"),
                      (a.style.top = n + "px"),
                      (a.style.display = "flex"),
                      (a.innerHTML = `<img src="${
                        e.target.querySelector("img").src
                      }">`);
                  }, 300)));
              }),
              t.addEventListener("mouseout", (e) => {
                (a.style.display = "none"), (n = !0), clearTimeout(o);
              });
          }
  }).observe(document.getElementById("post-comment"), {
    childList: !0,
    subtree: !0,
  });
}
function initObserver() {
  var e = document.getElementById("post-comment"),
    t = document.getElementById("pagination");
  e &&
    t &&
    new IntersectionObserver(function (e) {
      e.forEach(function (e) {
        e.isIntersecting
          ? (t.classList.add("show-window"),
            (document.querySelector(".comment-barrage").style.bottom =
              "-200px"))
          : (t.classList.remove("show-window"),
            (document.querySelector(".comment-barrage").style.bottom = "0px"));
      });
    }).observe(e);
}
function percent() {
  let e = document.documentElement.scrollTop || window.pageYOffset,
    t =
      Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.body.clientHeight,
        document.documentElement.clientHeight
      ) - document.documentElement.clientHeight,
    o = Math.round((e / t) * 100),
    n = document.querySelector("#percent");
  var a = window.scrollY + document.documentElement.clientHeight;
  (document.getElementById("post-comment") || document.getElementById("footer"))
    .offsetTop < a || o > 90
    ? (document.querySelector("#nav-totop").classList.add("long"),
      (n.innerHTML = "返回顶部"))
    : (document.querySelector("#nav-totop").classList.remove("long"),
      o >= 0 && (n.innerHTML = o)),
    (endresult = t - e),
    endresult < 100
      ? $(".needEndHide").addClass("hide")
      : $(".needEndHide").removeClass("hide"),
    (window.onscroll = percent);
}
function addKeyShotListener() {
  $(window).off("keydown"),
    $(window).off("keyup"),
    $(window).on("keydown", keyDownEvent),
    $(window).on("keyup", keyUpEvent);
}
function keyDownEvent(e) {
  if (
    (27 == e.keyCode &&
      (xingzhi.hideLoading(), xingzhi.hideConsole(), rm.hideRightMenu()),
    xingzhi_keyboard && e.shiftKey && !xingzhi_intype)
  ) {
    if (
      (16 == e.keyCode &&
        document.querySelector("#keyboard-tips").classList.add("show"),
      75 == e.keyCode)
    )
      return xingzhi.keyboardToggle(), !1;
    if (65 == e.keyCode) return xingzhi.showConsole(), !1;
    if (77 == e.keyCode) return xingzhi.musicToggle(), !1;
    if (82 == e.keyCode) return toRandomPost(), !1;
    if (72 == e.keyCode) return pjax.loadUrl("/"), !1;
    if (68 == e.keyCode) return rm.switchDarkMode(), !1;
    if (70 == e.keyCode) return pjax.loadUrl("/moments/"), !1;
    if (76 == e.keyCode) return pjax.loadUrl("/link/"), !1;
    if (80 == e.keyCode) return pjax.loadUrl("/about/"), !1;
    if (84 == e.keyCode) return pjax.loadUrl("/tlink/"), !1;
  }
}
function keyUpEvent(e) {
  16 == e.keyCode &&
    document.querySelector("#keyboard-tips").classList.remove("show");
}
function checkUrlAndAddHideBanner() {
  var e = window.location.href;
  if (/\/page\//.test(e)) {
    var t = document.getElementById("recent-top-post-group"),
      o = document.getElementById("bbTimeList");
    t && (t.classList.add("more-page"), o.classList.add("more-page"));
  }
}
function open_all_tags() {
  document
    .querySelectorAll(".card-allinfo .card-tag-cloud")
    .forEach(function (e) {
      e.classList.add("all-tags");
    });
  var e = document.getElementById("more-tags-btn");
  e && e.parentNode.removeChild(e);
}
function listenToPageInputPress() {
  var e = document.getElementById("toPageText"),
    o = document.getElementById("toPageButton");
  if (e) {
    var a = document.querySelectorAll(".page-number");
    (t = a[a.length - 1].innerHTML), (n = +t);
    var i = document.getElementById("myElementId");
    if (1 == n) (i = document.querySelector(".toPageGroup")) && i.remove();
    e.addEventListener("keydown", (e) => {
      13 === e.keyCode && (xingzhi.toPage(), pjax.loadUrl(o.href));
    }),
      e.addEventListener("input", function () {
        "" === e.value || "0" === e.value
          ? o.classList.remove("haveValue")
          : o.classList.add("haveValue");
        var t = document.querySelectorAll(".page-number"),
          n = +t[t.length - 1].innerHTML;
        +document.getElementById("toPageText").value > n && (e.value = n);
      });
  }
}
function initBlog() {
  (window.commentBarrageInitialized = !1),
    coverColor(),
    addRightMenuClickEvent(),
    navTitle(),
    percent(),
    listenToPageInputPress(),
    xingzhi.topPostScroll(),
    xingzhi.sayhi(),
    xingzhi.addTag(),
    xingzhi.stopImgRightDrag(),
    // xingzhi.addFriendLinksInFooter(),
    xingzhi.addPowerLinksInPostRightSide(),
    xingzhi.qrcodeCreate(),
    // xingzhi.hidecookie(),
    xingzhi.onlyHome(),
    xingzhi.addNavBackgroundInit(),
    xingzhi.initIndexEssay(),
    xingzhi.chageTimeFormate(),
    xingzhi.reflashEssayWaterFall(),
    xingzhi.darkModeStatus(),
    xingzhi.categoriesBarActive(),
    xingzhi.initThemeColor(),
    xingzhi.hideLoading(),
    xingzhi.tagPageActive(),
    xingzhi.removeBodyPaceClass(),
    // xingzhi.lottieAnimation("footer_mini_logo"),
    // xingzhi.lottieAnimation("lottie_avatar"),
    // xingzhiGPT.aiExplanation(),
    // AIEngine(),
    // addAIToggleListener(),
    initObserver(),
    checkUrlAndAddHideBanner(),
    bindTodayCardHoverEvent()
    // initializeCommentBarrage();
}
document.addEventListener(
  "touchstart",
  (e) => {
    RemoveRewardMask();
  },
  !1
),
  $(document)
    .unbind("keydown")
    .bind("keydown", function (e) {
      if ((e.ctrlKey || e.metaKey) && 67 == e.keyCode && "" != selectTextNow)
        return (
          btf.snackbarShow("复制成功，复制和转载请标注本文地址"),
          rm.rightmenuCopyText(selectTextNow),
          !1
        );
    }),
  document.addEventListener(
    "scroll",
    btf.throttle(function () {
      xingzhi.initThemeColor();
    }, 200)
  ),
  navigator.serviceWorker.getRegistrations().then(function (e) {
    for (let t of e) t.unregister();
  }),
  (window.onkeydown = function (e) {
    123 === e.keyCode &&
      btf.snackbarShow("开发者模式已打开，请遵循GPL协议", !1, 3e3);
  }),
  window.addEventListener("resize", function () {
    document.querySelector("#waterfall") && xingzhi.reflashEssayWaterFall();
  }),
  document.getElementById("post-comment") && owoBig(),
  "true" == localStorage.getItem("keyboardToggle")
    ? (document.querySelector("#consoleKeyboard").classList.add("on"),
      (xingzhi_keyboard = !0))
    : (document.querySelector("#consoleKeyboard").classList.remove("on"),
      (xingzhi_keyboard = !1)),
  addKeyShotListener(),
  $("input").focus(function () {
    xingzhi_intype = !0;
  }),
  $("textarea").focus(function () {
    xingzhi_intype = !0;
  }),
  $("input").focusout(function () {
    xingzhi_intype = !1;
  }),
  $("textarea").focusout(function () {
    xingzhi_intype = !1;
  }),
  (window.onfocus = function () {
    document.querySelector("#keyboard-tips").classList.remove("show");
  }),
  document.addEventListener("pjax:click", function () {
    console.clear(),
      Pace.restart(),
      xingzhi.showLoading(),
      $(window).prop("keydown", null).off("keydown");
  });
