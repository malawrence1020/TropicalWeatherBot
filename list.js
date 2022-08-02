var fs = require('fs');
const Discord = require('discord.js');

module.exports = {
  listReturn : function (file, colour, nom) {

    var text = fs.readFileSync(file).toString('utf-8')
    var textByLine = text.split('\n')
    textByLine.pop()

    for (i in textByLine){textByLine[i] = `${i}. ${textByLine[i]}`}

    const TodoEmbed = new Discord.MessageEmbed()
    .setColor(colour)
    .setTitle(`${nom}'s Todo List`)
    .setDescription(`${textByLine.join(`\n`)}`)

    //channel.send();

    return TodoEmbed
  },


  listAdd : function (file, item) {

    fs.appendFile(file, `${item}\n`, function (err) {
            if (err) {
              console.log('failed')
            } else {
              console.log(item)
            }
          })

    return '"' + item + '" added to todo list!'
  },
    

  listDel : function (file, num, file2) {

    var text = fs.readFileSync(file).toString('utf-8')
    var textByLine = text.split('\n')
    var message = '"' + textByLine[num] + '" removed from todo list!'
    var mem = textByLine[num]
    textByLine.splice(num, 1)
    var newList = textByLine.join('\n')
    
    fs.writeFile(file, newList, function (err) {
      if (err) {
        console.log('failed')
      } else {
        console.log(message)
      }
    })

    if (file2 != 0) {
      fs.appendFile(file2, `${mem} \n`, function (err) {
        if (err) {console.log('failed')}
      })
    }
    return message
    },  
    
  listWipe : function (channel, file, colour, nom, wipe) {

    var text = fs.readFileSync(file).toString('utf-8')
    var textByLine = text.split('\n')
    textByLine.pop()
    var len = textByLine.length;

    if (len != 0) {
      for (i in textByLine){
        textByLine[i] = `${i}. ${textByLine[i]}`
        end = '⭐'.repeat(len)
      }

      const TodoneEmbed = new Discord.MessageEmbed()
      .setColor(colour)
      .setTitle(`Great work today ${nom}!`)
      .setDescription(`You completed all these tasks today! 😇😇 \n\n ${textByLine.join(`\n`)} \n\n Great work! ${end}`)

      if (wipe == 1) {
        fs.writeFile(file, ``, function (err) {
          if (err) {console.log('failed')}
        })
      }

      channel.send(TodoneEmbed);
    }
  }
}