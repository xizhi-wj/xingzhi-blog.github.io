// 获取ip
function getIpInfo() {
  var fetchUrl = "http://api.ooomn.com/api/ip";
  fetch(fetchUrl)
    .then((res) => res.json())
    .then((json) => {
      console.log("haha");
      var country = json.country || "未能获取到信息";
      var ip = json.ip || "未能获取到信息";
      var province = json.province || "未能获取到信息";
      var city = json.city || "未能获取到信息";
      var isp = json.isp || "未能获取到信息";

      document.getElementById("userAgentIp").innerHTML = ip;
      document.getElementById("userAgentCountry").innerHTML = country;
      document.getElementById("userAgentRegion").innerHTML = province;
      document.getElementById("userAgentCity").innerHTML = city;
      document.getElementById("userAgentIsp").innerHTML = isp;

      // 使用ua-parser-js解析User-Agent
      var parser = new UAParser();
      var result = parser.getResult();
      document.getElementById("userAgentOS").innerHTML =
        result.os.name + " " + result.os.version;
      document.getElementById("userAgentBrowser").innerHTML =
        result.browser.name + " " + result.browser.version;
    });
}

getIpInfo();
