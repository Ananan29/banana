import React from "react";
import tempbookPic1 from "./../../assets/images.jpeg"
import tempbookPic2 from "./../../assets/43514655.jpg"
import tempbookPic3 from "./../../assets/bookPic3.jpg";
import tempbookPic4 from "./../../assets/bookPic4.jpg";
import tempbookPic5 from "./../../assets/bookPic5.jpg";
import tempbookPic6 from "./../../assets/bookPic6.jpg";
import tempbookPic7 from "./../../assets/bookPic7.jpg";
import tempbookPic8 from "./../../assets/bookPic8.jpg";
import tempbookPic9 from "./../../assets/bookPic9.jpg";
import tempbookPic10 from "./../../assets/bookPic10.jpg";
import tempbookPic11 from "./../../assets/bookPic11.jpg";
import tempbookPic13 from "./../../assets/bookPic13.jpg";
import tempbookPic14 from "./../../assets/bookPic14.jpg";
import "./BookPage.css";
import { useParams } from "react-router-dom";
const BookPage = () => {
    const {BookId}=useParams();
    // these details will be called from api
    const tempBookDetails=[
        {
            bookId:11,
            bookName:"Twisted Lies",
            author:"Ana Huang",
            series:"Twisted",
            seriesBookNumber:4,
            genre:"Romance",
            pic: tempbookPic1,
            description: "lorem ipsum",
            publishDate:"28 July 2022",
            chapters:44,
            language:"English"
        },
        {
            bookId:12,
            bookName:"Reveal Me",
            author:"Tahereh Mafi",
            series:"Shatter Me",
            seriesBookNumber:5.5,
            genre:"Distopian",
            pic: tempbookPic2,
            description: `This fourth companion novella to Tahereh Mafi’s New York Times bestselling Shatter Me series is narrated by fan favorite character Kenji Kishimoto!

The explosive revelations in Defy Me have left readers reeling and desperate for answers. This fourth and final novella in the series will bring readers back to the world of the Shatter Me before the final novel installment hits shelves in winter 2020.

And don’t miss Find Me, the gorgeous paperback bind-up that brings together Shadow Me and Reveal Me in print for the first time!`,
            publishDate:"5 November 2019",
            chapters:13,
            language:"English"
        },
        {
            bookId: 13,
            bookName: "Shatter Me",
            author: "Tahereh Mafi",
            series: "Shatter Me",
            seriesBookNumber: 1,
            genre: "Dystopian",
            pic: tempbookPic3,
            description: `I have a curse

        I have a gift

        I am a monster

        I'm more than human

        My touch is lethal

        My touch is power

        I am their weapon

        I will fight back

        Juliette hasn't touched anyone in exactly 264 days.

        The last time she did, it was an accident, but The Reestablishment locked her up for murder. No one knows why Juliette's touch is fatal. As long as she doesn't hurt anyone else, no one really cares. The world is too busy crumbling to pieces to pay attention to a 17-year-old girl. Diseases are destroying the population, food is hard to find, birds don't fly anymore, and the clouds are the wrong color.

        The Reestablishment said their way was the only way to fix things, so they threw Juliette in a cell. Now so many people are dead that the survivors are whispering war—and The Reestablishment has changed its mind. Maybe Juliette is more than a tortured soul stuffed into a poisonous body. Maybe she's exactly what they need right now.

        Juliette has to make a choice: Be a weapon. Or be a warrior.`,
            publishDate: "15 November 2011",
            chapters: 62,
            language: "English"
        },
        {
            bookId: 14,
            bookName: "Powerless",
            author: "Lauren Roberts",
            series: "The Powerless Trilogy",
            seriesBookNumber: 1,
            genre: "Fantasy",
            pic: tempbookPic4,
            description: `She is the very thing he’s spent his whole life hunting.
        He is the very thing she’s spent her whole life pretending to be.

        Only the extraordinary belong in the kingdom of Ilya—the exceptional, the empowered, the Elites.

        The powers these Elites have possessed for decades were graciously gifted to them by the Plague, though not all were fortunate enough to both survive the sickness and reap the reward. Those born Ordinary are just that—ordinary. And when the king decreed that all Ordinaries be banished in order to preserve his Elite society, lacking an ability suddenly became a crime—making Paedyn Gray a felon by fate and a thief by necessity.

        Surviving in the slums as an Ordinary is no simple task, and Paedyn knows this better than most. Having been trained by her father to be overly observant since she was a child, Paedyn poses as a Psychic in the crowded city, blending in with the Elites as best she can in order to stay alive and out of trouble. Easier said than done.

        When Paeydn unsuspectingly saves one of Ilyas princes, she finds herself thrown into the Purging Trials. The brutal competition exists to showcase the Elites’ powers—the very thing Paedyn lacks. If the Trials and the opponents within them don’t kill her, the prince she’s fighting feelings for certainly will if he discovers what she is—completely Ordinary.`,
            publishDate: "6 July 2023",
            chapters: 59,
            language: "English"
        },
        {
            bookId: 15,
            bookName: "Fourth Wing",
            author: "Rebecca Yarros",
            series: "The Empyrean",
            seriesBookNumber: 1,
            genre: "Fantasy",
            pic: tempbookPic5,
            description: `"Suspenseful, sexy, and with incredibly entertaining storytelling, the first in Yarros' Empyrean series will delight fans of romantic, adventure-filled fantasy." ―Booklist, starred review

        "Fourth Wing will have your heart pounding from beginning to end... A fantasy like you've never read before." ―#1 New York Times bestselling author Jennifer L. Armentrout

        Enter the brutal and elite world of a war college for dragon riders from #1 New York Times bestselling author Rebecca Yarros

        Twenty-year-old Violet Sorrengail was supposed to enter the Scribe Quadrant, living a quiet life among books and history. Now, the commanding general―also known as her tough-as-talons mother―has ordered Violet to join the hundreds of candidates striving to become the elite of Navarre: dragon riders.

        But when you’re smaller than everyone else and your body is brittle, death is only a heartbeat away...because dragons don’t bond to “fragile” humans. They incinerate them.

        With fewer dragons willing to bond than cadets, most would kill Violet to better their own chances of success. The rest would kill her just for being her mother’s daughter―like Xaden Riorson, the most powerful and ruthless wingleader in the Riders Quadrant.

        She’ll need every edge her wits can give her just to see the next sunrise.

        Yet, with every day that passes, the war outside grows more deadly, the kingdom's protective wards are failing, and the death toll continues to rise. Even worse, Violet begins to suspect leadership is hiding a terrible secret.

        Friends, enemies, lovers. Everyone at Basgiath War College has an agenda―because once you enter, there are only two ways out: graduate or die.

        The Empyrean series is best enjoyed in order.
        Reading Order:
        Book #1 Fourth Wing
        Book #2 Iron Flame
        Book #3 Onyx Storm`,
            publishDate: "6 July 2023",
            chapters: 59,
            language: "English"
        },
        {
            bookId: 16,
            bookName: "The Love Hypothesis",
            author: "Ali Hazelwood",
            series: "",
            seriesBookNumber: null,
            genre: "Romance",
            pic: tempbookPic6,
            description: `When a fake relationship between scientists meets the irresistible force of attraction, it throws one woman's carefully calculated theories on love into chaos

        As a third-year Ph.D. candidate, Olive Smith doesn't believe in lasting romantic relationships—but her best friend does, and that's what got her into this situation. Convincing Anh that Olive is dating and well on her way to a happily ever after was always going to take more than hand-wavy Jedi mind tricks: Scientists require proof. So, like any self-respecting biologist, Olive panics and kisses the first man she sees.

        That man is none other than Adam Carlsen, a young hotshot professor—and well-known ass. Which is why Olive is positively floored when Stanford's reigning lab tyrant agrees to keep her charade a secret and be her fake boyfriend. And when a big science conference goes haywire, putting Olive's career on the Bunsen burner, Adam surprises her again with his unyielding support and even more unyielding. . . six-pack abs.

        Suddenly their little experiment feels dangerously close to combustion. And Olive discovers that the only thing more complicated than a hypothesis on love is putting her own heart under the microscope.`,
            publishDate: "6 July 2023",
            chapters: 59,
            language: "English"
        },
        {
            bookId: 13,
            bookName: "Shatter Me",
            author: "Tahereh Mafi",
            series: "Shatter Me",
            seriesBookNumber: 1,
            genre: "Dystopian",
            pic: tempbookPic3,
            description: `I have a curse

        I have a gift

        I am a monster

        I'm more than human

        My touch is lethal

        My touch is power

        I am their weapon

        I will fight back

        Juliette hasn't touched anyone in exactly 264 days.

        The last time she did, it was an accident, but The Reestablishment locked her up for murder. No one knows why Juliette's touch is fatal. As long as she doesn't hurt anyone else, no one really cares. The world is too busy crumbling to pieces to pay attention to a 17-year-old girl. Diseases are destroying the population, food is hard to find, birds don't fly anymore, and the clouds are the wrong color.

        The Reestablishment said their way was the only way to fix things, so they threw Juliette in a cell. Now so many people are dead that the survivors are whispering war—and The Reestablishment has changed its mind. Maybe Juliette is more than a tortured soul stuffed into a poisonous body. Maybe she's exactly what they need right now.

        Juliette has to make a choice: Be a weapon. Or be a warrior.`,
            publishDate: "2 May 2019",
            chapters: 47,
            language: "English"
        },
        {
            bookId: 14,
            bookName: "Powerless",
            author: "Lauren Roberts",
            series: "The Powerless Trilogy",
            seriesBookNumber: 1,
            genre: "Fantasy",
            pic: tempbookPic4,
            description: `She is the very thing he’s spent his whole life hunting.
        He is the very thing she’s spent her whole life pretending to be.

        Only the extraordinary belong in the kingdom of Ilya—the exceptional, the empowered, the Elites.

        The powers these Elites have possessed for decades were graciously gifted to them by the Plague, though not all were fortunate enough to both survive the sickness and reap the reward. Those born Ordinary are just that—ordinary. And when the king decreed that all Ordinaries be banished in order to preserve his Elite society, lacking an ability suddenly became a crime—making Paedyn Gray a felon by fate and a thief by necessity.

        Surviving in the slums as an Ordinary is no simple task, and Paedyn knows this better than most. Having been trained by her father to be overly observant since she was a child, Paedyn poses as a Psychic in the crowded city, blending in with the Elites as best she can in order to stay alive and out of trouble. Easier said than done.

        When Paeydn unsuspectingly saves one of Ilyas princes, she finds herself thrown into the Purging Trials. The brutal competition exists to showcase the Elites’ powers—the very thing Paedyn lacks. If the Trials and the opponents within them don’t kill her, the prince she’s fighting feelings for certainly will if he discovers what she is—completely Ordinary.`,
            publishDate: "6 July 2023",
            chapters: 59,
            language: "English"
        },
        {
            bookId: 15,
            bookName: "Fourth Wing",
            author: "Rebecca Yarros",
            series: "The Empyrean",
            seriesBookNumber: 1,
            genre: "Fantasy",
            pic: tempbookPic5,
            description: `"Suspenseful, sexy, and with incredibly entertaining storytelling, the first in Yarros' Empyrean series will delight fans of romantic, adventure-filled fantasy." ―Booklist, starred review

        "Fourth Wing will have your heart pounding from beginning to end... A fantasy like you've never read before." ―#1 New York Times bestselling author Jennifer L. Armentrout

        Enter the brutal and elite world of a war college for dragon riders from #1 New York Times bestselling author Rebecca Yarros

        Twenty-year-old Violet Sorrengail was supposed to enter the Scribe Quadrant, living a quiet life among books and history. Now, the commanding general―also known as her tough-as-talons mother―has ordered Violet to join the hundreds of candidates striving to become the elite of Navarre: dragon riders.

        But when you’re smaller than everyone else and your body is brittle, death is only a heartbeat away...because dragons don’t bond to “fragile” humans. They incinerate them.

        With fewer dragons willing to bond than cadets, most would kill Violet to better their own chances of success. The rest would kill her just for being her mother’s daughter―like Xaden Riorson, the most powerful and ruthless wingleader in the Riders Quadrant.

        She’ll need every edge her wits can give her just to see the next sunrise.

        Yet, with every day that passes, the war outside grows more deadly, the kingdom's protective wards are failing, and the death toll continues to rise. Even worse, Violet begins to suspect leadership is hiding a terrible secret.

        Friends, enemies, lovers. Everyone at Basgiath War College has an agenda―because once you enter, there are only two ways out: graduate or die.

        The Empyrean series is best enjoyed in order.
        Reading Order:
        Book #1 Fourth Wing
        Book #2 Iron Flame
        Book #3 Onyx Storm`,
            publishDate: "2 August 2016",
            chapters: 33,
            language: "English"
        },
        {
            bookId: 16,
            bookName: "The Love Hypothesis",
            author: "Ali Hazelwood",
            series: "",
            seriesBookNumber: null,
            genre: "Romance",
            pic: tempbookPic6,
            description: `When a fake relationship between scientists meets the irresistible force of attraction, it throws one woman's carefully calculated theories on love into chaos

        As a third-year Ph.D. candidate, Olive Smith doesn't believe in lasting romantic relationships—but her best friend does, and that's what got her into this situation. Convincing Anh that Olive is dating and well on her way to a happily ever after was always going to take more than hand-wavy Jedi mind tricks: Scientists require proof. So, like any self-respecting biologist, Olive panics and kisses the first man she sees.

        That man is none other than Adam Carlsen, a young hotshot professor—and well-known ass. Which is why Olive is positively floored when Stanford's reigning lab tyrant agrees to keep her charade a secret and be her fake boyfriend. And when a big science conference goes haywire, putting Olive's career on the Bunsen burner, Adam surprises her again with his unyielding support and even more unyielding. . . six-pack abs.

        Suddenly their little experiment feels dangerously close to combustion. And Olive discovers that the only thing more complicated than a hypothesis on love is putting her own heart under the microscope.`,
            publishDate: "20 September 2011",
            chapters: 38,
            language: "English"
        },
    ];
    const book=tempBookDetails.find(x=>x.bookId===Number(BookId));
    console.log(book.author);
  return (
    <div>
        <div className="book-page">
        <div className="book-container">

            <div className="book-left">
                <img
                    src={book.pic}
                    alt={book.bookName}
                    className="book-cover"
                />

                <button className="buy-btn">
                    Buy ₹6.99
                </button>

                <button className="wishlist-btn">
                    Wishlist
                </button>
            </div>

            <div className="book-right">

                <h1>{book.bookName}</h1>

                {book.series && (
                    <div className="series-tag">
                        {book.series}
                        {book.seriesBookNumber && ` #${book.seriesBookNumber}`}
                    </div>
                )}

                <p className="author">{book.author}</p>

                <div className="description">
                    <h3>Description</h3>
                    <p>{book.description}</p>
                </div>

                <div className="genres">
                    <h3>Genres</h3>
                    <p>{book.genre}</p>
                </div>

                <div className="book-info">

                    <div className="book-info-item">
                        <span>Total Chapters</span>
                        <p>{book.chapters}</p>
                    </div>

                    <div className="book-info-item">
                        <span>Published</span>
                        <p>{book.publishDate}</p>
                    </div>

                    <div className="book-info-item">
                        <span>Language</span>
                        <p>{book.language}</p>
                    </div>

                </div>

            </div>

        </div>
    </div>
    </div>
  )
}

export default BookPage