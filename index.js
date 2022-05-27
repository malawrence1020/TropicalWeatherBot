console.log('TWB')
const Discord = require('discord.js');
const dotenv = require('dotenv');
dotenv.config();

const rp = require('request-promise');
const cheerio = require('cheerio');
const fs = require('fs');

var Veront = require('./veront.js')
var List = require('./list.js')

su = 0

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const feelings1 = [
"good. I hope you are too!",
"good. I hope you are too!",
"good. I hope you are too!",
"okay. What about you?",
"okay. What about you?",
"alright. What about you?",
"alright. What about you?",
"fantastic! I hope you are too!",
"great! I hope you are too!",
"great! I hope you are too!",
"great! I hope you are too!",
"a bit under the weather :(",
"a bit under the weather :(",
"a bit under the weather :(",
"a bit under the weather :(",
"ill. I hope you are feeling better than me :(",
"like shit",
"like shit",
]


function Reply1(msg){
  var d = new Date()
  var h = d.getUTCHours()
  if(h<6)
  {z1 = ' Goodnight ', z2 = ', you should be in bed now. '}
  if(h<12 && h>=6)
  {z1 = ' Good Morning ', z2 = ', I hope you have a nice day! '}
  if(h<18 && h>=12)
  {z1 = ' Good Afternoon ', z2 = ', I hope your day is going okay. '}
  if(h>=18)
  {z1 = ' Good Evening ', z2 = ', I hope you had a nice day. '}

  var response = z1 + msg.author.username + z2 + 'I am feeling ' + feelings1[Math.floor(Math.random() * feelings1.length)]

  msg.channel.send(response)
  console.log(response)
}

function Reply5(msg){
  rp('https://nextspaceflight.com/')
    .then(function(html) {
      const $ = cheerio.load(html);
      var Type = $('.mdl-card__title-text', html).first().text().trim();
      var Sum = $('.header-style', html).first().text().trim();
      var Det = $('.mdl-card__supporting-text', html).first().text().replace(/\s+/g, ' ');
      if (Det.includes("UTC")){
        var Utc = Det.search("UTC")+3;
        var Det1 = Det.substr(0,Utc);
        var Det2 = Det.substr(Utc);
      }
      else {
        var Utc = Det.search("2022")+4;
        var Det1 = Det.substr(0,Utc);
        var Det2 = Det.substr(Utc);
      }
      
      var response = 'The next launch is the ' + Type + ' launch of ' + Sum + '. Liftoff is at' + Det1 + ' from' + Det2

    msg.channel.send(response)
    console.log(response)
  })
}

function Reply3(msg,url,Place){
rp(url)
  .then(function(html) {
    const $ = cheerio.load('.wr-day-carousel');
    var TomH = $('#daylink-1 .wr-day-temperature__high-value .wr-value--temperature--c', html).text().toLowerCase()
    var TomL = $('#daylink-1 .wr-day-temperature__low-value .wr-value--temperature--c', html).text().toLowerCase()
    var TomW = $('#daylink-1 .wr-day__details__weather-type-description', html).text().toLowerCase()
    var TodH = $('#daylink-0 .wr-day-temperature__high-value .wr-value--temperature--c', html).text().toLowerCase()
    var TodL = $('#daylink-0 .wr-day-temperature__low-value .wr-value--temperature--c', html).text().toLowerCase()
    var TodW = $('#daylink-0 .wr-day__details__weather-type-description', html).text().toLowerCase()

    var d = new Date()
    var h = d.getUTCHours()
    if(h<6) {
      w3 = '! Tonight in ' + Place + ' there will be ' + TodW + ' with a low of ' + TodL + '. Today will bring ' + TomW + ' with a high of ' + TomH + ' and a low of ' + TomL + '.';
      z3 = 'Goodnight ';
      }
    if(h<12 && h>=6){
      w3 = '! Today in ' + Place + ' there will be ' + TodW + ' with a high of ' + TodH + ' and a low of ' + TodL + '.';
      z3 = 'Good Morning '
      }
    if(h<17 && h>=12){
      w3 = '! Today in ' + Place + ' there will be ' + TodW + ' with a high of ' + TodH + ' and a low of ' + TodL + '.';
      z3 = 'Good Afternoon ';
      }
    if(h>=17){
      w3 = '! Tonight in ' + Place + ' there will be ' + TodW + ' with a low of ' + TodL + '. Tomorrow will bring ' + TomW + ' with a high of ' + TomH + ' and a low of ' + TomL + '.';
      z3 = 'Good Evening ';
      }

    var response = z3 + msg.author.username + w3
    //var response = "No"

    msg.channel.send(response)
    console.log(response)
 })
}

function Reply30(msg,url,Place){
rp(url)
  .then(function(html) {
    const $ = cheerio.load('.wr-time-slot-container');
    var NowT = $('.wr-time-slot-primary__title', html).eq(0).text()
    var NowTH = $('.wr-time-slot-primary__weather-curve-item .wr-value--temperature--c', html).eq(0).text()
    var NowW = $('.wr-time-slot-primary__weather-curve-item .wr-weather-type__text', html).eq(0).text()
    var NowR = $('.wr-time-slot-primary__precipitation .wr-u-font-weight-500', html).eq(0).text().replace('%', '% ')
    var NowWS = $('.wr-time-slot-primary__wind-speed .wr-value--windspeed--mph', html).eq(1).text()
    var NowWD = $('.wr-time-slot-primary__wind-speed .wr-hide-visually', html).eq(3).text()
    var NowSR = $('.wr-c-astro-data__sunrise .wr-c-astro-data__time', html).eq(0).text()
    var NowSS = $('.wr-c-astro-data__sunset .wr-c-astro-data__time', html).eq(0).text()

    var d = new Date()
    var h = d.getUTCHours()
    if(h<6) {
      w30 = '';
      z30 = 'Goodnight';
      t30 = 'Tonight';
      }
    if(h<12 && h>=6){
      w30 = `Sunrise is at ${NowSR}.`;
      z30 = 'Good Morning';
      t30 = 'Today';
      }
    if(h<19 && h>=12){
      w30 = `Sunset is at ${NowSS}.`;
      z30 = 'Good Afternoon';
      t30 = 'Today';
      }
    if(h>=19){
      w30 = '';
      z30 = 'Good Evening';
      t30 = 'Tonight';
      }

    if ((msg.author == process.env.J) && (Number(NowWS.slice(0,NowWS.indexOf(" "))) > 40)) {
      msg.channel.send({
        files: ['./Images/Wimdy.gif'],
      });
    }

    else {
      var response = `${z30} ${msg.author.username}! ${t30} in ${Place} at ${NowT} the temperature will be ${NowTH} and there will be ${NowW}. There will be a ${NowR} and a ${NowWS} ${NowWD}. ${w30}`

      msg.channel.send(response)
      console.log(response)
    }
 })
}

function Timer(type, msg){
  msg2 = msg.content
  if ((type == 't') || (type == 'x') || (type == 'm') || (type == 'f') || (type == 'j') || (type == 'v')){
    reply = msg2.slice(msg2.indexOf(' '),)
  }
  if (type == 'w'){
    num = Math.random()
    if (num < 0.6) {reply = ` Time's Up! You can have a break now! 🥰`}
    else {reply = ` That was a great work session! It is time for a break! 🥰🥰`};
  }
  if (type == 'b'){
    num = Math.random()
    if (num < 0.6) {reply = ` Time's Up! Back to work! 😀`}
    else {reply = ` I hope you enjoyed your break! It is time for another work period! 😁`}
  }
  if ((type == 't') || (type == 'w') || (type == 'b')){
    author = msg.author.toString()
  }
  if (type == 'x'){
    author = `<@${process.env.X}>`
  }
  if (type == 'm'){
    author = `<@${process.env.M}>`
  }
  if (type == 'f'){
    author = `<@${process.env.F}>`
  }
  if (type == 'j'){
    author = `<@${process.env.J}>`
  }
  if (type == 'v'){
    author = `<@${process.env.V}>`
  }
  if (type == 's'){
    author = `-s`
    reply = msg2.slice(msg2.indexOf(' '), msg2.indexOf('/')) + ` ` + msg2.slice(msg2.indexOf('/')+1,)
  }
  var response = author + reply

  msg.channel.send(response)
  console.log(response)
}



function cheerioAP(channel, colour, basin, abb, abb2){
  url = `https://www.nhc.noaa.gov/archive/xgtwo/` + abb + `/latest/two_` + abb2 + `_txt.html`
  rp(url)
  .then(function(html) {
    const $ = cheerio.load(html);
    var U0 = $('pre', html).text();
    var U1 = U0.slice(U0.indexOf("For the"), U0.indexOf("Forecaster")).replace(/\n\n/g, "\n");
    var U2 = U0.slice(U0.indexOf("Tropical Weather Outlook"), U0.indexOf("For the")).replace(/\n\n/g, "\n");
    const BasinEmbed = new Discord.MessageEmbed()
    .setColor(colour)
    .setTitle(U2)
    .setURL(`https://www.nhc.noaa.gov/cyclones/?` + abb)
    .setAuthor(`Tropical Weather Bot: ` + basin + ` Update`, 'https://floridadep.gov/sites/default/files/styles/general_page_images__scaled_to_900_pixels_/public/media-folders/media-root/NOAA-color-logo-print.png')
    .setDescription(U1)
    .attachFiles([`https://www.nhc.noaa.gov/archive/xgtwo/` + abb + `/latest/two_` + abb2 + `_5d0.png`])
    .setImage(`attachment://two_` + abb2 + `_5d0.png`)
    .setTimestamp()
    .setFooter(`Tropical Weather Bot: ` + basin + ` Update`, 'https://floridadep.gov/sites/default/files/styles/general_page_images__scaled_to_900_pixels_/public/media-folders/media-root/NOAA-color-logo-print.png');
  
  channel.send(BasinEmbed);
      console.log(basin + ` Update`)
  });
}

function cheerioBCD(url1, channel, name, colour, code1, code2, code3){
  url = `https://www.nhc.noaa.gov/text/` + url1 + `.shtml`
  rp(url)
    .then(function(html) {
      const $ = cheerio.load(html);
      var TS0 = $('pre', html).text();
      var TS1 = TS0.slice(TS0.indexOf("BULLETIN") + 9, TS0.indexOf("...")).replace(/\n\n/g, "\n");
      var TS2 = TS0.slice(TS0.indexOf("WATCHES AND WARNINGS\n----") + 42, TS0.indexOf("For storm information specific to your area") + 6);
      var TS3 = TS2.slice(0, TS2.indexOf("A Tropical Storm Watch means that"));
      var TS4 = TS3.slice(0, TS3.indexOf("A Storm Surge Watch means there"));
      var TS5 = TS4.slice(0, TS4.indexOf("A Tropical Storm Warning means that"));
      var TS6 = TS5.slice(0, TS5.indexOf("A Hurricane Watch means that"));
      var TS7 = TS6.slice(0, TS6.indexOf("A Storm Surge Warning means there"));
      var TS8 = TS7.slice(0, TS7.indexOf("A Hurricane Warning means that"));
      var TS9 = TS0.slice(TS0.indexOf("DISCUSSION AND OUTLOOK") + 46, TS0.indexOf("inches)") + 8).replace(/\n/g, " ");
      const StormEmbed = new Discord.MessageEmbed()
      .setColor(colour)
      .setTitle(TS1)
      .setURL(`https://www.nhc.noaa.gov/graphics_` + code1 + `.shtml`)
      .setAuthor(`Tropical Weather Bot: ` + name + ` Update`, 'https://floridadep.gov/sites/default/files/styles/general_page_images__scaled_to_900_pixels_/public/media-folders/media-root/NOAA-color-logo-print.png')
      .setDescription(TS9 + "\n\n" + TS8)
      .attachFiles([`https://www.nhc.noaa.gov/storm_graphics/` + code2 + code3 + `_5day_cone_no_line_and_wind.png`])
      .setImage(`attachment://` + code3 + `_5day_cone_no_line_and_wind.png`)
      .setTimestamp()
      .setFooter(`Tropical Weather Bot: ` + name + ` Update`, 'https://floridadep.gov/sites/default/files/styles/general_page_images__scaled_to_900_pixels_/public/media-folders/media-root/NOAA-color-logo-print.png');
    
    channel.send(StormEmbed);
        console.log(name + ` Update`)
    });      
}

function cheerioW(channel) {
  const Weather1Embed = new Discord.MessageEmbed()
  .setColor('#ff00ff')
  .setTitle("Precipitation Type and Surface Pressure")
  .setURL('https://www.theweatheroutlook.com')
  .setAuthor('Tropical Weather Bot: Daily Update', 'https://thesalesmindsetcoach.com/wp-content/uploads/2019/08/forecasting.jpg')
  .attachFiles(['https://www.theweatheroutlook.com/charts/gfs/00_9_naptypemslp.png'])
  .setImage('attachment://00_9_naptypemslp.png')
  .setTimestamp()
  .setFooter('Tropical Weather Bot: Daily Update', 'https://thesalesmindsetcoach.com/wp-content/uploads/2019/08/forecasting.jpg');

  const Weather2Embed = new Discord.MessageEmbed()
  .setColor('#0099ff')
  .setTitle("Precipitation Type")
  .setURL('https://www.theweatheroutlook.com')
  .setAuthor('Tropical Weather Bot: Daily Update', 'https://thesalesmindsetcoach.com/wp-content/uploads/2019/08/forecasting.jpg')
  .attachFiles(['https://www.theweatheroutlook.com/charts/gfs/00_12_preciptype.png'])
  .setImage('attachment://00_12_preciptype.png')
  .setTimestamp()
  .setFooter('Tropical Weather Bot: Daily Update', 'https://thesalesmindsetcoach.com/wp-content/uploads/2019/08/forecasting.jpg');

  const Weather3Embed = new Discord.MessageEmbed()
  .setColor('#5cd65c')
  .setTitle("2m Min Temperature")
  .setURL('https://www.theweatheroutlook.com')
  .setAuthor('Tropical Weather Bot: Daily Update', 'https://thesalesmindsetcoach.com/wp-content/uploads/2019/08/forecasting.jpg')
  .attachFiles(['https://www.theweatheroutlook.com/charts/gfs/00_15_uk2mtmpmin.png'])
  .setImage('attachment://00_15_uk2mtmpmin.png')
  .setTimestamp()
  .setFooter('Tropical Weather Bot: Daily Update', 'https://thesalesmindsetcoach.com/wp-content/uploads/2019/08/forecasting.jpg');

  const Weather4Embed = new Discord.MessageEmbed()
  .setColor('#ff2a00')
  .setTitle("384 Hour Outlook")
  .setURL('https://www.theweatheroutlook.com')
  .setAuthor('Tropical Weather Bot: Daily Update', 'https://thesalesmindsetcoach.com/wp-content/uploads/2019/08/forecasting.jpg')
  .attachFiles(['https://www.theweatheroutlook.com/charts/gefs/gefsens850cardiff0.png'])
  .setImage('attachment://gefsens850cardiff0.png')
  .setTimestamp()
  .setFooter('Tropical Weather Bot: Daily Update', 'https://thesalesmindsetcoach.com/wp-content/uploads/2019/08/forecasting.jpg');

  channel.send(Weather1Embed);
  channel.send(Weather2Embed);
  channel.send(Weather3Embed);
  channel.send(Weather4Embed);
  console.log('Weather 1 Update')
  console.log('Weather 2 Update')
  console.log('Weather 3 Update')
  console.log('Weather 4 Update')
}

function cheerioM(channel,tim) {
  var thours = new Date().getHours();
  if (thours < 6) {title = "Good Night Mercusa"; show = "Nightly Weather"; tnow = "tonight"; clr = `#1700ff`; icon = "https://cdn4.iconfinder.com/data/icons/weather-102/512/Weather_6-512.png"}
  else if (thours < 12) {title = "Good Morning Mercusa"; show = "Breakfast Show: Morning Weather"; tnow = "this morning"; clr = `#ff5000`; icon = "https://cdn4.iconfinder.com/data/icons/weather-flat-10/58/014_-_Sun-512.png"}
  else if (thours < 18) {title = "Good Afternoon Mercusa"; show = "Daily Weather Forecast"; tnow = "this afternoon"; clr = `#faff00`; icon = "https://cdn4.iconfinder.com/data/icons/weather-flat-10/58/014_-_Sun-512.png"}
  else {title = "Good Evening Mercusa"; show = `News at ${thours - 12}: Weather Tonight`; tnow = "this evening"; clr = `#ff005e`; icon = "https://cdn4.iconfinder.com/data/icons/weather-102/512/Weather_6-512.png"}
  const WeatherMEmbed = new Discord.MessageEmbed()
  .setColor(clr)
  .setTitle(`${title}!`)
  .setURL('https://www.theweatheroutlook.com')
  .setAuthor(`RTM ${show}`, icon)
  .setDescription(`${title}, let's have a look at ${tnow}'s weather: \n\n` + Veront.Veather("anlight",tim).toString() + "\n\n" + Veront.Veather("deliac",tim).toString() + "\n\n" + Veront.Veather("larion",tim).toString() + "\n\n" + Veront.Veather("torvalain",tim).toString() + "\n\n" + Veront.Veather("veront",tim).toString() + "\n\n And that's your weather - go out and have a great day, Mercusa!")
	.setThumbnail(icon)
  .setTimestamp()
  .setFooter(`RTM ${show}`, icon);

  channel.send(WeatherMEmbed);
  console.log('Weather M Update')
}

function cheerioZ(channel) {
  rp('https://coronavirus.data.gov.uk/')
  .then(function(html) {
    const $ = cheerio.load(html);
    //var data0 = $('.number-link', html).eq(0).text().replace(/\n/g, " ").replace(/\s\s+/g, " ");
    var data0 = $('.number-link', html).eq(0).text();
    var data1 = $('.number-link', html).eq(1).text();
    var data2 = $('.number-link', html).eq(2).text();
    var data3 = $('.number-link', html).eq(3).text();
    var data4 = $('.number-link', html).eq(4).text();
    var data5 = $('.number-link', html).eq(5).text();
    var data6 = $('.number-link', html).eq(6).text();
    var data7 = $('.number-link', html).eq(7).text();
    var data8 = $('.number-link', html).eq(8).text();
    var data9 = $('.number-link', html).eq(9).text();
    var data10 = $('.number-link', html).eq(10).text();
    var data11 = $('.number-link', html).eq(11).text();
    var data0a = data0.slice(0,data0.indexOf("N"));
    var data1a = data1.slice(0,data1.indexOf("T"));
    var data2a = data2.slice(0,data2.indexOf("N"));
    var data3a = data3.slice(0,data3.indexOf("T"));
    var data4a = data4.slice(0,data4.indexOf("N"));
    var data5a = data5.slice(0,data5.indexOf("T"));
    var data6a = data6.slice(0,data6.indexOf("P"));
    var data7a = data7.slice(0,data7.indexOf("P"));
    var data8a = data8.slice(0,data8.indexOf("P"));
    var text0 = $('.tooltiptext', html).eq(0).text();
    var text1 = $('.tooltiptext', html).eq(1).text();
    var text2 = $('.tooltiptext', html).eq(2).text();
    var text3 = $('.tooltiptext', html).eq(3).text();
    var text4 = $('.tooltiptext', html).eq(4).text();
    var text5 = $('.tooltiptext', html).eq(5).text();
    var text7 = $('.tooltiptext', html).eq(7).text();
    var text9 = $('.tooltiptext', html).eq(9).text();
    var text11 = $('.tooltiptext', html).eq(11).text();
    var text12 = $('.tooltiptext', html).eq(12).text();
    var text14 = $('.tooltiptext', html).eq(14).text();
    var text16 = $('.tooltiptext', html).eq(16).text();
    var text0a = "Number of 1st doses ";
    var text1a = "Total number of 1st doses ";
    var text2a = "Number of 2nd doses ";
    var text3a = "Total number of 2nd doses ";
    var text4a = "Number of 3rd doses ";
    var text5a = "Total number of 3rd doses ";
    var text7a = "Percentage of 1st doses (12+) ";
    var text9a = "Percentage of 2nd doses (12+) ";
    var text11a = "Percentage of 3rd doses (12+) ";
    var text12a = "Cases ";
    var text14a = "Deaths ";
    var text16a = "Hospital admissions ";
    var text0b = text0.slice(text0.indexOf("reported"),);
    var text1b = text1.slice(text1.indexOf("reported"),);
    var text2b = text2.slice(text2.indexOf("reported"),);
    var text3b = text3.slice(text3.indexOf("reported"),);
    var text4b = text4.slice(text4.indexOf("reported"),);
    var text5b = text5.slice(text5.indexOf("reported"),);
    var text7b = text7.slice(text7.indexOf("reported"),);
    var text9b = text9.slice(text9.indexOf("reported"),);
    var text11b = text11.slice(text11.indexOf("reported"),);
    var text12b = text12.slice(text12.indexOf("reported"),);
    var text14b = text14.slice(text14.indexOf("reported"),);
    var text16b = text16.slice(text16.indexOf("reported"),);
    const CovidEmbed = new Discord.MessageEmbed()
    .setColor('#9933ff')
    .setTitle('Daily Covid Update')
    .setURL('https://coronavirus.data.gov.uk/')
    .setAuthor('Tropical Weather Bot: Covid Update', 'https://skepticalinquirer.org/wp-content/uploads/sites/29/2020/04/1020px-SARS-CoV-2_without_background.png')
    .setDescription(data0a + " " + text0a + " " + text0b + "\n" + data1a + " " + text1a + " " + text1b + "\n\n" + data2a + " " + text2a + " " + text2b + "\n" + data3a + " " + text3a + " " + text3b + "\n\n" + data4a + " " + text4a + " " + text4b + "\n" + data5a + " " + text5a + " " + text5b + "\n\n" + data6a + " " + text7a + " " + text7b + "\n" + data7a + " " + text9a + " " + text9b + "\n" + data8a + " " + text11a + " " + text11b + "\n\n" + data9 + " " + text12a + " " + text12b + "\n\n" + data10 + " " + text14a + " " + text14b + "\n\n" + data11 + " " + text16a + " " + text16b)
    .attachFiles(['https://coronavirus.data.gov.uk/public/assets/frontpage/images/map.png'])
    .setImage('attachment://map.png')
    .setTimestamp()
    .setFooter('Tropical Weather Bot: Covid Update', 'https://skepticalinquirer.org/wp-content/uploads/sites/29/2020/04/1020px-SARS-CoV-2_without_background.png');

    channel.send(CovidEmbed);
    console.log('Covid Update')
  });
}

function cheerio19(channel) {
  rp('https://coronavirus.data.gov.uk/')
  .then(function(html) {
    const $ = cheerio.load(html);
    //var data0 = $('.number-link', html).eq(0).text().replace(/\n/g, " ").replace(/\s\s+/g, " ");
    var data6 = $('.number-link', html).eq(6).text();
    var data7 = $('.number-link', html).eq(7).text();
    var data8 = $('.number-link', html).eq(8).text();
    var data9 = $('.number-link', html).eq(9).text();
    var data10 = $('.number-link', html).eq(10).text();
    var data6a = data6.slice(0,data6.indexOf("P"));
    var data7a = data7.slice(0,data7.indexOf("P"));
    var data8a = data8.slice(0,data8.indexOf("P"));
    var text11 = $('.tooltiptext', html).eq(11).text();
    var text12 = $('.tooltiptext', html).eq(12).text();
    var text14 = $('.tooltiptext', html).eq(14).text();
    var text12a = "cases ";
    var text14a = "deaths ";
    var text11b = text11.slice(text11.indexOf("reported"),);
    var text12b = text12.slice(text12.indexOf("reported"),);
    var text14b = text14.slice(text14.indexOf("reported"),);
    const ChockEmbed = new Discord.MessageEmbed()
    .setColor('#9933ff')
    .setTitle("How chocked is the UK today?")
    .setURL('https://coronavirus.data.gov.uk/')
    .setAuthor('Tropical Weather Bot: Chock Update', 'https://skepticalinquirer.org/wp-content/uploads/sites/29/2020/04/1020px-SARS-CoV-2_without_background.png')
    .setDescription("How chocked is the UK today?\n\n" + data9 + " " + text12a + " " + text12b + "\n\n" + data10 + " " + text14a + " " + text14b + "\n\n(" + data6a + "," + data7a + "," + data8a + ") - Percentages of vaccines " + text11b)
    .attachFiles(['https://coronavirus.data.gov.uk/public/assets/frontpage/images/map.png'])
    .setImage('attachment://map.png')
    .setTimestamp()
    .setFooter('Tropical Weather Bot: Chock Update', 'https://skepticalinquirer.org/wp-content/uploads/sites/29/2020/04/1020px-SARS-CoV-2_without_background.png');
  
    channel.send(ChockEmbed);
    console.log('Chock Update');
  });
}

function cheerioC(channel, pc) {
  rp('https://coronavirus.data.gov.uk/search?postcode=' + pc)
  .then(function(html) {
    const $ = cheerio.load(html);
    var data0 = $('.postcode-lead-data li h3', html).eq(0).text();
    var data1 = $('.postcode-lead-data li .numbers-container .content-size', html).eq(0).text();
    var data2 = $('.postcode-lead-data li .numbers-container .change-box strong', html).eq(0).text();
    var data3 = $('.postcode-lead-data li .numbers-container .change-box', html).eq(0).text();
    var data4 = $('.postcode-lead-data li .numbers-container li', html).eq(2).text();
    var data0b = data0.slice(0,data0.indexOf("Available"));
    var data1b = data1.slice(0,data1.indexOf("Total")).replace("days", "days: ");
    var data3b = data3.slice(data3.indexOf("("),data3.indexOf(")")+1);
    var data4b = data4.slice(0,data4.indexOf("Rate")).replace("people", "people: ");
    reply0 = "**" + data0b + "**\n" + data1b + " (" + data2 + ") " + data3b + "\n" + data4b
    channel.send(reply0);
    if($('.postcode-lead-data li .numbers-container', html).eq(1).text() !== "") {
      var vacc0 = $('.postcode-lead-data li h3', html).eq(1).text();
      var vacc1 = $('.postcode-lead-data li .numbers-container li', html).eq(3).text();
      var vacc2 = $('.postcode-lead-data li .numbers-container li', html).eq(4).text();
      var vacc3 = $('.postcode-lead-data li .numbers-container li', html).eq(5).text();
      var vacc0b = vacc0.slice(0,vacc0.indexOf("Available"));
      var vacc1b = vacc1.slice(0,vacc1.indexOf("Percentage")).replace("dose", "doses: ");
      var vacc2b = vacc2.slice(0,vacc2.indexOf("Percentage")).replace("dose", "doses: ");
      var vacc3b = vacc3.slice(0,vacc3.indexOf("Percentage")).replace("boosters", "boosters: ");
      reply1 = "**" + vacc0b + "**\n" + vacc1b + "\n" + vacc2b + "\n" + vacc3b
      channel.send(reply1);
    }
    else {
    }
    console.log(pc);
  });
}

function FileSort(dir, message){
  
  files = fs.readdirSync(dir);
  fl = files.length;
  rfl = Math.floor(Math.random()*fl);
  if (files[rfl].split(".")[1] == "mp3"){
    track = files[rfl].split(".")[0];
    Music(dir, track, message, 1);
    message.channel.send(`${track} is now playing`);
  }
  else {FileSort(dir, message);}
}

async function Music(dir, file, message, z){
  if (message.member.voice.channel) {
    const connection = await message.member.voice.channel.join();
    // Create a dispatcher
    const dispatcher = connection.play(dir + file + '.mp3');

    dispatcher.on('start', () => {
      console.log(file + ' is now playing!');
      client.user.setPresence({ activity: { name: file, type: 'PLAYING' }, status: 'online' });
    });

    dispatcher.on('finish', () => {
      console.log(file + ' has finished playing!');
      if (z == 1){FileSort(dir, message)}
      else{client.user.setPresence({ activity: { name: 'The Weather', type: 'WATCHING' }, status: 'idle' });}
    });

    // Always remember to handle errors appropriately!
    dispatcher.on('error', console.error);
  }
}


const client = new Discord.Client();
client.once('ready', () => {
  client.user.setPresence({ activity: { name: 'The Weather', type: 'WATCHING' }, status: 'idle' });
	console.log('Ready!');
  //const channel5 = client.channels.cache.get(process.env.CH5);
  //channel5.send(`⭐⭐⭐`);
});

client.on('message', msg => {
  msg2 = msg.content.toLowerCase()
  if (msg2.includes('ping')) {
    msg.channel.send('Pong!');
  }
  if (msg2.includes('beep')) {
    msg.channel.send('Boop');
  }
  if (msg2.includes('cowboy')) {
    msg.channel.send('Bebop');
  }
  if (msg2.includes('server')) {
    msg.channel.send(`This is ${msg.guild.name}\nIt has ${msg.guild.memberCount} members`);
  }
  if (msg2.includes('who am i?')) {
    msg.channel.send(`I know who you are, ${msg.author.username}`);
  }
  if (msg2.includes('good bot') || msg2.includes('good boy')) {
    msg.react(`🥰`);
  }
  if (msg2.includes('spam')) {
    msg.channel.send({
      files: ['./Images/Spam.jpg'],
    });
  }
  if (msg2.includes('bolton') && !msg.author.bot) {
      msg.channel.send('Bolton ruins everything');
  }
  if (msg2.includes('blackburn') && !msg.author.bot) {
      msg.channel.send('I hate Blackburn');
      msg.react(`😡`);
  }
  if (msg2.includes('npt') && !msg.author.bot) {
      msg.channel.send('Wow, what a shithole');
      msg.react(`🤬`);
  }
  if (msg2.includes('go away') && !msg.author.bot) {
      msg.channel.send('You go away');
  }
  if (msg2.includes('humans') && !msg.author.bot) {
      msg.channel.send('Kill All Humans! (except Fry)');
  }
  if (msg2.includes('carrot') && !msg.author.bot) {
    msg.channel.send('I showed you my carrot please respond', {files: ['./Images/Ripley.jpg']});
    msg.react(`🥕`);
  }
  if ((msg2.includes('round') || msg2.includes('spherical')) && (msg.author == process.env.F || msg.author == process.env.E)) {
    msg.channel.send({files: ['./Images/Round.jpg']});
  }
  if ((msg2.includes("here's johnny") || msg2.includes('jailbreak')) && (msg.author == process.env.F || msg.author == process.env.E)) {
    msg.channel.send({files: ['./Images/Jailbreak.jpg']});
  }
  if (msg2.includes('material girl') && (msg.author == process.env.F || msg.author == process.env.E)) {
    msg.channel.send({files: ['./Images/Material Girl.jpg']});
  }
  //if (msg2.includes('happy birthday') && (msg.author == process.env.F || msg.author == process.env.E)) {
  //  msg.channel.send({files: ['./Images/Happy Birthday.jpg']});
  //}
  if (msg2.includes('tits') && (msg.author == process.env.F || msg.author == process.env.E)) {
    msg.channel.send({files: ['./Images/Rolo.jpg']});
  }
  if (msg2.includes('cleaning') && (msg.author == process.env.F || msg.author == process.env.E)) {
    msg.channel.send({files: ['./Images/Cleaning.jpg']});
  }
  if (msg2.includes('shut up') && msg.author == process.env.X){
    console.log('Shutting Up');
    msg.channel.send({files: ['./Images/Pikachu.png']});
    su = 1;
    setTimeout(function(){su = 0}, 3600000)
  }
  if (msg2.includes('no') && msg.author == process.env.X && su == 0) {
    if (Math.random() > 0.8) {
    msg.channel.send("Yes");
    }
  }
  if ((msg2.includes('sin x') || msg2.includes('sin(x)')) && su == 0) {
    msg.channel.send({files: ['./Images/latex.png']});
  }
  if (msg2.includes('mercusa') && !msg.author.bot) {
    if (msg2.includes('motorway')) {
      msg.channel.send({files: ['./Docs/Mercusan_Motorway_Network.docx']});
    }
    if (msg2.includes('pm')) {
      msg.channel.send({files: ['./Docs/Mercusan_Prime_Ministers.docx']});
    }
  }
  if (msg2.includes('aeran map')) {
    msg.channel.send({files: ['./Images/Aeran Map.jpg']});
  }
  if (msg2.includes('!wave') && !msg.author.bot) {
      msg.channel.send('https://www.reddit.com/r/vexillologycirclejerk/comments/sg0pz6/flag_of_how_is_this_not_a_parody/');
  }
  if (msg2.includes(':its-cheap:') && !msg.author.bot) {
    msg.channel.send({files: ["./Images/It's cheap.mp4"]});
  }
  if (msg2.includes('i love you') && !msg.author.bot) {
      msg.channel.send(`I love you too ${msg.author.username} ❤️`);
  }
  if (msg2.includes('turing test') && !msg.author.bot) {
      msg.channel.send(`Did someone say my name?`);
  }
  if (msg2.includes(`how are you feeling out of 10`)) {
      msg.channel.send(Math.random()*10)
  }
  else if ((msg2.includes("how are you") || msg2.includes("are you okay") || msg2.includes("are you good") || msg2.includes("are you well") || msg2.includes("are you alright") || msg2.includes("are you doing") || msg2.includes("are you feeling") || msg2.includes("are you coping")) && !msg.author.bot) {
      Reply1(msg);
  }
  if ((msg2.includes("space") || msg2.includes("launch") || msg2.includes("rocket")) && !msg.author.bot) {
      Reply5(msg);
  }
  if (msg2.includes('!thank you') && !msg.author.bot) {
    num1 = Math.random();
    num2 = Math.random();
    num3 = Math.random();
    if (msg.author == process.env.X && num3 > 0.8) {
      if (num2 < 0.1) {msg.channel.send(`That's damn right`);}
      else if (num2 < 0.3) {msg.channel.send(`Where would you be without me?`);}
      else if (num2 < 0.6) {msg.channel.send(`It's about time 🙄`);}
      else {msg.channel.send(`👍`);}
    }
    else {
      if (num1 < 0.1) {emote = `❤️`}
      else if (num1 < 0.4) {emote = `🥰`}
      else if (num1 < 0.7) {emote = `😊`}
      else if (num1 < 0.9) {emote = `😇`}
      else {emote = `😝`};
      if ((num2 > 0.2) && (num2 < 0.9)) {msg.react(emote);}
      if (num2 > 0.8) {msg.channel.send(`Thank you ${msg.author.username} ${emote}`);}
      else if (num2 < 0.5) {msg.channel.send(`You're welcome! ${emote}`);}
    }
  }

  if (msg2.includes('~weather') && !msg.author.bot) {
    postcode = msg2.slice(msg2.indexOf('~weather')+9,);
    if (postcode)
      {Url = 'https://www.bbc.co.uk/weather/' + postcode, Reply3(msg,Url,postcode)}
    else if((msg.author == process.env.X) || (msg.author == process.env.F))
        {Place = 'Kensal Green', Url = 'https://www.bbc.co.uk/weather/6941039', Reply3(msg,Url,Place)}
    else if(msg.author == process.env.J)
        {Place = 'Camborne', Url = 'https://www.bbc.co.uk/weather/2653945', Reply3(msg,Url,Place)}
    else if(msg.author == process.env.V)
        {Place = 'Ilford', Url = 'https://www.bbc.co.uk/weather/2646277', Reply3(msg,Url,Place)}
    else {Place = 'Swansea', Url = 'https://www.bbc.co.uk/weather/2636432', Reply3(msg,Url,Place)}
  }

  if (msg2.includes('~forecast') && !msg.author.bot) {
    postcode = msg2.slice(msg2.indexOf('~forecast')+10,);
    if (postcode)
      {Url = 'https://www.bbc.co.uk/weather/' + postcode, Reply30(msg,Url,postcode)}
    else if((msg.author == process.env.X) || (msg.author == process.env.F))
        {Place = 'Kensal Green', Url = 'https://www.bbc.co.uk/weather/6941039', Reply30(msg,Url,Place)}
    else if(msg.author == process.env.J)
        {Place = 'Camborne', Url = 'https://www.bbc.co.uk/weather/2653945', Reply30(msg,Url,Place)}
    else if(msg.author == process.env.V)
        {Place = 'Ilford', Url = 'https://www.bbc.co.uk/weather/2646277', Reply30(msg,Url,Place)}
    else {Place = 'Swansea', Url = 'https://www.bbc.co.uk/weather/2636432', Reply30(msg,Url,Place)}
  }

  if(msg2.includes("london") && msg.author == process.env.J) {
      msg.channel.send("Today, the weather in London will be _smog_ with _high air pollution_ and _death_ :)");
      }

  if (msg2.includes('~nowcast')) {
    nd = new Date().getUTCHours()
    if (nd == 0){pic = 'https://www.theweatheroutlook.com/charts/gfs/18_6_preciptype.png'}
    else if (nd < 4){pic = 'https://www.theweatheroutlook.com/charts/gfs/18_9_preciptype.png'}
    else if (nd < 6){pic = 'https://www.theweatheroutlook.com/charts/gfs/18_12_preciptype.png'}
    else if (nd == 6){pic = 'https://www.theweatheroutlook.com/charts/gfs/00_6_preciptype.png'}
    else if (nd < 10){pic = 'https://www.theweatheroutlook.com/charts/gfs/00_9_preciptype.png'}
    else if (nd < 12){pic = 'https://www.theweatheroutlook.com/charts/gfs/00_12_preciptype.png'}
    else if (nd == 12){pic = 'https://www.theweatheroutlook.com/charts/gfs/06_6_preciptype.png'}
    else if (nd < 16){pic = 'https://www.theweatheroutlook.com/charts/gfs/06_9_preciptype.png'}
    else if (nd < 18){pic = 'https://www.theweatheroutlook.com/charts/gfs/06_12_preciptype.png'}
    else if (nd == 18){pic = 'https://www.theweatheroutlook.com/charts/gfs/12_6_preciptype.png'}
    else if (nd < 22){pic = 'https://www.theweatheroutlook.com/charts/gfs/12_9_preciptype.png'}
    else if (nd < 24){pic = 'https://www.theweatheroutlook.com/charts/gfs/12_12_preciptype.png'}
    msg.channel.send({
      files: [pic],
    });
  }

  if (msg2.includes('t+') && !msg.author.bot){
    console.log('Timer starting');
    t1 = msg2.slice(msg2.indexOf('t+')+2, msg2.indexOf(' '))
    var t2 = Number(t1)*60000
    console.log(t2)
    msg.channel.send('Reminder set for ' + t1 + ' minutes')
    setTimeout(Timer, t2, 't', msg)
  }
  if (msg2.includes('w+') && !msg.author.bot){
    console.log('Work starting');
    w1 = msg2.slice(msg2.indexOf('w+')+2,)
    var w2 = Number(w1)*60000
    console.log(w2)
    msg.channel.send('Work period set for ' + w1 + ' minutes')
    setTimeout(Timer, w2, 'w', msg)
  }
  if (msg2.includes('b+') && !msg.author.bot){
    console.log('Break starting');
    b1 = msg2.slice(msg2.indexOf('b+')+2,)
    var b2 = Number(b1)*60000
    console.log(b2)
    msg.channel.send('Break period set for ' + b1 + ' minutes')
    setTimeout(Timer, b2, 'b', msg)
  }
  if (msg2.includes('x+') && !msg.author.bot){
    console.log('Matthew timer starting');
    x1 = msg2.slice(msg2.indexOf('x+')+2, msg2.indexOf(' '))
    var x2 = Number(x1)*60000
    console.log(x2)
    setTimeout(Timer, x2, 'x', msg)
  }
  if (msg2.includes('m+') && !msg.author.bot){
    console.log('Matthew timer starting');
    m1 = msg2.slice(msg2.indexOf('m+')+2, msg2.indexOf(' '))
    var m2 = Number(m1)*60000
    console.log(m2)
    setTimeout(Timer, m2, 'm', msg)
  }
  if (msg2.includes('f+') && !msg.author.bot){
    console.log('Freya timer starting');
    f1 = msg2.slice(msg2.indexOf('f+')+2, msg2.indexOf(' '))
    var f2 = Number(f1)*60000
    console.log(f2)
    setTimeout(Timer, f2, 'f', msg)
  }
  if (msg2.includes('j+') && !msg.author.bot){
    console.log('James timer starting');
    j1 = msg2.slice(msg2.indexOf('j+')+2, msg2.indexOf(' '))
    var j2 = Number(j1)*60000
    console.log(j2)
    setTimeout(Timer, j2, 'j', msg)
  }
  if (msg2.includes('v+') && !msg.author.bot){
    console.log('Vanessa timer starting');
    v1 = msg2.slice(msg2.indexOf('v+')+2, msg2.indexOf(' '))
    var v2 = Number(v1)*60000
    console.log(v2)
    setTimeout(Timer, v2, 'v', msg)
  }
  if (msg2.includes('s+') && !msg.author.bot){
    console.log('Station timer starting');
    s1 = msg2.slice(msg2.indexOf('s+')+2, msg2.indexOf(' '))
    var s2 = Number(s1)*60000
    console.log(s2)
    setTimeout(Timer, s2, 's', msg)
  }

  if (msg2.includes('todo list') || msg2.includes("l-") || msg2.includes("l+")) {
    if (msg.author == process.env.X)
        {file = './xlist.txt', colour = '#00ccff', nom = "Matthew's"}
    if (msg.author == process.env.M)
        {file = './mlist.txt', colour = '#ff6600', nom = "Matthew's"}
    if (msg.author == process.env.F)
        {file = './flist.txt', colour = '#9933ff', nom = "Freya's"}
    if (msg.author == process.env.J)
        {file = './jlist.txt', colour = '#99ff33', nom = "James'"}
    if (msg.author == process.env.V)
        {file = './vlist.txt', colour = '#ff0066', nom = "Vanessa's"}
    if (msg2.includes('todo list') && !msg.author.bot){
      reply = List.listReturn(file, colour, nom);
      msg.channel.send(reply);
    }
    if (msg2.includes('l+') && !msg.author.bot){
      item = msg.content.slice(msg2.indexOf('l+')+3,)
      reply = List.listAdd(file, item);
      msg.channel.send(reply);
    }
    if (msg2.includes('l-') && !msg.author.bot){
      num = msg2.slice(msg2.indexOf('l-')+2,)
      if (!isNaN(Number(num))) {
        reply = List.listDel(file, num);
        msg.channel.send(reply);
      }
    }
  }

  if (msg2.includes('tracks') && !msg.author.bot) {
    var files = fs.readdirSync('./Audio/').toString();

    const TracksEmbed = new Discord.MessageEmbed()
    .setColor('#FFDD00')
    .setTitle('Track List')
    .setDescription(files.replace(/.mp3/g,"").replace(/,/g,"\n"))
    
    msg.channel.send(TracksEmbed);
  }

  if (msg2.includes("~chock") && !msg.author.bot) {
    cheerio19(msg.channel);
  }
  if (msg2.includes("~covid") && !msg.author.bot) {
    cheerioZ(msg.channel);
  }
  if (msg2.includes("~cases") && !msg.author.bot) {
    postcode = msg2.slice(msg2.indexOf('~cases')+7,).replace(" ", "+");
    cheerioC(msg.channel, postcode);
  }
  if (msg2.includes("~atl") && !msg.author.bot) {
    cheerioAP(msg.channel, '#fc2605', 'Atlantic', 'atl', 'atl');
  }
  if (msg2.includes("~pac") && !msg.author.bot) {
    cheerioAP(msg.channel, '#0dfc05', 'Pacific', 'epac', 'pac');
  }
  if (msg2.includes("~cpac") && !msg.author.bot) {
    cheerioAP(msg.channel, '#ff8a07', 'Central Pacific', 'cpac', 'cpac');
  }
  if (msg2.includes("~veront") && !msg.author.bot) {
    reply = Veront.Veather("veront",0).toString();
    msg.channel.send(reply);
  }
  if (msg2.includes("~anlight") && !msg.author.bot) {
    reply = Veront.Veather("anlight",0).toString();
    msg.channel.send(reply);
  }
  if (msg2.includes("~torvalain") && !msg.author.bot) {
    reply = Veront.Veather("torvalain",0).toString();
    msg.channel.send(reply);
  }
  if (msg2.includes("~deliac") && !msg.author.bot) {
    reply = Veront.Veather("deliac",0).toString();
    msg.channel.send(reply);
  }
  if (msg2.includes("~larion") && !msg.author.bot) {
    reply = Veront.Veather("larion",0).toString();
    msg.channel.send(reply);
  }
  if (msg2.includes("~mercusa") && !msg.author.bot) {
    tim = msg2.slice(msg2.indexOf('~mercusa')+8,);
    if (tim){cheerioM(msg.channel,tim)}
    else {cheerioM(msg.channel,0)}
  }
  if (msg2.includes('~twb') && !msg.author.bot) {
    tim = msg2.slice(msg2.indexOf('~twb')+4,);
    if (tim){Veront.Xeather(msg.channel,tim)}
    else {Veront.Xeather(msg.channel,0)}
  }
  if (msg2.includes('~twc') && !msg.author.bot) {
    tim = msg2.slice(msg2.indexOf('~twc')+4,);
    if (tim){Veront.Zeather(msg.channel,tim)}
    else {Veront.Zeather(msg.channel,0)}
  }
  if (msg2.includes('//mercusa') && !msg.author.bot) {
    Veront.ASC(msg.channel,221,48)
  }
  if (msg2.includes('//callight') && !msg.author.bot) {
    Veront.ASC(msg.channel,221,97)
  }
  if (msg2.includes('//redest') && !msg.author.bot) {
    Veront.ASC(msg.channel,221,149)
  }
  if (msg2.includes('//vestinsel') && !msg.author.bot) {
    Veront.ASC(msg.channel,221,194)
  }
  //if (msg2.includes('happy new year') && !msg.author.bot) {
      //msg.channel.send('Happy New Year to you too! 🎉');
  //}
  if (msg2.includes('happy birthday') && !msg.author.bot) {
    date = new Date();
    if (date.getMonth() === 4 && date.getDate() === 20) {
      msg.react(`🥳`);
      sleep(2000).then( () => {
      msg.channel.send('_Happy birthday to me_ 🎵');
      sleep(3000).then( () => {
        msg.channel.send(`_Happy birthday to me_`);
        sleep(3000).then( () => {
          msg.channel.send(`_Happy birthday dear me-ee_`);
          sleep(3500).then( () => {
            msg.channel.send(`_Happy birthday to me_`);
            sleep(1000).then( () => {
            msg.channel.send(`🎉🎉🎉`);
            });
          });
        });
      });
    });
  }
}
});

client.on('message', async message => {
  msg2 = message.content.toLowerCase()
  if (msg2.includes('%%%') && !message.author.bot) {
    FileSort('../../../Music/Vaporwave/', message);
  }
  else if (msg2.includes('%%pl') && !message.author.bot) {
    FileSort('./PL/', message);
  }
  else if (msg2.includes('%%') && !message.author.bot) {
    FileSort('../../../Music/', message);
  }
  else if (msg2.includes('%') && !message.author.bot) {
    track = msg2.slice(msg2.indexOf('%')+1,);
    Music("./Audio/", track, message)
  }
  if (msg2.includes('fuck on') && !message.author.bot) {
    if (message.member.voice.channel) {
      message.member.voice.channel.join();
    }
  }
  if (msg2.includes('fuck off') && !message.author.bot) {
    if (message.guild.me.voice.channel) {
      Music("./Audio/", "daisy bell", message);
      setTimeout(function(){
        message.guild.me.voice.channel.leave();
        client.user.setPresence({ activity: { name: 'The Weather', type: 'WATCHING' }, status: 'idle' });
      }, 6200)

      //message.guild.me.voice.channel.leave();
      //client.user.setPresence({ activity: { name: 'The Weather', type: 'WATCHING' }, status: 'idle' });
    }
  }
});



client.once('ready', async () => {
  const channel = client.channels.cache.get(process.env.CH1);
  console.log('Client active')
  try {
    const webhooks = await channel.fetchWebhooks();
    const webhook = webhooks.first();
    
    setInterval(function () {
      var date = new Date();
      if ((date.getUTCHours() === 0 || date.getUTCHours() === 6 || date.getUTCHours() === 12 || date.getUTCHours() === 18) && date.getMinutes() === 00){
        //cheerioAP(channel, '#fc2605', 'Atlantic', 'atl', 'atl');
        cheerioAP(channel, '#0dfc05', 'Pacific', 'epac', 'pac');
        //cheerioAP(channel, '#ff8a07', 'Central Pacific', 'cpac', 'cpac');
      }

      if ((date.getUTCHours() === 0 || date.getUTCHours() === 3 || date.getUTCHours() === 6 || date.getUTCHours() === 9 || date.getUTCHours() === 12 || date.getUTCHours() === 15 || date.getUTCHours() === 18 || date.getUTCHours() === 21) && date.getMinutes() === 00){
        //cheerioBCD('MIATCPAT1', channel, 'Wanda', '#14ffff', 'at1', 'AT21/', 'AL212021');
        //cheerioBCD('MIATCPAT4', channel, 'Nicholas', '#ffff00', 'at4', 'AT14/', 'AL142021');
        //cheerioBCD('MIATCPEP4', channel, 'Sandra', '#ff00ff', 'ep4', 'EP19/', 'EP192021');
      }

      if ((date.getUTCHours() === 7) && date.getMinutes() === 00){
        cheerioW(channel);
        Veront.Xeather(channel,0);
        Veront.Zeather(channel,0);
      }

    }, 60 * 1000);
  } 
  catch (error) {
    console.error('Error trying to send: ', error);
  }
})

// login to Discord with your app's token
client.login(process.env.TOKEN);