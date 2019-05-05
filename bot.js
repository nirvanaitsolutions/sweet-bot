const Discord = require('discord.js')
const client = new Discord.Client();
const SSC = require('sscjs');
const ssc = new SSC('https://api.steem-engine.com/rpc');
const white = '#ffffff'
const config = require("./config.json");



client.on('message', (msg) => {

  function error(x) {
    embed = new Discord.RichEmbed()
      .setTitle('\❗ **Error**')
      .setDescription(x)
      .setColor('#FF0000')
    msg.channel.send({
      embed
    })
  }


  if (msg.content.startsWith(config.prefix)) {

    const args = msg.content.slice(1).split(/ +/)
    const command = args.shift().toLowerCase();

    //!bal - finds users balance in given token

    if (command === 'thelp') {

      embed = new Discord.RichEmbed()
      .setTitle('❓ Help')

      .setColor(white)
      msg.channel.send({embed})
    }

    if (command === 'tbal') {

      if (args.length <= 1) {
        error(`You didn't enter a search term\n\nUsage: \`!tbal [user] [token]\``)
        return;
      }

      if (args.length > 2) {
        error(`You provided too many arguments\n\nUsage: \`!tbal [user] [token]\``)
        return;
      }

      let symbol = args[1].toUpperCase()

      ssc.findOne(
        'tokens',
        'balances', {
          account: `${args[0]}`,
          symbol: `${symbol}`
        }, (err, result) => {

          if (err) {
            console.log(err)
          }

          if (!result) {
            error(`Could not find \`${args[0]}'s\` **${symbol}** balance`)
            return;
          }

          embed = new Discord.RichEmbed()
            .setTitle(result.account)
            .setDescription(` ឵឵ ឵឵\n`)
            .addField(`${result.symbol} Balance:`, result.balance)
            .setColor(white)
          msg.channel.send({
            embed
          })
        })
    }

    //!bals - find every balance of user

    if (command === 'tbals') {

      if (args.length === 0) {
        error(`You didn't enter a search term\n\nUsage: \`!tbals [user]\``)
        return;
      }

      ssc.find('tokens', 'balances', {
        account: `${args[0]}`
      }, 1000, 0, '', false).then(async (metrics) => {


        if (metrics.length === 0) {
          error(`Could not find account \`${args[0]}\``)
          return;
        }

        var end_result = [];

        metrics.forEach((element) => {
          end_result.push(`**${element.symbol}:** \`${element.balance}\``);

        });



        embed = new Discord.RichEmbed()
          .setTitle(metrics[0].account)
          .setDescription(` ឵឵ ឵឵\n${end_result.join(`\n`)}`)
          .setColor(white)
        msg.channel.send({
          embed
        })
      })
    }


    //!price - used to view tokens price

    if (command === 'price') {

      if (args.length === 0) {
        error(`You didn't enter a search term\n\nUsage: \`!price [token]\``)
        return;
      }

      let symbol = args[0].toUpperCase()

      ssc.find('market', 'metrics', {
        symbol: `${symbol}`
      }, 1000, 0, '', false).then(async (metrics) => {
      
        if (metrics.length === 0) {
          error(`Could not find \`${symbol}\``)
          return;
        }

        embed = new Discord.RichEmbed()
          .setTitle(metrics[0].symbol)
          .setDescription(` ឵឵ ឵឵\nPrice: \`${metrics[0].lastPrice}\``)
          .setColor(white)
        msg.channel.send({
          embed
        })
      })
    }

    //!volume - finds a tokens volume

    if (command === 'volume') {

      if (args.length === 0) {
        error(`You didn't enter a search term\n\nUsage: \`!volume [token]\``)
        return;
      }

      let symbol = args[0].toUpperCase()

      ssc.find('market', 'metrics', {
        symbol: `${symbol}`
      }, 1000, 0, '', false).then(async (metrics) => {

        if (metrics.length === 0) {
          error(`Could not find \`${symbol}\``)
          return;
        }

        embed = new Discord.RichEmbed()
          .setTitle(metrics[0].symbol)
          .setDescription(` ឵឵ ឵឵\nVolume: \`${metrics[0].volume}\``)
          .setColor(white)
        msg.channel.send({
          embed
        })
      })
    }

    //!buy - lists 3 lowest buy orders

    if (command === 'buybook') {

      if (args.length === 0) {
        error(`You didn't enter a search term\n\nUsage: \`!buybook [token]\``)
        return;
      }

      let symbol = args[0].toUpperCase()

      ssc.find('market', 'buyBook', {symbol: `${symbol}`}, 1000, 0, '', false).then(async (metrics) => {

        if (metrics.length === 0) {
          error(`Could not find **Buy** Offers with token \`${symbol}\``)
          return;
        }

        metrics.sort((a, b) => (a.price > b.price) ? 1 : -1)

        var end_result = [];

        for (var i = 0; i < 3; i++) {
        end_result.push(`**${metrics[i].symbol}:** \`${metrics[i].price}\``);
        }
        

        embed = new Discord.RichEmbed()
        .setTitle('Lowest Buy Offers:')
        .setDescription(`${end_result.join(`\n`)}`)
        .setColor(white)
        msg.channel.send({
          embed
        })
      })
    }

    //!sell - lists 3 highest sell orders

    if (command === 'sellbook') {

      if (args.length === 0) {
        error(`You didn't enter a search term\n\nUsage: \`!sellbook [token]\``)
        return;
      }

      let symbol = args[0].toUpperCase()

      ssc.find('market', 'sellBook', {symbol: `${symbol}`}, 1000, 0, '', false).then(async (metrics) => {
        console.log(metrics)

        if (metrics.length === 0) {
          error(`Could not find **Sell** Offers with token \`${symbol}\``)
          return;
        }
        
        metrics.sort((a, b) => (a.price > b.price) ? -1 : 1)

        var end_result = [];

        for (var i = 0; i < 3; i++) {
        end_result.push(metrics ? `**${metrics[i].symbol}:** \`${metrics[i].price}\`` : '');
        }
        
        embed = new Discord.RichEmbed()
          .setTitle('Highest Sell Offers:')
          .setDescription(`${end_result.join(`\n`)}`)
          .setColor(white)
        msg.channel.send({
          embed
        })
      })
    }
    
    if(command === 'buy'){
      if (args.length === 0) {
        error(`You didn't enter correct params\n\nUsage: \`!buy [your username]  [amount] [symbol] [price]\``)
        return;
      }
      let symbol = args[2].toUpperCase();
      let from =args[0].toLowerCase();
      let price = args[3].toLowerCase();
      let amount = args[1].toString();
      

      
      embed = new Discord.RichEmbed()
      .setTitle("Click Here to Buy")
      .setURL('https://app.steemconnect.com/sign/custom-json?required_posting_auths=%5B%5D&required_auths=%5B"'+from+'"%5D&id=ssc-mainnet1&json=%7B"contractName":"market","contractAction":"buy","contractPayload":%7B"symbol":"'+symbol+'","price":"'+price+'","quantity":"'+amount+'"%7D%7D'
)
      .setColor(white)
      msg.author.send(embed)
    }

     if(command === 'sell'){
      if (args.length === 0) {
        error(`You didn't enter correct params\n\nUsage: \`!sell [your username]  [amount] [symbol] [price]\``)
        return;
      }
      let symbol = args[2].toUpperCase();
      let from =args[0].toLowerCase();
      let price = args[3].toLowerCase();
      let amount = args[1].toString();


      
      embed = new Discord.RichEmbed()
      .setTitle("Click Here to Sell")
      .setURL('https://app.steemconnect.com/sign/custom-json?required_posting_auths=%5B%5D&required_auths=%5B"'+from+'"%5D&id=ssc-mainnet1&json=%7B"contractName":"market","contractAction":"sell","contractPayload":%7B"symbol":"'+symbol+'","price":"'+price+'","quantity":"'+amount+'"%7D%7D'
)
      .setColor(white)
      msg.author.send(embed)
    }
    
    if(command === 'stip'){
      if (args.length === 0) {
        error(`You didn't enter a search term\n\nUsage: \`!stip [from] [to] [amount] [symbol] \``)
        return;
      }
      let symbol = args[3].toUpperCase();
      let from = args[0].toLowerCase();
      let to = args[1].toLowerCase();
      let amount = args[2].toString();
      let memo = args[4]; 

      
      embed = new Discord.RichEmbed()
      .setTitle("Click Here to Tip Safely")
      .setURL('https://app.steemconnect.com/sign/custom-json?required_posting_auths=%5B%5D&required_auths=%5B"'+from+'"%5D&id=ssc-mainnet1&json=%7B"contractName":"tokens","contractAction":"transfer","contractPayload":%7B"symbol":"'+symbol+'","to":"'+to+'","quantity":"'+amount+'","memo":"stip"%7D%7D'
)
      .setColor(white)
      msg.author.send(embed)
    }



    if(command === 'transfer'){
      if (args.length === 0) {
        error(`You didn't enter a search term\n\nUsage: \`!transfer [from] [to] [amount] [symbol] [memo]\``)
        return;
      }
      let symbol = args[3].toUpperCase();
      let from = args[0].toLowerCase();
      let to = args[1].toLowerCase();
      let amount = args[2].toString();
      let memo = args[4]; 

      
      embed = new Discord.RichEmbed()
      .setTitle("Click Here to Transfer")
      .setURL('https://app.steemconnect.com/sign/custom-json?required_posting_auths=%5B%5D&required_auths=%5B"'+from+'"%5D&id=ssc-mainnet1&json=%7B"contractName":"tokens","contractAction":"transfer","contractPayload":%7B"symbol":"'+symbol+'","to":"'+to+'","quantity":"'+amount+'","memo":"'+memo+'"%7D%7D'
)
      .setColor(white)
      msg.author.send(embed)
    }

}



});

client.on('ready', () => {
  console.log('Bot is now connected');
});

client.on('error', console.error)

client.login(config.token);
