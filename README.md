# sweet-bot
Sweet-Bot is an open source discord bot which enables steem users to communicate with the steem-engine sidechain via simple discord commands directly from discord.

#### Commands 
To **Query** the steem-engine sidechain you can use the following commands :

- **!price [symbol]** - Displays last price of the specified Token in STEEMP.
- **!volume [symbol]** - Displays 24 hour volume on the Steem-Engine Dex for a token.
- **!tbal [steem user] [symbol]** - Displays user's specific  SE token balance.
- **!tbals [steem user]** - Displays user's all SE token balances.
- **!buybook [symbol]** - Displays all Buy Orders on the Steem-Engine Dex for a token .
- **!sellbook [symbol]** - Displays top 3 Sell orders on the Steem-Engine Dex for a token.

To **Broadcast Transactions** related to Steem-Engine Tokens and Dex, you can use the follwing commands
- **!transfer [your steem username] [reciever steem username] [amount] [symbol] [memo]** - Sends you a DM with a steemconnect hot sign URL to sign the transfer transaction from a browser via steemconnect.
- **!safetip [your steem username] [reciever steem username] [amount] [symbol]**  - Sends you a DM with a steemconnect hot sign URL to sign the tip safely transaction from a browser via steemconnect.
- **!buy [your steem username] [amount] [symbol] [price]** - Sends you a DM with a steemconnect hot sign URL to sign the buy order transaction from a browser via steemconnect.
- **!sell [your steem username] [amount] [symbol] [price]** - Sends you a DM with a steemconnect hot sign URL to sign the sell order transaction from a browser via steemconnect.

**NOTE : Sweet-Bot is beta software and may contain bugs. please with caution. Always check the steemconnect hot sign urls before signing them.
If you find an issue please feel free to report it on our Github.**

#### How to run your own Instance 

1. Clone the Repo and open in terminal
```
git clone https://github.com/nirvanaitsolutions/sweet-bot.git
cd sweet-bot
```
2. Install Dependencies
```
npm i
```
3. Configure the bot by editing config.json file
```
{
    "token": "insert your bot token here",
    "prefix": "!" //recommended to keep this different from other bots in the server to avoid confusion
}
```

4. Run in dev mode 
```
npm run dev
```
5. Run on server with forever

```
(sudo) npm i forever -g 
forever start bot.js
```


#### What's Next on SweetBot
- Tipping other Discord members 
- Deposits and Withdrwals for tokens
- Subscription to real time notifications for Steem-Engine transactions on discord.
- Instant and Secure STEEMP-Token and Token-Token Swaps via Smart Contract.

#### How to Invite the bot to your own server and get your token listed

You can invite the SweetBot to your own server with this [Invite Link](https://discordapp.com/api/oauth2/authorize?client_id=565449577751117855&permissions=51710016&scope=bot). 

Please get in touch with with @swapsteem on our discord server for bot and token listing related queries.

#### Contact Us

- [ Discord ](https://discord.gg/prVyhgp)
- [ Telegram ](https://t.me/joinchat/HmOj7BdTUedi7cONxxJHIA)

![1024x262_swapsteem_rollin_fadeintop_fadeouttop_rollout.gif](https://steemitimages.com/0x0/https://files.steempeak.com/file/steempeak/swapsteem/gnT5T8Cz-1024x262_swapsteem_rollin_fadeintop_fadeouttop_rollout.gif)


