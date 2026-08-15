import "dotenv/config";
import mongoose from "mongoose";
import connectDB from "./src/config/db.js";
import Chapter from "./src/models/chapter.js";

const bookId = "6a7f1cffa0518633c7d06b83"; // Harry Potter and the Goblet of Fire

const chapterTitles = [
    "The Unexpected Morning",
    "The Journey Begins",
    "A Strange Announcement",
    "The Tournament",
];

const generateChapterContent = (chapterNo) => {
    const paragraphs = [
        `Chapter ${chapterNo} of Harry Potter and the Goblet of Fire begins with an unusual morning. The castle is quieter than usual, although there is a strange feeling in the air. Students move through the corridors while whispers spread from one room to another. Nobody seems to know exactly what is happening, but everyone knows that something important is about to begin.`,

        `The day continues with lessons, conversations, and small discoveries. Harry notices that several students seem distracted. Teachers are unusually serious, and even the portraits appear interested in the activity taking place around the castle. Every hallway seems to contain another rumour, although none of them can be confirmed.`,

        `As the morning progresses, Harry and his friends discuss what they have heard. They try to separate facts from exaggeration, but the rumours only become stranger. Some students insist that a major event is coming, while others believe the entire situation is being blown out of proportion.`,

        `Later that afternoon, the atmosphere changes completely. Students begin gathering in the Great Hall, where an important announcement is expected. The room is filled with conversation, excitement, and nervous anticipation. Harry looks around and realizes that almost everyone is waiting for the same thing.`,

        `The announcement finally arrives, but it raises almost as many questions as it answers. The students listen carefully as the rules and expectations are explained. For some, the news is exciting. For others, it is unsettling. Harry cannot shake the feeling that the coming events will change the school for everyone.`,

        `Afterward, the corridors become crowded. Students argue about what the announcement means and what might happen next. Harry and his friends attempt to make sense of everything while making their way back toward their common room.`,

        `That evening, the castle feels different. The usual sounds of students moving between rooms are mixed with distant conversations and hurried footsteps. Harry spends some time thinking about the announcement and wondering what role he might have in the events ahead.`,

        `The next morning brings even more activity. Notices appear around the castle, students discuss the latest developments, and teachers begin preparing for what is coming. Although nobody knows exactly how the situation will unfold, it is becoming increasingly clear that the ordinary school routine is about to be interrupted.`,

        `Harry eventually realizes that there is little point in worrying about possibilities that have not happened yet. He decides to concentrate on what he can actually control. With his friends nearby and another busy day ahead, he prepares himself for whatever comes next.`,

        `The chapter closes with the castle settling down for the evening. The immediate excitement has faded, but the questions remain. Something significant is approaching, and everyone knows that the next few days may be very different from anything that came before.`,
    ];

    // Repeat the original paragraphs to make the chapter long enough
    // to occupy several pages in the reader.
    return Array.from({ length: 4 }, (_, repetition) => {
        return paragraphs
            .map((paragraph) => {
                return `${paragraph} This is test seed content for reading-page layout and pagination. Section ${repetition + 1} continues the chapter so that the frontend can be tested with longer reading content.`;
            })
            .join("\n\n");
    }).join("\n\n");
};


const seedChapters = async () => {
    try {
        await connectDB();

        console.log("Connected to MongoDB");

        for (let i = 0; i < chapterTitles.length; i++) {
            const chapterNo = i + 1;

            const content = generateChapterContent(chapterNo);

            await Chapter.findOneAndUpdate(
                {
                    bookId,
                    order: chapterNo,
                },
                {
                    bookId,
                    title: chapterTitles[i],
                    order: chapterNo,
                    chapterNo,
                    content,
                },
                {
                    upsert: true,
                    new: true,
                }
            );

            console.log(
                `Seeded Chapter ${chapterNo} - ${chapterTitles[i]} (${content.length} characters)`
            );
        }

        console.log("Done!");
    } catch (error) {
        console.error("Seed failed:", error);
        process.exitCode = 1;
    } finally {
        await mongoose.disconnect();
    }
};

seedChapters();