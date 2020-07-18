const Discord = require('discord.js')
const client = new Discord.Client()
client.on('ready', () => {
  console.log(`${client.user.username} でログインしています。`)
})
client.on('message', async msg => {
    const fs = require('fs');
    const kengen = msg.member.roles.has('707408548019306556');
    var str =  msg.content;
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
    var num = 6;
    if(str[1]){
      if(!isNaN(Number(str[1]))&&str[1]&&str[1]!=0) num = Number(str[1]);
    }
    msg.channel.send('🎲dice => '+(dice(num)));
  }else if(command === '!setting') {
    if (!kengen){
      msg.channel.send('⚠コマンドの実行に失敗しました。権限がありません。');
    }else{
      if(str[1] === "kill_flag"){
        msg.channel.send(data.kill);
      }
      msg.channel.send('✅コマンドの実行に成功しました。');
    }
  }else if(command === "!tokumei"){
    var txt = str[1];
    msg.delete();
    msg.channel.send(txt);
  }else if(command == "!help"){
    const m = "---<command list>---\n!dice              6面ダイスを振ります\n!npee             ﾝﾋﾟｰｰｰｰｰｰwwww\n!tokumei *     botが代わりに発言してくれます\n!marry *        *に求婚します\n!debug           デバッグ用です\n!help              コマンドリストを表示します\n!joke              るるたちゃんの鉄板ジョークを聞きたいか？\n!addjoke          るるたちゃんの鉄板ジョークを追加！(要権限)\n!icon              Botのアイコンを変更します(画像を添付してください)\n!name *            Botの名前を変更します"
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
  }else if(command.match(/!\dd\d{1,4}/)){
    command = command.split("!").join("").split("d").map(Number);
    var ans = [];
    for(var i=0;i<command[0];i++){
      ans.push(String(dice(command[1])));
    }
    msg.channel.send(ans.join());
  }
  console.log(str);
});
class Random {
  constructor(seed = 88675123) {
    this.x = Date.now();
    this.y = 362436069;
    this.z = 521288629;
    this.w = seed;
  }
  
  // XorShift
  next() {
    let t;
 
    t = this.x ^ (this.x << 11);
    this.x = this.y; this.y = this.z; this.z = this.w;
    return this.w = (this.w ^ (this.w >>> 19)) ^ (t ^ (t >>> 8)); 
  }
}
function dice(N){
  const seed = 114514;
  const random = new Random(seed);
  var p = random.next();
  return (Math.abs(p)%N)+1;
}
client.login(process.env.BOT_TOKEN);