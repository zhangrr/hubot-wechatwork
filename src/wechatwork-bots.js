/**
 * Wechat Work bots for creating chat rooms, etc
 *
 * Author: billtt
 */

module.exports = robot => {

  robot.hear(/Hi/i, res => {
    res.send("主人，您有什么要求？"); 
  });
  
  robot.respond(/chat create ([a-zA-Z0-9]+) ([a-zA-Z0-9]+(,[a-zA-Z0-9]+)+)/i, async res => {

    //res.send(`${res.match[1]} ${res.match[2]} ${res.envelope.user.id}`); 

    const chatId = res.match[1];
    const users = res.match[2].split(',');
    const owner = res.envelope.user.id;

    const err = await robot.wwork.createChat(chatId, users, owner);

    if (err) {
        res.send(`Error creating chat:\n${err}`);
    } else {
        await robot.wwork.sendChatMessage(chatId, "群聊建立成功");
        res.send(`OK!`);
    }

  });
}
