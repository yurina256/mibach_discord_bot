const Discord = require('discord.js')
const client = new Discord.Client()

client.on('ready', () => {
  console.log(`${client.user.username} でログインしています。`)
})
client.on('message', async msg => {
    var str =  msg.content;
    const rsp = /^[rsp]$/g;
  if (str === '!npee') {
    msg.channel.send('ﾝﾋﾟｰｰｰｰｰｰwwww');
   // msg.channel.send('debuginfo:'+msg.content);
  }else if(msg.content === '!oreka'){
    msg.channel.send('おれかぁ？');
  }else if(str.substring(0,7) === '!marry '&&str.length>=8){
    msg.channel.send(str.substring(7)+'、結婚してくれ、俺が幸せにする');
  }else if(str === '!dice'){
    msg.channel.send('🎲dice => '+(Math.floor(Math.random()*6)+1));
  }else if(str.substring(0,5) === '!rsp '&&str.substring(5).match(rsp)){
    str = str.substring(5);
    var ans = janken(str);
    var p = ans[1];
    ans[1] = str;
    var n = [];
    ans.forEach(function(val){
      switch(val){
        case "r":
          n.push("グー");
        break;
        case "s":
          n.push("チョキ");
        break;
        case "p":
          n.push("パー");
        break;
      }
    });
    msg.channel.send('botの手:'+n[0]+" あなたの手:"+n[1]+" 結果:"+p);
  }else if(str.substring(0,6) === '!debug') {
    // 名前が "鯖缶" の役職を取得する
    //const role = msg.member.roles.cache.has('707408548019306556')
    //msg.channel.send(role);
    // 取得した役職のIDから、役職を持っているか確認し、持っていなかったら、ここで処理を止める
    var kengen = msg.member.roles.has('707408548019306556');
    if (!kengen){
      msg.channel.send('⚠コマンドの実行に失敗しました。権限がありません');
    }else{
      if(str.substring(7) == "jsontest"){
        const fs = require('fs');
        const jsonObject = JSON.parse(fs.readFileSync('./joke.json', 'utf8'));
        msg.channel.send(jsonObject[0]);
      }else if(str.substring(7,15) == "jsonadd "){
        const fs = require('fs');
        var jsonObject = JSON.parse(fs.readFileSync('./joke.json', 'utf8'));
        jsonObject.push(str.substring(15));
        fs.writeFileSync('./joke.json', JSON.stringify(jsonObject));
      }else if(str.substring(7) === "joke"){
        const fs = require('fs');
        const jsonObject = JSON.parse(fs.readFileSync('./joke.json', 'utf8'));
        msg.channel.send(jsonObject[Math.floor(Math.random()*jsonObject.length)]);
      }
      msg.channel.send('✅コマンドの実行に成功しました。');
    }
  }else if(str.substring(0,9) === "!tokumei "){
    var txt = str.substring(9);
    msg.delete();
    msg.channel.send(txt);
  }else if(str == "!help"){
    const m = "---<command list>---\n!dice              6面ダイスを振ります\n!npee             ﾝﾋﾟｰｰｰｰｰｰwwww\n!tokumei *     botが代わりに発言してくれます\n!marry *        *に求婚します\n!rsp [r|s|p] じゃんけんです\n!debug           デバッグ用です\n!help              コマンドリストを表示します"
    msg.channel.send(m);
  }
});
client.login('NzA3Mjg5MzIwMzA1NzIxMzU0.XrJCww.ICXpIwz2rMfOqBIixMtM7X0Ik3E');
function janken(str){
  var bot = Math.floor(Math.random()*3);
  var ans = "";
  switch(str){
    case "r":
      switch(bot){
        case 0:
          ans = "WIN";
          break;
        case 1:
          ans = "DRAW";
          break;
        case 2:
          ans = "LOSE";
      }
      break;
      case "s":
        switch(bot){
          case 0:
            ans = "DRAW";
            break;
          case 1:
            ans = "LOSE";
            break;
          case 2:
            ans = "WIN";
        }
        break;
        case "p":
          switch(bot){
            case 0:
              ans = "LOSE";
              break;
            case 1:
              ans = "WIN";
              break;
            case 2:
              ans = "DRAW";
          }
          break;
  }
  switch(bot){
    case 0:
      bot = "s";
    break;
    case 1:
      bot = "r";
    break;
    case 2:
      bot = "p";
      break;
  }
  return [bot,ans]
}