/* ============================================
   木鱼 · 职场成长21课 — 数据层
   ============================================ */

// ── 五阶段定义 ──
const PHASES = {
  1: { name:'困', color:'#b0a0b8', colorDeep:'#a090a8', bell:'无', eyes:'疲惫半眯',
       image:'images/phase1_kun.png', storyImg:'images/s1.png', pracImg:'images/p1.png', greeting:'……敲一下试试？', cat:'瘦小猫，缩在木鱼后面不敢敲' },
  2: { name:'求', color:'#b8a0c8', colorDeep:'#a890b8', bell:'木槌', eyes:'睁眼好奇',
       image:'images/phase2_qiu.png', storyImg:'images/s2.png', pracImg:'images/p2.png', greeting:'在找鼓点？', cat:'稍胖，爪子搭在木鱼上' },
  3: { name:'撞', color:'#a080b8', colorDeep:'#9070a8', bell:'木鱼+裂痕', eyes:'低头沉思',
       image:'images/phase3_zhuang.png', storyImg:'images/s3.png', pracImg:'images/p3.png', greeting:'敲破了？没事。', cat:'圆润，木鱼上有裂痕但还在敲' },
  4: { name:'醒', color:'#8a60a8', colorDeep:'#7a5098', bell:'金槌', eyes:'半闭有神',
       image:'images/phase4_xing.png', storyImg:'images/s4.png', pracImg:'images/p4.png', greeting:'你的节奏，找到了吗？', cat:'胖乎乎，闭眼也能敲准' },
  5: { name:'行', color:'#6a4088', colorDeep:'#5a3078', bell:'无槌，以心为槌', eyes:'闭目微笑',
       image:'images/phase5_xing.png', storyImg:'images/s5.png', pracImg:'images/p5.png', greeting:'笃。笃。笃。', cat:'自在，木鱼声和心跳同频' },
};

// ── 表情映射 ──
const EMOJI_MAP = {
  happy:  '开心', angry: '生气', confused: '疑惑', sleepy: '困倦', snarky: '毒舌'
};

function emojiPath(phase, emotion) {
  const cn = EMOJI_MAP[emotion] || '疑惑';
  return `images/${phase}_阶段${['','一','二','三','四','五'][phase]}_${['','困','求','撞','醒','行'][phase]}_${cn}.png`;
}

// ── 木鱼台词库 ──
const DIALOG = {
  welcome: {
    1: ['……敲一下试试？','你也在加班？','木鱼在这儿。'],
    2: ['在找鼓点？','今天敲哪一关？','槌给你。'],
    3: ['敲破了？没事。','来来，歇会儿。','不急，节奏慢慢找。'],
    4: ['你的节奏，找到了吗？','下一关，准备好了就来。'],
    5: ['你来了。','笃。笃。笃。','……'],
  },
  choice_good: {
    1: ['嗯……你敢敲。','算你有点胆量。'],
    2: ['嗯，不错。','鼓点越来越稳了。'],
    3: ['嗯，敢面对就好。','你比自己想的扛得住。'],
    4: ['嗯，不错。','你越来越有自己的节奏了。'],
    5: ['好。','……'],
  },
  choice_avoid: {
    1: ['躲一会儿也行。','你确定？'],
    2: ['也行。','你开心就好。'],
    3: ['躲一会儿也行。','选哪个都行。'],
    4: ['不急。','有意思……'],
    5: ['……','你听到了吗？'],
  },
  practice: {
    1: ['试试看。','我在旁边。'],
    2: ['跟着我来。','不用太用力。'],
    3: ['不用想太多，感受就行。','嗯……就这样。'],
    4: ['闭上眼睛。','感受这一刻。'],
    5: ['……','呼吸就好。'],
  },
  sutra_intro: {
    1: ['这句啊……','古人说的。'],
    2: ['说白了就是……','你品，你细品。'],
    3: ['古人说的，其实就是你工位上那点事。','这句讲的是……'],
    4: ['这句，你自己品。','……'],
    5: ['……','你自己想想。'],
  },
  quote_close: {
    1: ['下一关见。','嗯……下次再来。'],
    2: ['嗯，过了。','下一关，准备好了就来。'],
    3: ['你比我想的扛得住。','不急，歇会儿也好。'],
    4: ['下一关，是关于你自己的节奏。','笃。'],
    5: ['下一轮，也从这里开始。','不急。'],
  },
  daily: {
    1: ['嗯，你来了。'],
    3: ['今天也来了？'],
    7: ['哟，认真的啊。'],
    14: ['每天都来，累不累？'],
    21: ['……'],
  },
  return_after_break: {
    7: '木鱼一直在。',
    14: '嗯，你来了。',
    30: '……笃……笃……笃……',
  }
};

// ── 21关数据 ──
const LEVELS = [
  { id:1,  phase:'困', title:'焦虑', subtitle:'周一早上，你已经在想周五了',
    sutra:'重为轻根，静为躁君。',
    sutraBaihua:'你不是讨厌工作。你是讨厌不知道为什么工作。',
    story:{ text:'周日晚上十点。你躺在床上，盯着天花板。\n明天又是周一。\n你开始算：还有五天。还有四十个小时。还有两千四百分钟。\n你还没开始上班，就已经累了。\n手机亮了一下。木鱼蹲在床头柜上，爪子搭在木鱼上：\n「你怕的不是周一。你怕的是——又一个不知道为什么忙碌的星期。」', image:'images/story_scene.png' },
    choices:[
      { text:'想想这周有什么值得期待的事', feedback:'嗯，找到一点光，就能照亮一整周。', emo:'happy' },
      { text:'什么都不想，闭眼睡觉', feedback:'躲一会儿也行。但明天还是要敲下去的。', emo:'sleepy' }
    ],
    practice:{ title:'焦虑清单', instruction:'拿张纸，画两栏：\n左栏写「我在担心的事」——全部写下来，一件不落。\n右栏写「我能做的事」——只写你能控制的。\n写完看看：你担心的事里，有多少是你控制不了的？\n把控制不了的——划掉。剩下的——排个优先级。\n从第一件开始。笃。', image:'images/practice_scene.png' },
    quote:'你不是讨厌工作。你是讨厌不知道为什么工作。' },
  { id:2,  phase:'困', title:'迷茫', subtitle:'地图还没画好，怎么走路',
    sutra:'道可道，非常道。名可名，非常名。',
    sutraBaihua:'迷路的时候，先停下来。地图比速度重要。',
    story:{ text:'你打开招聘网站，看了半小时。\n产品经理？运营？数据分析？好像都可以。好像都不对。\n你关上页面，又打开。重复了三次。\n木鱼从键盘后面探出头：\n「你连自己是什么树都不知道——就急着找坑？先坐一会儿。」', image:'images/story_scene.png' },
    choices:[
      { text:'写下自己最擅长的三件事', feedback:'嗯。从自己出发，比从岗位出发靠谱。', emo:'happy' },
      { text:'继续刷招聘信息', feedback:'也行。刷够了自然会停。', emo:'sleepy' }
    ],
    practice:{ title:'方向梳理想', instruction:'拿张纸。画三个圈：\n1. 你擅长的事\n2. 你喜欢的事\n3. 能赚钱的事\n三个圈重叠的地方——就是你该去的方向。\n如果没有重叠——先选一个圈开始。', image:'images/practice_scene.png' },
    quote:'迷路的时候，先停下来。地图比速度重要。' },
  { id:3,  phase:'求', title:'比较', subtitle:'朋友圈里人人都在升职加薪',
    sutra:'胜人者有力，自胜者强。',
    sutraBaihua:'别人的进度条，跟你没有半毛钱关系。',
    story:{ text:'你刷到大学室友的朋友圈：\"入职三周年，感谢遇见。\"配图是工牌和下午茶。\n你默默点了个赞。然后看了眼自己的工位——还没他的一半大。\n你心里堵得慌。\n木鱼把手机推远了一点：\n「你在跟谁比？跟他？还是跟三年前的自己？」', image:'images/story_scene.png' },
    choices:[
      { text:'关掉朋友圈，想想自己这一年的进步', feedback:'嗯。跟自己比，比跟任何人比都重要。', emo:'happy' },
      { text:'我就是要比！', feedback:'也行。比累了就不比了。', emo:'angry' }
    ],
    practice:{ title:'自我进步清单', instruction:'写下今年你做到了三件事——任何事都算。\n学会了一个技能？存了一笔钱？坚持了一件事？\n写完读一遍。这就是你的进度条。\n跟别人没关系。', image:'images/practice_scene.png' },
    quote:'别人的进度条，跟你没有半毛钱关系。' },
  { id:4,  phase:'求', title:'倦怠', subtitle:'做什么都提不起劲',
    sutra:'飘风不终朝，骤雨不终日。',
    sutraBaihua:'累不是问题。没劲才是。',
    story:{ text:'你坐在工位上，打开文档，盯着光标闪了十分钟。\n啥也不想干。\n不是懒——就是没劲。像电池被拔了。\n木鱼敲了一声：笃。\n「不是你没劲。是你太久没听到自己的声音了。来，敲一下。就一下。」', image:'images/story_scene.png' },
    choices:[
      { text:'今天只做一件最重要的事', feedback:'嗯。一件就够了。剩下的——明天再说。', emo:'happy' },
      { text:'请假休息一天', feedback:'也行。电池没电了就该充电。', emo:'sleepy' }
    ],
    practice:{ title:'最小行动法', instruction:'今天只做一件事。一件。\n把它写下来。做完就划掉。\n划掉的那一刻——你已经赢了今天。\n木鱼的节奏：笃。一下。一下。就够了。', image:'images/practice_scene.png' },
    quote:'累不是问题。没劲才是。让木鱼帮你敲一下。' },
  { id:5,  phase:'求', title:'方向', subtitle:'该不该转行？该不该跳槽？',
    sutra:'知人者智，自知者明。',
    sutraBaihua:'树挪死，人挪活。但你得先知道自己是什么树。',
    story:{ text:'你又打开了招聘软件。\n这次你投了三份简历。但每一份投出去之后，你都觉得自己在瞎投。\n你真的想去那些公司吗？还是——你只是不想留在这里？\n木鱼趴在手机旁边：\n「离开一个地方可以有很多理由。但去一个地方——最好只有一个理由：你真的想去。」', image:'images/story_scene.png' },
    choices:[
      { text:'先搞清楚自己为什么想走', feedback:'嗯。知道为什么走，才知道该往哪走。', emo:'happy' },
      { text:'先投了再说', feedback:'也行。但投之前——至少想清楚一件事：你要的是什么？', emo:'confused' }
    ],
    practice:{ title:'离职原因清单', instruction:'写下你想离开的三个理由。\n再写下你理想工作的三个条件。\n对比一下：你是要逃离什么？还是要走向什么？\n逃离和走向——是两条完全不同的路。', image:'images/practice_scene.png' },
    quote:'离开一个地方可以有很多理由。但去一个地方——最好只有一个理由。' },
  { id:6,  phase:'求', title:'学习', subtitle:'学不动了，知识焦虑',
    sutra:'少则得，多则惑。',
    sutraBaihua:'不是学不动。是学得太杂。一年只学一件事。',
    story:{ text:'你的收藏夹里有47篇\"有空再看\"。\n你的网盘里有12门没听完的课。\n你的书桌上堆着5本只翻到第20页的书。\n你觉得你该学的东西太多了。但你什么也没学会。\n木鱼用爪子敲了一下木鱼：笃。\n「一年只敲一个节奏。敲一年——你就是大师。」', image:'images/story_scene.png' },
    choices:[
      { text:'删掉所有\"有空再看\"，只留一个', feedback:'嗯。少即是多。专注一件事比了解一百件事强。', emo:'happy' },
      { text:'列个学习计划', feedback:'计划是好的。但别列太多。一年——一个。', emo:'snarky' }
    ],
    practice:{ title:'断舍离学习法', instruction:'打开你的收藏夹。\n删掉所有你三个月没打开过的。\n只留下一个——你最想学、最能帮你赚更多/做得更好的。\n接下来三个月，只学这一个。\n笃。笃。笃。一个节奏敲到底。', image:'images/practice_scene.png' },
    quote:'不是学不动。是学得太杂。一年只学一件事。' },
  { id:7,  phase:'求', title:'拒绝', subtitle:'不敢说\"不\"的人，活得很累',
    sutra:'知足不辱，知止不殆，可以长久。',
    sutraBaihua:'你敢拒绝那些不属于你的事吗？',
    story:{ text:'同事说：\"帮我个忙，很快的。\"\n老板说：\"这个你加班搞一下。\"\n你说：\"好的。\"\n然后你一个人在公司待到十一点。你自己的活——还没开始。\n木鱼敲了一声：笃。\n「你帮了所有人。谁帮你？」', image:'images/story_scene.png' },
    choices:[
      { text:'明天开始，学会说\"不\"', feedback:'嗯。说\"不\"不是自私——是保护你自己的节奏。', emo:'happy' },
      { text:'我不好意思拒绝', feedback:'你不好意思拒绝别人。好意思拒绝自己？', emo:'snarky' }
    ],
    practice:{ title:'拒绝练习', instruction:'下次有人找你帮忙——等三秒再说\"好的\"。\n三秒里问自己：这件事是我的责任吗？我有时间吗？\n如果不是、没有——就说：\"我现在手上有事，帮不了。\"\n不需要解释。不需要抱歉。', image:'images/practice_scene.png' },
    quote:'你帮了所有人。谁帮你？' },
  { id:8,  phase:'撞', title:'失败', subtitle:'搞砸了。全搞砸了。',
    sutra:'祸兮福之所倚，福兮祸之所伏。',
    sutraBaihua:'搞砸就搞砸。木鱼敲歪一声，节奏也不会停。',
    story:{ text:'项目的方案被毙了。第三次。\n老板说：\"你再想想。\"你听出了——\"我不满意\"。\n你回到工位上，想摔键盘。\n木鱼蹲在显示器上面，尾巴垂下来：\n「敲歪了一下。笃——歪了。然后呢？下一声。笃。继续。」', image:'images/story_scene.png' },
    choices:[
      { text:'休息十分钟，然后改第四版', feedback:'嗯。敲歪了就重敲。节奏不会断。', emo:'happy' },
      { text:'今天不干了，明天再说', feedback:'也行。有时候停下来，比硬敲更清醒。', emo:'sleepy' }
    ],
    practice:{ title:'失败复盘三问', instruction:'想一件最近搞砸的事。\n问自己三个问题：\n1. 哪里出了问题？（不怪别人）\n2. 如果重来，怎么做？\n3. 从这件事里——你学到了什么？\n学到东西的失败，不叫失败。叫学费。', image:'images/practice_scene.png' },
    quote:'搞砸就搞砸。木鱼敲歪一声，节奏也不会停。' },
  { id:9,  phase:'撞', title:'内卷', subtitle:'拼命加班，到底为了什么',
    sutra:'为学日益，为道日损。损之又损，以至于无为。',
    sutraBaihua:'你在跑步机上跑到吐血——往前移动了一厘米吗？',
    story:{ text:'晚上九点。你看了看周围的同事。没有人走。\n你又坐下了。打开一个文档，假装在忙。\n其实你该做的事早就做完了。但你不能走——因为别人都没走。\n木鱼敲了三下：笃、笃、笃。\n「你在陪谁加班？陪你的同事？还是陪你的——害怕？」', image:'images/story_scene.png' },
    choices:[
      { text:'做完事就走，不管别人', feedback:'嗯。效率是给自己看的，不是演给老板看的。', emo:'happy' },
      { text:'继续坐着，等一个人先走', feedback:'……你确定要一直等别人先走？', emo:'snarky' }
    ],
    practice:{ title:'效率审计', instruction:'记录你一天的时间花在哪。\n每半小时记一次。\n到晚上看看——有多少时间是真的在做事？多少时间在\"假装忙\"？\n假装忙比真忙更累。因为心累。', image:'images/practice_scene.png' },
    quote:'你在跑步机上跑到吐血——往前移动了一厘米吗？' },
  { id:10, phase:'撞', title:'委屈', subtitle:'做了那么多，没人看见',
    sutra:'上善若水。水善利万物而不争。',
    sutraBaihua:'努力不一定被看见。但你的节奏——你自己听到就行。',
    story:{ text:'你熬了三个晚上做的方案，被老板一句话否决：\"方向不对。\"\n你想说：我做了这么多准备。我查了二十份报告。我改了八版。\n但你没说。你只是点了点头：\"好的，我改。\"\n木鱼把槌推到你手边：\n「他没看见没关系。你看见了。你知道自己做了多少——这就够了。」', image:'images/story_scene.png' },
    choices:[
      { text:'把做过的准备写进下一次汇报', feedback:'嗯。让别人看见你的努力，也是一种能力。', emo:'happy' },
      { text:'算了，不被看见就不被看见', feedback:'也行。但记住——你的价值不取决于别人有没有看见。', emo:'sleepy' }
    ],
    practice:{ title:'隐形努力清单', instruction:'写下一件你做了很多却没人知道的事。\n然后写下：你从这件事里学到了什么？\n这些学到的东西——是你的。谁都拿不走。\n至于别人看不看得见——那是他们的事。', image:'images/practice_scene.png' },
    quote:'努力不一定被看见。但你的节奏——你自己听到就行。' },
  { id:11, phase:'撞', title:'选择', subtitle:'两个offer，两条路，选哪个',
    sutra:'知不知，尚矣；不知知，病也。圣人不病，以其病病。',
    sutraBaihua:'选A怕后悔，选B怕错过。智慧不是知道答案——是承认自己看不清。',
    story:{ text:'你拿到两个offer。一个钱多但无聊。一个有趣但钱少。\n你问了五个人。得到了五种答案。你更困惑了。\n木鱼蹲在两个信封中间：\n「别人告诉你选A选B。但五年后——是你坐在那个工位上，不是他们。」', image:'images/story_scene.png' },
    choices:[
      { text:'列出每个选择的长期影响', feedback:'嗯。把眼光放长——答案会自己跳出来。', emo:'happy' },
      { text:'抛硬币决定', feedback:'硬币抛起来的时候——你心里已经在等某一面了。那就是答案。', emo:'confused' }
    ],
    practice:{ title:'选择推演', instruction:'拿张纸。画两条线——代表两个选择。\n每条线下面写：一年后、三年后、五年后——你的生活会是什么样？\n不是钱。是生活。是你每天醒来的感觉。\n哪个画面让你更期待？那就是答案。', image:'images/practice_scene.png' },
    quote:'选A怕后悔，选B怕错过。那就选你更害怕失去的那个。' },
  { id:12, phase:'醒', title:'节奏', subtitle:'别人都跑得很快，我是不是太慢了',
    sutra:'合抱之木，生于毫末；九层之台，起于累土。',
    sutraBaihua:'笃。笃。笃。木鱼不跟任何人比快慢。',
    story:{ text:'同学群里，又有人买房了。朋友圈里，又有人升总监了。\n你看着自己——还在原地。还在做差不多的事，拿差不多的钱。\n你开始怀疑：是不是我太慢了？\n木鱼敲了一下：笃。\n「有的人跑百米。有的人跑马拉松。你跟一个跑百米的人比速度——你会把自己跑死的。」', image:'images/story_scene.png' },
    choices:[
      { text:'按自己的节奏来', feedback:'嗯。马拉松选手不看旁边的人。只看自己的路。', emo:'happy' },
      { text:'我得加速了', feedback:'加速可以。但别忘了——加速也要踩在自己的跑道上。', emo:'snarky' }
    ],
    practice:{ title:'时间块实验', instruction:'选一件你今天必须完成的事。\n设定一个25分钟的倒计时——在这25分钟里，只做这一件事。\n手机静音、关掉聊天软件、不刷任何东西。\n25分钟后——停下来。休息5分钟。\n这个就叫一个「时间块」。\n今天试试——你能完成几个时间块？', image:'images/practice_scene.png' },
    quote:'笃。笃。笃。木鱼不跟任何人比快慢。' },
  { id:13, phase:'醒', title:'边界', subtitle:'下班了，但还在想工作',
    sutra:'知足者富，强行者有志。不失其所者久。',
    sutraBaihua:'下班后的你，不是工具。工具才24小时待机。',
    story:{ text:'晚上十一点。你躺在床上，脑子里还在过明天的会议。\n你翻了翻工作群——没人说话。但你总觉得有人会找你。\n你把手机放在枕头边，时不时看一眼。\n木鱼用爪子把手机推到床底下：\n「它不属于这张床。你也不属于那个群——至少现在不属于。」', image:'images/story_scene.png' },
    choices:[
      { text:'从今天开始，睡前半小时不看手机', feedback:'嗯。床是睡觉的。手机是工作的。分开。', emo:'happy' },
      { text:'工作需要我随时在线', feedback:'工作是需要的。但你——也是需要的。', emo:'snarky' }
    ],
    practice:{ title:'时间边界仪式', instruction:'每天下班时做一个动作——关掉工作聊天软件的通知。\n或者把手机放到另一个房间。\n用一个仪式告诉自己：现在，我是我的。\n不是公司的。不是老板的。是我的。', image:'images/practice_scene.png' },
    quote:'下班后的你，不是工具。工具才24小时待机。' },
  { id:14, phase:'醒', title:'意义', subtitle:'工作到底为了什么',
    sutra:'人法地，地法天，天法道，道法自然。',
    sutraBaihua:'为了钱。为了成长。为了不浪费时间。都对——但你自己的答案呢？',
    story:{ text:'朋友问你：\"你喜欢你现在的工作吗？\"\n你愣了一下。\n你喜欢吗？你不知道。你只知道它给你发工资。\n但除了工资之外——它给了你什么？\n木鱼蹲在你面前，看着你：\n「钱是燃料。不是目的地。你的目的地是什么？」', image:'images/story_scene.png' },
    choices:[
      { text:'写下来——工作对我意味着什么', feedback:'嗯。写下来。答案不重要，重要的是你在想。', emo:'happy' },
      { text:'赚钱就够了，不想那么多', feedback:'也行。但如果有一天钱够了——然后呢？', emo:'confused' }
    ],
    practice:{ title:'工作意义三问', instruction:'拿张纸，写下三个问题：\n1. 除了赚钱，我的工作还能给我什么？\n2. 五年后我想成为什么样的人？\n3. 现在的工作——能帮我成为那个人吗？\n答案不需要完美。只需要诚实。', image:'images/practice_scene.png' },
    quote:'钱是燃料。不是目的地。你的目的地——是什么？' },
  { id:15, phase:'醒', title:'放下', subtitle:'完美主义让我什么也做不了',
    sutra:'大成若缺，其用不弊。大盈若冲，其用不穷。',
    sutraBaihua:'完成比完美重要。木鱼不需要敲得完美，只需要敲下去。',
    story:{ text:'你改了第九版PPT。每次都觉得\"还差一点\"。\n同事的PPT只改了三版，已经交上去通过了。\n你还在调字体。还在对齐图片。还在纠结那个标题要不要换个词。\n木鱼敲了一下：笃。\n「你以为你在追求完美。其实你在逃避——逃避\"做完\"的那一刻。」', image:'images/story_scene.png' },
    choices:[
      { text:'现在，立刻交上去', feedback:'嗯。做完。比完美重要一百倍。', emo:'happy' },
      { text:'再改一版', feedback:'……你确定吗？第九版和第八版的区别——可能只有你自己看得出来。', emo:'snarky' }
    ],
    practice:{ title:'80分原则', instruction:'下次做一件事——到80分的时候就交出去。\n80分的意思是：能用、能看、不出大错。\n剩下的20分——让别人的反馈帮你补上。\n你省下来的时间——去做下一件80分的事。', image:'images/practice_scene.png' },
    quote:'完成比完美重要。木鱼不需要敲得完美，只需要敲下去。' },
  { id:16, phase:'醒', title:'真实', subtitle:'在公司里，你戴了几层面具',
    sutra:'信言不美，美言不信。善者不辩，辩者不善。',
    sutraBaihua:'你每天都在演。演到后来——连自己都信了。',
    story:{ text:'开会的时候，你说了\"我同意\"。其实你不同意。\n团建的时候，你笑得很开心。其实你想回家。\n你跟同事说\"挺好的\"。其实你不太好。\n你已经习惯了——戴上面具再去公司。\n木鱼把一面小镜子推到你面前：\n「你每天在演。累不累？镜子里这个人——你还认识吗？」', image:'images/story_scene.png' },
    choices:[
      { text:'今天做一件忠于自己的事', feedback:'嗯。哪怕很小——说一句真话，做一次真表情。', emo:'happy' },
      { text:'工作需要面具，没办法', feedback:'工作需要专业。但专业不等于说谎。', emo:'confused' }
    ],
    practice:{ title:'面具觉察', instruction:'今天留意：你在工作中说了几次\"言不由衷\"的话。\n不一定要改。先数一下。\n数着数着——你可能会发现：有些面具可以摘掉。\n那些可以摘掉的——摘掉。', image:'images/practice_scene.png' },
    quote:'你每天在演。演到后来——连自己都信了。' },
  { id:17, phase:'行', title:'习惯', subtitle:'每天1%的改变，比100%的计划有用',
    sutra:'天下难事，必作于易；天下大事，必作于细。',
    sutraBaihua:'1%的改变，比100%的计划管用。木鱼一下一下敲——不是一下敲出瀑布。',
    story:{ text:'你年初列了十个目标。现在六月了——一个都没完成。\n你怪自己懒。怪自己不够自律。\n但问题不在这里。问题是——十个目标太多了。\n木鱼敲了一下：笃。\n「别列十个。只列一个。每天做一点。\n笃。笃。笃。三百六十五天——就是三百六十五下。你算算有多远？」', image:'images/story_scene.png' },
    choices:[
      { text:'今天只定一个小习惯，坚持一周', feedback:'嗯。一个。就一个。一周后回来看看。', emo:'happy' },
      { text:'我明天一定开始', feedback:'\"明天\"是最危险的两个字。不如——现在？', emo:'snarky' }
    ],
    practice:{ title:'微习惯启动', instruction:'选一个你想养成的习惯。\n把它缩小到你不可能失败的程度。\n比如：\"每天读一页书\"而不是\"每天读一小时\"。\n从今天开始。笃。一下。就够了。', image:'images/practice_scene.png' },
    quote:'1%的改变，比100%的计划管用。笃。一下。就够了。' },
  { id:18, phase:'行', title:'勇气', subtitle:'想离开舒适区，但腿迈不动',
    sutra:'千里之行，始于足下。',
    sutraBaihua:'笃——这一声比上一声大一点。就够了。',
    story:{ text:'你有一个想法——换工作、创业、学一个新领域的技能。\n你放在心里两年了。每次想行动的时候——\"万一\"就冒出来。\n万一不行呢？万一失败了？万一后悔？\n木鱼敲了一声：笃。比平时重了一点点。\n「你已经在舒适区待了两年了。再待两年——你觉得会不一样吗？」', image:'images/story_scene.png' },
    choices:[
      { text:'今天做一件突破舒适区的小事', feedback:'嗯。不用辞职。先投一份简历。先打一个电话。先迈一小步。', emo:'happy' },
      { text:'再等等，时机还不成熟', feedback:'时机永远不会成熟。成熟的只有你自己的决定。', emo:'snarky' }
    ],
    practice:{ title:'恐惧清单', instruction:'写下你想做又不敢做的事。\n然后在旁边写：最坏的结果是什么？\n那个最坏的结果——你承受得了吗？\n大概率——承受得了。\n那就——笃。敲下去。', image:'images/practice_scene.png' },
    quote:'笃——这一声比上一声大一点。就够了。' },
  { id:19, phase:'行', title:'坚持', subtitle:'想放弃的时候，再敲一下',
    sutra:'慎终如始，则无败事。',
    sutraBaihua:'不是跑最快的人赢。是不停的人赢。木鱼敲了十九下——还在敲。',
    story:{ text:'你回头看第一关时的自己。\n那时候你还在纠结周一要不要请假。\n现在呢？你已经走过了十八关。\n有些关你选了勇敢。有些关你选了逃避。但你没有放弃。\n木鱼敲了三下：笃、笃、笃。\n「十九下。你敲了十九下。还剩两下——不敲完吗？」', image:'images/story_scene.png' },
    choices:[
      { text:'敲完最后两下', feedback:'嗯。有始有终。木鱼就是这样敲的。', emo:'happy' },
      { text:'回顾一下自己最大的三个改变', feedback:'好主意。回头看看走过的路——你会惊讶的。', emo:'happy' }
    ],
    practice:{ title:'成长回顾', instruction:'翻开你一路写下的笔记。\n看看每一关的选择。看看那些让你哭过、笑过、放弃过的。\n然后——对自己说一句：\"谢谢你还在这里。\"\n笃。笃。笃。你还在敲。这就够了。', image:'images/practice_scene.png' },
    quote:'不是跑最快的人赢。是不停的人赢。木鱼敲了十九下——还在敲。' },
  { id:20, phase:'行', title:'感恩', subtitle:'那些拉过你一把的手',
    sutra:'既以为人，己愈有；既以与人，己愈多。',
    sutraBaihua:'回头看。那些帮过你的人——你没忘吧？给出去的，最后都会回到你身上。',
    story:{ text:'你想起刚入职时带你改PPT的那个前辈。\n想起那个帮你说话的主管。想起那个在你最低谷时请你吃饭的朋友。\n他们可能不知道——那一把有多重要。\n但你知道。\n木鱼轻轻敲了一下：笃。\n「走了这么远——回头看看。那些扶过你的手。没忘吧？」', image:'images/story_scene.png' },
    choices:[
      { text:'给一个帮过我的人发条消息', feedback:'嗯。不用多长。一句\"谢谢\"就够了。', emo:'happy' },
      { text:'在心里默默感谢', feedback:'也行。但发出去——会更暖。', emo:'sleepy' }
    ],
    practice:{ title:'感恩信', instruction:'想一个对你有过帮助的人。\n写一封短信——不用华丽的词。就说：\"那时候你帮我那次——我一直记着。谢谢你。\"\n发出去。\n你可能会哭。但那是好的哭。', image:'images/practice_scene.png' },
    quote:'回头看。那些帮过你的人——你没忘吧？' },
  { id:21, phase:'行', title:'终点', subtitle:'没有终点。下一声——就是新的开始。',
    sutra:'反者道之动，弱者道之用。天下万物生于有，有生于无。',
    sutraBaihua:'二十一关走完了。然后呢？道的规律是循环——结束就是开始。笃。下一声。',
    story:{ text:'你走到了最后一关。21。\n你以为是终点。但其实不是。\n木鱼蹲在木鱼旁边——真正的木鱼旁边。\n它看着你，眼睛弯弯的：\n「二十一关走完了。然后呢？\n笃。下一声。\n你的节奏——现在在你自己的手里。」', image:'images/story_scene.png' },
    choices:[
      { text:'重新开始，再走一轮', feedback:'嗯。每走一遍都是新的成长。节奏会越来越稳。', emo:'happy' },
      { text:'先敲一下木鱼再说', feedback:'笃。听到了吗？那是你自己的声音。', emo:'sleepy' }
    ],
    practice:{ title:'个人成长地图', instruction:'拿张纸，从中心画一条线。\n线的起点写：第1关的我。\n线的终点写：现在的我。\n在线上标注对你最重要的3个转折点。\n每个转折点旁边写一句话——那句话改变了你。\n这就是你的成长地图。\n笃。下一轮，地图会更长。', image:'images/practice_scene.png' },
    quote:'没有终点。下一声——就是新的开始。笃。' }
];
