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
    str = str.split(" ");
    var command = str[0];
  if(command === '!npee') {
    msg.channel.send('ﾝﾋﾟｰｰｰｰｰｰwwww');
  }else if(command === '!oreka'){
    msg.channel.send('おれかぁ？');
  }else if(command === '!marry'&&str.length>=8){
    msg.channel.send(str[1]+'、結婚してくれ、俺が幸せにする');
  }else if(command === '!dice'){
    msg.channel.send('🎲dice => '+(Math.floor(Math.random()*6)+1));
  }else if(command === '!setting') {
    if (!kengen){
      msg.channel.send('⚠コマンドの実行に失敗しました。権限がありません。');
    }else{
      if(str.substring(7) === "kill_flag"){
        msg.channel.send(data.kill);
      }
      msg.channel.send('✅コマンドの実行に成功しました。');
    }
  }else if(command === "!tokumei"){
    var txt = str[1];
    msg.delete();
    msg.channel.send(txt);
  }else if(command == "!help"){
    const m = "---<command list>---\n!dice              6面ダイスを振ります\n!npee             ﾝﾋﾟｰｰｰｰｰｰwwww\n!tokumei *     botが代わりに発言してくれます\n!marry *        *に求婚します\n!rsp [r|s|p]  じゃんけんです\n!debug           デバッグ用です\n!help              コマンドリストを表示します\n!joke              るるたちゃんの鉄板ジョークを聞きたいか？\n!addjoke          るるたちゃんの鉄板ジョークを追加！(要権限)\n!icon              Botのアイコンを変更します(画像を添付してください)\n!name *            Botの名前を変更します"
    msg.channel.send(m);
  }else if(command == "!joke"){
    msg.channel.send(jsonObject[Math.floor(Math.random()*jsonObject.length)]);
  }else if(command == "!addjoke"){
    if(kengen){
    jsonObject.push(str[1]);
    fs.writeFileSync('./joke.json', JSON.stringify(jsonObject));
    msg.channel.send('✅こうしてこの地球上に新たなダジャレが生まれたのだった…');
    }else{
      msg.channel.send('⚠コマンドの実行に失敗しました。権限がありません。');
    }
  }else if(command == "!激ヤバ腹筋崩壊最強面白ギャグ"){
    msg.channel.send("undefind");
  }else if(command == "さて"&&data.kill){
    msg.channel.send("さてじゃないんだよ");
    //msg.member.send('Try again:https://discord.gg/ZF6vAdN')
    msg.member.kick();
  }else if(command == '<:emoji_38:705716399104065556>'&&data.kill){
    msg.channel.send("殺してやるよ");
    msg.channel.send(msg.member.user.tag+"は無残な姿で発見されました。");
    msg.member.kick();
    //msg.member.send('Try again:https://discord.gg/ZF6vAdN')
    //なぜか動かない　メッセージ送信が許可されてないだけだと思う
  }else if(command == "!kill_off"){
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
  }else if(command == "!icon"){
    if (!file) return // 添付ファイルがなかったらスルー
    if (!file.height && !file.width) return // 画像じゃなかったらスルー
    client.user.setAvatar(file.url)
  }else if(command === "!name"){
    msg.guild.members.get(client.user.id).setNickname(str[1]);
  }else if(command == "!stpr"){
    const n = data.stpr.length;
    var tx = "!p"
    if(str[1]=="now") tx = "!ps";
    console.log(tx+" "+data.stpr[Math.floor(Math.random()*n)]);
  }else if(command == "!addstpr"){
    if(str[1] == "q"){
      msg.channel.send(data.stpr.join("\n"))
    }else{
      data.stpr.push(str[1]);
      fs.writeFileSync('./data.json', JSON.stringify(data));
    }
  }else if(command == "!expo"){
    client.users.get(435303011372498944).send(data.stpr.join("\n"));
  }
  console.log(str);
});
client.login('NzA3Mjg5MzIwMzA1NzIxMzU0.XrJCww.ICXpIwz2rMfOqBIixMtM7X0Ik3E');