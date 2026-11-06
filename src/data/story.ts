/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface GlossaryItem {
  term: string;
  pronunciation?: string;
  definition: string;
  culturalContext: string;
}

export interface StoryChapter {
  id: number;
  romanNumeral: string;
  title: string;
  subtitle: string;
  image?: string;
  imageCaption?: string;
  estimatedReadingMinutes: number;
  paragraphs: string[];
  keyThemes: string[];
}

export interface ReflectionQuestion {
  id: number;
  question: string;
  promptType: 'discussion' | 'comprehension' | 'creative';
  guidingInsight: string;
  options?: string[];
  correctIndex?: number;
  explanation?: string;
}

export const STORY_METADATA = {
  title: "Ade Goes to School",
  openingSentence: "Ade goes to school.",
  author: "Editorial Adaptation",
  setting: "The village of Ilode, Western Nigeria",
  genre: "Coming-of-Age Literary Fiction / Cultural Reader",
  synopsis:
    "Ade goes to school. Under the early amber sunlight of Ilode, an eight-year-old boy steps out onto the red laterite road wearing his freshly pressed khaki uniform. With a lucky cedar seed in his pocket and his sister beside him, Ade's morning journey through the bustling marketplace and across the mossy footbridge leads to the bronze bell of St. Jude's Academy—and the open doorway of a wider world.",
  totalWordCount: 1650,
  averageReadingTime: "7 min read",
};

export const GLOSSARY_TERMS: Record<string, GlossaryItem> = {
  "charcoal iron": {
    term: "Charcoal Iron",
    definition: "A heavy, cast-iron box filled with glowing red wood embers used to press cotton fabrics with crisp, sharp creases.",
    culturalContext: "Before electricity was widespread, every household possessed a cherished heavy iron. Children woke to the rhythmic clinking of the latch and the sweet, dry scent of hot starch on calico.",
  },
  "laterite": {
    term: "Laterite Red Earth",
    definition: "Iron-rich, clayey soil characteristic of tropical West Africa that turns vibrant rust-red under direct sunlight.",
    culturalContext: "The red clay roads are iconic throughout West African towns and villages, softening into warm rust tones at sunrise and scenting the air with petrichor when rain begins.",
  },
  "puff-puff": {
    term: "Puff-Puff",
    pronunciation: "POOF-poof",
    definition: "Golden, spongy deep-fried dough balls seasoned with nutmeg, yeast, and a touch of cane sugar.",
    culturalContext: "A ubiquitous and beloved morning snack across Nigeria and West Africa, sold piping hot in folded brown paper at crossroads and markets.",
  },
  "adire": {
    term: "Adire",
    pronunciation: "ah-dee-REH",
    definition: "Traditional indigo-dyed patterned cloth crafted by Yoruba textile artisans using resist-dye techniques.",
    culturalContext: "Worn with pride by mothers and elders, each geometric pattern in Adire cloth traditionally tells a proverb or lineage story.",
  },
  "slate": {
    term: "School Slate",
    definition: "A framed rectangular piece of black stone or painted wood upon which pupils practiced arithmetic and handwriting using chalk or slate pencils.",
    culturalContext: "A treasured educational artifact of mid-20th-century primary schools, easily wiped clean with a damp rag or dry leaf to begin again.",
  },
  "flamboyant tree": {
    term: "Flamboyant / Flame Tree",
    pronunciation: "Delonix regia",
    definition: "A majestic tropical tree with feathery fern-like foliage and an explosion of fiery vermilion and scarlet blossoms.",
    culturalContext: "Often planted in school courtyards and village squares to provide broad, dappled shade where assemblies, storytelling, and community gatherings took place.",
  },
  "Baba": {
    term: "Baba",
    pronunciation: "BAH-bah",
    definition: "An affectionate and respectful Yoruba title for father, grandfather, or a venerable male elder.",
    culturalContext: "Respect for elders is a foundational social pillar. Addressing an older man as 'Baba' acknowledges his wisdom and community guardianship.",
  },
  "Iya": {
    term: "Iya",
    pronunciation: "EE-yah",
    definition: "An affectionate and respectful Yoruba title for mother, maternal figure, or elder market woman.",
    culturalContext: "Used respectfully when greeting adult women in town, honoring their maternal care and status within the community.",
  },
  "khaki": {
    term: "Khaki Uniform",
    definition: "Durable tan-brown twill cotton uniforms worn by generations of primary school students across Nigeria.",
    culturalContext: "Wearing one's first starched khaki uniform marked the transition from early childhood playtime to formal scholarship and civic pride.",
  },
};

export const STORY_CHAPTERS: StoryChapter[] = [
  {
    id: 1,
    romanNumeral: "I",
    title: "The Starched Khaki and the Morning Mist",
    subtitle: "The ritual of preparation in the home of Baba Tunde",
    image: "/images/ade_morning_departure_1793959583419.jpg",
    imageCaption: "Ade pauses on the red threshold of Ilode as the morning mist begins to clear.",
    estimatedReadingMinutes: 2,
    keyThemes: ["Preparation", "Family Pride", "Transition"],
    paragraphs: [
      "Ade goes to school.",
      "The sentence had lived inside his chest for two full seasons, as steady as the ticking clock in the church tower and as heavy as a river stone. But on this cool Monday morning in the village of Ilode, the words were no longer a promise traded between grown-ups across evening teacups; they were the rhythm of his own small leather sandals against the packed earthen floor.",
      "Before the first rooster had cleared its throat on the rooftop of the bicycle repairer, Mama Bisi had already swung the heavy door of the hearth open. In the center of the kitchen table sat the charcoal iron—a dark, beast-like chest of black cast iron. Mama had packed its hollow belly with glowing coals from mahogany roots, fanning them until the red heart of the wood gave off an intense, dry warmth. Beside her lay Ade's uniform: a crisp pair of khaki shorts with double-stitched pockets and a short-sleeved shirt with neat navy blue piping along the collar.",
      "Mama drew the hot iron across the cloth with firm, sweeping strokes. The smell of cassava starch and hot iron rose into the damp morning air, smelling sharp, clean, and serious. 'Stand straight, Ade,' she commanded without lifting her gaze from the seam. 'A boy who enters St. Jude's with crooked creases is already telling his teacher that his thoughts are untidy.'",
      "Ade stood so straight his spine felt like a bamboo cane. He smoothed down his collar, adjusting the canvas satchel his elder cousin had passed down to him. Inside the bag rested a cedar-wood slate, two white sticks of chalk wrapped in banana fiber, and a smooth grey pebble his grandfather, Baba Tunde, had fished from the sacred stream behind the grove. 'Hold this when your head feels noisy,' the old man had whispered by the fire the evening prior. 'A boy who remembers where the river flows will never get lost on the chalkboard.'",
    ],
  },
  {
    id: 2,
    romanNumeral: "II",
    title: "The Song of the Red Road",
    subtitle: "Through the awakening market of Ilode",
    image: "/images/morning_village_market_1793959584359.jpg",
    imageCaption: "The market crossroad: the aroma of puff-puff and the chorus of morning greetings.",
    estimatedReadingMinutes: 2,
    keyThemes: ["Community", "Sensory Discovery", "Kinship"],
    paragraphs: [
      "The front wooden latch clicked open, and the world greeted them with cool air and the smell of wet morning grass. The village of Ilode was stirring like a great, slow-waking bird.",
      "Ade stepped down onto the main road. The laterite earth was cool and dark from the overnight dew, its rich crimson dust clinging softly to the soles of his shoes. Beside him walked his elder sister, Simi, who was in Primary Four and wore her navy pinafore with the practiced nonchalance of an old scholar. She carried her books tied tightly with a woven raffia cord beneath her arm.",
      "As they reached the market intersection, the quiet village dissolved into a chorus of sound and color. Iya Morayo had already set her immense blackened frying wok over three flat granite stones. Long golden ribbons of dough dropped into the crackling groundnut oil, hissing furiously before puffing into round, fragrant spheres of puff-puff. Steam carried the sweet scent of ground nutmeg and caramelized sugar straight down the lane.",
      "'Aha! Is that our little scholar Ade?' Iya Morayo called out, waving a dripping metal skimmer. Her indigo adire headwrap was wound high like a majestic crown. 'Look at him! Creases sharp enough to slice an orange! Come here, master scholar.' She scooped two golden puff-puffs into a folded sheet of clean newsprint and thrust them into Ade's palms. 'Eat with your head high today. Every sum you calculate on your slate adds honor to Ilode.'",
      "Ade bowed his head with two hands to receive the offering. 'E se pupo, Iya,' he replied, his heart beating fast with a pride that tickled his ribs. Even the weavers at the loom shed paused their wooden shuttles to nod. Ade realized then that he was not merely walking alone down a dusty road; he was carrying the hopes of every shopkeeper, palm-wine tapper, and grandmother whose hands were too worn to turn the pages of a book.",
    ],
  },
  {
    id: 3,
    romanNumeral: "III",
    title: "The Crossing at Oshun Brook",
    subtitle: "A test of courage on the wooden footbridge",
    image: "/images/wooden_bridge_stream_1793959585102.jpg",
    imageCaption: "The footbridge over the clear stream where the forest meets the town.",
    estimatedReadingMinutes: 2,
    keyThemes: ["Courage", "Empathy", "Integrity"],
    paragraphs: [
      "Past the last palm grove, the road dipped gently toward the low valley where the Oshun Brook murmured between green fern-draped banks. Here, the town was connected to the school grounds by an ancient footbridge of hewn mahogany planks, smoothed by decades of bare feet and bicycle tires.",
      "Ahead of them trotted little Folu, the blacksmith's six-year-old son, who was so small his khaki shorts reached his ankles. Folu was clutching his brand-new wooden framed slate against his chest as if it were a shield against dragons. But near the midpoint of the span, where the wood was slippery with wet river moss, Folu's rubber sandal caught on an uneven grain.",
      "With a startled cry, the little boy tumbled sideways into the soft ferns at the bank. His wooden slate slipped from his fingers, bounced twice off the edge of the plank, and landed face-down in the shallow, sunlit eddy beneath the bridge, trapped between two flat quartz stones.",
      "Folu began to sob, his small shoulders shuddering. 'My slate! My slate is in the water! Master Adeleke will send me home with the cane!'",
      "Simi looked down at her wrist, where her imaginary watch warned of the morning bell. 'Ade, keep moving. We cannot be late on your very first morning. Assembly begins at half-past seven!'",
      "Ade stood frozen for three heartbeats. He looked at his gleaming leather sandals, at the sharp creases his mother had ironed with so much labor, and then at Folu's tear-streaked face. Without another word, Ade carefully slipped his sandals off his feet and set his satchel upon a dry stump. Stepping down onto the cool river pebbles, the water rushed cold and refreshing around his ankles. He reached into the clear current, his fingers closing around the wooden frame, and lifted the slate free of the mud before the water could seep into the soft chalk core.",
      "He wiped the surface dry against his inner shirt hem and climbed back up to the wooden planks. 'Here, Folu,' Ade said quietly, handing over the rescued slate. 'No cane today. We go together.' Folu wiped his nose with the back of his forearm, his wide brown eyes shining with gratitude, and matched Ade's stride step for step.",
    ],
  },
  {
    id: 4,
    romanNumeral: "IV",
    title: "Under the Great Flame Tree",
    subtitle: "The arrival at the gates of St. Jude's Community Academy",
    image: "/images/schoolhouse_bell_courtyard_1793959585608.jpg",
    imageCaption: "The courtyard under the scarlet flame tree as the bronze bell rings.",
    estimatedReadingMinutes: 2,
    keyThemes: ["Belonging", "Anticipation", "Shared Joy"],
    paragraphs: [
      "The clearing opened suddenly, and there it stood: St. Jude's Community Academy. Two long whitewashed classroom blocks with sky-blue window shutters and corrugated iron roofs that sparkled under the climbing sun.",
      "In the middle of the red clay courtyard grew the legendary flamboyant tree. Its branches spread wide and low like a great protective umbrella, crowned with hundreds of thousands of fiery orange-red blossoms that drifted down upon the earth, carpeting the red soil in scarlet petals. Around its trunk clustered nearly two hundred children in matching uniforms, their laughter and overlapping shouts filling the morning like the song of weaverbirds.",
      "High on an iroko wood post near the entrance hung the school bell—a heavy, weathered bronze bell brought up from the coast before Ade's father was born. Beside it stood Pa Silas, the head custodian, clutching the frayed hemp rope.",
      "CLANG! CLANG! CLANG!",
      "The bell spoke with a voice like thunder wrapped in velvet. The sound rolled out across the courtyard, over the cassava farms, across the mahogany bridge, and all the way back to the market square. At once, the hundred conversations snapped into silence. Rows began to form with military precision under the red blossoms: the infants in front, the tall Primary Six prefects behind.",
      "Ade found his place in the Primary One line. He felt the cold iron bell reverberate through the soles of his feet. Folu stood beside him, clutching his clean slate and giving Ade a secret, knowing smile. Overhead, a scarlet blossom slipped from a high branch and settled softly on the shoulder of Ade's khaki shirt. He did not brush it away; it felt like a medal bestowed by the morning itself.",
    ],
  },
  {
    id: 5,
    romanNumeral: "V",
    title: "The First Blank Page",
    subtitle: "Inside the classroom of Master Adeleke",
    estimatedReadingMinutes: 2,
    keyThemes: ["Knowledge", "Wonder", "The Beginning of the Journey"],
    paragraphs: [
      "The classroom smelled of fresh blackboard paint, cedar shavings, and the sweet drying rain of yesterday afternoon. Long sunbeams poured through the wooden louvers, illuminating swirling motes of golden dust.",
      "Master Adeleke stood by the blackboard. He was a tall, lean man with horn-rimmed spectacles and a deep, melodic voice that could quiet a storm. On the dark green board, he had already drawn four neat white guidelines.",
      "He turned to the twenty children sitting two-by-two at the carved wooden desks. 'Good morning, scholars of Ilode,' he announced. 'Today is the first day your fingers learn to speak without opening your lips.'",
      "With a piece of brand-new calcium chalk that clicked sharply against the slate board, Master Adeleke wrote four words in rolling cursive script. Every child leaned forward. Ade felt his breath catch in his throat as he traced the white curves with his eyes.",
      "Ade opens his notebook. The paper is fresh, ivory-toned, and uncreased—a vast, quiet territory waiting for a pioneer. He unclasps his brass pencil sharpener, turns his cedar pencil until the graphite point is needle-sharp, and places the lead against the first blue line.",
      "Outside the louvered window, the red road winds backward toward home, toward Mama's hot iron and Iya Morayo's bubbling skillet. But here, with the cedar seed warm in his pocket and his sister's smile in his memory, Ade begins.",
      "He writes his name. And the world opens.",
    ],
  },
];

export const REFLECTION_QUESTIONS: ReflectionQuestion[] = [
  {
    id: 1,
    promptType: "comprehension",
    question: "What object did Ade's grandfather, Baba Tunde, give him before his first day of school, and what was its meaning?",
    options: [
      "A silver coin to buy hot puff-puff at the market",
      "A smooth river pebble to hold when his head felt noisy and remember where the river flows",
      "A leather strap to keep his schoolbooks tightly bound",
      "A fountain pen brought from the regional city",
    ],
    correctIndex: 1,
    explanation:
      "Baba Tunde gave Ade a smooth grey pebble from the sacred stream behind the grove, reminding him that 'A boy who remembers where the river flows will never get lost on the chalkboard.'",
    guidingInsight: "Grandfather's gift anchors Ade's educational journey to his roots, heritage, and peace of mind.",
  },
  {
    id: 2,
    promptType: "discussion",
    question: "Why did Ade choose to step into the water to rescue Folu's slate, even though his sister warned him they might be late?",
    guidingInsight:
      "Ade demonstrated empathy and community integrity. He understood the immense emotional and practical value of the slate to little Folu, choosing compassion over punctuality.",
  },
  {
    id: 3,
    promptType: "comprehension",
    question: "What was the significance of the flame tree (flamboyant) in the school courtyard?",
    options: [
      "It was used strictly as a fence boundary to keep livestock out",
      "It provided shade, beauty, and a communal gathering canopy where fallen red petals welcomed the children like medals",
      "It was where teachers stored the classroom desks during the dry season",
      "It produced fruit that the school sold to pay for library books",
    ],
    correctIndex: 1,
    explanation:
      "The majestic flame tree (Delonix regia) spread its canopy over the entire courtyard, dropping bright scarlet blossoms on the children like celebratory honors on their first day.",
    guidingInsight: "The tree symbolizes nature, community shelter, and the celebratory beauty of education in rural schools.",
  },
  {
    id: 4,
    promptType: "creative",
    question: "What do you imagine Ade wrote in his exercise book next after writing his name on the first blank page?",
    guidingInsight:
      "Consider the sounds of the market, the red road, or the proverb Master Adeleke shared. How does writing allow Ade to capture his village and step into his future?",
  },
];
