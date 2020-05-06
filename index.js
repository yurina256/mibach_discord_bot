const Discord = require('discord.js')
const client = new Discord.Client()
client.on('ready', () => {
  console.log(`${client.user.username} でログインしています。`)
})
client.on('message', async msg => {
    const fs = require('fs');
    var kengen = msg.member.roles.has('707408548019306556');
    var str =  msg.content;
    const rsp = /^[rsp]$/g;
    const file = msg.attachments.first();
    var data = JSON.parse(fs.readFileSync('./data.json', 'utf8'));
    var jsonObject = JSON.parse(fs.readFileSync('./joke.json', 'utf8'));
  if(str === '!npee') {
    msg.channel.send('ﾝﾋﾟｰｰｰｰｰｰwwww');
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
    if (!kengen){
      msg.channel.send('⚠コマンドの実行に失敗しました。権限がありません。');
    }else{
      if(str.substring(7,15) === "jsonadd "){
        jsonObject.push(str.substring(15));
        fs.writeFileSync('./joke.json', JSON.stringify(jsonObject));
      }else if(str.substring(7) === "kill_flag"){
        msg.channel.send(data.kill);
      }
      msg.channel.send('✅コマンドの実行に成功しました。');
    }
  }else if(str.substring(0,9) === "!tokumei "){
    var txt = str.substring(9);
    msg.delete();
    msg.channel.send(txt);
  }else if(str == "!help"){
    const m = "---<command list>---\n!dice              6面ダイスを振ります\n!npee             ﾝﾋﾟｰｰｰｰｰｰwwww\n!tokumei *     botが代わりに発言してくれます\n!marry *        *に求婚します\n!rsp [r|s|p] じゃんけんです\n!debug           デバッグ用です\n!help              コマンドリストを表示します\n!joke              るるたちゃんの鉄板ジョークを聞きたいか？\n!addjoke           るるたちゃんの鉄板ジョークを追加！(要権限)"
    msg.channel.send(m);
  }else if(str == "!joke"){
    const fs = require('fs');
    const jsonObject = JSON.parse(fs.readFileSync('./joke.json', 'utf8'));
    msg.channel.send(jsonObject[Math.floor(Math.random()*jsonObject.length)]);
  }else if(str.substring(0,9) == "!addjoke "){
    if(kengen){
    const fs = require('fs');
    var jsonObject = JSON.parse(fs.readFileSync('./joke.json', 'utf8'));
    jsonObject.push(str.substring(9));
    fs.writeFileSync('./joke.json', JSON.stringify(jsonObject));
    msg.channel.send('✅こうしてこの地球上に新たなダジャレが生まれたのだった…');
    }else{
      msg.channel.send('⚠コマンドの実行に失敗しました。権限がありません。');
    }
  }else if(str == "!激ヤバ腹筋崩壊最強面白ギャグ"){
    msg.channel.send("undefind");
  }else if(str == "さて"&&data.kill){
    msg.channel.send("さてじゃないんだよ");
    //msg.member.send('Try again:https://discord.gg/ZF6vAdN')
    msg.member.kick();
  }else if(str == '<:emoji_38:705716399104065556>'&&data.kill){
    msg.channel.send("殺してやるよ");
    msg.channel.send(msg.member.user.tag+"は無残な姿で発見されました。");
    msg.member.kick();
    //msg.member.send('Try again:https://discord.gg/ZF6vAdN')
    //なぜか動かない　メッセージ送信が許可されてないだけだと思う
  }else if(str == "!kill_off"){
    if(!kengen){
      msg.channel.send('⚠コマンドの実行に失敗しました。権限がありません。');
    }else{
      data.kill = false;
      fs.writeFileSync('./data.json', JSON.stringify(data));
      msg.channel.send('✅コマンドの実行に成功しました。');
    }
  }else if(str == "!kill_on"){
    if(!kengen){
      msg.channel.send('⚠コマンドの実行に失敗しました。権限がありません。');
    }else{
      data.kill = true;
      fs.writeFileSync('./data.json', JSON.stringify(data));
      msg.channel.send('✅コマンドの実行に成功しました。');
    }
  }else if(str == "!icon"){
    if (!file) return // 添付ファイルがなかったらスルー
    if (!file.height && !file.width) return // 画像じゃなかったらスルー
    client.user.setAvatar(file.url)
  }else if(str.substring(0,6) === "!name "){
    msg.guild.members.get(client.user.id).setNickname(str.substring(6));
  }
  console.log(str);
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