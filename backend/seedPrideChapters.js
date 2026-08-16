import "dotenv/config";
import mongoose from "mongoose";
import connectDB from "./src/config/db.js";
import Book from "./src/models/book.js";
import Chapter from "./src/models/chapter.js";
import OwnedBook from "./src/models/ownedBook.js";

const BOOK_TITLE = "Pride and Prejudice";

const chapters = [
  {
    title: "A Gentleman Takes Netherfield",
    content: `It is a truth universally acknowledged in the village of Meryton that a single man in possession of a good fortune must be in want of a wife. Mrs Bennet of Longbourn believed this with her whole heart, and she had five daughters to prove her devotion to the idea.

On a wet Tuesday in September, her neighbour Mrs Long brought news that Netherfield Park had at last been let. The tenant was Mr Charles Bingley, a young man from the north of England, with four or five thousand a year and a cheerful reputation. He was expected within a fortnight, and he would bring a large party.

“Four or five thousand a year, and very likely more,” Mrs Bennet told her husband at breakfast, buttering toast with triumphant energy. “What a fine thing for our girls.”

Mr Bennet looked up from his newspaper. He was a quiet, ironic man who loved a well-stocked library more than a crowded drawing room. “How so? How can it affect them?”

“My dear Mr Bennet,” she cried, “how can you be so tiresome? You must know that I am thinking of his marrying one of them.”

Jane, the eldest, smiled and said nothing. She was twenty-two, gentle, and determined to think well of everybody. Elizabeth, who sat next to her, was twenty, quick-eyed, and already amused. Mary had a book of sermons open beside her plate. Catherine, called Kitty, and Lydia, who was only fifteen, leaned forward together as if the fortune might walk into the room at any moment.

“I desire you will do no such thing,” Mr Bennet said, though his mouth twitched. “I have no intention of visiting Mr Bingley. If he wants our acquaintance, he may come here.”

Mrs Bennet declared she was sick of him, then spent the rest of the morning naming which daughter should wear which gown to the first assembly. Elizabeth walked to the window and watched rain darken the gravel. She did not believe a man’s income was a character reference, but she did believe Longbourn felt smaller every year. Mr Bennet’s estate was entailed away from the female line. When he died, the house, the park, and the income would pass to a cousin none of them had met.

That evening Mr Bennet closed his library door and, without telling his wife, wrote a short note to Netherfield. He would call on Mr Bingley the following week. He liked to keep one private joke in reserve.

Elizabeth found Jane in their shared bedroom later, folding a pale blue sash. “Mama has already married you to him in her mind,” Elizabeth said.

Jane laughed softly. “We have not even seen him. He may be proud, or dull, or already engaged.”

“Then Mama will never recover. I shall have to fetch the smelling salts and a second fortune.”

They both laughed, but Jane’s hope was real. Elizabeth’s was more cautious. She wanted affection, not a rescue. Still, as the rain eased and the park at Netherfield showed a few lighted windows in the distance, even she felt the village change shape around a single piece of news: a young man with money had arrived, and every mother in Hertfordshire had begun to count.`,
  },
  {
    title: "Mr Bingley Pays a Call",
    content: `Mr Bennet did visit Netherfield, just as he had secretly planned. He stayed three-quarters of an hour, found Mr Bingley open, handsome, and eager to please, and returned home with the satisfied air of a man who has won a small domestic war.

He said nothing at dinner. Mrs Bennet talked of the weather, the butcher, and the injustice of entails. Lydia asked twice whether anyone interesting had come to Meryton. Mr Bennet waited until the second course.

“I hope, my dear,” he said, “that you have ordered a good dinner for tomorrow, because I have reason to expect an addition to our family party.”

Mrs Bennet stared. “Who do you mean? I cannot imagine.”

“The gentleman who has taken Netherfield. I called on him this morning, and he means to return the visit.”

The noise that followed made the maid nearly drop a dish. Kitty clapped. Lydia asked if Mr Bingley was handsome. Mary observed that vanity was a weakness. Jane looked at Elizabeth with a startled, happy smile.

Mr Bingley came the next afternoon in a blue coat, with a ready laugh and a habit of looking at Jane as if she were the only calm object in a restless room. He was twenty-two, not much older than she was, and he spoke of Netherfield’s gardens, of London, and of a ball he hoped the neighbourhood would soon enjoy.

He did not stay long. Mrs Bennet managed, in twelve minutes, to praise Jane’s beauty, Lydia’s liveliness, and the excellence of her own table. Elizabeth watched Mr Bingley endure it with good humour. When he left, he bowed especially to Jane.

“He is just what a young man ought to be,” Jane said afterwards, colour in her cheeks. “Sensible, good-humoured, lively.”

“And rich,” Elizabeth added, “which makes the rest easier for Mama to admire.”

“Lizzy, do not tease. I liked him. That is all.”

“I liked him too. He looks as if he has never had an unkind thought, which is either a virtue or a lack of practice.”

Mrs Bennet was already planning the assembly. Sir William Lucas, their friend from Lucas Lodge, sent word that Mr Bingley would attend with a large party: his two sisters, his brother-in-law Mr Hurst, and a friend from Derbyshire named Mr Darcy.

“Mr Darcy has ten thousand a year,” Mrs Long reported, as if she had weighed the money herself. “And a house in town, and a great estate called Pemberley.”

Elizabeth raised an eyebrow. “Then he will have no trouble finding partners. The room will arrange itself around his income.”

Lydia only cared whether there would be enough officers from the militia regiment newly camped near Meryton. The regiment, she said, made every assembly worth attending. Elizabeth thought the officers might be a nuisance. Jane thought everyone might be pleasant. Mr Bennet thought he would stay home with a book, then, seeing his wife’s face, agreed to go after all.

The night before the assembly, Elizabeth sat on the edge of Jane’s bed. “If he is as kind as he seemed, I am glad for you,” she said. “Only do not give Mama the satisfaction of falling in love in a single evening.”

Jane tucked the blanket under her chin. “I shall try to be very slow about it.”

Neither of them slept much. Netherfield’s lights were visible again across the fields, and Longbourn felt, for the first time in months, as if something might happen there besides economy and waiting.`,
  },
  {
    title: "The Meryton Assembly",
    content: `The assembly room in Meryton was too small for the crowd that arrived. Musicians tuned near the fireplace. The floor had been chalked. Every mother in the district had brought a daughter, and every daughter had been told, at least once, not to look too eager.

Mr Bingley’s party entered a little after the dancing began. He was exactly as Jane remembered: fair-haired, smiling, already bowing to people he had met only once. His sisters, Mrs Hurst and Miss Caroline Bingley, wore white and looked as if Meryton had personally disappointed them. Mr Hurst wanted only a seat near the wine. And then there was Mr Darcy.

He was tall, above the common height, with a grave handsome face and dark eyes that moved over the room as if measuring it. He danced once with Miss Bingley and once with Mrs Hurst, then stood near the wall with his arms folded. The rumour of ten thousand a year passed from chair to chair faster than the music.

Mr Bingley came straight to Jane. He asked her to dance the first two dances, then the next, then declared, loud enough for Elizabeth to hear, that he had never met so many pleasant girls in his life. Jane’s composure held, but her eyes did not hide her pleasure.

Elizabeth danced with Mr Lucas’s son and with an officer named Denny. Between sets she stood with Charlotte Lucas, her closest friend, a sensible woman of twenty-seven who had long since stopped expecting the room to arrange a future for her.

“Your sister is the beauty of the evening,” Charlotte said. “Mr Bingley has made that official.”

“And his friend has made pride official,” Elizabeth answered. “He has danced with his own party and found the rest of Hertfordshire unworthy.”

She did not mean him to hear her. She discovered, a moment later, that he had. Mr Bingley was trying to persuade him to dance.

“Come, Darcy,” Bingley said. “I hate to see you standing about by yourself in this stupid manner. You had much better dance.”

“I certainly shall not. You know how I detest it unless I am particularly acquainted with my partner. At an assembly such as this, it would be insupportable. Your sisters are engaged, and there is not another woman in the room whom it would not be a punishment to me to stand up with.”

“I would not be so fastidious as you are,” Bingley cried. “Upon my honour, I never met with so many pleasant girls in my life as I have this evening, and there are several of them you see uncommonly pretty.”

“You are dancing with the only handsome girl in the room,” said Mr Darcy, looking at Jane.

“Oh, she is the most beautiful creature I ever beheld. But there is one of her sisters sitting down just behind you, who is very pretty, and I dare say very agreeable. Do let me ask my partner to introduce you.”

“Which do you mean?” Darcy turned and looked at Elizabeth for a moment. She met his gaze without smiling. He looked away. “She is tolerable, but not handsome enough to tempt me. I am in no humour at present to give consequence to young ladies who are slighted by other men. You had better return to your partner and enjoy her smiles, for you are wasting your time with me.”

Elizabeth heard every word. For a second the music seemed to tilt. Then she laughed, because anger that could not be spoken aloud had to go somewhere. She told Charlotte the speech before the next dance had ended, and Charlotte, who understood the value of a good story, helped her tell it again.

By the end of the night Jane had danced four times with Mr Bingley. Miss Bingley had called the company insipid. Mr Darcy had spoken to nobody beyond his own party. And Elizabeth Bennet had made a private resolution: she would not give Mr Darcy the satisfaction of thinking his opinion could wound her, even though, walking home under a thin moon, she knew that it had.`,
  },
  {
    title: "Jane Is Caught in the Rain",
    content: `Three days after the assembly, Miss Bingley wrote to Jane. The note was written on fine paper and smelled faintly of roses. Netherfield’s ladies were lonely, it said, and would be delighted if Miss Bennet would dine with them. The gentlemen were to dine with the officers.

Mrs Bennet saw the opportunity at once. “You must go on horseback,” she told Jane. “It looks like rain. If you go in the carriage you will be back too soon.”

“Mama,” Elizabeth said, “if it rains she will be soaked.”

“So much the better. She will have to stay the night.”

Jane went on horseback because arguing with Mrs Bennet used more strength than the ride. The sky opened two miles from Netherfield. By the time she arrived, her habit was dark with water and she could not stop shivering. Miss Bingley received her with cries of concern that were not entirely false. Jane was put by the fire, given dry clothes, and then, as the afternoon went on, she developed a sore throat and a fever.

A short note reached Longbourn at dusk. Jane was unwell. The Bingleys insisted she remain.

Elizabeth set out on foot the next morning, against her mother’s protests and with her father’s quiet approval. The fields were wet. She jumped over stiles, splashed through a lane of puddles, and arrived at Netherfield with mud on her petticoat and colour in her face.

The housekeeper stared. Miss Bingley stared harder. Mr Darcy, who was writing a letter in the breakfast parlour, looked up and then could not quite look away. Elizabeth asked at once to see her sister.

Jane was in a handsome bedroom with a view of the lawn. Her voice was thin. She held Elizabeth’s hand and said she was a great deal of trouble. Elizabeth sat with her all morning, reading aloud when Jane could not sleep, and sending home a note that she would stay until Jane was better.

Dinner that evening was a study in manners used as weapons. Miss Bingley praised Darcy’s letter-writing and Pemberley’s library. Mrs Hurst agreed with everything her sister said. Mr Hurst fell asleep after the fish. Mr Bingley asked Elizabeth, three times, whether Jane was comfortable, and looked genuinely pained when the answer was only “a little better.”

After dinner they moved to the drawing room. Miss Bingley walked the length of the carpet, hoping Mr Darcy would notice her figure. He was watching Elizabeth instead, who had taken a book and refused to perform.

“Miss Eliza Bennet,” Caroline said, with a smile that did not reach her eyes, “despises cards. She is a great reader and has no pleasure in anything else.”

“I deserve neither such praise nor such censure,” Elizabeth said. “I am not a great reader, and I have pleasure in many things.”

Mr Darcy asked what she was reading. She named the title. He nodded as if he knew it, then asked whether she preferred town or country. She said it depended on the people. He said it depended on the mind. For a moment they were almost in conversation, and then Caroline laughed too loudly at nothing and the moment closed.

That night Elizabeth slept in a chair near Jane’s bed. Jane’s fever eased toward morning. Elizabeth, half awake, thought of Darcy’s stare in the breakfast parlour and of the mud on her petticoat, and decided that a man who could look at a dirty hem as if it were a moral failing was not worth a second thought. She did not yet know that he had been thinking of the colour in her face after the walk, and of the way she had gone straight to her sister without noticing anyone else in the room.`,
  },
  {
    title: "A Guest Who Cannot Be Ignored",
    content: `Jane was well enough to sit in the drawing room on the third day, wrapped in a shawl, with Mr Bingley placing cushions as if cushions were a science. Elizabeth had begun to like him without reservation. He had no talent for cruelty. Even Miss Bingley’s barbs passed over him like weather.

Mr Darcy was harder to place. He spoke little, listened too much, and sometimes asked Elizabeth a question so direct that she answered more honestly than she meant to. When she said her sister never saw faults in anyone, he asked whether such sweetness was a credit or a danger. She said it was a credit. He looked unconvinced.

On the fifth morning Jane was strong enough to go home. Mr Bingley offered his carriage. Mrs Bennet, who arrived to collect them with Kitty and Lydia in tow, stayed an uninvited hour, talked too loudly of Jane’s beauty, and told Mr Bingley he ought to have a ball at Netherfield. He agreed at once. Miss Bingley’s smile became a thin line.

Back at Longbourn, peace lasted less than a week. A letter came from Mr Collins, the cousin who would inherit the estate. He was a clergyman. He had recently received the patronage of Lady Catherine de Bourgh of Rosings Park in Kent. He wished, he wrote, to heal the breach between the families, and to visit Longbourn for a week. He hinted, with all the delicacy of a falling brick, that he meant to choose a wife from among his cousins.

He arrived on Monday in a hired chaise, bowing as he entered as if the hall were a church. He was twenty-five, solemn, and extremely impressed by his own good fortune. He praised the furniture, the staircase, and Mrs Bennet’s cooking in the same tone he later used for Lady Catherine’s chimneys.

“Lady Catherine,” he said at dinner, “is a most active, useful person. She has advised me on the shelves in my closets and on the desirability of marriage for a clergyman. She has even said that I ought to marry as soon as I can, and that she does not believe a respectable woman would refuse me.”

Lydia choked on her wine. Elizabeth looked at her plate. Mr Bennet asked a series of grave questions about Lady Catherine’s health, her daughter, and the exact height of Rosings, and Mr Collins answered all of them at length.

Afterwards, in the parlour, he sat too close to Jane. Mrs Bennet, who had not yet given up Mr Bingley, steered him, with remarkable speed, toward Elizabeth. Mr Collins did not notice the steering. He believed himself guided by Providence.

Elizabeth escaped to the garden with Charlotte Lucas, who had walked over from Lucas Lodge. The evening was cold. Smoke rose from Longbourn’s chimneys in a straight line.

“He will propose to someone before the week is out,” Charlotte said. “Your mother will see to it.”

“Then I hope he proposes to the furniture. It has already received his finest compliments.”

Charlotte did not laugh as long as Elizabeth expected. “You can afford to joke. I cannot. I am twenty-seven, Lizzy. A comfortable home is not a joke to me.”

Elizabeth took her friend’s arm. She understood the words and still could not feel them as Charlotte did. She wanted love, or at least respect that did not sound like a sermon. Mr Collins, she was already sure, could offer neither. What she did not yet see was that the week would force every woman in the house to decide what she could bear, and that Charlotte had already begun to make her own calculations.`,
  },
  {
    title: "Two Proposals and One Escape",
    content: `Mr Collins requested a private audience with Elizabeth on Wednesday morning. Mrs Bennet, radiant, ordered everyone else out of the breakfast room. Jane gave Elizabeth a look of apology. Mr Bennet, passing the door, murmured, “If you will not have him, I will not force you,” which was the most useful thing anyone said all day.

Mr Collins stood with his back to the window and began as if reading from notes. He listed his reasons for marrying: it was the right thing for a clergyman; Lady Catherine had recommended it; he wished to set an example; and he meant to choose a wife from Longbourn as a kind of reparation for the entail.

“And now nothing remains for me but to assure you in the most animated language of the violence of my affection,” he said, without looking animated at all.

Elizabeth stopped him as politely as she could. “You are too hasty, sir. You forget that I have given no answer. I am honoured by your proposal, but I must decline it.”

He smiled. He believed she was being modest. Young ladies, he said, often refused a first time. Lady Catherine had told him so.

“I am not a young lady of that sort,” Elizabeth said, her voice still even. “I am perfectly serious. You could not make me happy, and I am convinced that I am the last woman in the world who could make you so. I wish you very happy and very rich, but I cannot marry you.”

He tried twice more. She refused twice more. Mrs Bennet rushed in, heard the result, and declared that Elizabeth was a very headstrong, foolish girl and would never have another chance. She appealed to Mr Bennet.

Mr Bennet called them both into the library. “An unhappy alternative is before you, Elizabeth,” he said. “From this day you must be a stranger to one of your parents. Your mother will never see you again if you do not marry Mr Collins, and I will never see you again if you do.”

Mrs Bennet sat down hard. Elizabeth, for the first time that morning, wanted to hug her father in public.

Mr Collins left the room offended and confused. By Friday he had transferred his addresses to Charlotte Lucas, who listened without mockery. On Saturday Charlotte walked to Longbourn and asked to speak with Elizabeth alone.

“I have accepted him,” Charlotte said.

Elizabeth stared. “You cannot be serious.”

“I am. I am not romantic, Lizzy. I never was. I ask only a comfortable home, and considering Mr Collins’s character, connections, and situation in life, I am convinced that my chance of happiness with him is as fair as most people can boast on entering the marriage state.”

Elizabeth felt as if the ground had shifted. She loved Charlotte. She could not respect the choice, and she hated herself for that failure. Charlotte asked her not to tell anyone until she had spoken to Sir William. Then she left, walking quickly, as if speed could turn a practical decision into a brave one.

That night Jane sat with Elizabeth in the dark. “She will have a house,” Jane said gently. “And he is not a cruel man.”

“He is a foolish one. She will have to hear about Lady Catherine at breakfast, dinner, and prayers.”

“Then we will write to her often, and we will visit, and we will not make her feel small for choosing safety.”

Elizabeth agreed, because Jane was right, and because anger at Charlotte felt too much like Miss Bingley’s kind of pride. Still, she went to sleep thinking that the world asked women to call a bargain a blessing, and that she was not sure how long she could refuse to make one herself.`,
  },
  {
    title: "Wickham’s Story",
    content: `The militia regiment gave Meryton a new kind of weather. Officers in red coats filled the shop, the pavement, and Lydia’s conversation. Among them was Mr George Wickham, who arrived with Mr Denny and was introduced to the Bennet sisters outside the milliner’s.

He was handsome in an easy way, with a ready smile and a gift for looking at whoever spoke as if they were the most interesting person in Hertfordshire. Lydia declared him the most charming man in the regiment before they had walked twenty yards. Elizabeth found him pleasant, then more than pleasant, when he fell into step beside her and asked intelligent questions about the neighbourhood.

They met again at Aunt Phillips’s evening party. Wickham did not play cards. He sat with Elizabeth near the window and, after a little general talk, asked whether she knew Mr Darcy of Pemberley.

“A little,” she said. “He is staying at Netherfield. We are not favourite companions.”

Wickham’s expression changed, as if she had given him permission. “I have known him all my life. His father, the late Mr Darcy, was one of the best men I ever met. I was his godson. He paid for my education and meant me to have a valuable living in the church when it became vacant. When he died, the present Mr Darcy gave the living elsewhere and paid me a fraction of what I had been led to expect. I could not decently make it public. He is too powerful, and his sister, Miss Darcy, is very young.”

Elizabeth listened with growing indignation. The story fitted everything she already wanted to believe. Darcy had been proud at the assembly. He had stared at her muddied petticoat. He had barely spoken to the people of Meryton. Of course a man like that would cheat a godson.

“It is abominable,” she said. “I had not thought him as bad as this, but I had thought him proud enough for almost anything.”

Wickham smiled as if her anger were a gift. He asked her not to repeat the story widely. He said he would not wish to injure Darcy if Darcy would leave him in peace. Elizabeth promised, then broke the promise almost at once by telling Jane the whole of it on the walk home.

Jane was distressed. “There must be some misunderstanding. Mr Bingley would not keep such a friend.”

“Mr Bingley thinks well of everybody, as you do. That is not evidence.”

The Netherfield ball was set for Tuesday. Elizabeth dressed with more care than she admitted, telling herself it was for the dancing, not for the chance of seeing Wickham. He did not come. Mr Denny said he had been obliged to go to town. Lydia was sure Darcy had frightened him away. Elizabeth, looking across the room, found Darcy already watching her, and the look felt less like admiration than like a problem he had not solved.

He asked her to dance. Surprise made her accept. For the first quarter of the set they said nothing. Then he asked if she and her sisters often walked to Meryton. She said they did. She mentioned the officers. His face tightened.

“Mr Wickham is blessed with such happy manners as may ensure his making friends,” Darcy said. “Whether he may be equally capable of retaining them is less certain.”

“He has been so unlucky as to lose your friendship,” Elizabeth answered, “and in a manner which he is likely to suffer from all his life.”

Darcy said nothing more on that subject. The dance ended in a silence that felt like a slammed door. Elizabeth told Charlotte afterwards that she had never disliked anyone so much. Charlotte, who was already preparing for a married life in Kent, only said, “Be careful, Lizzy. Dislike can be as blinding as admiration, and you are enjoying both.”`,
  },
  {
    title: "Letters from London and Kent",
    content: `The morning after the ball, Netherfield was in motion. Miss Bingley had decided, with her brother’s uneasy consent, that they should go to London at once. Mr Bingley left a note for Mr Bennet that was polite, vague, and silent on the subject of Jane.

Jane read the news at breakfast and went very still. Mrs Bennet cried that the sisters had taken him away on purpose. Elizabeth thought that was likely. She also thought Jane’s quietness was worse than any outburst.

Jane went to London a fortnight later to stay with their aunt and uncle, the Gardiners, in Gracechurch Street. She wrote that she had called on Miss Bingley. The visit was short. Miss Bingley returned it even more shortly, and then Jane heard nothing. Mr Bingley, she was told, was much engaged.

“She is being cut,” Elizabeth said, furious, when the second letter arrived. “Caroline Bingley does not mean him to see her.”

Mr Bennet said young men were often thoughtless. Mrs Bennet said Jane would die of a broken heart and it would be everybody’s fault. Jane’s letters remained gentle. She hoped Mr Bingley was well. She would not accuse him.

In March, Elizabeth went to Kent with Sir William Lucas to visit Charlotte, now Mrs Collins, at Hunsford parsonage. The house was small and neat. Charlotte had arranged the rooms so that Mr Collins’s longest speeches happened in the study, away from the parlour. Elizabeth admired the arrangement more than she could say.

They were invited to Rosings almost at once. Lady Catherine de Bourgh was tall, loud, and convinced that her opinions were public services. Her daughter, Anne, was pale and nearly silent. Mr Collins agreed with Lady Catherine even when she contradicted herself.

In the second week, Mr Darcy arrived at Rosings with his cousin, Colonel Fitzwilliam, a pleasant, sunburnt man who talked to Elizabeth as if conversation were a rest. Darcy was quieter than at Netherfield, but he called at the parsonage more often than politeness required. Once he came in, sat for ten minutes, said almost nothing, and left. Charlotte smiled to herself. Elizabeth pretended not to notice.

Colonel Fitzwilliam, walking with her in the park, mentioned that Darcy had recently saved a friend from an imprudent marriage. “There were strong objections to the lady’s family,” he said. He did not name the friend. He did not need to.

Elizabeth stopped on the path. The oaks at Rosings were still winter-bare. She understood, in one cold rush, that Darcy had separated Bingley from Jane. The assembly, the ball, Mrs Bennet’s loud voice, Lydia’s wildness, and her own sharp tongue all arranged themselves into his reasons. She went back to the parsonage with a headache and a letter unfinished on her desk.

That evening Darcy called again. Charlotte found an errand. Mr Collins was at Rosings. Elizabeth was alone in the parlour, angry enough to be calm.

He stood near the door, looked at her as if the words might burn him, and said, without preface, that he had fought against his feelings for months. “In vain have I struggled. It will not do. My feelings will not be repressed. You must allow me to tell you how ardently I admire and love you.”

The room seemed too small for the speech. He spoke of her family’s want of connection, of her mother’s behaviour, of the inferiority of her circumstances, and then, as if those remarks were a kind of honesty she should thank him for, he asked her to marry him.

Elizabeth’s face was hot. “Do you think that any consideration would tempt me to accept the man who has been the means of ruining, perhaps for ever, the happiness of a most beloved sister? I have every reason in the world to think ill of you. My opinion of you was decided from the first moment of our acquaintance. You insulted me at the assembly. You have ruined Jane’s hopes. And Mr Wickham’s misfortunes are heavy against you. I had not known you a month before I felt that you were the last man in the world whom I could ever be prevailed on to marry.”

Darcy went white, then very still. He wished her health and happiness, in a voice she barely recognized, and left the house. The door closed with care, which somehow made it worse. Elizabeth sat down and shook. She had told the truth as she knew it. She did not yet know how much of that truth was incomplete, or that a letter, written before dawn at Rosings, was already waiting to change the rest of the story.`,
  },
];

const seedPrideChapters = async () => {
  try {
    await connectDB();

    const book = await Book.findOne({ title: BOOK_TITLE }).select("_id title");
    if (!book) {
      throw new Error(`${BOOK_TITLE} was not found in MongoDB`);
    }

    await Chapter.deleteMany({ bookId: book._id });

    const docs = chapters.map((chapter, index) => ({
      bookId: book._id,
      title: chapter.title,
      order: index + 1,
      chapterNo: index + 1,
      content: chapter.content,
    }));

    await Chapter.insertMany(docs);
    await Book.updateOne(
      { _id: book._id },
      { $set: { totalChapters: chapters.length } }
    );
    await OwnedBook.updateMany(
      { bookId: book._id },
      {
        $set: {
          "readingOrder.totalOrder": chapters.length,
        },
      }
    );

    console.log(`Seeded ${chapters.length} chapters for ${book.title} (${book._id})`);
    docs.forEach((doc) => {
      console.log(`  ${doc.order}. ${doc.title} (${doc.content.length} chars)`);
    });
  } catch (error) {
    console.error("Seed failed:", error.message || error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected");
  }
};

seedPrideChapters();
