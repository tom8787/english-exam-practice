// 照片上的紅色勾選決定範圍；教材內容只作為學習資料。
const VOCAB = [
['episode','一集（節目）','n.',1,11,'Sara spent one month watching every episode of Stranger Things on Netflix.','every episode：每一集；episode 是可數名詞。'],
['coastline','海岸線','n.',1,11,'The railway is built along the coastline and has a wonderful view of the sea.','along the coastline：沿著海岸線。'],
['journey','旅行；旅程','n.',1,11,'The couple went on a journey to a foreign country during their vacation.','go on a journey：去旅行。'],
['detail','細節','n.',1,12,'The students are taking notes on all the details of the project in order to do it correctly.','all the details：所有細節，注意複數。'],
['crispy','酥脆的','adj.',1,12,'Tyler loves eating potato chips because of the crispy texture.','crispy texture：酥脆的口感。'],
['combination','結合','n.',1,12,'This dessert is a great combination of chocolate and banana.','a combination of A and B：A 與 B 的結合；照片勾選的是名詞。'],
['destination','目的地；終點','n.',1,13,'London is a popular tourist destination. Millions of people visit there every year.','tourist destination：觀光目的地。'],
['enormous','巨大的','adj.',1,13,'Sean made an enormous cake which was enough to feed at least 50 people.','enormous = huge；an enormous cake。'],
['reflect','反映','vt.',1,13,'Jessie always arranges her schedule carefully, and it reflects how organized she is.','reflects how…：反映出……；主詞 it 使用 reflects。'],
['challenge','挑戰；質疑','n. / vt.',1,14,'Wendy took on the challenge of finishing all of the desserts within 20 minutes.','take on the challenge of V-ing：接受……的挑戰；動詞也有「質疑」的意思。'],
['subscribe','訂閱','vi.',1,14,'William has decided to subscribe to the music streaming service so that he can listen to a lot of music and podcasts.','subscribe to：訂閱，介系詞用 to。'],
['procedure','手續；程序','n.',2,37,'The workers followed the procedure for construction to build the bridge correctly and safely.','follow the procedure：遵照程序。'],
['mental','心理的','adj.',2,37,'It is important that people should pay more attention to their mental health.','mental health：心理健康。'],
['assistance','幫助','n.',2,38,'Lance is learning how to ride a bike with the assistance of his grandfather.','with the assistance of：在……的協助下。'],
['threat','威脅','n.',2,38,'John faced the threat of losing his job as he made more and more mistakes at work.','the threat of V-ing：……的威脅；勾選的是名詞 threat。'],
['circumstance','狀況；情況','n.',2,39,'During the exam, students are not allowed to speak under any circumstances.','under any circumstances：在任何情況下；常見複數 circumstances。'],
['witness','目擊；目擊者','vt. / n.',2,39,'Joe witnessed the car accident and claimed that the driver broke the speed limit.','witness an accident：目擊事故；a witness to the accident：事故的目擊者。'],
['property','財產','n.',2,40,'The wealthy businessman’s personal property includes ten expensive Mercedes-Benz cars.','personal property：個人財產；此義為不可數名詞。'],
['counselor','顧問','n.',2,40,'If you need some suggestions on how to improve your writing, visit one of the counselors in the writing center.','one of the counselors：顧問之一；英式拼法 counsellor。'],
['grief','悲痛；悲傷','n.',2,40,'Tina’s grief over the death of her cousin was clear to anyone who saw her crying.','grief over：對……的悲痛；此義為不可數名詞。'],
['heal','治癒','vi. / vt.',2,41,'Hanna is a professional counselor. She is trained to heal people with mental problems.','heal：使身體或心理恢復健康。'],
['regret','遺憾；懊悔','n. / vt.',2,41,'Vivian regretted joining the volleyball team because it took up too much of her time.','regret—regretted—regretted；regret V-ing：後悔做過某事。'],
['cherish','珍惜','vt.',2,41,'We should cherish the time we spend with our family.','cherish = treasure；cherish the time：珍惜時光。']
].map(([word,meaning,pos,unit,page,example,note])=>({word,meaning,pos,unit,page,example,note}));

const PASSAGES = {
sea:{title:'Seafood eco-labels · 海鮮標章',source:'習作 Unit 1 p.7（勾選閱讀素養）',text:'To protect ocean resources around the world, consumers are advised to follow the eco-labeling system whenever they decide on what to buy from markets or eat in restaurants. People’s choices about what seafood they consume have a great influence on marine life.',table:[
['Recommended（推薦）','Large in number; fed with natural or plant protein; move to a different place when the seasons change; caught using an environmentally friendly fishing method.','clams, oysters, lobster'],
['Think twice（三思）','Fed with trash fish; caught using methods that destroy places where animals live.','flower crab, sea bass, tuna'],
['Avoid（避免）','Small in number; slow growth in population; caught using methods that destroy places where animals live.','cuttlefish, shark, eel']]},
crime:{title:'Crime scene cleaners · 犯罪現場清潔員',source:'習作 Unit 2 p.14（勾選閱讀）',text:'When a crime occurs, it leaves a crime scene to be investigated. Few people think about who cleans all the mess up once the police have finished with their work. Those who do this work are called crime scene cleaners. Obviously, their job can be quite unpleasant, but that is not all it is about.\n\nMost of the work crime scene cleaners do results from suicides or people who have died naturally but were not found for some time. Cleaners receive special training that involves cleaning fake crime scenes, using pig blood for practice, before they start work individually.\n\nCrime scene cleaning is not as simple as cleaning a normal room. When bodies start to break down, the strong smells they create fill the whole place. Crime scene cleaners need to clean everything nearby with special equipment and chemicals to get rid of these bad smells.\n\nNaturally, this job can affect workers emotionally. As a result, cleaners often require professional counseling. After knowing what this job is about, would you want to be a crime scene cleaner?'}
};

const QUESTIONS=[];
function choice(id,unit,category,prompt,options,answer,explanation,source,extra={}){QUESTIONS.push({id,unit,category,type:'choice',prompt,options,answer,explanation,source,...extra});}
function fill(id,unit,category,prompt,answers,explanation,source,extra={}){QUESTIONS.push({id,unit,category,type:'text',prompt,answers:answers.map(a=>Array.isArray(a)?a:[a]),explanation,source,...extra});}
// 單字辨義與拼字題為依勾選單字編製的延伸練習。
VOCAB.forEach((v,i)=>{
 const distractors=VOCAB.filter(x=>x.word!==v.word && x.unit===v.unit).filter((x,j)=>j<3).map(x=>x.meaning);
 choice('meaning-'+v.word,v.unit,'vocab',`「${v.word}」的中文意思是？`,[v.meaning,...distractors],0,v.note,`課本 p.${v.page} · 勾選單字延伸題`,{word:v.word});
 fill('spell-'+v.word,v.unit,'spelling',`請拼出英文單字：${v.meaning}（${v.pos}）`,[v.word==='counselor'?['counselor','counsellor']:v.word],v.note,`課本 p.${v.page} · 勾選單字延伸題`,{word:v.word});
});
const t1='課本 Unit 1 p.24–25 · 勾選選擇題區';
choice('t1-1',1,'grammar','There will be only one player ____ for the national team.',['choose','chose','choosing','chosen'],3,'player 與 choose 是被動關係，過去分詞 chosen 修飾 player，表示「被選上的球員」。',t1);
choice('t1-2',1,'grammar','____ she speaks three languages impresses everyone.',['The fact','The fact,','The fact that','The fact which'],2,'The fact that + 完整子句：……這個事實。that 引導同位語子句，不能換成 which。',t1);
choice('t1-3',1,'grammar','The idea ____ the earth is flat has been proven wrong.',['which','×（不填）',', which','that'],3,'that 子句說明 idea 的內容；the earth is flat 已是完整子句。',t1);
choice('t1-4',1,'grammar','There ____ many people ____ in line to buy the new iPhone.',['is; waiting','are; waiting','is; waited','are; waited'],1,'many people 是複數，用 are；人主動排隊，以 waiting 修飾。',t1);
choice('t1-5',1,'grammar','Maggie accepted the truth ____.',['practice makes perfect','that practice makes perfect','and practice makes perfect','which practice makes perfect'],1,'the truth that + 子句：以同位語子句說明 truth 的內容。',t1);
const w1='習作 Unit 1 p.2 · 勾選選擇題區';
choice('w1-1',1,'grammar','People used to doubt the fact ____ the Earth is round.',['what','which','that','×（不填）'],2,'the fact that + 完整子句。',w1);
choice('w1-2',1,'grammar','There ____ more than five movies ____ from this novel so far.',['has; adapting','have; adapted','have been; adapting','have been; adapted'],3,'so far 搭配現在完成式 have been；movies 是複數，adapted 表示電影「改編自」小說。',w1);
choice('w1-3',1,'grammar','I kept making the same mistake on the test even after ____ myself not to do it again.',['reminded','reminding','I remind','being reminded'],1,'after 是介系詞，後接 V-ing；reminding myself 表示自己提醒自己。',w1);
choice('w1-4',1,'grammar','____ is believed that the small island was once under the sea.',['This','It','There','Which'],1,'It is believed that…：一般相信……，It 為虛主詞。',w1);
choice('w1-5',1,'grammar','Online streaming services have become one of ____ businesses since 2020.',['the successful','the more successful','the most successful','the least successful'],2,'one of the + 最高級 + 複數名詞；此處語意為最成功的企業之一。',w1);
const w2='習作 Unit 2 p.10 · 勾選選擇題區';
choice('w2-1',2,'grammar','Because the box was too heavy, Sally had difficulty ____ it to the second floor.',['carry','carried','carrying','to carry'],2,'have difficulty (in) V-ing：做……有困難。',w2);
choice('w2-2',2,'grammar','It is ____ that people still use their phones while crossing the street.',['surprise','surprising','surprised','surprisingly'],1,'It is + 形容詞 + that 子句；事情令人驚訝，用 surprising。',w2);
choice('w2-3',2,'grammar','____ out of their hometown and ____ down in a new city can be quite an exciting adventure for college students.',['Move; settle','Move; to settle','Moving; settling','Move; settled'],2,'動名詞片語作主詞；and 連接平行結構 Moving 與 settling。',w2);
choice('w2-4',2,'grammar','The witness told the police what ____ in the accident.',['happens','happening','has happened','had happened'],3,'事故發生在 told 之前，使用過去完成式 had happened。',w2);
choice('w2-5',2,'grammar','I noticed the clerk ____ by customers, so I decided to wait before ordering.',['surrounded','surround','surrounding','is surrounded'],0,'notice + 受詞 + 過去分詞；店員被顧客包圍，用 surrounded。',w2);
fill('p1-11',1,'phrases','The teaching method, which ____ connect students with the texts through dancing and music, is welcomed by schools.',['is meant to'],'be meant to + V：用於／旨在……；method 是單數，使用 is。','習作 Unit 1 p.2 · 勾選第 11 題');
fill('p1-12',1,'phrases','The students gathered in front of the school before ____ their field trip.',['setting out on'],'set out on：啟程；before 作介系詞，後接 setting。','習作 Unit 1 p.2 · 勾選第 12 題');
fill('p1-13',1,'phrases','Some violent criminals attacked the police and ____ police cars ____.',['set','on fire'],'set…on fire：放火燒……；set 的過去式仍為 set。','習作 Unit 1 p.2 · 勾選第 13 題');
const ph2='課本 Unit 2 p.53 · 勾選片語區';
fill('p2-1',2,'phrases','It would be helpful if we calmed down and ____ the next step.',['talked over'],'talk over：討論；與 calmed down 平行，使用 talked over。',ph2);
fill('p2-2',2,'phrases','Mr. Johnson has lived by himself since his wife ____ three years ago.',['passed away'],'pass away：過世；three years ago 表示過去，使用 passed away。',ph2);
fill('p2-3',2,'phrases','Amanda is really sad because she is ____ the pain of losing her pet.',['going through'],'go through：經歷；is + going through 為現在進行式。',ph2);
fill('p2-4',2,'phrases','Residents of this village ____ the outstanding local cuisine.',['take pride in'],'take pride in：以……為榮；主詞 Residents 是複數。',ph2);
fill('p2-5',2,'phrases','Babies ____ adults for food, safety, daily care, and protection from danger.',['depend on'],'depend on：依靠；depend on A for B：依靠 A 提供 B。',ph2);
fill('wp2-11',2,'phrases','The poor boy ____ hard times when growing up. He suffered from illnesses and was abandoned by his parents.',['went through'],'go through 的過去式是 went through。','習作 Unit 2 p.9 · 勾選第 11 題');
fill('wp2-12',2,'phrases','It may take years to get over the pain when a close friend ____.',['passes away'],'a close friend 是第三人稱單數，使用 passes away。','習作 Unit 2 p.10 · 勾選第 12 題');
fill('wp2-13',2,'phrases','Vincent and his brothers ____ their parents’ important contributions to society.',['take pride in'],'take pride in：以……為榮；複數主詞使用 take。','習作 Unit 2 p.10 · 勾選第 13 題');
fill('tr1-1',1,'translation','Kevin 上網了解中秋節的傳統習俗。\nKevin searched the Internet to ____ ____ the traditions of the Mid-Autumn Festival.',['find','out'],'find out：查明／了解；to 後接原形 find。','課本 Unit 1 p.26 · 勾選第 1 題',{hints:['f','o']});
fill('tr1-2',1,'translation','當我們感到悲傷、需要傾訴時，親密的朋友在支持我們方面扮演了重要的角色。\nClose friends ____ an important ____ ____ supporting us when we feel sad and need someone to talk to.',['play','role','in'],'play an important role in V-ing：在……方面扮演重要角色。','課本 Unit 1 p.26 · 勾選第 2 題',{hints:['p','r','i']});
fill('tr1-5',1,'translation','這些圖片用於展示世界各地的動物如何生活。\nThese pictures ____ ____ ____ show how animals live in different places around the world.',['are','meant','to'],'be meant to：用於／旨在；pictures 是複數，be 動詞使用 are。','課本 Unit 1 p.26 · 勾選第 5 題',{hints:['a','m','t']});
fill('g2-1',2,'grammar','很多人難以向家人表達他們的愛和關懷。\nMany people have ____ ____ their love and care to their family members.',['difficulty','expressing'],'have difficulty (in) V-ing；express → expressing。','習作 Unit 2 p.11 · 勾選文法第 1 題',{hints:['d','e']});
fill('g2-4',2,'translation','合併：It is common. / Crime scene cleaners must deal with all kinds of situations and emotions.',['It is common that crime scene cleaners must deal with all kinds of situations and emotions.'],'It is + Adj + that + S + V；that 子句說明什麼情況是 common。句子題以參考句型比對，標點與大小寫不影響。','習作 Unit 2 p.11 · 勾選文法第 4 題',{sentence:true});
fill('wr1-2',1,'translation','重組：Sara watched / The fact that / surprised / every episode of Doraemon / her friends',['The fact that Sara watched every episode of Doraemon surprised her friends.'],'The fact that Sara watched every episode of Doraemon 整段是主詞；主要動詞為 surprised。句子题以參考順序比對。','課本 Unit 1 p.27 · 勾選寫作第 1(2) 題',{sentence:true});
choice('sea-1',1,'reading','Based on the table, what will most likely happen if we keep consuming eels?',['Fishermen will make a fortune year by year.','They will be less likely to exist in the future.','They will increase in population in the future.','They can improve the fishing industry in Taiwan.'],1,'eel 在 Avoid 欄；數量少、族群成長慢，持續食用會降低未來存續的可能。','習作 Unit 1 p.7 · 原題 1',{passage:'sea'});
choice('sea-new-2',1,'reading','Which group contains only seafood listed as Recommended?',['Clams, oysters, and lobster.','Sea bass, tuna, and eel.','Shark, cuttlefish, and lobster.','Flower crab, oysters, and tuna.'],0,'Recommended 欄列出 clams、oysters、lobster。','勾選海鮮表格 · 延伸題（非原題）',{passage:'sea'});
choice('sea-new-3',1,'reading','Which statement is supported by the table?',['All seafood should be avoided.','Seasonal movement is listed as a reason for recommendation.','Eels have a fast-growing population.','Tuna is in the Recommended category.'],1,'Recommended 的理由包含季節變化時遷移；原題 2 選項未拍完整，因此另外編製此題。','勾選海鮮表格 · 延伸題（非原題）',{passage:'sea'});
choice('crime-1',2,'reading','What is the passage mainly about?',['Facts about working as a crime scene cleaner.','Ways to effectively erase stains and smells.','Mental support for crime scene cleaners.','Training for future crime scene cleaners.'],0,'全文介紹清潔員的工作來源、訓練、清潔方式及情緒影響；A 概括全文。','習作 Unit 2 p.14 · 原題 1',{passage:'crime'});
choice('crime-2',2,'reading','Which of the following is true according to the passage?',['Crime scene cleaners work with professional counselors at the scene.','Strong smells on the crime scenes can be gotten rid of by using pig blood.','Most cases they work on are not murders but result from natural deaths or suicides.'],2,'第二段指出，多數案件是自殺或自然死亡。豬血用於訓練；除臭需要特殊器材和化學藥劑。照片只顯示 A–C，本站保留這三個可見選項。','習作 Unit 2 p.14 · 原題 2（僅可見 A–C）',{passage:'crime'});

const SCOPE_NOTES=['單字僅收錄紅勾的 23 個詞；combination、counselor 依勾選位置收錄名詞，不擴大到未勾的同字族。','勾在選擇題、片語或閱讀標題上，視為整個可見區段；單題有勾時，只收該題。','習作 Unit 1 p.2 的 Cloze Test 雖有勾，但只有文章開頭，未提供完整文章與選項，暫不出題。','海鮮閱讀原題 2 的 C、D 選項未入鏡，改提供明確標示的表格延伸題；未拍到的第 3 題不補造。','犯罪現場閱讀原題 2 只看到 A–C；本站保留可見選項。未拍到的第 3 題不補造。','未勾選的課本 Unit 2 Cloze Test 及照片頂端不完整的題目未納入。'];

if(typeof module!=='undefined')module.exports={VOCAB,PASSAGES,QUESTIONS,SCOPE_NOTES};
