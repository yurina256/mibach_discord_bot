const Discord = require('discord.js')
const client = new Discord.Client()
var fukubiki = [];
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
const seed = 45864542;
const random = new Random(seed);
const twitter = require("twitter");
const fs = require("fs");
const { report } = require('process');
const Twclient = new twitter({
  consumer_key:        process.env.TwitterKEY_A,
  consumer_secret:     process.env.TwitterKEY_B,
  access_token_key:    process.env.TwitterKEY_C,
  access_token_secret: process.env.TwitterKEY_D,
});
client.on('ready', () => {
  console.log(`${client.user.username} でログインしています。`);
  client.user.setActivity("最強雄筋肉ちんぽバトル",{type:"PLAYING"});
})
client.on('message', async msg => {
    const fs = require('fs');
    const kengen = true;
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
  }else if(command === '!marry'&&str.length<=8){
    msg.channel.send(str[1]+'、結婚してくれ、俺が幸せにする');
  }else if(command === '!dice'||command === '!d'){
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
    client.user.setAvatar(file.url())
  }else if(command === "!name"){
    msg.guild.members.cache.get(client.user.id).setNickname(str[1]);
  }else if(command.match(/^!\dd\d{1,4}$/)){//ndn表記
    command = command.split("!").join("").split("d").map(Number);
    var ans = [];
    var sum = 0;
    for(var i=0;i<command[0];i++){
      var tmp = dice(command[1]);
      ans.push(String(tmp));
      sum += tmp;
    }
    if(isNaN(sum)) return;
    else if(ans.length==1) msg.channel.send('🎲dice => '+ans[0]);
    else msg.channel.send('🎲dice => '+ans.join('+')+" => "+sum);
  }else if(command == "!time"){
    var params = {screen_name: '0x10a9fc70042'};
    if(str[1]){params.screen_name = str[1]}
    Twclient.cache.get('statuses/user_timeline', params, function(error, tweets, response) {
     // console.log('TwitterKEY_A','TwitterKEY_B','TwitterKEY_C','TwitterKEY_D')
      if (!error) {
            //ID=>時刻換算処理
            console.log(tweets[0].id_str)
            var n = BigInt(tweets[0].id_str);
            n = n>>22n;
            n +=  1288834974657n;
            var ans = new Date(Number(n))
            console.log(ans)
            msg.channel.send(ans.cache.getHours()+":"+(ans.cache.getMinutes()>=10?"":"0")+ans.cache.getMinutes()+":"+(ans.cache.getMinutes()>=10?"":"0")+ans.cache.getSeconds()+"."+ans.cache.getMilliseconds());
      }else{
          console.log("twtt error!!");
          //IDが存在しなかったときも呼ばれる
          msg.channel.send("not found");

      }
    });
  }else if(command == "!bf"){
    var arr = new Array(65535).fill(0);
    var pointer = 0;
    var input = 0;
    var ans = "";
    for(var i=0;i<str[1].length;i++){
      switch(str[i]){
        case "<":
        pointer--;
        break;
        case ">":
        pointer++;
        break;
        case "+":
        arr[pointer]++;
        break;
        case "-":
        arr[pointer]--;
        break;
      }
    }
  }else if(command == "!dm_t"){
    msg.author.send("Message to Send");
  }else if(command == "!odai_add"&&str[1].length!=0){
    fukubiki.push([msg.author.username,str[1]]);
    msg.author.send("追加されました:"+fukubiki[fukubiki.length-1][1]);
  }else if(command == "!odai_get"){
    if(fukubiki.length == 0){
      msg.author.send("中身がカラッポですぞ");
    }else{
      var point = Math.floor(Math.random()*fukubiki.length); 
      msg.author.send(fukubiki[point][1]);
      msg.author.send("送信者："+fukubiki[point][0]);
      fukubiki.splice(point,1);
    }
  }else if(command == "!nko"){
    const table = ["う","ま","ち","ん","こ","お"];
    var tmp = [];
    var k = [4,5,6,7][dice(4)-1];
    for(var i=0;i<k;i++){
      tmp.push(table[dice(6)-1]);
    }
    msg.channel.send("\`\`\`"+tmp.join(" ")+"\`\`\`");
    var b = new Array(6).fill(0);
    b[0] += tmp.filter(val => val == "う").length;
    b[1] += tmp.filter(val => val == "ま").length;
    b[2] += tmp.filter(val => val == "ち").length;
    b[3] += tmp.filter(val => val == "ん").length;
    b[4] += tmp.filter(val => val == "こ").length;
    b[5] += tmp.filter(val => val == "お").length;
    if(b[0]>=1 && b[2]>=1 && b[3]>=1) msg.channel.send("*UNCHI*"),f=true;
    if(b[0]>=1 && b[4]>=1 && b[3]>=1) msg.channel.send("*UNKO*"),f=true;
    if(b[1]>=1 && b[4]>=1 && b[3]>=1) msg.channel.send("*MANKO*"),f=true;
    if(b[1]>=1 && b[4]>=1 && b[3]>=1 && b[5]>=1) msg.channel.send("*OMANKO*"),f=true;
    if(b[2]>=1 && b[4]>=1 && b[3]>=1) msg.channel.send("*CHINKO*"),f=true;
    if(b[2]>=2 && b[3]>=2) msg.channel.send("*CHINCHIN*"),f=true;
    if(b[2]>=2 && b[3]>=2 && b[5]>=1) msg.channel.send("*OCHINCHIN*"),f=true;
  }else if(command == "!nko​"){//不正おちんちん zerowidth space
    tmp = ["お","ち","ん","ち","ん"];
    msg.channel.send("\`\`\`"+tmp.join(" ")+"\`\`\`");
    msg.channel.send("*CHINCHIN*"),f=true;
    msg.channel.send("*OCHINCHIN*"),f=true;
  }else if(command == "!debug"){

    var server = msg.guild;
    console.log(server.members);
  }
  console.log(str);
});
function dice(N){
  var p = random.next();
  return (Math.abs(p)%N)+1;
}
client.login(process.env.BOT_TOKEN);