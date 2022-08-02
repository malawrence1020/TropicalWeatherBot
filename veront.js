module.exports = {
    Veather : function (loc, tim) {
      if (tim == 0) {var t1 = new Date()}
      else {var t1 = new Date(tim)}
      console.log(t1)
      var time = (t1 - 1642647600000)/1000;
      t2 = [time]
      t3 = ["now"]
      if (t1.getHours() < 6) {tday = t1.getDate() - 1}
      else {tday = t1.getDate()}
      
      for (let i = 0; i < 24; i++) {
        if (i < 18) {
        td = i + 6
        t2.push((new Date(t1.getFullYear(),t1.getMonth(),tday, td, 0, 0) - 1642647600000)/1000);
        t3.push(td)
        }
        else {
        td = (i + 6) % 24
        t2.push((new Date(t1.getFullYear(),t1.getMonth(),tday + 1, td, 0, 0) - 1642647600000)/1000);
        t3.push(td)
        }
      }

      temps = []
      for (let j = 0; j < 25; j++) {

      //Baseline annual curve
      temp = -7 * Math.cos(2 * Math.PI * t2[j]/31557600) + 11

      //Medium/short-term variations
      temp += 4.5 * Math.sin(2 * Math.PI * t2[j]/(86400 * 40)) * Math.cos(2 * Math.PI * t2[j]/(86400 * 17))
      temp += -2 * Math.sin(2 * Math.PI * t2[j]/(86400 * 7))
      
      //Location-based adjustments
      if (loc == "anlight") {
        temp += -0.5 * Math.cos(2 * Math.PI * t2[j]/(86400 * 29)) + 2.5;
        place = "Anlight"
      }
      if (loc == "deliac") {
        temp += 1 * Math.sin(2 * Math.PI * t2[j]/(86400 * 27));
        temp += 0.5 * Math.cos(2 * Math.PI * t2[j]/31557600) + 5;
        place = "Deliac"
      }
      if (loc == "larion") {
        temp += 1 * Math.sin(2 * Math.PI * t2[j]/(86400 * 11));
        temp += -0.5 * Math.cos(2 * Math.PI * t2[j]/31557600) - 5;
        place = "Larion"
      }
      if (loc == "torvalain") {
        temp += 0.5 * Math.cos(2 * Math.PI * t2[j]/(86400 * 13)) - 1;
        place = "Torvalain City"
      }
      if (loc == "veront") {
        temp += 0;
        place = "Port Veront"
      }
      
      //Hourly adjustment
      temp += -2 * Math.cos(2 * Math.PI * t2[j]/86400) * (1 + 0.4 * Math.sin(2 * Math.PI * t2[j]/(86400 * 23))) * (1 + 0.25 * Math.cos(2 * Math.PI * t2[j]/31557600))

      //Rounding
      temp = Math.round(temp*10)/10

      temps.push(temp)
      }

      //console.log(temps)

      Maxtemp = Math.max(...temps)
      Maxtime = t3[temps.lastIndexOf(Maxtemp)]
      Mintemp = Math.min(...temps)
      Mintime = t3[temps.lastIndexOf(Mintemp)]

      if (temps[0] < -2) {nowresponse = "Wrap up extra warm, it's freezing!"}
      else if (temps[0] < 7) {nowresponse = "Put on an extra layer - it's cold out there!"}
      else if (temps[0] < 16) {nowresponse = "Nice and mild today, go out and enjoy!"}
      else if (temps[0] < 25) {nowresponse = "Looks like shorts and t-shirt weather!"}
      else {nowresponse = "Phew, it's hot out there - don't forget to stay hydrated!"}

      if (Maxtemp < 2) {Maxresponse = "It's going to be freezing all day!"}
      else if (Maxtemp < 11) {Maxresponse = "I'm afraid it isn't going to get warm today!"}
      else if (Maxtemp < 20) {Maxresponse = "Lovely and pleasant temperatures, not too warm!"}
      else if (Maxtemp < 29) {Maxresponse = "It's a lovely day, go and enjoy it!"}
      else {Maxresponse = "Wow it is going to be a hot one - don't forget that sun cream!"}

      if (Mintemp < -6) {Minresponse = "It's going to get very cold tonight - put an extra blanket on!"}
      else if (Mintemp < 3) {Minresponse = "Stay warm inside tonight!"}
      else if (Mintemp < 12) {Minresponse = "It's going to be a cool night!"}
      else if (Mintemp < 21) {Minresponse = "It is going to be warm tonight - throw off that blanket!"}
      else {Minresponse = "You're going to have trouble sleeping tonight - these temperatures aren't quitting!"}


      reply = `The current temperature in ${place} is ${temps[0]}°C. ${nowresponse} At ${Maxtime}:00 the temperature will rise to a high of ${Maxtemp}°C. ${Maxresponse} At ${Mintime}:00 the temperature will fall to a low of ${Mintemp}°C. ${Minresponse}`;

      console.log(reply)
      return reply
    },

    Xeather : function (channel, tim) {
      if (tim == 0) {var t1 = new Date()}
      else {var t1 = new Date(tim)}
      console.log(t1)
      var time = (t1 - 1642647600000)/1000;

      const fs = require('fs')
      const { createCanvas, loadImage } = require('canvas')

      const width = 600
      const height = 600
      const canvas = createCanvas(width, height)
      const context = canvas.getContext('2d')

      loadImage('./Images/1.png').then(image => {
        context.drawImage(image, 0, 0, 600, 600)
        for (let m = 0; m < 600; m++) {
          for (let n = 0; n < 600; n++) {
            temp = -7 * Math.cos(2 * Math.PI * time/31557600) + 11
            temp += 4.5 * Math.sin(2 * Math.PI * time/(86400 * 40)) * Math.cos(2 * Math.PI * time/(86400 * 17))
            temp += -2 * Math.sin(2 * Math.PI * time/(86400 * 7))
            temp += (Math.sin(2 * Math.PI * time/(86400 * 11)) - (0.5 * Math.cos(2 * Math.PI * time/31557600)) - 5)*(470-m)/400;
            temp += (1 * Math.sin(2 * Math.PI * time/(86400 * 27)) + (0.5 * Math.cos(2 * Math.PI * time/31557600)) + 5)*(n-170)/400;
            //if (n%100 == 0 && m%100 == 0) {console.log(temp)}
            if (n == 470 && m == 470) {console.log(temp)}

            if (temp > 40) {
              r = 0;
              g = 0;
              b = 0;
            }

            else if (temp > 25) {
              r = Math.floor(255/15 * (40 - temp));
              g = 0;
              b = 0;
            }

            else if (temp > 10) {
              r = Math.floor(255/15 * (temp - 10));
              g = Math.floor(255/15 * (25 - temp));
              b = 0;
            }

            else if (temp > -5) {
              r = 0;
              g = Math.floor(255/15 * (temp + 5));
              b = Math.floor(255/15 * (10 - temp));
            }

            else if (temp > -20) {
              r = 0;
              g = 0;
              b = Math.floor(255/15 * (temp + 20));
            }

            else {
              r = 0;
              g = 0;
              b = 0;
            }

            context.fillStyle = `rgba(${r}, ${g}, ${b}, 0.55)`;
            context.fillRect(1*m, 1*n, 1, 1);

            if (m == 312 && n == 223) {
              context.font = "20px Arial";
              context.fillStyle = "white";
              context.fillText(Math.round(temp)+"°",280,240);
            }
            if (m == 139 && n == 70) {
              context.font = "20px Arial";
              context.fillStyle = "white";
              context.fillText(Math.round(temp)+"°",110,97);
            }
            if (m == 464 && n == 171) {
              context.font = "20px Arial";
              context.fillStyle = "white";
              context.fillText(Math.round(temp)+"°",434,196);
            }
            if (m == 212 && n == 314) {
              context.font = "20px Arial";
              context.fillStyle = "white";
              context.fillText(Math.round(temp)+"°",183,339);
            }
            if (m == 430 && n == 456) {
              context.font = "20px Arial";
              context.fillStyle = "white";
              context.fillText(Math.round(temp)+"°",403,443);
            }
          }
        }
        context.font = "20px Arial";
        context.fillStyle = "white";
        context.fillText(`Mercusa Temperature Map, ${t1.toLocaleString()} [V2.5]`,50,590);
        const buffer = canvas.toBuffer('image/png')
        fs.writeFileSync('./Images/maptest.png', buffer)
      })

      
      channel.send({files: ["./Images/maptest.png"]});
    },

    Zeather : function (channel, tim) {
      if (tim == 0) {var t1 = new Date()}
      else {var t1 = new Date(tim)}
      console.log(t1)
      var time = (t1 - 1639526400000)/1000;
      var time2 = (t1 - 1642647600000)/1000;

      const fs = require('fs')
      const { createCanvas, loadImage } = require('canvas')

      const width = 600
      const height = 600
      const canvas = createCanvas(width, height)
      const context = canvas.getContext('2d')

      loadImage('./Images/1.png').then(image => {
        context.drawImage(image, 0, 0, 600, 600)
        for (let m = 0; m < 600; m++) {
          for (let n = 0; n < 600; n++) {
            pre = 0.7 * Math.cos(2 * Math.PI * time/31557600) + 0.3
            pre += -0.3 * Math.sin(2 * Math.PI * time2/(86400 * 40)) * Math.cos(2 * Math.PI * time2/(86400 * 17))
            pre += 0.4 * Math.sin(2 * Math.PI * time2/(86400 * 7))
            pre += 0.5 * Math.cos(2 * Math.PI * (time/(86400 * 4) + m/6400))
            pre += 0.2 * Math.cos(2 * Math.PI * (time/43200 + (m+100)/300)) - m/3000
            pre += 0.2 * Math.cos(2 * Math.PI * (time/86400 + (n+50)/300)) - n/3000
            pre += 0.09 * Math.cos(2 * Math.PI * (time/86400 + m*n/40000))
            pre += 0.06 * Math.sin(2 * Math.PI * (time/(86400 * 2) + (m-250)*(n-200)/25000))
            pre += 0.02 * Math.sin(2 * Math.PI * (time/43200 + (m-450)*(n-550)/20000))
            pre += 0.5 * Math.sin(2 * Math.PI * (time/(86400 * 3) + (m-100)/1000 + (n-50)/1000))
            //if (n%100 == 0 && m%100 == 0) {console.log(pre)}
            if (n == 470 && m == 470) {console.log(pre)}

            if (pre < 0) {
              r = 0;
              g = 0;
              b = 0;
              a = 0;
            }

            else if (pre < 1) {
              a = 0.4 * pre + 0.4;
              r = 255;
              g = 255;
              b = 255;
            }

            else if (pre < 1.75) {
              a = 0.8;
              r = Math.floor(160 - (pre - 1) * (160/0.75));
              g = Math.floor(230 - (pre - 1) * (50/0.75));
              b = 255;
            }

            else if (pre < 2.25) {
              a = 0.8;
              r = 0;
              g = Math.floor(180 + (pre - 1.75) * (70/0.5));
              b = Math.floor(180 - (pre - 1.75) * (180/0.5));
            }

            else if (pre < 3) {
              a = 0.8;
              r = Math.floor(100 + (pre - 2.25) * (155/0.75));
              g = 255;
              b = 0;
            }

            else {
              a = 0.8;
              r = 255;
              g = 150;
              b = 0;
            }

            context.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
            context.fillRect(1*m, 1*n, 1, 1);
          }
        }
        context.font = "20px Arial";
        context.fillStyle = "black";
        context.fillText(`Mercusa Precipitation Map, ${t1.toLocaleString()} [V1.0]`,50,590);
        const buffer = canvas.toBuffer('image/png')
        fs.writeFileSync('./Images/maptest2.png', buffer)
      })

      
      channel.send({files: ["./Images/maptest2.png"]});
    },

    ASC2 : function (channel, data) {
      const fs = require('fs')
      const { createCanvas, loadImage } = require('canvas')
      vec = data;
      (score = []).length = vec.length; score.fill(0);
      fs.writeFileSync('./vec.txt', vec);
      fs.writeFileSync('./score.txt', score);

      const width = 627
      const height = 547
      const canvas = createCanvas(width, height)
      const context = canvas.getContext('2d')

      loadImage('./Images/song.png').then(image => {
        context.drawImage(image, 0, 0, 627, 547)

        
        context.font = "bold 24px Courier New";
        context.fillStyle = "black";
        for (let i = 1; i < vec.length; i++) {
          if (i%2 == 1) {
            context.fillText(vec[i].toUpperCase(),45,80+20*i);
          }
          else {
            context.fillText(vec[i].toUpperCase(),356,60+20*i);
          }
        }

        const buffer = canvas.toBuffer('image/png')
        fs.writeFileSync('./Images/song1.png', buffer)


        loadImage('./Images/song1.png').then(image => {
          context.drawImage(image, 0, 0, 627, 547)
  
          
          context.font = "bold 24px Courier New";
          context.fillStyle = "yellow";
          for (let i = 1; i < score.length; i++) {
            if (i%2 == 1) {
              context.fillText(score[i],215,80+20*i);
            }
            else {
              context.fillText(score[i],525,60+20*i);
            }
          }
  
          const buffer = canvas.toBuffer('image/png')
          fs.writeFileSync('./Images/song2.png', buffer)
        })
      })

      channel.send({files: ["./Images/song2.png"]});
    },

    ASC3 : function (channel, country, points) {
      const fs = require('fs')
      const { createCanvas, loadImage } = require('canvas')
      var vec = fs.readFileSync('./vec.txt').toString('utf-8').split(',');
      var score = fs.readFileSync('./score.txt').toString('utf-8').split(',');
      ind = vec.indexOf(country);
      if (ind == -1){
        channel.send(`${country} is not in this contest!`)
      }
      else {
        score[ind] = Number(score[ind]) + Number(points);
      }
      fs.writeFileSync('./score.txt', score);

      const width = 627
      const height = 547
      const canvas = createCanvas(width, height)
      const context = canvas.getContext('2d')

      loadImage('./Images/song1.png').then(image => {
        context.drawImage(image, 0, 0, 627, 547)

        
        context.font = "bold 24px Courier New";
        context.fillStyle = "yellow";
        for (let i = 1; i < score.length; i++) {
          if (i%2 == 1) {
            context.fillText(score[i],215,80+20*i);
          }
          else {
            context.fillText(score[i],525,60+20*i);
          }
        }

        const buffer = canvas.toBuffer('image/png')
        fs.writeFileSync('./Images/song2.png', buffer)
      })

      channel.send({files: ["./Images/song2.png"]});
    }
}