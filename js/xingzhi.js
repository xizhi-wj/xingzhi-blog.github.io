let xingzhi_cookiesTime = null,
  xingzhi_musicPlaying = !1,
  xingzhi_keyboard = !1,
  xingzhi_intype = !1,
  xingzhigpt = null,
  lastSayHello = "";
var xingzhi = {
  darkModeStatus: function () {
    "light" ==
    ("dark" === document.documentElement.getAttribute("data-theme")
      ? "dark"
      : "light")
      ? $(".menu-darkmode-text").text("深色模式")
      : $(".menu-darkmode-text").text("浅色模式");
  },
  initIndexEssay: function () {
    if (document.querySelector("#bber-talk"))
      new Swiper(".swiper-container", {
        direction: "vertical",
        loop: !0,
        autoplay: {
          delay: 3e3,
          pauseOnMouseEnter: !0,
        },
      });
  },
  onlyHome: function () {
    var e = window.location.pathname;
    "/" == (e = decodeURIComponent(e))
      ? $(".only-home").attr("style", "display: flex")
      : $(".only-home").attr("style", "display: none");
  },
  is_Post: function () {
    return window.location.href.indexOf("/p/") >= 0;
  },
  addNavBackgroundInit: function () {
    var e = 0,
      t = 0;
    document.body && (e = document.body.scrollTop),
      document.documentElement && (t = document.documentElement.scrollTop),
      0 != (e - t > 0 ? e : t) &&
        (document.getElementById("page-header").classList.add("nav-fixed"),
        document.getElementById("page-header").classList.add("nav-visible"),
        $("#cookies-window").hide());
  },
  tagPageActive: function () {
    var e = window.location.pathname;
    if (/\/tags\/.*?\//.test((e = decodeURIComponent(e)))) {
      var t = e.split("/")[2];
      if (document.querySelector("#tag-page-tags")) {
        $("a").removeClass("select");
        var o = document.getElementById(t);
        o && (o.classList.add("select"), (o.style.order = "-1"));
      }
    }
  },
  categoriesBarActive: function () {
    document.querySelector("#category-bar") &&
      $(".category-bar-item").removeClass("select");
    var e = window.location.pathname;
    if ("/" == (e = decodeURIComponent(e)))
      document.querySelector("#category-bar") &&
        document.getElementById("category-bar-home").classList.add("select");
    else {
      if (/\/categories\/.*?\//.test(e)) {
        var t = e.split("/")[2];
        if (document.querySelector("#category-bar")) {
          var o = document.getElementById(t);
          o && (o.classList.add("select"), (o.style.order = "-1"));
        }
      }
    }
  },
  addFriendLinksInFooter: function () {
    fetch("/zhxingzhi/friendlink.json")
      .then((e) => e.json())
      .then((e) => {
        var t = [],
          o = -1;
        for (const n of e) {
          const e = n.link_list;
          for (let n = 0; n < Math.min(e.length, 1); n++) {
            let n = Math.floor(Math.random() * e.length);
            for (; (n === o && e.length > 1) || "张洪xingzhi" === e[n].name; )
              n = Math.floor(Math.random() * e.length);
            (o = n),
              t.push({
                name: e[n].name,
                link: e[n].link,
              }),
              e.splice(n, 1);
          }
        }
        t.pop();
        var n = "";
        for (let e = 0; e < t.length; ++e) {
          var a = t[e];
          n += `<a class='footer-item' href='${a.link}'  target="_blank" rel="noopener nofollow">${a.name}</a>`;
        }
        (n += "<a class='footer-item' href='/link/'>更多</a>"),
          (document.getElementById("friend-links-in-footer").innerHTML = n);
      });
  },
  stopImgRightDrag: function () {
    $("img").on("dragstart", function () {
      return !1;
    });
  },
  topPostScroll: function () {
    if (document.getElementById("recent-post-top")) {
      let e = document.getElementById("recent-post-top");
      e.addEventListener(
        "mousewheel",
        function (t) {
          (e.scrollLeft += -t.wheelDelta / 2),
            document.body.clientWidth < 1300 && t.preventDefault();
        },
        !1
      );
    }
  },
  sayhi: function () {
    document.querySelector("#author-info__sayhi") &&
      (document.getElementById("author-info__sayhi").innerHTML =
        getTimeState());
  },
  addTag: function () {
    document.querySelector(".xingzhi-tag-new") &&
      $(".xingzhi-tag-new").append(
        '<sup class="xingzhi-tag xingzhi-tag-new-view">N</sup>'
      ),
      document.querySelector(".xingzhi-tag-hot") &&
        $(".xingzhi-tag-hot").append(
          '<sup class="xingzhi-tag xingzhi-tag-hot-view">H</sup>'
        );
  },
  qrcodeCreate: function () {
    if (document.getElementById("qrcode")) {
      document.getElementById("qrcode").innerHTML = "";
      new QRCode(document.getElementById("qrcode"), {
        text: window.location.href,
        width: 250,
        height: 250,
        colorDark: "#000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H,
      });
    }
  },
  reflashEssayWaterFall: function () {
    document.querySelector("#waterfall") &&
      setTimeout(function () {
        waterfall("#waterfall"),
          document.getElementById("waterfall").classList.add("show");
      }, 500);
  },
  chageTimeFormate: function () {
    for (
      var e = document.getElementsByTagName("time"), t = 0;
      t < e.length;
      t++
    ) {
      var o,
        n = e[t].getAttribute("datetime"),
        a = new Date(n),
        l = new Date().getTime() - a.getTime(),
        i = Math.floor(l / 864e5);
      (o =
        0 === i
          ? "最近"
          : 1 === i
          ? "昨天"
          : 2 === i
          ? "前天"
          : i <= 7
          ? i + "天前"
          : a.getFullYear() !== new Date().getFullYear()
          ? a.getFullYear() + "/" + (a.getMonth() + 1) + "/" + a.getDate()
          : a.getMonth() + 1 + "/" + a.getDate()),
        (e[t].textContent = o);
    }
  },
  downloadImage: function (e, t) {
    rm.hideRightMenu(),
      0 == rm.downloadimging
        ? ((rm.downloadimging = !0),
          btf.snackbarShow("正在下载中，请稍后", !1, 1e4),
          setTimeout(function () {
            let o = new Image();
            o.setAttribute("crossOrigin", "anonymous"),
              (o.onload = function () {
                let e = document.createElement("canvas");
                (e.width = o.width),
                  (e.height = o.height),
                  e.getContext("2d").drawImage(o, 0, 0, o.width, o.height);
                let n = e.toDataURL("image/png"),
                  a = document.createElement("a"),
                  l = new MouseEvent("click");
                (a.download = t || "photo"), (a.href = n), a.dispatchEvent(l);
              }),
              (o.src = e),
              btf.snackbarShow("图片已添加盲水印，请遵守版权协议"),
              (rm.downloadimging = !1);
          }, "10000"))
        : btf.snackbarShow("有正在进行中的下载，请稍后再试");
  },
  switchCommentBarrage: function () {
    document.querySelector(".comment-barrage") &&
      ($(".comment-barrage").is(":visible")
        ? ($(".comment-barrage").hide(),
          $(".menu-commentBarrage-text").text("显示热评"),
          document
            .querySelector("#consoleCommentBarrage")
            .classList.remove("on"),
          localStorage.setItem("commentBarrageSwitch", "false"))
        : $(".comment-barrage").is(":hidden") &&
          ($(".comment-barrage").show(),
          $(".menu-commentBarrage-text").text("关闭热评"),
          document.querySelector("#consoleCommentBarrage").classList.add("on"),
          localStorage.removeItem("commentBarrageSwitch"))),
      rm.hideRightMenu();
  },
  hidecookie: function () {
    xingzhi_cookiesTime = setTimeout(() => {
      document.getElementById("cookies-window").classList.add("cw-hide"),
        setTimeout(() => {
          $("#cookies-window").hide();
        }, 1e3);
    }, 3e3);
  },
  hideTodayCard: function () {
    document.getElementById("todayCard") &&
      document.getElementById("todayCard").classList.add("hide");
  },
  changeThemeColor: function (e) {
    null !== document.querySelector('meta[name="theme-color"]') &&
      (document
        .querySelector('meta[name="theme-color"]')
        .setAttribute("content", e),
      document
        .querySelector('meta[name="apple-mobile-web-app-status-bar-style"]')
        .setAttribute("content", e));
  },
  initThemeColor: function () {
    const e = window.scrollY || document.documentElement.scrollTop;
    if (xingzhi.is_Post()) {
      if (e > 0) {
        let e = getComputedStyle(document.documentElement).getPropertyValue(
          "--xingzhi-card-bg"
        );
        xingzhi.changeThemeColor(e);
      } else if (0 === e) {
        let e = getComputedStyle(document.documentElement).getPropertyValue(
          "--xingzhi-main"
        );
        xingzhi.changeThemeColor(e);
      }
    } else if (e > 0) {
      let e = getComputedStyle(document.documentElement).getPropertyValue(
        "--xingzhi-card-bg"
      );
      xingzhi.changeThemeColor(e);
    } else if (0 === e) {
      let e = getComputedStyle(document.documentElement).getPropertyValue(
        "--xingzhi-background"
      );
      xingzhi.changeThemeColor(e);
    }
  },
  jumpTo: function (e) {
    $(document).ready(function () {
      $("html,body").animate(
        {
          scrollTop: $(e).eq(i).offset().top,
        },
        500
      );
    });
  },
  showLoading: function () {
    document.querySelector("#loading-box").classList.remove("loaded");
    let e = getComputedStyle(document.documentElement).getPropertyValue(
      "--xingzhi-card-bg"
    );
    xingzhi.changeThemeColor(e);
  },
  hideLoading: function () {
    document.querySelector("#loading-box").classList.add("loaded");
    //   xingzhiGPT.aiExplanation();
  },
  musicToggle: function () {
    xingzhi_musicPlaying
      ? (document.querySelector("#nav-music").classList.remove("playing"),
        (document.getElementById("menu-music-toggle").innerHTML =
          '<i class="xingzhifont icon-play-fill"></i><span>播放音乐</span>'),
        (document.getElementById("nav-music-hoverTips").innerHTML =
          "音乐已暂停"),
        document.querySelector("#consoleMusic").classList.remove("on"),
        (xingzhi_musicPlaying = !1))
      : (document.querySelector("#nav-music").classList.add("playing"),
        (document.getElementById("menu-music-toggle").innerHTML =
          '<i class="xingzhifont icon-pause-fill"></i><span>暂停音乐</span>'),
        document.querySelector("#consoleMusic").classList.add("on"),
        (xingzhi_musicPlaying = !0)),
      document.querySelector("meting-js").aplayer.toggle(),
      rm.hideRightMenu();
  },
  musicSkipBack: function () {
    document.querySelector("meting-js").aplayer.skipBack(), rm.hideRightMenu();
  },
  musicSkipForward: function () {
    document.querySelector("meting-js").aplayer.skipForward(),
      rm.hideRightMenu();
  },
  musicGetName: function () {
    for (var e = $(".aplayer-title"), t = [], o = e.length - 1; o >= 0; o--)
      t[o] = e[o].innerText;
    return t[0];
  },
  showConsole: function () {
    document.querySelector("#console").classList.add("show"),
      xingzhi.initConsoleState();
  },
  hideConsole: function () {
    document.querySelector("#console").classList.remove("show");
  },
  keyboardToggle: function () {
    xingzhi_keyboard
      ? ((xingzhi_keyboard = !1),
        document.querySelector("#consoleKeyboard").classList.remove("on"),
        localStorage.setItem("keyboardToggle", "false"))
      : ((xingzhi_keyboard = !0),
        document.querySelector("#consoleKeyboard").classList.add("on"),
        localStorage.setItem("keyboardToggle", "true"));
  },
  scrollTo: function (e) {
    const t = document.getElementById(e);
    if (t) {
      const e = t.getBoundingClientRect().top + window.pageYOffset - 80,
        o = window.pageYOffset,
        n = e - o;
      let a = null;
      window.requestAnimationFrame(function e(t) {
        a || (a = t);
        const l = t - a,
          i = (c = Math.min(l / 0, 1)) < 0.5 ? 2 * c * c : (4 - 2 * c) * c - 1;
        var c;
        window.scrollTo(0, o + n * i),
          l < 600 && window.requestAnimationFrame(e);
      });
    }
  },
  hideAsideBtn: () => {
    const e = document.documentElement.classList;
    e.contains("hide-aside")
      ? saveToLocal.set("aside-status", "show", 2)
      : saveToLocal.set("aside-status", "hide", 2),
      e.toggle("hide-aside"),
      e.contains("hide-aside")
        ? document.querySelector("#consoleHideAside").classList.add("on")
        : document.querySelector("#consoleHideAside").classList.remove("on");
  },
  initConsoleState: function () {
    document.documentElement.classList.contains("hide-aside")
      ? document.querySelector("#consoleHideAside").classList.add("on")
      : document.querySelector("#consoleHideAside").classList.remove("on");
  },
  removeBodyPaceClass: function () {
    $("body").removeClass(), $("body").addClass("pace-done");
  },
  toPage: function () {
    console.log("执行跳转");
    var e = document.querySelectorAll(".page-number"),
      t = parseInt(e[e.length - 1].innerHTML),
      o = document.getElementById("toPageText"),
      n = parseInt(o.value);
    if (!isNaN(n) && n > 0 && "0" !== ("" + n)[0] && n <= t) {
      var a,
        l = window.location.href.replace(/\/page\/\d+\/$/, "/");
      (a = 1 === n ? l : l + (l.endsWith("/") ? "" : "/") + "page/" + n + "/"),
        (document.getElementById("toPageButton").href = a);
    }
  },
  changeSayHelloText: function () {
    const e = [
        "🍰 甜食粉碎机",
        "🔍 分享与热心帮助",
        "🦁️ CV攻城狮",
        "🔨 设计开发一条龙",
        "⛰️ 爬山小能手",
        "🏃 脚踏实地行动派",
        "🦉 熬夜冠军",
        "💢 人不狠话不多",
      ],
      t = document.getElementById("author-info__sayhi");
    let o = e[Math.floor(Math.random() * e.length)];
    for (; o === lastSayHello; ) o = e[Math.floor(Math.random() * e.length)];
    (t.textContent = o), (lastSayHello = o);
  },
  scrollCategoryBarToRight: function () {
    var e,
      t = document.getElementById("category-bar-items"),
      o = document.getElementById("category-bar-next");
    var n = t.clientWidth;
    t &&
      (t.scrollLeft + t.clientWidth >= t.scrollWidth - 8
        ? t.scroll({
            left: 0,
            behavior: "smooth",
          })
        : t.scrollBy({
            left: n,
            behavior: "smooth",
          }),
      t.addEventListener("scroll", function n() {
        clearTimeout(e),
          (e = setTimeout(function () {
            (o.style.transform =
              t.scrollLeft + t.clientWidth >= t.scrollWidth - 8
                ? "rotate(180deg)"
                : ""),
              t.removeEventListener("scroll", n);
          }, 150));
      }));
  },
  addRandomCommentInfo: function () {
    const e = `${adjectives[Math.floor(Math.random() * adjectives.length)]}${
      vegetablesAndFruits[
        Math.floor(Math.random() * vegetablesAndFruits.length)
      ]
    }`;
    !(function () {
      for (
        var t = [
            "#author",
            "input[name='comname']",
            "#inpName",
            "input[name='author']",
            "#ds-dialog-name",
            "#name",
            "input[name='nick']",
            "#comment_author",
          ],
          o = [
            "#mail",
            "#email",
            "input[name='commail']",
            "#inpEmail",
            "input[name='email']",
            "#ds-dialog-email",
            "input[name='mail']",
            "#comment_email",
          ],
          n = 0;
        n < t.length;
        n++
      ) {
        var a = document.querySelector(t[n]);
        if (null != a) {
          (a.value = e),
            a.dispatchEvent(new Event("input")),
            a.dispatchEvent(new Event("change"));
          break;
        }
      }
      for (var l = 0; l < o.length; l++) {
        var i = document.querySelector(o[l]);
        if (null != i) {
          (i.value = "donotreply@zhxingzhi.com"),
            i.dispatchEvent(new Event("input")),
            i.dispatchEvent(new Event("change"));
          break;
        }
      }
    })();
    var t = document.getElementsByClassName("el-textarea__inner")[0];
    t.focus(), t.setSelectionRange(-1, -1);
  },
  addPowerLinksInPostRightSide: async function () {
    const e = document.getElementById("power-star-image"),
      t = document.getElementById("power-star"),
      o = document.getElementById("power-star-title"),
      n = document.getElementById("power-star-desc");
    if (t && e && o && n)
      try {
        const a = await fetch("/zhxingzhi/powerlink.json"),
          l = await a.json(),
          i = xingzhi.getRandomInt(0, l[0].link_list.length),
          c = l[0].link_list[i];
        (e.style.backgroundImage = `url(${c.avatar + "_240w"})`),
          (t.href = c.link),
          (o.innerText = c.name),
          (n.innerText = c.descr);
      } catch (e) {}
  },
  getRandomInt: function (e, t) {
    return Math.floor(Math.random() * (t - e)) + e;
  },
  addCommentCount: function (e) {
    var t = document.getElementsByClassName("comment-headline");
    t.length > 0 &&
      twikoo
        .getCommentsCount({
          envId: "https://twikoo.zhxingzhi.com",
          urls: [window.location.pathname],
          includeReply: !0,
        })
        .then(function (o) {
          for (var n = 0; n < t.length; n++) {
            var a = t[n],
              l = a.getElementsByTagName("span")[0];
            if (l) {
              var i = document.createElement("span");
              (i.innerText = " (" + e + ")"), a.insertBefore(i, l.nextSibling);
            }
          }
        })
        .catch(function (e) {
          console.error(e);
        });
  },
  lottieAnimation: function (e) {
    var t = document.getElementById(e);
    lottie.loadAnimation({
      container: t,
      renderer: "svg",
      loop: !0,
      autoplay: !0,
      path: "/lottie/" + e + "/data.json",
    });
  },
  renderSakuraAndParticle: () => {
    const nowMode =
      document.documentElement.getAttribute("data-theme") === "dark"
        ? "dark"
        : "light";
    if (nowMode === "light") {
      document.getElementById("sakura").classList.remove("hide");
      document.getElementById("particle_box").classList.add("hide");
    } else {
      document.getElementById("sakura").classList.add("hide");
      document.getElementById("particle_box").classList.remove("hide");
    }
  },
};
const adjectives = [
    "美丽的",
    "英俊的",
    "聪明的",
    "勇敢的",
    "可爱的",
    "慷慨的",
    "善良的",
    "可靠的",
    "开朗的",
    "成熟的",
    "稳重的",
    "真诚的",
    "幽默的",
    "豁达的",
    "有趣的",
    "活泼的",
    "优雅的",
    "敏捷的",
    "温柔的",
    "温暖的",
    "敬业的",
    "细心的",
    "耐心的",
    "深沉的",
    "朴素的",
    "含蓄的",
    "率直的",
    "开放的",
    "务实的",
    "坚强的",
    "自信的",
    "谦虚的",
    "文静的",
    "深刻的",
    "纯真的",
    "朝气蓬勃的",
    "慎重的",
    "大方的",
    "顽强的",
    "迷人的",
    "机智的",
    "善解人意的",
    "富有想象力的",
    "有魅力的",
    "独立的",
    "好奇的",
    "干净的",
    "宽容的",
    "尊重他人的",
    "体贴的",
    "守信的",
    "有耐性的",
    "有责任心的",
    "有担当的",
    "有远见的",
    "有智慧的",
    "有眼光的",
    "有冒险精神的",
    "有爱心的",
    "有同情心的",
    "喜欢思考的",
    "喜欢学习的",
    "具有批判性思维的",
    "善于表达的",
    "善于沟通的",
    "善于合作的",
    "善于领导的",
    "有激情的",
    "有幽默感的",
    "有思想的",
    "有个性的",
    "有正义感的",
    "有责任感的",
    "有创造力的",
    "有想象力的",
    "有艺术细胞的",
    "有团队精神的",
    "有协调能力的",
    "有决策能力的",
    "有组织能力的",
    "有学习能力的",
    "有执行能力的",
    "有分析能力的",
    "有逻辑思维的",
    "有创新能力的",
    "有专业素养的",
    "有商业头脑的",
  ],
  vegetablesAndFruits = [
    "萝卜",
    "白菜",
    "芹菜",
    "生菜",
    "青椒",
    "辣椒",
    "茄子",
    "豆角",
    "黄瓜",
    "西红柿",
    "洋葱",
    "大蒜",
    "土豆",
    "南瓜",
    "豆腐",
    "韭菜",
    "花菜",
    "西兰花",
    "蘑菇",
    "金针菇",
    "苹果",
    "香蕉",
    "橙子",
    "柠檬",
    "猕猴桃",
    "草莓",
    "葡萄",
    "桃子",
    "杏子",
    "李子",
    "石榴",
    "西瓜",
    "哈密瓜",
    "蜜瓜",
    "樱桃",
    "蓝莓",
    "柿子",
    "橄榄",
    "柚子",
    "火龙果",
  ];

$(document).ready(function () {
  initBlog();
}),
  document.addEventListener("pjax:complete", function () {
    // (xingzhiGPTIsRunning = !1),
    //   (xingzhi_aiPostExplanation = ""),
    //   (aiTalkMode = !1),
    //   (xingzhiGPTModel = "xingzhiGPT"),
    initBlog();
  });
//   document.addEventListener("pjax:click", function () {
//     console.log("pjax:click"),
//       xingzhiGPT_timeoutId && clearTimeout(xingzhiGPT_timeoutId),
//       xingzhiGPT_observer && xingzhiGPT_observer.disconnect();
//   });

// $(document).ready(function () {
//   initBlog();
// }),
//   document.addEventListener("pjax:complete", function () {
//     (xingzhiGPTIsRunning = !1),
//       (xingzhi_aiPostExplanation = ""),
//       (aiTalkMode = !1),
//       (xingzhiGPTModel = "xingzhiGPT"),
//       initBlog();
//   }),
//   document.addEventListener("pjax:click", function () {
//     console.log("pjax:click"),
//       xingzhiGPT_timeoutId && clearTimeout(xingzhiGPT_timeoutId),
//       xingzhiGPT_observer && xingzhiGPT_observer.disconnect();
//   });
