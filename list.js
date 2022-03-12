var fs = require('fs');
const Discord = require('discord.js');

module.exports = {
    listReturn : function (file, colour, nom) {

var text = fs.readFileSync(file).toString('utf-8')
var textByLine = text.split('\n')
var randL = Math.floor((Math.random())*(textByLine.length))

for (i in textByLine){textByLine[i] = i + ". " + textByLine[i]}

const TodoEmbed = new Discord.MessageEmbed()
.setColor(colour)
.setTitle(nom + ' Todo List')
.setDescription(textByLine)

//channel.send();

return TodoEmbed
    },


    listAdd : function (file, item) {

fs.appendFile(file, '\n' + item, function (err) {
        if (err) {
          console.log('failed')
        } else {
          console.log(item)
        }
      })

return '"' + item + '" added to todo list!'
    },
    

    listDel : function (file, num) {

        var text = fs.readFileSync(file).toString('utf-8')
        var textByLine = text.split('\n')
        var message = '"' + textByLine[num] + '" removed from todo list!'
        textByLine.splice(num, 1)
        var newList = textByLine.join('\n')
        
        fs.writeFile(file, newList, function (err) {
          if (err) {
            console.log('failed')
          } else {
            console.log(message)
          }
        })
        return message
            }
}