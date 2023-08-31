var express = require('express');
var router = express.Router();

var MersenneTwister = require('mersenne-twister');
var generator = new MersenneTwister();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });


// import { LoremIpsum } from 'lorem-ipsum';
const LoremIpsum = require('lorem-ipsum').LoremIpsum;

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4
  },
  wordsPerSentence: {
    max: 16,
    min: 4
  }
});

function randomArticle() {
  var articles = ['a', 'the'];
  return articles[Math.floor(generator.random() * articles.length)];
}

function randomNoun() {
  var nouns = ['waste','increase','sky','horn','sweater','head','push','bell',
  'passenger','sock','mouth','ant','zoo','holiday','branch','snake','robin',
  'knife','part','throne','distribution','women','care','loaf','angle','sleep',
  'hose','steam','calendar','tub','veil','afterthought','fall','army',
  'daughter','place','beginner','advertisement','stream','truck','spade',
  'title','use','start','degree','fog','coach','ring','recess','flame','drain',
  'meal','question','rock','flag','action','yarn','umbrella','believe','dirt',
  'taste','salt','silk','chin','road','crook','substance','position','fly',
  'magic','direction','effect','design','girl','doctor','quartz','quince','cup',
  'wealth','idea','needle','alarm','library','car','slope','chance','machine',
  'range','pear','vessel','pin','attraction','error','wall','plant',
  'toothpaste','temper','vein','sort','detail','soap','bomb','cow','interest',
  'end','glove','price','afternoon','plot','cabbage','meat','history',
  'baseball','cub','purpose','room','move','jail','size','van','rice',
  'education','back','kettle','tooth','baby','cloth','sun','yard','sister',
  'teaching','measure','window','thought','plantation','frame','arithmetic',
  'theory','friction','rat','wind','spring','growth','cap','bulb','airplane',
  'front','attack','harmony','kiss','thrill','winter','offer','scent','zinc',
  'creature','hair','boat','notebook','wish','connection','grip','fairy',
  'color','line','volleyball','snail','man','territory','ocean','steel','death',
  'servant','ghost','structure','gold','lock','geese','parcel','distance',
  'shape','throat','market','amount','rail','deer','monkey','finger','dust',
  'wound','touch','top','governor','animal','hammer','society','reward','food',
  'day','silver','hate','punishment','bird','hook','love','plane','weight',
  'selection','wrench','bat','roof','bear','minister','shelf','ball','cake',
  'agreement','authority','balance','jar','look','chess','activity','icicle',
  'arm','eye','screw','mice','cheese','rhythm','existence','blow','school',
  'flight','office','note','wave','coast','middle','woman','bucket','invention',
  'flavor','jellyfish','profit','blood','jump','texture','camp','run',
  'vacation','gun','name','week','coil','property','example','unit','thread',
  'seashore','scarecrow','protest','son','join','metal','view','coat','thumb',
  'play','sea','oatmeal','tax','hat','sense','bag','comparison','cherry',
  'train','cart','friend','order','lunch','quicksand','bike','island','prose',
  'table','amusement','ray','badge','change','crow','guitar','competition',
  'word','wheel','exchange','scene','mist','orange','eggnog','rod','smoke',
  'floor','powder','company','jelly','clam','blade','crayon','water','plate',
  'mine','fear','farm','duck','cracker','pot','turkey','verse','apparatus',
  'canvas','pet','loss','hour','pipe','stone','kick','support','breath',
  'flower','drop','flesh','crowd','actor','plough','dinosaur','self','pull',
  'arch','judge','mitten','shoe','sheep','dime','government','thing','square',
  'credit','observation','belief','year','transport','sugar','teeth','industry',
  'wilderness','pail','wash','tin','button','appliance','decision','trick',
  'bubble','earthquake','produce','match','event','sneeze','horse','discovery',
  'record','vase','trail','fold','receipt','voyage','group','mountain','song',
  'quarter','box','grandmother','edge','men','tongue','cook','juice','curtain',
  'border','wrist','lumber','division','desk','rain','rabbit','bridge',
  'thunder','suit','dad','behavior','show','mind','yam','yoke','peace','month',
  'picture','value','celery','route','spoon','can','uncle','soda','stretch',
  'voice','shock','mother','harbor','dress','slip','insect','dock','kitten',
  'birthday','liquid','sand','boy','whip','surprise','basket','flock',
  'secretary','experience','control','quilt','hill','cast','corn','rub','act',
  'treatment','bit','vegetable','writing','chicken','mom','system','health',
  'face','crown','kitty','cattle','twig','trouble','church','lettuce','maid',
  'desire','swing','quiver','gate','meeting','birth','request','snow','honey',
  'spider','need','zebra','bed','wood','grape','night','tray','rifle','iron',
  'jewel','creator','stranger','coal','caption','circle','quiet','income',
  'crate','playground','guide','cobweb','side','ear','scarf','plastic','fowl',
  'sponge','stocking','bait','home','furniture','cat','statement','smell',
  'brick','shirt','crack','bite','railway','country','tomato','spy','nest',
  'turn','number','lace','achiever','aftermath','dinner','paper','force',
  'grass','sidewalk','tree','rate','yak','test','giraffe','time','humor',
  'trade','approval','letter','war','swim','work','visitor','point','locket',
  'toe','underwear','form','laugh','debt','elbow','tail','watch','cream',
  'sheet','station','carriage','river','street','addition','aunt','house',
  'book','representative','engine','hydrant','drink','ticket','copper','collar',
  'fireman','stew','grade','ship','pen','development','power','potato','beef',
  'fact','skate','wool','soup','respect','committee','pollution','stem','smile',
  'stove','grandfather','field','religion','cause','card','pest','bead','sound',
  'tank','hot','pig','heat','wire','minute','ice','straw','anger','fang',
  'zephyr','payment','foot','town','giant','summer','wine','air','stomach',
  'earth','twist','reason','base','cushion','pancake','fork','butter','string',
  'ink','poison','sail','crime','root','riddle','noise','walk','cent','page',
  'stick','rest','zipper','expert','tendency','lamp','destruction','knee',
  'seed','mint','egg','bedroom','memory','pizza','current','space','sofa',
  'hole','basketball','lip','money','partner','chalk','mark','step','crib',
  'whistle','stop','neck','rose','shame','instrument','level','quill','scale',
  'feeling','advice','leather','expansion','popcorn','relation','cemetery',
  'cable','porter','roll','channel','low','trip','leg','impulse','weather',
  'wren','worm','seat','brother','frog','cave','queen','door','boundary',
  'story','hall','ladybug','haircut','science','bush','bone','drawer','store',
  'hope','discussion','nose','toothbrush','sink','sack','marble','stage',
  'cannon','cellar','battle','spark','downtown','art','knowledge','nerve',
  'lake','pickle','camera','rake','talk','way','smash','language','suggestion',
  'star','hobby','fish','account','stitch','mailbox','tramp','calculator',
  'squirrel','wax','cough','laborer','board','vest','fuel','dog','bath','brass',
  'muscle','nation','airport','carpenter','insurance','pan','brake','donkey',
  'reading','linen','mass','burst','spot','clover','key','building','sign',
  'cover','doll','finger','land','mask','north','business','bee','nut','ground',
  'hospital','writer','class','fire','argument','shop','milk','glass','toad',
  'curve','limit','basin','lunchroom','rule','adjustment','pie','tiger','boot',
  'jam','shade','fruit','pump','moon','pencil','pocket','reaction','condition',
  'rainstorm','apparel','regret','pleasure','wing','cactus','children','skirt',
  'person','stamp','knot','oil','oven','berry','toy','party','baby','team',
  'motion','digestion','sleet','grain','driving','club','skin','tent','volcano',
  'morning','bottle','shake'];
  return nouns[Math.floor(generator.random() * nouns.length)];
}

function randomVerb() {
  var verbs = ['prays','sprouts','opens','plants','shades','signals','shivers',
  'hooks','lies','borrows','punctures','wishes','arrives','watches','hands',
  'greets','informs','harasses','crushes','wants','cries','winks','cheats',
  'repairs','numbers','undresses','kneels','admits','matches','contains',
  'laughs','misses','tires','lives','drips','admires','moors','competes',
  'scribbles','invites','examines','pops','polishes','checks','lands','straps',
  'rains','covers','stares','taps','announces','ticks','interrupts','sprays',
  'decays','preaches','spoils','heats','shares','tricks','boils','satisfies',
  'precedes','shops','coughs','peels','closes','breathes','scrubs','marries',
  'extends','sucks','explodes','prepares','knots','tows','longs','arranges',
  'cares','risks','explains','attempts','rejoices','jogs','jumps','trips',
  'trusts','helps','flows','milks','carves','records','strokes','blushes',
  'fancies','frames','twists','possesses','tickles','murders','increases',
  'appears','realizes','spots','bombs','gathers','bleaches','guards','observes',
  'trembles','prints','grabs','chokes','deceives','embarrasses','entertains',
  'returns','raises','skis','films','likes','whispers','paints','groans','pats',
  'appreciates','hovers','telephones','rhymes','greases','folds','phones',
  'suggests','rushes','unites','notices','pines','reflects','ruins','avoids',
  'knits','dusts','locks','introduces','traps','pedals','slaps','brakes',
  'shocks','files','offers','glows','untidies','squeals','sounds','talks',
  'zooms','slips','follows','bathes','lasts','applauds','licenses','orders',
  'parts','pours','instructs','communicates','prefers','waters','bakes','waves',
  'wanders','nails','fences','consists','dries','looks','matters','ignores',
  'coils','includes','expects','turns','reproduces','bows','books','nests',
  'lightens','crashes','guarantees','radiates','attaches','sighs','faxes',
  'mixes','corrects','yells','apologizes','settles','yawns','dislikes','peeps',
  'touches','attacks','coaches','squashes','impresses','rules','bolts',
  'rescues','bans','bores','knocks','succeeds','pastes','marches','regrets',
  'agrees','spells','connects','licks','smells','sacks','whirls','provides',
  'offends','wipes','copies','welcomes','happens','moves','intends','serves',
  'tries','rots','fills','trains','fires','disarms','sins','retires','presents',
  'jams','guesses','harms','wrecks','stops','scolds','concentrates','wails',
  'kisses','grates','receives','tames','traces','wastes','saws','calls',
  'excites','buzzes','dresses','glues','improves','hangs','bares','arrests',
  'measures','drains','skips','fixes','invents','changes','mourns','grins',
  'rejects','injures','detects','tests','rolls','analyzes','mans','stains',
  'fetches','sips','spares','levels','loads','blots','replies','encourages',
  'confuses','pinches','frightens','discovers','listens','attracts','waits',
  'heaps','permits','buries','continues','remembers','combs','relies','suffers',
  'muddles','whines','cracks','joins','calculates','crawls','vanishes',
  'supports','jails','reports','deserves','slows','warms','jokes','surprises',
  'judges','tips','belongs','removes','beams','wrestles','battles','packs',
  'spills','backs','dares','delivers','imagines','shaves','wraps','damages',
  'squeaks','fears','challenges','doubts','advises','fastens','pretends',
  'completes','empties','camps','sparks','travels','owes','scares','attends',
  'employs','thaws','hops','rocks','irritates','blesses','signs','performs',
  'tempts','compares','sails','drags','scatters','thanks','enters','pokes',
  'smokes','tours','multiplies','owns','counts','enjoys','fools','considers',
  'hates','pecks','expands','races','stuffs','punches','seals','snores',
  'commands','suspects','annoys','destroys','rubs','tugs','delays','produces',
  'overflows','drums','bumps','answers','soaks','branches','posts','decides',
  'pulls','doubles','smiles','loves','trots','shrugs','mends','chops','manages',
  'flashes','interests','shelters','forms','grips','reminds','unlocks',
  'escapes','haunts','reigns','pushes','hunts','sparkles','tastes','itches',
  'places','fries','terrifies','stitches','robs','relaxes','hammers','hopes',
  'affords','reaches','flaps','injects','confesses','fits','stirs','bounces',
  'describes','ends','steps','sniffs','faces','floats','boasts','excuses',
  'surrounds','carries','burns','curves','promises','drowns','nods','mines',
  'lists','obtains','crosses','steers','begs','practices','clips','cheers',
  'repeats','argues','smashes','accepts','claps','meddles','obeys','punishes',
  'depends','queues','labels','stays','mess ups','scorches','prevents','adds',
  'notes','disapproves','interferes','points','snows','cures','fades','screams',
  'moans','stamps','drops','parks','collects','delights','replaces','x-rays',
  'refuses','gazes','chases','bruises','times','founds','types','reduces',
  'deserts','kills','strengthens','unpacks','protects','dams','wonders',
  'guides','pleases','scratches','tumbles','mugs','trades','behaves','paddles',
  'claims','washes','bats','soothes','searches','programs','objects','hugs',
  'allows','colors','saves','remains','forces','zips','pricks','separates',
  'disagrees','floods','squeezes','supposes','starts','juggles','charges',
  'plans','visits','screws','needs','kicks','whistles','requests','weighs',
  'whips','chews','suspends','strips','clears','exercises','treats','wobbles',
  'bangs','preserves','unfastens','passes','stores','cycles','flowers','plugs',
  'memorizes','alerts','cleans','handles','develops','fails','asks','curls',
  'launches','warns','dances','educates','brushes','works','concerns','scrapes',
  'complains','melts','learns','boxes','hums','heals','rinses','hurries',
  'marks','transports','releases','occurs','wriggles','amuses','blinks',
  'bubbles','recognizes','presses','pumps','switches','decorates','worries',
  'dreams','picks','disappears','divides','names','blinds','walks','snatches',
  'earns','approves','pauses','identifies','troubles','mates','questions',
  'stretches','suits','balances','uses','supplies','plays','sneezes',
  'subtracts','exists','causes','heads','ties','teases','influences'];
  return verbs[Math.floor(generator.random() * verbs.length)];
}

function randomAjective() {
  var adjectives = ['hushed','teeny-tiny','decisive','long-term','alcoholic',
  'alleged','ragged','discreet','ill','devilish','scintillating','furtive',
  'unable','honorable','valuable','longing','half','wretched','amused',
  'foolish','military','statuesque','waggish','tame','mean','racial',
  'sweltering','quick','foamy','uttermost','second-hand','lively','sweet',
  'limping','ugliest','chunky','lavish','blue','victorious','uppity','unbiased',
  'hypnotic','squalid','eatable','quizzical','unwritten','aspiring','hilarious',
  'obtainable','mere','massive','opposite','educated','dusty','sore','zealous',
  'mute','kaput','peaceful','tasteful','bawdy','humorous','roomy','irate',
  'classy','gorgeous','adaptable','smooth','volatile','capable','amuck',
  'wistful','tasteless','industrious','profuse','hellish','quixotic',
  'panoramic','damaging','mellow','extra-large','spectacular','splendid',
  'abaft','daffy','daily','ten','known','adjoining','torpid','misty','ahead',
  'gratis','abrupt','economic','scarce','certain','faded','evasive','unnatural',
  'grumpy','bouncy','spurious','sneaky','erect','unknown','frightening',
  'cluttered','defiant','warm','nippy','imaginary','hapless','past','various',
  'hot','dapper','disillusioned','spooky','thirsty','protective','obnoxious',
  'husky','seemly','open','hesitant','third','fantastic','nebulous','sore',
  'divergent','tacky','normal','far','rude','dear','quaint','great','mushy',
  'roasted','fluttering','juicy','rough','worried','courageous','trashy',
  'fascinated','abusive','vulgar','scandalous','bewildered','next','scattered',
  'cumbersome','gigantic','gentle','symptomatic','purring','first','precious',
  'ablaze','six','elegant','lowly','obeisant','fumbling','sharp','dispensable',
  'languid','garrulous','kindly','spotless','noisy','feigned','aromatic','huge',
  'vague','loutish','abrasive','insidious','helpless','overconfident','green',
  'unsuitable','motionless','maniacal','axiomatic','absorbed','charming',
  'waiting','ignorant','wet','supreme','puzzled','abhorrent','false','needy',
  'impartial','outstanding','clean','invincible','flippant','adventurous',
  'impolite','famous','spotty','ambitious','faithful','utopian','picayune',
  'vivacious','rare','plucky','bored','sad','painstaking','shaggy','strange',
  'broad','deeply','different','lovely','proud','rustic','absent','dead',
  'foregoing','delicate','erratic','possessive','tacit','earthy','hulking',
  'sloppy','dirty','overjoyed','yummy','obscene','acid','deserted','unruly',
  'cuddly','macabre','versed','obsequious','recondite','stormy','selfish',
  'harsh','bright','tranquil','woebegone','tasty','silky','hurt','squeamish',
  'savory','mountainous','slimy','icy','lively','distinct','secretive',
  'wasteful','lumpy','orange','four','rainy','far-flung','exotic','brown',
  'important','wary','magnificent','thankful','intelligent','elated',
  'unsightly','level','truculent','befitting','used','shaky','nine','perpetual',
  'attractive','grandiose','afraid','oafish','jobless','guiltless','dizzy',
  'polite','detailed','madly','awake','amusing','outrageous','ill-informed',
  'colorful','difficult','coordinated','harmonious','makeshift','wrathful',
  'inexpensive','agreeable','smoggy','premium','jealous','knowledgeable',
  'common','incandescent','lyrical','dramatic','zesty','sudden','belligerent',
  'cagey','exciting','tearful','acceptable','elfin','nutritious','disastrous',
  'greedy','unusual','threatening','glamorous','curved','gamy','accurate',
  'magenta','highfalutin','previous','equal','craven','utter','adhesive',
  'shocking','well-groomed','laughable','oval','tan','able','black','medical',
  'resolute','fixed','dazzling','demonic','ambiguous','expensive','hideous',
  'pretty','loud','acrid','wiggly','neat','aggressive','tall','noiseless',
  'aware','anxious','free','optimal','cloudy','terrible','holistic','loving',
  'melodic','full','aboard','merciful','astonishing','aberrant','gainful',
  'spiffy','outgoing','onerous','bashful','aboriginal','testy','thin','perfect',
  'wandering','crowded','two','fluffy','needless','standing','swanky','shy',
  'angry','big','receptive','calculating','drunk','broken','prickly','best',
  'functional','sable','melted','cute','wide','phobic','mysterious',
  'delightful','vacuous','rotten','trite','private','defective','poised',
  'rampant','useless','coherent','shut','tight','lewd','cautious','cut',
  'wanting','healthy','keen','unequaled','addicted','ajar','narrow','itchy',
  'lopsided','stingy','undesirable','real','shallow','tested','ritzy','short',
  'hungry','hallowed','sincere','graceful','psychotic','defeated','puny',
  'curious','wry','one','super','cold','subsequent','exultant','soggy','tough',
  'envious','gifted','crazy','sordid','last','awful','aquatic','faint','icky',
  'dangerous','labored','small','cooperative','offbeat','hateful','concerned',
  'gaudy','cynical','fancy','abundant','heady','illegal','absorbing','fast',
  'wide-eyed','empty','lamentable','dull','secret','combative','heavy',
  'selective','tidy','ordinary','wiry','glorious','upset','womanly','ready',
  'grubby','enormous','unadvised','wicked','superb','political','long','young',
  'flashy','unhealthy','uptight','pumped','tiny','male','verdant','ad hoc',
  'imported','average','blushing','quickest','auspicious','unkempt','fearful',
  'frantic','eight','petite','modern','direful','clammy','raspy','toothsome',
  'resonant','childlike','shivering','witty','ripe','cute','swift',
  'lackadaisical','regular','meek','pointless','adamant','numberless','stupid',
  'excellent','grateful','bitter','glistening','fuzzy','joyous','illustrious',
  'handsomely','jaded','electric','talented','earsplitting','temporary','tense',
  'jazzy','annoyed','gusty','fabulous','flowery','remarkable','pleasant',
  'pushy','scrawny','impossible','imperfect','innocent','clear','cheerful',
  'irritating','stale','interesting','skinny','necessary','handsome',
  'agonizing','animated','nice','tender','omniscient','pale','infamous','lazy',
  'billowy','painful','rural','righteous','creepy','odd','cheap','round',
  'disgusted','abandoned','thinkable','screeching','draconian','scientific',
  'responsible','ancient','steadfast','workable','macho','lethal','early',
  'penitent','marked','freezing','deafening','wise','red','dashing','moldy',
  'happy','ethereal','noxious','kindhearted','smart','cool','nauseating',
  'light','rich','curvy','inquisitive','watery','future','flawless','parallel',
  'fertile','faulty','judicious','gaping','beautiful','minor','chilly',
  'annoying','pastoral','voiceless','mixed','cultured','busy','well-off',
  'amazing','willing','berserk','thundering','robust','spicy','present',
  'uncovered','nervous','deep','obedient','beneficial','messy','nosy',
  'succinct','serious','bite-sized','incompetent','muddled','homeless',
  'evanescent','even','venomous','energetic','well-made','low',
  'black-and-white','assorted','handy','boiling','parched','fine','reminiscent',
  'vast','clumsy','scary','little','jolly','groovy','ultra','lacking',
  'descriptive','futuristic','festive','idiotic','colossal','fair','fierce',
  'crooked','efficacious','fragile','capricious','royal','tired','eager',
  'piquant','productive','majestic','damaged','enthusiastic','synonymous',
  'glossy','nonchalant','observant','filthy','yielding','tricky','fallacious',
  'troubled','excited','strong','uneven','repulsive','magical','miscreant',
  'probable','skillful','ruddy','abounding','complete','homely','nasty',
  'habitual','near','zany','knowing','jumbled','lonely','good','elastic',
  'frail','brawny','acidic','wrong','materialistic','slow','stimulating',
  'high-pitched','spotted','unused','goofy','pathetic','periodic','quarrelsome',
  'unbecoming','eminent','panicky','determined','measly','slim','funny',
  'unwieldy','loose','alluring','sulky','nostalgic','ratty','alive',
  'rambunctious','giddy','chubby','heavenly','damp','embarrassed','elderly',
  'worthless','towering','arrogant','delirious','comfortable','spiky',
  'truthful','oceanic','grieving','careless','wacky','vigorous','knotty',
  'abashed','actually','dusty','romantic','female','cooing','steady',
  'therapeutic','decorous','rightful','debonair','typical','rabid','historical',
  'abnormal','natural','ruthless','ossified','relieved','friendly','old',
  'imminent','burly','whimsical','questionable','sassy','hard-to-find','null',
  'abject','glib','bizarre','frightened','sick','tremendous','legal','useful',
  'shiny','successful','living','bad','equable','plant','sleepy','forgetful',
  'overrated','wealthy','right','tawdry','terrific','depressed','tangible',
  'greasy','boorish','smelly','smiling','fortunate','cowardly','overt',
  'efficient','quirky','dynamic','weary','permissible','nimble','quack',
  'breezy','telling','alert','silent','maddening','taboo','tense','youthful',
  'domineering','rapid','grey','windy','chief','brash','naive','exuberant',
  'changeable','quiet','second','condemned','reflective','marvelous','teeny',
  'grouchy','extra-small','slippery','true','steep','encouraging','lean',
  'hollow','zonked','accidental','special','chivalrous','closed','innate',
  'psychedelic','endurable','dependent','learned','spiritual','fresh','puffy',
  'flagrant','alike','horrible','nutty','subdued','square','new','barbarous',
  'literate','unique','pricey','pink','moaning','frequent','poor','silly',
  'dreary','unaccountable','cloistered','dysfunctional','fanatical','wild',
  'striped','disturbed','brainy','entertaining','ugly','aback','guttural',
  'caring','bustling','confused','careful','spiteful','grotesque',
  'sophisticated','scared','gabby','jittery','bright','miniature','jagged',
  'unarmed','bumpy','simple','ubiquitous','nappy','old-fashioned','paltry',
  'staking','ludicrous','whole','upbeat','salty','organic','satisfying',
  'violent','tenuous','thoughtless','dark','woozy','public','hurried',
  'delicious','apathetic','abstracted','finicky','fearless','ashamed',
  'available','boring','disgusting','thoughtful','disagreeable','parsimonious',
  'brief','overwrought','better','plausible','enchanting','numerous','thick',
  'simplistic','safe','high','deranged','rhetorical','dry','curly','hanging',
  'like','callous','conscious','wonderful','hard','automatic','mindless',
  'guarded','abiding','soft','godly','neighborly','acoustic','substantial',
  'sturdy','left','well-to-do','instinctive','redundant','familiar','hissing',
  'deadpan','awesome','murky'];
  return adjectives[Math.floor(generator.random() * adjectives.length)];
}

function randomAdverb() {
  var adverbs = ['dimly','acidly','potentially','judgementally','fervently',
  'lively','deeply','beautifully','devotedly','yesterday','tenderly',
  'tensely','boastfully','carefully','upward','queasily','basically',
  'playfully','gladly','painfully','well','then','generally','tightly',
  'hungrily','truthfully','bleakly','scarily','sometimes','recently','rigidly',
  'automatically','jealously','energetically','cruelly','madly','irritably',
  'never','calmly','kindheartedly','solemnly','dearly','elegantly','primarily',
  'widely','wearily','righteously','briefly','smoothly','similarly','even',
  'oddly','steadily','anyway','voluntarily','angrily','greatly','sleepily',
  'lightly','powerfully','crazily','frantically','lovingly','promptly','wholly',
  'foolishly','arrogantly','frenetically','queerly','slowly','coyly','weekly',
  'joyously','previously','boldly','hastily','surprisingly','punctually',
  'weakly','thus','noisily','excitedly','enormously','interestingly','slightly',
  'sheepishly','wonderfully','blindly','helplessly','moreover','triumphantly',
  'kindly','valiantly','tomorrow','normally','questioningly','more','kissingly',
  'quarrelsomely','recklessly','ahead','safely','deceivingly','loudly',
  'violently','unnecessarily','bitterly','usually','nervously','dutifully',
  'inquisitively','worriedly','famously','far','delightfully','zealously',
  'crossly','directly','unnaturally','unfortunately','daily','often','however',
  'yearly','possibly','twice','youthfully','utterly','intensely','fiercely',
  'needily','gleefully','else','warmly','merely','searchingly','very',
  'yawningly','partially','softly','sympathetically','separately','joyfully',
  'unabashedly','sharply','somewhat','reassuringly','zestfully','rudely',
  'vacantly','suddenly','personally','unaccountably','quizzically',
  'mechanically','knottily','freely','vaguely','viciously','mortally','below',
  'sternly','neatly','heavily','loyally','jaggedly','technically','carelessly',
  'early','again','adventurously','swiftly','verbally','likely','correctly',
  'strongly','jovially','questionably','kookily','seriously','yearningly',
  'frankly','altogether','nicely','awkwardly','stealthily','regularly',
  'unbearably','yieldingly','happily','brightly','specifically','uselessly',
  'fairly','wetly','immediately','shakily','significantly','always','zestily',
  'monthly','blissfully','scarcely','solidly','accidentally','upbeat',
  'reluctantly','certainly','majestically','knowingly','simply','terribly',
  'patiently','optimistically','mainly','wildly','doubtfully','knowledgeably',
  'longingly','seemingly','vivaciously','colorfully','fast','extremely',
  'dramatically','bashfully','loftily','offensively','quicker','upside-down',
  'forth','cautiously','originally','coaxingly','mysteriously','broadly',
  'deftly','curiously','everywhere','vastly','inwardly','ever','fortunately',
  'obediently','instead','urgently','intently','mostly','thoughtfully',
  'necessarily','silently','upliftingly','rapidly','innocently','currently',
  'virtually','keenly','defiantly','loosely','gratefully','commonly',
  'faithfully','fatally','gently','definitely','unimpressively','quaintly',
  'hourly','actually','rather','quirkily','only','really','initially','briskly',
  'ferociously','seldom','afterwards','reproachfully','upwardly','frightfully',
  'relatively','selfishly','together','totally','evenly','not','owlishly',
  'mockingly','naturally','probably','enthusiastically','also','continually',
  'properly','dreamily','cheerfully','knavishly','finally','generously',
  'woefully','sedately','quietly','gracefully','nearly','exactly',
  'suspiciously','willfully','kiddingly','frequently','repeatedly','strictly',
  'roughly','absentmindedly','sweetly','soon','highly','fully','politely',
  'bravely','joshingly','wrongly','daintily','tediously','wisely','greedily',
  'equally','justly','sadly','honestly','victoriously','merrily','hopefully',
  'hopelessly','rarely','closely','especially','obnoxiously','easily',
  'thoroughly','ultimately','quickly','literally','too','furiously','restfully',
  'abnormally','completely','speedily','unexpectedly','anxiously',
  'successfully','lazily','tremendously','hardly','elsewhere','annually',
  'deliberately','upright','shyly','diligently','coolly','healthily',
  'unethically','almost','poorly','thankfully','therefore','already','truly',
  'instantly','essentially','overconfidently','busily','constantly',
  'rightfully','perfectly','shrilly','openly','eventually','effectively',
  'courageously','jubilantly','fondly','positively','officially','physically',
  'vainly','miserably','helpfully','clearly','readily','terrifically',
  'usefully','eagerly','less','meaningfully','occasionally','limply','badly',
  'cleverly'];
  return adverbs[Math.floor(generator.random() * adverbs.length)];
}

function aToAnIfNeeded(sentence) {
  if (sentence.match(/^a [aeiou]/) || sentence.match(/^a hour/)) {
    return sentence.replace(/^a/, 'an');
  }
  return sentence
}

function sentenceA(seed) {
  return aToAnIfNeeded([randomArticle(seed++),randomNoun(seed++),randomVerb(seed++)].join(' '));
}

function sentenceB(seed) {
  return aToAnIfNeeded([randomArticle(seed++),randomAjective(seed++),randomNoun(seed++),randomVerb(seed++)].join(' '));
}

function sentenceC(seed) {
  return aToAnIfNeeded([randomArticle(seed++),randomNoun(seed++),randomAdverb(seed++),randomVerb(seed++)].join(' '));
}

function sentenceD(seed) {
  return aToAnIfNeeded([randomArticle(seed++),randomAjective(seed++),randomNoun(seed++),randomAdverb(seed++),randomVerb(seed++)].join(' '));
}

function sentenceE(seed) {
  sentences = [sentenceA, sentenceB, sentenceC, sentenceD];
  return sentences[Math.floor(generator.random() * sentences.length)](seed++) +
  ' because ' + sentences[Math.floor(generator.random() * sentences.length)](10 + seed++);
}

function sentenceF(seed) {
  sentences = [sentenceA, sentenceB, sentenceC, sentenceD];
  return sentences[Math.floor(generator.random() * sentences.length)](seed++) +
  ' when ' + sentences[Math.floor(generator.random() * sentences.length)](10 + seed++);
}

function sentenceG(seed) {
  sentences = [sentenceA, sentenceB, sentenceC, sentenceD];
  return sentences[Math.floor(generator.random() * sentences.length)](seed++) +
  ' though ' + sentences[Math.floor(generator.random() * sentences.length)](10 + seed++);
}

function sentenceH(seed) {
  sentences = [sentenceA, sentenceB, sentenceC, sentenceD];
  return sentences[Math.floor(generator.random() * sentences.length)](seed++) +
  ' while ' + sentences[Math.floor(generator.random() * sentences.length)](10 + seed++);
}

function sentenceI(seed) {
  sentences = [sentenceA, sentenceB, sentenceC, sentenceD];
  return sentences[Math.floor(generator.random() * sentences.length)](seed++) +
  ', and ' + sentences[Math.floor(generator.random() * sentences.length)](10 + seed++);
}

function sentenceJ(seed) {
  sentences = [sentenceA, sentenceB, sentenceC, sentenceD];
  return sentences[Math.floor(generator.random() * sentences.length)](seed++) +
  ', but ' + sentences[Math.floor(generator.random() * sentences.length)](10 + seed++);
}

function sentenceK(seed) {
  sentences = [sentenceA, sentenceB, sentenceC, sentenceD];
  return sentences[Math.floor(generator.random() * sentences.length)](seed++) +
  ', so ' + sentences[Math.floor(generator.random() * sentences.length)](10 + seed++);
}

function sentenceL(seed) {
  sentences = [sentenceA, sentenceB, sentenceC, sentenceD];
  return sentences[Math.floor(generator.random() * sentences.length)](seed++) +
  ', after ' + sentences[Math.floor(generator.random() * sentences.length)](10 + seed++);
}

function sentenceM(seed) {
  sentences = [sentenceA, sentenceB, sentenceC, sentenceD];
  return sentences[Math.floor(generator.random() * sentences.length)](seed++) +
  ', before ' + sentences[Math.floor(generator.random() * sentences.length)](10 + seed++);
}

function randomSentence(seed) {
  sentences = [sentenceA, sentenceB, sentenceC, sentenceD, sentenceE, sentenceF,
     sentenceG, sentenceH, sentenceI, sentenceJ, sentenceK, sentenceL, sentenceM];
  sentence = sentences[Math.floor(generator.random() * sentences.length)](seed++);
  return sentence.charAt(0).toUpperCase() + sentence.slice(1);
  // return 'seed: ' + seed + '.';
}

function randomTitle(seed) {
  return randomSentence(seed);
}

function randomParagraph(seed) {
  var sentences = 4 + Math.floor(generator.random() * 5);
  var paragraph = [];
  for (var i = 0; i < sentences; i++) {
    paragraph[i] = randomSentence(seed + i * 100);
  }
  return paragraph.join('. ') + '.';
}

function randomParagraphs(seed) {
  var paragraphs = 5 + Math.floor(generator.random() * 100);
  var article = [];
  for (var i = 0; i < paragraphs; i++) {
    article[i] = randomParagraph(seed + i * 1000);
  }
  return article;
}

function randomLink(seed, hostname) {
  var link = [];
  link['href'] = '/' + randomSentence(seed).replace(/ /g, '/').replace(/,/g, '');
  var linkSeed = generateSeed(hostname + link['href']);
  link['title'] = randomTitle(linkSeed);
  return link;
}

function randomLinks(seed, hostname) {
  var generator = new MersenneTwister(seed+10000);
  var linkCount = 5 + Math.floor(generator.random() * 10);
  var links = [];
  for (var i = 0; i < linkCount; i++) {
    links[i] = randomLink(seed + i * 10000, hostname);
  }
  return links;
}

function generateSeed(path) {
  var md5 = require('md5');
  var sum = md5(path);
  var seed = parseInt(sum.slice(0,7),16) + parseInt(sum.slice(8,15),16) + parseInt(sum.slice(16,23),16) + parseInt(sum.slice(24,31),16);
  return seed;
}

function randomPage(req, res) {
  var seed = generateSeed(req.hostname + req.path);

  var title = randomTitle(seed);
  var paragraphs = randomParagraphs(seed);
  var links = randomLinks(seed, req.hostname);

  res.render('random', {title: title, paragraphs: paragraphs, links: links});
}

router.all('*', randomPage);

// console.log(lorem.generateParagraphs(7));

// var paragraphs = [];
// for (var i = 0; i < 7; i++) {
//   paragraphs[i] = lorem.generateParagraphs(1);
// }
//
// var title = lorem.generateSentences(1);

// router.all('*', (req, res) => res.render('random', {title: title, paragraphs: paragraphs} ) )

// router.get('/', (req, res) => res.send(lorem.generateParagraphs(7)))

module.exports = router;
