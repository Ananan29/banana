// Real-world seed catalog: authors, series, and exactly 100 books.
// Each schema genre appears on at least 4 books.

export const authorsData = [
  {
    key: "meyer",
    name: "Stephenie Meyer",
    bio: "American novelist best known for the Twilight series.",
    profileImage: "https://covers.openlibrary.org/a/olid/OL1394365A-M.jpg"
  },
  {
    key: "rowling",
    name: "J.K. Rowling",
    bio: "British author of the Harry Potter series.",
    profileImage: "https://covers.openlibrary.org/a/olid/OL23919A-M.jpg"
  },
  {
    key: "collins",
    name: "Suzanne Collins",
    bio: "American writer of The Hunger Games trilogy.",
    profileImage: "https://covers.openlibrary.org/a/olid/OL1391148A-M.jpg"
  },
  {
    key: "martin",
    name: "George R.R. Martin",
    bio: "American novelist and creator of A Song of Ice and Fire.",
    profileImage: "https://covers.openlibrary.org/a/olid/OL151221A-M.jpg"
  },
  {
    key: "tolkien",
    name: "J.R.R. Tolkien",
    bio: "English writer and philologist, author of The Lord of the Rings.",
    profileImage: "https://covers.openlibrary.org/a/olid/OL26320A-M.jpg"
  },
  {
    key: "lewis",
    name: "C.S. Lewis",
    bio: "British writer best known for The Chronicles of Narnia.",
    profileImage: "https://covers.openlibrary.org/a/olid/OL19346A-M.jpg"
  },
  {
    key: "herbert",
    name: "Frank Herbert",
    bio: "American science-fiction author of the Dune saga.",
    profileImage: "https://covers.openlibrary.org/a/olid/OL23091A-M.jpg"
  },
  {
    key: "riordan",
    name: "Rick Riordan",
    bio: "American author of Percy Jackson and the Olympians.",
    profileImage: "https://covers.openlibrary.org/a/olid/OL1390918A-M.jpg"
  },
  {
    key: "asimov",
    name: "Isaac Asimov",
    bio: "Prolific science-fiction writer and creator of the Foundation series.",
    profileImage: "https://covers.openlibrary.org/a/olid/OL34221A-M.jpg"
  },
  {
    key: "roth",
    name: "Veronica Roth",
    bio: "American novelist known for the Divergent trilogy.",
    profileImage: "https://covers.openlibrary.org/a/olid/OL6893988A-M.jpg"
  },
  {
    key: "clare",
    name: "Cassandra Clare",
    bio: "American author of The Mortal Instruments series.",
    profileImage: "https://covers.openlibrary.org/a/olid/OL1391163A-M.jpg"
  },
  {
    key: "maas",
    name: "Sarah J. Maas",
    bio: "American fantasy author of A Court of Thorns and Roses.",
    profileImage: "https://covers.openlibrary.org/a/olid/OL7115412A-M.jpg"
  },
  {
    key: "sanderson",
    name: "Brandon Sanderson",
    bio: "American fantasy author known for Mistborn and epic magic systems.",
    profileImage: "https://covers.openlibrary.org/a/olid/OL1391169A-M.jpg"
  },
  {
    key: "jordan",
    name: "Robert Jordan",
    bio: "American author of The Wheel of Time epic fantasy series.",
    profileImage: "https://covers.openlibrary.org/a/olid/OL20187A-M.jpg"
  },
  {
    key: "pratchett",
    name: "Terry Pratchett",
    bio: "English author of the comic Discworld fantasy novels.",
    profileImage: "https://covers.openlibrary.org/a/olid/OL262208A-M.jpg"
  },
  {
    key: "adams",
    name: "Douglas Adams",
    bio: "English writer of The Hitchhiker's Guide to the Galaxy.",
    profileImage: "https://covers.openlibrary.org/a/olid/OL34184A-M.jpg"
  },
  {
    key: "doyle",
    name: "Arthur Conan Doyle",
    bio: "British writer who created Sherlock Holmes.",
    profileImage: "https://covers.openlibrary.org/a/olid/OL16022A-M.jpg"
  },
  {
    key: "child",
    name: "Lee Child",
    bio: "British author of the Jack Reacher thriller novels.",
    profileImage: "https://placehold.co/200x300?text=Lee+Child"
  },
  {
    key: "larsson",
    name: "Stieg Larsson",
    bio: "Swedish journalist and author of the Millennium trilogy.",
    profileImage: "https://covers.openlibrary.org/a/olid/OL1394241A-M.jpg"
  },
  {
    key: "king",
    name: "Stephen King",
    bio: "American master of contemporary horror fiction.",
    profileImage: "https://covers.openlibrary.org/a/olid/OL21594A-M.jpg"
  },
  {
    key: "christie",
    name: "Agatha Christie",
    bio: "English crime novelist, creator of Hercule Poirot and Miss Marple.",
    profileImage: "https://covers.openlibrary.org/a/olid/OL448893A-M.jpg"
  },
  {
    key: "michaelides",
    name: "Alex Michaelides",
    bio: "British-Cypriot author of The Silent Patient.",
    profileImage: "https://placehold.co/200x300?text=Alex+Michaelides"
  },
  {
    key: "flynn",
    name: "Gillian Flynn",
    bio: "American author of psychological thrillers including Gone Girl.",
    profileImage: "https://placehold.co/200x300?text=Gillian+Flynn"
  },
  {
    key: "austen",
    name: "Jane Austen",
    bio: "English novelist known for Pride and Prejudice and social comedy.",
    profileImage: "https://covers.openlibrary.org/a/olid/OL21576A-M.jpg"
  },
  {
    key: "orwell",
    name: "George Orwell",
    bio: "English novelist and essayist, author of 1984 and Animal Farm.",
    profileImage: "https://covers.openlibrary.org/a/olid/OL148638A-M.jpg"
  },
  {
    key: "lee",
    name: "Harper Lee",
    bio: "American novelist best known for To Kill a Mockingbird.",
    profileImage: "https://covers.openlibrary.org/a/olid/OL455459A-M.jpg"
  },
  {
    key: "fitzgerald",
    name: "F. Scott Fitzgerald",
    bio: "American novelist of the Jazz Age and The Great Gatsby.",
    profileImage: "https://covers.openlibrary.org/a/olid/OL26175A-M.jpg"
  },
  {
    key: "clear",
    name: "James Clear",
    bio: "Author of Atomic Habits on building better routines.",
    profileImage: "https://placehold.co/200x300?text=James+Clear"
  },
  {
    key: "kiyosaki",
    name: "Robert Kiyosaki",
    bio: "Entrepreneur and author of Rich Dad Poor Dad.",
    profileImage: "https://placehold.co/200x300?text=Robert+Kiyosaki"
  },
  {
    key: "gladwell",
    name: "Malcolm Gladwell",
    bio: "Canadian journalist and author of Outliers and Blink.",
    profileImage: "https://covers.openlibrary.org/a/olid/OL1394246A-M.jpg"
  },
  {
    key: "isaacson",
    name: "Walter Isaacson",
    bio: "American biographer of Steve Jobs, Einstein, and Leonardo.",
    profileImage: "https://placehold.co/200x300?text=Walter+Isaacson"
  },
  {
    key: "obama",
    name: "Michelle Obama",
    bio: "Former First Lady of the United States and author of Becoming.",
    profileImage: "https://placehold.co/200x300?text=Michelle+Obama"
  },
  {
    key: "frank",
    name: "Anne Frank",
    bio: "Jewish diarist whose wartime journal became a world classic.",
    profileImage: "https://covers.openlibrary.org/a/olid/OL19981A-M.jpg"
  },
  {
    key: "westover",
    name: "Tara Westover",
    bio: "American memoirist and author of Educated.",
    profileImage: "https://placehold.co/200x300?text=Tara+Westover"
  },
  {
    key: "dahl",
    name: "Roald Dahl",
    bio: "British author of beloved children's classics like Matilda.",
    profileImage: "https://covers.openlibrary.org/a/olid/OL394212A-M.jpg"
  },
  {
    key: "white",
    name: "E.B. White",
    bio: "American writer of Charlotte's Web and Stuart Little.",
    profileImage: "https://covers.openlibrary.org/a/olid/OL18319A-M.jpg"
  },
  {
    key: "coelho",
    name: "Paulo Coelho",
    bio: "Brazilian novelist best known for The Alchemist.",
    profileImage: "https://covers.openlibrary.org/a/olid/OL262283A-M.jpg"
  },
  {
    key: "hosseini",
    name: "Khaled Hosseini",
    bio: "Afghan-American novelist of The Kite Runner.",
    profileImage: "https://placehold.co/200x300?text=Khaled+Hosseini"
  },
  {
    key: "martel",
    name: "Yann Martel",
    bio: "Canadian author of Life of Pi.",
    profileImage: "https://placehold.co/200x300?text=Yann+Martel"
  },
  {
    key: "brown",
    name: "Dan Brown",
    bio: "American thriller writer of The Da Vinci Code.",
    profileImage: "https://covers.openlibrary.org/a/olid/OL39429A-M.jpg"
  },
  {
    key: "weir",
    name: "Andy Weir",
    bio: "American science-fiction author of The Martian.",
    profileImage: "https://placehold.co/200x300?text=Andy+Weir"
  },
  {
    key: "cline",
    name: "Ernest Cline",
    bio: "American novelist of Ready Player One.",
    profileImage: "https://placehold.co/200x300?text=Ernest+Cline"
  },
  {
    key: "card",
    name: "Orson Scott Card",
    bio: "American author of Ender's Game.",
    profileImage: "https://placehold.co/200x300?text=Orson+Scott+Card"
  },
  {
    key: "bradbury",
    name: "Ray Bradbury",
    bio: "American writer of Fahrenheit 451 and speculative fiction.",
    profileImage: "https://covers.openlibrary.org/a/olid/OL26174A-M.jpg"
  },
  {
    key: "huxley",
    name: "Aldous Huxley",
    bio: "English writer of Brave New World.",
    profileImage: "https://covers.openlibrary.org/a/olid/OL19778A-M.jpg"
  },
  {
    key: "atwood",
    name: "Margaret Atwood",
    bio: "Canadian author of The Handmaid's Tale.",
    profileImage: "https://placehold.co/200x300?text=Margaret+Atwood"
  },
  {
    key: "rothfuss",
    name: "Patrick Rothfuss",
    bio: "American fantasy author of The Name of the Wind.",
    profileImage: "https://placehold.co/200x300?text=Patrick+Rothfuss"
  },
  {
    key: "gaiman",
    name: "Neil Gaiman",
    bio: "English author of American Gods, Coraline, and Good Omens.",
    profileImage: "https://covers.openlibrary.org/a/olid/OL272094A-M.jpg"
  },
  {
    key: "salinger",
    name: "J.D. Salinger",
    bio: "American writer of The Catcher in the Rye.",
    profileImage: "https://placehold.co/200x300?text=JD+Salinger"
  },
  {
    key: "shelley",
    name: "Mary Shelley",
    bio: "English novelist who wrote Frankenstein.",
    profileImage: "https://covers.openlibrary.org/a/olid/OL25307A-M.jpg"
  },
  {
    key: "stoker",
    name: "Bram Stoker",
    bio: "Irish author of the Gothic horror classic Dracula.",
    profileImage: "https://placehold.co/200x300?text=Bram+Stoker"
  },
  {
    key: "harari",
    name: "Yuval Noah Harari",
    bio: "Israeli historian and author of Sapiens.",
    profileImage: "https://placehold.co/200x300?text=Yuval+Noah+Harari"
  },
  {
    key: "sparks",
    name: "Nicholas Sparks",
    bio: "American romance novelist of The Notebook.",
    profileImage: "https://placehold.co/200x300?text=Nicholas+Sparks"
  },
  {
    key: "moyes",
    name: "Jojo Moyes",
    bio: "English novelist of Me Before You.",
    profileImage: "https://placehold.co/200x300?text=Jojo+Moyes"
  },
  {
    key: "stockett",
    name: "Kathryn Stockett",
    bio: "American author of The Help.",
    profileImage: "https://placehold.co/200x300?text=Kathryn+Stockett"
  },
  {
    key: "doerr",
    name: "Anthony Doerr",
    bio: "American novelist of All the Light We Cannot See.",
    profileImage: "https://placehold.co/200x300?text=Anthony+Doerr"
  },
  {
    key: "zusak",
    name: "Markus Zusak",
    bio: "Australian author of The Book Thief.",
    profileImage: "https://placehold.co/200x300?text=Markus+Zusak"
  },
  {
    key: "owens",
    name: "Delia Owens",
    bio: "American author of Where the Crawdads Sing.",
    profileImage: "https://placehold.co/200x300?text=Delia+Owens"
  },
  {
    key: "haig",
    name: "Matt Haig",
    bio: "British author of The Midnight Library.",
    profileImage: "https://placehold.co/200x300?text=Matt+Haig"
  },
  {
    key: "miller",
    name: "Madeline Miller",
    bio: "American novelist of Circe and The Song of Achilles.",
    profileImage: "https://placehold.co/200x300?text=Madeline+Miller"
  },
  {
    key: "heller",
    name: "Joseph Heller",
    bio: "American satirist best known for Catch-22.",
    profileImage: "https://placehold.co/200x300?text=Joseph+Heller"
  },
  {
    key: "fey",
    name: "Tina Fey",
    bio: "American comedian and author of Bossypants.",
    profileImage: "https://placehold.co/200x300?text=Tina+Fey"
  },
  {
    key: "noah",
    name: "Trevor Noah",
    bio: "South African comedian and author of Born a Crime.",
    profileImage: "https://placehold.co/200x300?text=Trevor+Noah"
  }
];

export const seriesData = [
  {
    key: "twilight",
    title: "Twilight"
  },
  {
    key: "harry-potter",
    title: "Harry Potter"
  },
  {
    key: "hunger-games",
    title: "The Hunger Games"
  },
  {
    key: "asoiaf",
    title: "A Song of Ice and Fire"
  },
  {
    key: "lotr",
    title: "The Lord of the Rings"
  },
  {
    key: "narnia",
    title: "The Chronicles of Narnia"
  },
  {
    key: "dune",
    title: "Dune"
  },
  {
    key: "percy",
    title: "Percy Jackson and the Olympians"
  },
  {
    key: "foundation",
    title: "Foundation"
  },
  {
    key: "divergent",
    title: "Divergent"
  },
  {
    key: "mortal",
    title: "The Mortal Instruments"
  },
  {
    key: "acotar",
    title: "A Court of Thorns and Roses"
  },
  {
    key: "mistborn",
    title: "Mistborn"
  },
  {
    key: "wheel",
    title: "The Wheel of Time"
  },
  {
    key: "discworld",
    title: "Discworld"
  },
  {
    key: "hitchhiker",
    title: "The Hitchhiker's Guide to the Galaxy"
  },
  {
    key: "sherlock",
    title: "Sherlock Holmes"
  },
  {
    key: "reacher",
    title: "Jack Reacher"
  },
  {
    key: "millennium",
    title: "Millennium"
  }
];

export const booksData = [
  {
    key: "twilight",
    title: "Twilight",
    authorKey: "meyer",
    seriesKey: "twilight",
    seriesNo: 1,
    description: "Bella Swan moves to Forks and falls in love with a mysterious vampire named Edward Cullen.",
    genres: [
      "romance",
      "young-adult",
      "fantasy"
    ],
    totalChapters: 12,
    publishedAt: "2005-10-05",
    averageRating: 3.6,
    ratingsCount: 6500000,
    price: 299,
    language: "english",
    coverImage: "https://covers.openlibrary.org/b/isbn/9780316015844-L.jpg",
    popularityScore: 24.53
  },
  {
    key: "eclipse",
    title: "Eclipse",
    authorKey: "meyer",
    seriesKey: "twilight",
    seriesNo: 3,
    description: "Bella must choose between Edward and Jacob as a vampire army threatens Forks.",
    genres: [
      "romance",
      "young-adult",
      "action"
    ],
    totalChapters: 12,
    publishedAt: "2007-08-07",
    averageRating: 3.7,
    ratingsCount: 3900000,
    price: 299,
    language: "english",
    coverImage: "https://covers.openlibrary.org/b/isbn/9780316160209-L.jpg",
    popularityScore: 24.39
  },
  {
    key: "breaking-dawn",
    title: "Breaking Dawn",
    authorKey: "meyer",
    seriesKey: "twilight",
    seriesNo: 4,
    description: "Marriage, transformation, and an epic confrontation reshape Bella's destiny forever.",
    genres: [
      "romance",
      "young-adult",
      "fantasy"
    ],
    totalChapters: 12,
    publishedAt: "2008-08-02",
    averageRating: 3.7,
    ratingsCount: 3700000,
    price: 349,
    language: "english",
    coverImage: "https://covers.openlibrary.org/b/isbn/9780316067928-L.jpg",
    popularityScore: 24.3
  },
  {
    key: "hp-1",
    title: "Harry Potter and the Sorcerer's Stone",
    authorKey: "rowling",
    seriesKey: "harry-potter",
    seriesNo: 1,
    description: "An orphaned boy discovers he is a wizard and begins his education at Hogwarts.",
    genres: [
      "fantasy",
      "young-adult",
      "adventure"
    ],
    totalChapters: 12,
    publishedAt: "1997-06-26",
    averageRating: 4.5,
    ratingsCount: 9500000,
    price: 399,
    language: "english",
    coverImage: "https://covers.openlibrary.org/b/isbn/9780439708180-L.jpg",
    popularityScore: 31.4
  },
  {
    key: "hp-2",
    title: "Harry Potter and the Chamber of Secrets",
    authorKey: "rowling",
    seriesKey: "harry-potter",
    seriesNo: 2,
    description: "A mysterious chamber opens at Hogwarts, unleashing an ancient terror.",
    genres: [
      "fantasy",
      "young-adult",
      "mystery"
    ],
    totalChapters: 12,
    publishedAt: "1998-07-02",
    averageRating: 4.4,
    ratingsCount: 8200000,
    price: 399,
    language: "english",
    coverImage: "https://covers.openlibrary.org/b/isbn/9780439064873-L.jpg",
    popularityScore: 30.42
  },
  {
    key: "hp-3",
    title: "Harry Potter and the Prisoner of Azkaban",
    authorKey: "rowling",
    seriesKey: "harry-potter",
    seriesNo: 3,
    description: "Harry learns the truth about Sirius Black and confronts soul-sucking Dementors.",
    genres: [
      "fantasy",
      "young-adult",
      "adventure"
    ],
    totalChapters: 12,
    publishedAt: "1999-07-08",
    averageRating: 4.6,
    ratingsCount: 8000000,
    price: 399,
    language: "english",
    coverImage: "https://covers.openlibrary.org/b/isbn/9780439136365-L.jpg",
    popularityScore: 31.75
  },
  {
    key: "hp-4",
    title: "Harry Potter and the Goblet of Fire",
    authorKey: "rowling",
    seriesKey: "harry-potter",
    seriesNo: 4,
    description: "Harry is forced into the deadly Triwizard Tournament as dark forces return.",
    genres: [
      "fantasy",
      "young-adult",
      "action"
    ],
    totalChapters: 12,
    publishedAt: "2000-07-08",
    averageRating: 4.6,
    ratingsCount: 7800000,
    price: 449,
    language: "english",
    coverImage: "https://covers.openlibrary.org/b/isbn/9780439139601-L.jpg",
    popularityScore: 31.7
  },
  {
    key: "hp-5",
    title: "Harry Potter and the Order of the Phoenix",
    authorKey: "rowling",
    seriesKey: "harry-potter",
    seriesNo: 5,
    description: "Harry forms Dumbledore's Army while the Ministry denies Voldemort's return.",
    genres: [
      "fantasy",
      "young-adult",
      "drama"
    ],
    totalChapters: 12,
    publishedAt: "2003-06-21",
    averageRating: 4.5,
    ratingsCount: 7400000,
    price: 449,
    language: "english",
    coverImage: "https://covers.openlibrary.org/b/isbn/9780439358071-L.jpg",
    popularityScore: 30.91
  },
  {
    key: "hp-6",
    title: "Harry Potter and the Half-Blood Prince",
    authorKey: "rowling",
    seriesKey: "harry-potter",
    seriesNo: 6,
    description: "Harry and Dumbledore hunt Voldemort's past through dangerous memories.",
    genres: [
      "fantasy",
      "young-adult",
      "mystery"
    ],
    totalChapters: 12,
    publishedAt: "2005-07-16",
    averageRating: 4.6,
    ratingsCount: 7200000,
    price: 449,
    language: "english",
    coverImage: "https://covers.openlibrary.org/b/isbn/9780439785969-L.jpg",
    popularityScore: 31.54
  },
  {
    key: "hp-7",
    title: "Harry Potter and the Deathly Hallows",
    authorKey: "rowling",
    seriesKey: "harry-potter",
    seriesNo: 7,
    description: "Harry, Ron, and Hermione hunt Horcruxes in a final war against Voldemort.",
    genres: [
      "fantasy",
      "young-adult",
      "action"
    ],
    totalChapters: 12,
    publishedAt: "2007-07-21",
    averageRating: 4.6,
    ratingsCount: 7600000,
    price: 499,
    language: "english",
    coverImage: "https://covers.openlibrary.org/b/isbn/9780545010221-L.jpg",
    popularityScore: 31.65
  },
  {
    key: "hunger-games",
    title: "The Hunger Games",
    authorKey: "collins",
    seriesKey: "hunger-games",
    seriesNo: 1,
    description: "Katniss Everdeen volunteers for a televised fight to the death in dystopian Panem.",
    genres: [
      "young-adult",
      "action",
      "thriller"
    ],
    totalChapters: 12,
    publishedAt: "2008-09-14",
    averageRating: 4.3,
    ratingsCount: 8500000,
    price: 349,
    language: "english",
    coverImage: "https://covers.openlibrary.org/b/isbn/9780439023528-L.jpg",
    popularityScore: 29.8
  },
  {
    key: "catching-fire",
    title: "Catching Fire",
    authorKey: "collins",
    seriesKey: "hunger-games",
    seriesNo: 2,
    description: "Katniss and Peeta face a Quarter Quell designed to crush rebellion.",
    genres: [
      "young-adult",
      "action",
      "adventure"
    ],
    totalChapters: 12,
    publishedAt: "2009-09-01",
    averageRating: 4.3,
    ratingsCount: 7000000,
    price: 349,
    language: "english",
    coverImage: "https://covers.openlibrary.org/b/isbn/9780439023498-L.jpg",
    popularityScore: 29.43
  },
  {
    key: "mockingjay",
    title: "Mockingjay",
    authorKey: "collins",
    seriesKey: "hunger-games",
    seriesNo: 3,
    description: "Katniss becomes the Mockingjay as districts rise against the Capitol.",
    genres: [
      "young-adult",
      "action",
      "drama"
    ],
    totalChapters: 12,
    publishedAt: "2010-08-24",
    averageRating: 4.1,
    ratingsCount: 6800000,
    price: 349,
    language: "english",
    coverImage: "https://covers.openlibrary.org/b/isbn/9780439023513-L.jpg",
    popularityScore: 28.01
  },
  {
    key: "got",
    title: "A Game of Thrones",
    authorKey: "martin",
    seriesKey: "asoiaf",
    seriesNo: 1,
    description: "Noble houses clash for the Iron Throne while an ancient threat stirs in the north.",
    genres: [
      "fantasy",
      "adventure",
      "drama"
    ],
    totalChapters: 12,
    publishedAt: "1996-08-01",
    averageRating: 4.4,
    ratingsCount: 2800000,
    price: 499,
    language: "english",
    coverImage: "https://covers.openlibrary.org/b/isbn/9780553386790-L.jpg",
    popularityScore: 28.37
  },
  {
    key: "clash",
    title: "A Clash of Kings",
    authorKey: "martin",
    seriesKey: "asoiaf",
    seriesNo: 2,
    description: "War engulfs the Seven Kingdoms as rival kings claim the throne.",
    genres: [
      "fantasy",
      "adventure",
      "action"
    ],
    totalChapters: 12,
    publishedAt: "1998-11-16",
    averageRating: 4.4,
    ratingsCount: 2200000,
    price: 499,
    language: "english",
    coverImage: "https://covers.openlibrary.org/b/isbn/9780553579901-L.jpg",
    popularityScore: 27.91
  },
  {
    key: "storm",
    title: "A Storm of Swords",
    authorKey: "martin",
    seriesKey: "asoiaf",
    seriesNo: 3,
    description: "Betrayals and battles culminate in one of fantasy's most shocking volumes.",
    genres: [
      "fantasy",
      "drama",
      "action"
    ],
    totalChapters: 12,
    publishedAt: "2000-08-08",
    averageRating: 4.5,
    ratingsCount: 2100000,
    price: 549,
    language: "english",
    coverImage: "https://covers.openlibrary.org/b/isbn/9780553573428-L.jpg",
    popularityScore: 28.45
  },
  {
    key: "fellowship",
    title: "The Fellowship of the Ring",
    authorKey: "tolkien",
    seriesKey: "lotr",
    seriesNo: 1,
    description: "Frodo Baggins begins a perilous quest to destroy the One Ring.",
    genres: [
      "fantasy",
      "adventure",
      "action"
    ],
    totalChapters: 12,
    publishedAt: "1954-07-29",
    averageRating: 4.4,
    ratingsCount: 3200000,
    price: 399,
    language: "english",
    coverImage: "https://covers.openlibrary.org/b/isbn/9780547928210-L.jpg",
    popularityScore: 28.62
  },
  {
    key: "two-towers",
    title: "The Two Towers",
    authorKey: "tolkien",
    seriesKey: "lotr",
    seriesNo: 2,
    description: "The Fellowship is broken as war rises across Middle-earth.",
    genres: [
      "fantasy",
      "adventure",
      "action"
    ],
    totalChapters: 12,
    publishedAt: "1954-11-11",
    averageRating: 4.4,
    ratingsCount: 2800000,
    price: 399,
    language: "english",
    coverImage: "https://covers.openlibrary.org/b/isbn/9780547928203-L.jpg",
    popularityScore: 28.37
  },
  {
    key: "return-king",
    title: "The Return of the King",
    authorKey: "tolkien",
    seriesKey: "lotr",
    seriesNo: 3,
    description: "The final battle for Middle-earth decides the fate of the Ring.",
    genres: [
      "fantasy",
      "adventure",
      "drama"
    ],
    totalChapters: 12,
    publishedAt: "1955-10-20",
    averageRating: 4.5,
    ratingsCount: 2900000,
    price: 399,
    language: "english",
    coverImage: "https://covers.openlibrary.org/b/isbn/9780547928197-L.jpg",
    popularityScore: 29.08
  },
  {
    key: "lion-witch",
    title: "The Lion, the Witch and the Wardrobe",
    authorKey: "lewis",
    seriesKey: "narnia",
    seriesNo: 1,
    description: "Four siblings enter a wardrobe and find the magical land of Narnia.",
    genres: [
      "fantasy",
      "children",
      "adventure"
    ],
    totalChapters: 10,
    publishedAt: "1950-10-16",
    averageRating: 4.2,
    ratingsCount: 2800000,
    price: 249,
    language: "english",
    coverImage: "https://covers.openlibrary.org/b/isbn/9780064471046-L.jpg",
    popularityScore: 27.08
  },
  {
    key: "prince-caspian",
    title: "Prince Caspian",
    authorKey: "lewis",
    seriesKey: "narnia",
    seriesNo: 2,
    description: "The Pevensies return to help Prince Caspian reclaim his throne.",
    genres: [
      "fantasy",
      "children",
      "adventure"
    ],
    totalChapters: 10,
    publishedAt: "1951-10-15",
    averageRating: 4,
    ratingsCount: 1200000,
    price: 249,
    language: "english",
    coverImage: "https://covers.openlibrary.org/b/isbn/9780064471053-L.jpg",
    popularityScore: 24.32
  },
  {
    key: "dawn-treader",
    title: "The Voyage of the Dawn Treader",
    authorKey: "lewis",
    seriesKey: "narnia",
    seriesNo: 3,
    description: "Lucy, Edmund, and cousin Eustace sail to the edge of the world.",
    genres: [
      "fantasy",
      "children",
      "adventure"
    ],
    totalChapters: 10,
    publishedAt: "1952-09-15",
    averageRating: 4.1,
    ratingsCount: 1100000,
    price: 249,
    language: "english",
    coverImage: "https://covers.openlibrary.org/b/isbn/9780064471077-L.jpg",
    popularityScore: 24.77
  },
  {
    key: "magicians-nephew",
    title: "The Magician's Nephew",
    authorKey: "lewis",
    seriesKey: "narnia",
    seriesNo: 6,
    description: "Two children witness the creation of Narnia and awaken an evil queen.",
    genres: [
      "fantasy",
      "children",
      "adventure"
    ],
    totalChapters: 10,
    publishedAt: "1955-05-02",
    averageRating: 4.1,
    ratingsCount: 1000000,
    price: 249,
    language: "english",
    coverImage: "https://covers.openlibrary.org/b/isbn/9780064471107-L.jpg",
    popularityScore: 24.6
  },
  {
    key: "dune",
    title: "Dune",
    authorKey: "herbert",
    seriesKey: "dune",
    seriesNo: 1,
    description: "Paul Atreides fights for survival on the desert planet Arrakis.",
    genres: [
      "science-fiction",
      "adventure",
      "action"
    ],
    totalChapters: 12,
    publishedAt: "1965-08-01",
    averageRating: 4.3,
    ratingsCount: 1500000,
    price: 449,
    language: "english",
    coverImage: "https://covers.openlibrary.org/b/isbn/9780441172719-L.jpg",
    popularityScore: 26.56
  },
  {
    key: "dune-messiah",
    title: "Dune Messiah",
    authorKey: "herbert",
    seriesKey: "dune",
    seriesNo: 2,
    description: "Emperor Paul Atreides faces conspiracy and the cost of prophecy.",
    genres: [
      "science-fiction",
      "drama",
      "thriller"
    ],
    totalChapters: 10,
    publishedAt: "1969-01-01",
    averageRating: 3.9,
    ratingsCount: 600000,
    price: 399,
    language: "english",
    coverImage: "https://covers.openlibrary.org/b/isbn/9780441172696-L.jpg",
    popularityScore: 22.53
  },
  {
    key: "lightning-thief",
    title: "The Lightning Thief",
    authorKey: "riordan",
    seriesKey: "percy",
    seriesNo: 1,
    description: "Percy Jackson discovers he is a demigod and must stop a war among the gods.",
    genres: [
      "fantasy",
      "young-adult",
      "adventure"
    ],
    totalChapters: 12,
    publishedAt: "2005-06-28",
    averageRating: 4.3,
    ratingsCount: 3200000,
    price: 299,
    language: "english",
    coverImage: "https://covers.openlibrary.org/b/isbn/9780786838653-L.jpg",
    popularityScore: 27.97
  },
  {
    key: "sea-monsters",
    title: "The Sea of Monsters",
    authorKey: "riordan",
    seriesKey: "percy",
    seriesNo: 2,
    description: "Percy sails into dangerous waters to save Camp Half-Blood.",
    genres: [
      "fantasy",
      "young-adult",
      "adventure"
    ],
    totalChapters: 12,
    publishedAt: "2006-04-01",
    averageRating: 4.2,
    ratingsCount: 1800000,
    price: 299,
    language: "english",
    coverImage: "https://covers.openlibrary.org/b/isbn/9781423103349-L.jpg",
    popularityScore: 26.27
  },
  {
    key: "last-olympian",
    title: "The Last Olympian",
    authorKey: "riordan",
    seriesKey: "percy",
    seriesNo: 5,
    description: "Percy leads demigods in a final stand against Kronos in New York.",
    genres: [
      "fantasy",
      "young-adult",
      "action"
    ],
    totalChapters: 12,
    publishedAt: "2009-05-05",
    averageRating: 4.5,
    ratingsCount: 1600000,
    price: 299,
    language: "english",
    coverImage: "https://covers.openlibrary.org/b/isbn/9781423101475-L.jpg",
    popularityScore: 27.92
  },
  {
    key: "foundation",
    title: "Foundation",
    authorKey: "asimov",
    seriesKey: "foundation",
    seriesNo: 1,
    description: "Hari Seldon's plan seeks to shorten a galactic dark age.",
    genres: [
      "science-fiction",
      "adventure",
      "drama"
    ],
    totalChapters: 10,
    publishedAt: "1951-06-01",
    averageRating: 4.2,
    ratingsCount: 700000,
    price: 349,
    language: "english",
    coverImage: "https://covers.openlibrary.org/b/isbn/9780553293357-L.jpg",
    popularityScore: 24.55
  },
  {
    key: "second-foundation",
    title: "Second Foundation",
    authorKey: "asimov",
    seriesKey: "foundation",
    seriesNo: 3,
    description: "A hidden Second Foundation works to preserve Seldon's plan.",
    genres: [
      "science-fiction",
      "mystery",
      "thriller"
    ],
    totalChapters: 10,
    publishedAt: "1953-01-01",
    averageRating: 4.3,
    ratingsCount: 420000,
    price: 349,
    language: "english",
    coverImage: "https://covers.openlibrary.org/b/isbn/9780553293364-L.jpg",
    popularityScore: 24.18
  },
  {
    key: "divergent",
    title: "Divergent",
    authorKey: "roth",
    seriesKey: "divergent",
    seriesNo: 1,
    description: "Tris Prior chooses Dauntless and discovers a dangerous identity.",
    genres: [
      "young-adult",
      "action",
      "science-fiction"
    ],
    totalChapters: 12,
    publishedAt: "2011-04-25",
    averageRating: 4.1,
    ratingsCount: 4000000,
    price: 299,
    language: "english",
    coverImage: "https://covers.openlibrary.org/b/isbn/9780062024039-L.jpg",
    popularityScore: 27.07
  },
  {
    key: "insurgent",
    title: "Insurgent",
    authorKey: "roth",
    seriesKey: "divergent",
    seriesNo: 2,
    description: "Tris fights through faction war and a city built on secrets.",
    genres: [
      "young-adult",
      "action",
      "thriller"
    ],
    totalChapters: 12,
    publishedAt: "2012-05-01",
    averageRating: 4,
    ratingsCount: 2500000,
    price: 299,
    language: "english",
    coverImage: "https://covers.openlibrary.org/b/isbn/9780062024046-L.jpg",
    popularityScore: 25.59
  },
  {
    key: "city-bones",
    title: "City of Bones",
    authorKey: "clare",
    seriesKey: "mortal",
    seriesNo: 1,
    description: "Clary Fray discovers a hidden world of Shadowhunters in New York.",
    genres: [
      "fantasy",
      "young-adult",
      "romance"
    ],
    totalChapters: 12,
    publishedAt: "2007-03-27",
    averageRating: 4.1,
    ratingsCount: 2200000,
    price: 299,
    language: "english",
    coverImage: "https://covers.openlibrary.org/b/isbn/9781416914280-L.jpg",
    popularityScore: 26
  },
  {
    key: "city-ashes",
    title: "City of Ashes",
    authorKey: "clare",
    seriesKey: "mortal",
    seriesNo: 2,
    description: "Valentine's schemes escalate as Clary fights for those she loves.",
    genres: [
      "fantasy",
      "young-adult",
      "action"
    ],
    totalChapters: 12,
    publishedAt: "2008-03-25",
    averageRating: 4.1,
    ratingsCount: 1400000,
    price: 299,
    language: "english",
    coverImage: "https://covers.openlibrary.org/b/isbn/9781416914297-L.jpg",
    popularityScore: 25.2
  },
  {
    key: "acotar",
    title: "A Court of Thorns and Roses",
    authorKey: "maas",
    seriesKey: "acotar",
    seriesNo: 1,
    description: "Huntress Feyre is taken to a magical faerie realm after killing a wolf.",
    genres: [
      "fantasy",
      "romance",
      "young-adult"
    ],
    totalChapters: 12,
    publishedAt: "2015-05-05",
    averageRating: 4.2,
    ratingsCount: 2800000,
    price: 399,
    language: "english",
    coverImage: "https://covers.openlibrary.org/b/isbn/9781619634442-L.jpg",
    popularityScore: 27.08
  },
  {
    key: "acomaf",
    title: "A Court of Mist and Fury",
    authorKey: "maas",
    seriesKey: "acotar",
    seriesNo: 2,
    description: "Feyre rebuilds herself amid political intrigue and a darker court.",
    genres: [
      "fantasy",
      "romance",
      "drama"
    ],
    totalChapters: 12,
    publishedAt: "2016-05-03",
    averageRating: 4.6,
    ratingsCount: 2500000,
    price: 399,
    language: "english",
    coverImage: "https://covers.openlibrary.org/b/isbn/9781619635203-L.jpg",
    popularityScore: 29.43
  },
  {
    key: "final-empire",
    title: "The Final Empire",
    authorKey: "sanderson",
    seriesKey: "mistborn",
    seriesNo: 1,
    description: "A street thief joins a rebellion against an immortal emperor.",
    genres: [
      "fantasy",
      "adventure",
      "action"
    ],
    totalChapters: 12,
    publishedAt: "2006-07-17",
    averageRating: 4.5,
    ratingsCount: 900000,
    price: 449,
    language: "english",
    coverImage: "https://covers.openlibrary.org/b/isbn/9780765311788-L.jpg",
    popularityScore: 26.79
  },
  {
    key: "eye-world",
    title: "The Eye of the World",
    authorKey: "jordan",
    seriesKey: "wheel",
    seriesNo: 1,
    description: "Village youths flee the Dark One and begin an epic journey.",
    genres: [
      "fantasy",
      "adventure",
      "action"
    ],
    totalChapters: 12,
    publishedAt: "1990-01-15",
    averageRating: 4.2,
    ratingsCount: 700000,
    price: 449,
    language: "english",
    coverImage: "https://covers.openlibrary.org/b/isbn/9780812511819-L.jpg",
    popularityScore: 24.55
  },
  {
    key: "great-hunt",
    title: "The Great Hunt",
    authorKey: "jordan",
    seriesKey: "wheel",
    seriesNo: 2,
    description: "Rand pursues a stolen Horn while destiny closes in.",
    genres: [
      "fantasy",
      "adventure",
      "action"
    ],
    totalChapters: 12,
    publishedAt: "1990-11-15",
    averageRating: 4.2,
    ratingsCount: 500000,
    price: 449,
    language: "english",
    coverImage: "https://covers.openlibrary.org/b/isbn/9780812517729-L.jpg",
    popularityScore: 23.94
  },
  {
    key: "colour-magic",
    title: "The Colour of Magic",
    authorKey: "pratchett",
    seriesKey: "discworld",
    seriesNo: 1,
    description: "Inept wizard Rincewind guides a tourist across a flat comic world.",
    genres: [
      "fantasy",
      "comedy",
      "adventure"
    ],
    totalChapters: 10,
    publishedAt: "1983-11-24",
    averageRating: 3.8,
    ratingsCount: 400000,
    price: 299,
    language: "english",
    coverImage: "https://covers.openlibrary.org/b/isbn/9780062225676-L.jpg",
    popularityScore: 21.29
  },
  {
    key: "light-fantastic",
    title: "The Light Fantastic",
    authorKey: "pratchett",
    seriesKey: "discworld",
    seriesNo: 2,
    description: "Rincewind must save Discworld from colliding with a red star.",
    genres: [
      "fantasy",
      "comedy",
      "adventure"
    ],
    totalChapters: 10,
    publishedAt: "1986-01-01",
    averageRating: 4,
    ratingsCount: 300000,
    price: 299,
    language: "english",
    coverImage: "https://covers.openlibrary.org/b/isbn/9780062225683-L.jpg",
    popularityScore: 21.91
  },
  {
    key: "hitchhiker",
    title: "The Hitchhiker's Guide to the Galaxy",
    authorKey: "adams",
    seriesKey: "hitchhiker",
    seriesNo: 1,
    description: "Arthur Dent escapes Earth's destruction with an alien researcher.",
    genres: [
      "science-fiction",
      "comedy",
      "adventure"
    ],
    totalChapters: 10,
    publishedAt: "1979-10-12",
    averageRating: 4.2,
    ratingsCount: 1800000,
    price: 299,
    language: "english",
    coverImage: "https://covers.openlibrary.org/b/isbn/9780345391803-L.jpg",
    popularityScore: 26.27
  },
  {
    key: "restaurant-end",
    title: "The Restaurant at the End of the Universe",
    authorKey: "adams",
    seriesKey: "hitchhiker",
    seriesNo: 2,
    description: "Arthur and friends dine at the end of time while fleeing bureaucrats.",
    genres: [
      "science-fiction",
      "comedy",
      "adventure"
    ],
    totalChapters: 10,
    publishedAt: "1980-01-01",
    averageRating: 4.1,
    ratingsCount: 700000,
    price: 299,
    language: "english",
    coverImage: "https://covers.openlibrary.org/b/isbn/9780345391810-L.jpg",
    popularityScore: 23.96
  },
  {
    key: "study-scarlet",
    title: "A Study in Scarlet",
    authorKey: "doyle",
    seriesKey: "sherlock",
    seriesNo: 1,
    description: "Dr. Watson meets Sherlock Holmes and investigates a baffling murder.",
    genres: [
      "mystery",
      "crime",
      "thriller"
    ],
    totalChapters: 8,
    publishedAt: "1887-11-01",
    averageRating: 4.1,
    ratingsCount: 500000,
    price: 199,
    language: "english",
    coverImage: "https://covers.openlibrary.org/b/isbn/9780140439083-L.jpg",
    popularityScore: 23.37
  },
  {
    key: "hound-baskervilles",
    title: "The Hound of the Baskervilles",
    authorKey: "doyle",
    seriesKey: "sherlock",
    seriesNo: 3,
    description: "Holmes investigates a legendary hound haunting a Dartmoor family.",
    genres: [
      "mystery",
      "crime",
      "horror"
    ],
    totalChapters: 10,
    publishedAt: "1902-04-01",
    averageRating: 4.3,
    ratingsCount: 700000,
    price: 199,
    language: "english",
    coverImage: "https://covers.openlibrary.org/b/isbn/9780141034324-L.jpg",
    popularityScore: 25.13
  },
  {
    key: "killing-floor",
    title: "Killing Floor",
    authorKey: "child",
    seriesKey: "reacher",
    seriesNo: 1,
    description: "Ex-military drifter Jack Reacher walks into a deadly small-town conspiracy.",
    genres: [
      "thriller",
      "crime",
      "action"
    ],
    totalChapters: 12,
    publishedAt: "1997-03-17",
    averageRating: 4.1,
    ratingsCount: 500000,
    price: 349,
    language: "english",
    coverImage: "https://covers.openlibrary.org/b/isbn/9780515141429-L.jpg",
    popularityScore: 23.37
  },
  {
    key: "dragon-tattoo",
    title: "The Girl with the Dragon Tattoo",
    authorKey: "larsson",
    seriesKey: "millennium",
    seriesNo: 1,
    description: "Journalist Mikael Blomkvist and hacker Lisbeth Salander dig into a decades-old disappearance.",
    genres: [
      "crime",
      "mystery",
      "thriller"
    ],
    totalChapters: 12,
    publishedAt: "2005-08-01",
    averageRating: 4.1,
    ratingsCount: 3200000,
    price: 399,
    language: "english",
    coverImage: "https://covers.openlibrary.org/b/isbn/9780307454546-L.jpg",
    popularityScore: 26.67
  },
  {
    key: "played-fire",
    title: "The Girl Who Played with Fire",
    authorKey: "larsson",
    seriesKey: "millennium",
    seriesNo: 2,
    description: "Lisbeth becomes the prime suspect in a double murder.",
    genres: [
      "crime",
      "mystery",
      "thriller"
    ],
    totalChapters: 12,
    publishedAt: "2006-06-01",
    averageRating: 4.2,
    ratingsCount: 1800000,
    price: 399,
    language: "english",
    coverImage: "https://covers.openlibrary.org/b/isbn/9780307454553-L.jpg",
    popularityScore: 26.27
  },
  {
    key: "it",
    title: "It",
    authorKey: "king",
    seriesKey: null,
    description: "Children in Derry confront an ancient evil that returns every generation.",
    genres: [
      "horror",
      "thriller",
      "drama"
    ],
    totalChapters: 12,
    publishedAt: "1986-09-15",
    averageRating: 4.2,
    ratingsCount: 1200000,
    price: 499,
    language: "english",
    coverImage: "https://covers.openlibrary.org/b/isbn/9781501142970-L.jpg",
    popularityScore: 25.53
  },
  {
    key: "shining",
    title: "The Shining",
    authorKey: "king",
    seriesKey: null,
    description: "A family winters in an isolated hotel where madness and ghosts awaken.",
    genres: [
      "horror",
      "thriller",
      "drama"
    ],
    totalChapters: 12,
    publishedAt: "1977-01-28",
    averageRating: 4.2,
    ratingsCount: 1600000,
    price: 399,
    language: "english",
    coverImage: "https://covers.openlibrary.org/b/isbn/9780307743657-L.jpg",
    popularityScore: 26.06
  },
  {
    key: "pet-sematary",
    title: "Pet Sematary",
    authorKey: "king",
    seriesKey: null,
    description: "A burial ground behind a family's new home offers a terrifying second chance.",
    genres: [
      "horror",
      "thriller",
      "drama"
    ],
    totalChapters: 12,
    publishedAt: "1983-11-14",
    averageRating: 4,
    ratingsCount: 700000,
    price: 399,
    language: "english",
    coverImage: "https://covers.openlibrary.org/b/isbn/9781982115982-L.jpg",
    popularityScore: 23.38
  },
  {
    key: "orient-express",
    title: "Murder on the Orient Express",
    authorKey: "christie",
    seriesKey: null,
    description: "Hercule Poirot investigates a murder aboard a snowbound luxury train.",
    genres: [
      "mystery",
      "crime",
      "thriller"
    ],
    totalChapters: 10,
    publishedAt: "1934-01-01",
    averageRating: 4.2,
    ratingsCount: 1100000,
    price: 249,
    language: "english",
    coverImage: "https://covers.openlibrary.org/b/isbn/9780062693662-L.jpg",
    popularityScore: 25.37
  },
  {
    key: "and-then-none",
    title: "And Then There Were None",
    authorKey: "christie",
    seriesKey: null,
    description: "Ten strangers are invited to an island where they are killed one by one.",
    genres: [
      "mystery",
      "crime",
      "thriller"
    ],
    totalChapters: 10,
    publishedAt: "1939-11-06",
    averageRating: 4.3,
    ratingsCount: 1500000,
    price: 249,
    language: "english",
    coverImage: "https://covers.openlibrary.org/b/isbn/9780062073488-L.jpg",
    popularityScore: 26.56
  },
  {
    key: "silent-patient",
    title: "The Silent Patient",
    authorKey: "michaelides",
    seriesKey: null,
    description: "A famous painter shoots her husband and never speaks again.",
    genres: [
      "mystery",
      "thriller",
      "crime"
    ],
    totalChapters: 12,
    publishedAt: "2019-02-05",
    averageRating: 4.1,
    ratingsCount: 2200000,
    price: 399,
    language: "english",
    coverImage: "https://covers.openlibrary.org/b/isbn/9781250301697-L.jpg",
    popularityScore: 26
  },
  {
    key: "gone-girl",
    title: "Gone Girl",
    authorKey: "flynn",
    seriesKey: null,
    description: "On their fifth anniversary, Amy Dunne disappears and Nick becomes the suspect.",
    genres: [
      "thriller",
      "mystery",
      "crime"
    ],
    totalChapters: 12,
    publishedAt: "2012-06-05",
    averageRating: 4.1,
    ratingsCount: 3200000,
    price: 349,
    language: "english",
    coverImage: "https://covers.openlibrary.org/b/isbn/9780307588371-L.jpg",
    popularityScore: 26.67
  },
  {
    key: "da-vinci",
    title: "The Da Vinci Code",
    authorKey: "brown",
    seriesKey: null,
    description: "A symbologist races through Europe to uncover a centuries-old secret.",
    genres: [
      "thriller",
      "mystery",
      "adventure"
    ],
    totalChapters: 12,
    publishedAt: "2003-03-18",
    averageRating: 3.9,
    ratingsCount: 2500000,
    price: 349,
    language: "english",
    coverImage: "https://covers.openlibrary.org/b/isbn/9780307474278-L.jpg",
    popularityScore: 24.95
  },
  {
    key: "pride-prejudice",
    title: "Pride and Prejudice",
    authorKey: "austen",
    seriesKey: null,
    description: "Elizabeth Bennet navigates manners, misunderstanding, and Mr. Darcy.",
    genres: [
      "romance",
      "comedy",
      "drama"
    ],
    totalChapters: 12,
    publishedAt: "1813-01-28",
    averageRating: 4.3,
    ratingsCount: 4200000,
    price: 199,
    language: "english",
    coverImage: "https://covers.openlibrary.org/b/isbn/9780141439518-L.jpg",
    popularityScore: 28.48
  },
  {
    key: "1984",
    title: "1984",
    authorKey: "orwell",
    seriesKey: null,
    description: "Winston Smith rebels against a totalitarian regime that rewrites truth.",
    genres: [
      "science-fiction",
      "drama",
      "thriller"
    ],
    totalChapters: 12,
    publishedAt: "1949-06-08",
    averageRating: 4.2,
    ratingsCount: 5000000,
    price: 249,
    language: "english",
    coverImage: "https://covers.openlibrary.org/b/isbn/9780451524935-L.jpg",
    popularityScore: 28.14
  },
  {
    key: "mockingbird",
    title: "To Kill a Mockingbird",
    authorKey: "lee",
    seriesKey: null,
    description: "Scout Finch watches her father defend an innocent man in the Jim Crow South.",
    genres: [
      "drama",
      "historical",
      "crime"
    ],
    totalChapters: 12,
    publishedAt: "1960-07-11",
    averageRating: 4.3,
    ratingsCount: 5800000,
    price: 299,
    language: "english",
    coverImage: "https://covers.openlibrary.org/b/isbn/9780061120084-L.jpg",
    popularityScore: 29.08
  },
  {
    key: "gatsby",
    title: "The Great Gatsby",
    authorKey: "fitzgerald",
    seriesKey: null,
    description: "Jay Gatsby's glittering dream collides with love and illusion in the Jazz Age.",
    genres: [
      "drama",
      "romance",
      "historical"
    ],
    totalChapters: 9,
    publishedAt: "1925-04-10",
    averageRating: 3.9,
    ratingsCount: 5200000,
    price: 249,
    language: "english",
    coverImage: "https://covers.openlibrary.org/b/isbn/9780743273565-L.jpg",
    popularityScore: 26.19
  },
  {
    key: "catcher",
    title: "The Catcher in the Rye",
    authorKey: "salinger",
    seriesKey: null,
    description: "Holden Caulfield wanders New York after leaving school, searching for authenticity.",
    genres: [
      "drama",
      "young-adult",
      "comedy"
    ],
    totalChapters: 12,
    publishedAt: "1951-07-16",
    averageRating: 3.8,
    ratingsCount: 3500000,
    price: 249,
    language: "english",
    coverImage: "https://covers.openlibrary.org/b/isbn/9780316769488-L.jpg",
    popularityScore: 24.87
  },
  {
    key: "frankenstein",
    title: "Frankenstein",
    authorKey: "shelley",
    seriesKey: null,
    description: "Victor Frankenstein creates life and is haunted by what he unleashes.",
    genres: [
      "horror",
      "science-fiction",
      "drama"
    ],
    totalChapters: 12,
    publishedAt: "1818-01-01",
    averageRating: 3.9,
    ratingsCount: 1700000,
    price: 199,
    language: "english",
    coverImage: "https://covers.openlibrary.org/b/isbn/9780486282114-L.jpg",
    popularityScore: 24.3
  },
  {
    key: "dracula",
    title: "Dracula",
    authorKey: "stoker",
    seriesKey: null,
    description: "Count Dracula arrives in England, pursued by a determined band of hunters.",
    genres: [
      "horror",
      "mystery",
      "romance"
    ],
    totalChapters: 12,
    publishedAt: "1897-05-26",
    averageRating: 4,
    ratingsCount: 1400000,
    price: 199,
    language: "english",
    coverImage: "https://covers.openlibrary.org/b/isbn/9780141439846-L.jpg",
    popularityScore: 24.58
  },
  {
    key: "atomic-habits",
    title: "Atomic Habits",
    authorKey: "clear",
    seriesKey: null,
    description: "Tiny changes compound into remarkable results through better systems.",
    genres: [
      "business",
      "biography",
      "drama"
    ],
    totalChapters: 12,
    publishedAt: "2018-10-16",
    averageRating: 4.4,
    ratingsCount: 1200000,
    price: 449,
    language: "english",
    coverImage: "https://covers.openlibrary.org/b/isbn/9780735211292-L.jpg",
    popularityScore: 26.75
  },
  {
    key: "rich-dad",
    title: "Rich Dad Poor Dad",
    authorKey: "kiyosaki",
    seriesKey: null,
    description: "Contrasting money lessons from two father figures reshape financial thinking.",
    genres: [
      "business",
      "biography",
      "drama"
    ],
    totalChapters: 10,
    publishedAt: "1997-04-01",
    averageRating: 4.1,
    ratingsCount: 900000,
    price: 349,
    language: "english",
    coverImage: "https://covers.openlibrary.org/b/isbn/9781612680194-L.jpg",
    popularityScore: 24.41
  },
  {
    key: "outliers",
    title: "Outliers",
    authorKey: "gladwell",
    seriesKey: null,
    description: "Malcolm Gladwell examines the hidden factors behind extraordinary success.",
    genres: [
      "business",
      "biography",
      "historical"
    ],
    totalChapters: 10,
    publishedAt: "2008-11-18",
    averageRating: 4.1,
    ratingsCount: 780000,
    price: 399,
    language: "english",
    coverImage: "https://covers.openlibrary.org/b/isbn/9780316017930-L.jpg",
    popularityScore: 24.16
  },
  {
    key: "sapiens",
    title: "Sapiens",
    authorKey: "harari",
    seriesKey: null,
    description: "A sweeping history of humankind from cognitive revolution to today.",
    genres: [
      "historical",
      "biography",
      "science-fiction"
    ],
    totalChapters: 12,
    publishedAt: "2011-01-01",
    averageRating: 4.4,
    ratingsCount: 1100000,
    price: 499,
    language: "english",
    coverImage: "https://covers.openlibrary.org/b/isbn/9780062316097-L.jpg",
    popularityScore: 26.58
  },
  {
    key: "steve-jobs",
    title: "Steve Jobs",
    authorKey: "isaacson",
    seriesKey: null,
    description: "The definitive biography of Apple's visionary co-founder.",
    genres: [
      "biography",
      "business",
      "historical"
    ],
    totalChapters: 12,
    publishedAt: "2011-10-24",
    averageRating: 4.2,
    ratingsCount: 1500000,
    price: 499,
    language: "english",
    coverImage: "https://covers.openlibrary.org/b/isbn/9781451648539-L.jpg",
    popularityScore: 25.94
  },
  {
    key: "becoming",
    title: "Becoming",
    authorKey: "obama",
    seriesKey: null,
    description: "Michelle Obama reflects on identity, family, and life in the White House.",
    genres: [
      "biography",
      "drama",
      "historical"
    ],
    totalChapters: 12,
    publishedAt: "2018-11-13",
    averageRating: 4.5,
    ratingsCount: 1400000,
    price: 499,
    language: "english",
    coverImage: "https://covers.openlibrary.org/b/isbn/9781524763138-L.jpg",
    popularityScore: 27.66
  },
  {
    key: "anne-frank",
    title: "The Diary of a Young Girl",
    authorKey: "frank",
    seriesKey: null,
    description: "Anne Frank's wartime diary from hiding in Amsterdam.",
    genres: [
      "biography",
      "historical",
      "drama"
    ],
    totalChapters: 12,
    publishedAt: "1947-06-25",
    averageRating: 4.1,
    ratingsCount: 3800000,
    price: 249,
    language: "english",
    coverImage: "https://covers.openlibrary.org/b/isbn/9780553296983-L.jpg",
    popularityScore: 26.98
  },
  {
    key: "educated",
    title: "Educated",
    authorKey: "westover",
    seriesKey: null,
    description: "A woman raised off-grid seeks education that transforms her life.",
    genres: [
      "biography",
      "drama",
      "historical"
    ],
    totalChapters: 12,
    publishedAt: "2018-02-20",
    averageRating: 4.5,
    ratingsCount: 1600000,
    price: 399,
    language: "english",
    coverImage: "https://covers.openlibrary.org/b/isbn/9780399590504-L.jpg",
    popularityScore: 27.92
  },
  {
    key: "born-crime",
    title: "Born a Crime",
    authorKey: "noah",
    seriesKey: null,
    description: "Trevor Noah recounts growing up mixed-race under apartheid with biting humor.",
    genres: [
      "biography",
      "comedy",
      "historical"
    ],
    totalChapters: 12,
    publishedAt: "2016-11-15",
    averageRating: 4.5,
    ratingsCount: 900000,
    price: 399,
    language: "english",
    coverImage: "https://covers.openlibrary.org/b/isbn/9780399588198-L.jpg",
    popularityScore: 26.79
  },
  {
    key: "bossypants",
    title: "Bossypants",
    authorKey: "fey",
    seriesKey: null,
    description: "Tina Fey's comic memoir of comedy, work, and motherhood.",
    genres: [
      "comedy",
      "biography",
      "business"
    ],
    totalChapters: 10,
    publishedAt: "2011-04-05",
    averageRating: 4,
    ratingsCount: 800000,
    price: 299,
    language: "english",
    coverImage: "https://covers.openlibrary.org/b/isbn/9780316056878-L.jpg",
    popularityScore: 23.61
  },
  {
    key: "matilda",
    title: "Matilda",
    authorKey: "dahl",
    seriesKey: null,
    description: "A brilliant girl outwits cruel adults with wit and unexpected powers.",
    genres: [
      "children",
      "comedy",
      "fantasy"
    ],
    totalChapters: 12,
    publishedAt: "1988-10-01",
    averageRating: 4.3,
    ratingsCount: 1100000,
    price: 249,
    language: "english",
    coverImage: "https://covers.openlibrary.org/b/isbn/9780142410370-L.jpg",
    popularityScore: 25.98
  },
  {
    key: "charlie-factory",
    title: "Charlie and the Chocolate Factory",
    authorKey: "dahl",
    seriesKey: null,
    description: "Charlie Bucket wins a tour of Willy Wonka's fantastical factory.",
    genres: [
      "children",
      "comedy",
      "fantasy"
    ],
    totalChapters: 12,
    publishedAt: "1964-01-17",
    averageRating: 4.2,
    ratingsCount: 1000000,
    price: 249,
    language: "english",
    coverImage: "https://covers.openlibrary.org/b/isbn/9780142410318-L.jpg",
    popularityScore: 25.2
  },
  {
    key: "charlottes-web",
    title: "Charlotte's Web",
    authorKey: "white",
    seriesKey: null,
    description: "A spider named Charlotte saves Wilbur the pig with words of friendship.",
    genres: [
      "children",
      "drama",
      "comedy"
    ],
    totalChapters: 12,
    publishedAt: "1952-10-15",
    averageRating: 4.2,
    ratingsCount: 1900000,
    price: 199,
    language: "english",
    coverImage: "https://covers.openlibrary.org/b/isbn/9780064400558-L.jpg",
    popularityScore: 26.37
  },
  {
    key: "coraline",
    title: "Coraline",
    authorKey: "gaiman",
    seriesKey: null,
    description: "A girl discovers a button-eyed other mother in a parallel house.",
    genres: [
      "children",
      "horror",
      "fantasy"
    ],
    totalChapters: 10,
    publishedAt: "2002-07-02",
    averageRating: 4.1,
    ratingsCount: 800000,
    price: 249,
    language: "english",
    coverImage: "https://covers.openlibrary.org/b/isbn/9780380807345-L.jpg",
    popularityScore: 24.2
  },
  {
    key: "alchemist",
    title: "The Alchemist",
    authorKey: "coelho",
    seriesKey: null,
    description: "A shepherd boy travels from Spain to Egypt in search of treasure and destiny.",
    genres: [
      "adventure",
      "drama",
      "fantasy"
    ],
    totalChapters: 10,
    publishedAt: "1988-01-01",
    averageRating: 3.9,
    ratingsCount: 3200000,
    price: 299,
    language: "english",
    coverImage: "https://covers.openlibrary.org/b/isbn/9780062315007-L.jpg",
    popularityScore: 25.37
  },
  {
    key: "kite-runner",
    title: "The Kite Runner",
    authorKey: "hosseini",
    seriesKey: null,
    description: "A story of friendship and redemption spanning Afghanistan and America.",
    genres: [
      "drama",
      "historical",
      "adventure"
    ],
    totalChapters: 12,
    publishedAt: "2003-05-29",
    averageRating: 4.3,
    ratingsCount: 3200000,
    price: 349,
    language: "english",
    coverImage: "https://covers.openlibrary.org/b/isbn/9781594631931-L.jpg",
    popularityScore: 27.97
  },
  {
    key: "life-of-pi",
    title: "Life of Pi",
    authorKey: "martel",
    seriesKey: null,
    description: "A boy survives a Pacific shipwreck with a Bengal tiger as companion.",
    genres: [
      "adventure",
      "drama",
      "fantasy"
    ],
    totalChapters: 12,
    publishedAt: "2001-09-11",
    averageRating: 3.9,
    ratingsCount: 1800000,
    price: 349,
    language: "english",
    coverImage: "https://covers.openlibrary.org/b/isbn/9780156027328-L.jpg",
    popularityScore: 24.4
  },
  {
    key: "martian",
    title: "The Martian",
    authorKey: "weir",
    seriesKey: null,
    description: "An astronaut stranded on Mars uses science and grit to survive.",
    genres: [
      "science-fiction",
      "adventure",
      "comedy"
    ],
    totalChapters: 12,
    publishedAt: "2014-02-11",
    averageRating: 4.4,
    ratingsCount: 1400000,
    price: 399,
    language: "english",
    coverImage: "https://covers.openlibrary.org/b/isbn/9780553418026-L.jpg",
    popularityScore: 27.04
  },
  {
    key: "ready-player",
    title: "Ready Player One",
    authorKey: "cline",
    seriesKey: null,
    description: "A teen hunts an Easter egg inside a vast virtual-reality universe.",
    genres: [
      "science-fiction",
      "adventure",
      "young-adult"
    ],
    totalChapters: 12,
    publishedAt: "2011-08-16",
    averageRating: 4.2,
    ratingsCount: 1400000,
    price: 349,
    language: "english",
    coverImage: "https://covers.openlibrary.org/b/isbn/9780307887443-L.jpg",
    popularityScore: 25.81
  },
  {
    key: "enders-game",
    title: "Ender's Game",
    authorKey: "card",
    seriesKey: null,
    description: "A gifted child is trained through war games to save humanity.",
    genres: [
      "science-fiction",
      "young-adult",
      "action"
    ],
    totalChapters: 12,
    publishedAt: "1985-01-15",
    averageRating: 4.3,
    ratingsCount: 1500000,
    price: 299,
    language: "english",
    coverImage: "https://covers.openlibrary.org/b/isbn/9780812550702-L.jpg",
    popularityScore: 26.56
  },
  {
    key: "fahrenheit",
    title: "Fahrenheit 451",
    authorKey: "bradbury",
    seriesKey: null,
    description: "Firemen burn books in a future where reading is outlawed.",
    genres: [
      "science-fiction",
      "drama",
      "thriller"
    ],
    totalChapters: 10,
    publishedAt: "1953-10-19",
    averageRating: 4,
    ratingsCount: 2500000,
    price: 249,
    language: "english",
    coverImage: "https://covers.openlibrary.org/b/isbn/9781451673319-L.jpg",
    popularityScore: 25.59
  },
  {
    key: "brave-new-world",
    title: "Brave New World",
    authorKey: "huxley",
    seriesKey: null,
    description: "A engineered society of pleasure hides the cost of free thought.",
    genres: [
      "science-fiction",
      "drama",
      "thriller"
    ],
    totalChapters: 12,
    publishedAt: "1932-01-01",
    averageRating: 4,
    ratingsCount: 1900000,
    price: 249,
    language: "english",
    coverImage: "https://covers.openlibrary.org/b/isbn/9780060850524-L.jpg",
    popularityScore: 25.12
  },
  {
    key: "handmaids-tale",
    title: "The Handmaid's Tale",
    authorKey: "atwood",
    seriesKey: null,
    description: "Offred endures life as a reproductive servant in theocratic Gilead.",
    genres: [
      "science-fiction",
      "drama",
      "thriller"
    ],
    totalChapters: 12,
    publishedAt: "1985-08-01",
    averageRating: 4.1,
    ratingsCount: 2200000,
    price: 349,
    language: "english",
    coverImage: "https://covers.openlibrary.org/b/isbn/9780385490818-L.jpg",
    popularityScore: 26
  },
  {
    key: "name-wind",
    title: "The Name of the Wind",
    authorKey: "rothfuss",
    seriesKey: null,
    description: "Kvothe recounts how he became a legendary figure of magic and music.",
    genres: [
      "fantasy",
      "adventure",
      "drama"
    ],
    totalChapters: 12,
    publishedAt: "2007-03-27",
    averageRating: 4.5,
    ratingsCount: 1100000,
    price: 449,
    language: "english",
    coverImage: "https://covers.openlibrary.org/b/isbn/9780756404741-L.jpg",
    popularityScore: 27.19
  },
  {
    key: "american-gods",
    title: "American Gods",
    authorKey: "gaiman",
    seriesKey: null,
    description: "Shadow Moon is pulled into a war between old gods and new in America.",
    genres: [
      "fantasy",
      "adventure",
      "mystery"
    ],
    totalChapters: 12,
    publishedAt: "2001-06-19",
    averageRating: 4.1,
    ratingsCount: 900000,
    price: 399,
    language: "english",
    coverImage: "https://covers.openlibrary.org/b/isbn/9780062572233-L.jpg",
    popularityScore: 24.41
  },
  {
    key: "good-omens",
    title: "Good Omens",
    authorKey: "gaiman",
    seriesKey: null,
    description: "An angel and a demon team up to prevent the apocalypse.",
    genres: [
      "fantasy",
      "comedy",
      "adventure"
    ],
    totalChapters: 12,
    publishedAt: "1990-05-01",
    averageRating: 4.2,
    ratingsCount: 800000,
    price: 349,
    language: "english",
    coverImage: "https://covers.openlibrary.org/b/isbn/9780060853983-L.jpg",
    popularityScore: 24.79
  },
  {
    key: "catch-22",
    title: "Catch-22",
    authorKey: "heller",
    seriesKey: null,
    description: "A bomber pilot confronts the absurd logic of war and bureaucracy.",
    genres: [
      "comedy",
      "drama",
      "historical"
    ],
    totalChapters: 12,
    publishedAt: "1961-11-10",
    averageRating: 3.98,
    ratingsCount: 900000,
    price: 349,
    language: "english",
    coverImage: "https://covers.openlibrary.org/b/isbn/9781451626650-L.jpg",
    popularityScore: 23.7
  },
  {
    key: "notebook",
    title: "The Notebook",
    authorKey: "sparks",
    seriesKey: null,
    description: "An enduring love story unfolds across decades in coastal North Carolina.",
    genres: [
      "romance",
      "drama",
      "historical"
    ],
    totalChapters: 10,
    publishedAt: "1996-10-01",
    averageRating: 4.1,
    ratingsCount: 1800000,
    price: 299,
    language: "english",
    coverImage: "https://covers.openlibrary.org/b/isbn/9780446605236-L.jpg",
    popularityScore: 25.65
  },
  {
    key: "me-before-you",
    title: "Me Before You",
    authorKey: "moyes",
    seriesKey: null,
    description: "A caregiver forms an unexpected bond with a man after an accident.",
    genres: [
      "romance",
      "drama",
      "young-adult"
    ],
    totalChapters: 12,
    publishedAt: "2012-01-05",
    averageRating: 4.2,
    ratingsCount: 1600000,
    price: 349,
    language: "english",
    coverImage: "https://covers.openlibrary.org/b/isbn/9780143124542-L.jpg",
    popularityScore: 26.06
  },
  {
    key: "the-help",
    title: "The Help",
    authorKey: "stockett",
    seriesKey: null,
    description: "Black maids and a young writer risk everything to tell their stories in 1960s Mississippi.",
    genres: [
      "drama",
      "historical",
      "romance"
    ],
    totalChapters: 12,
    publishedAt: "2009-02-10",
    averageRating: 4.5,
    ratingsCount: 2700000,
    price: 349,
    language: "english",
    coverImage: "https://covers.openlibrary.org/b/isbn/9780425232200-L.jpg",
    popularityScore: 28.94
  },
  {
    key: "all-light",
    title: "All the Light We Cannot See",
    authorKey: "doerr",
    seriesKey: null,
    description: "A blind French girl and a German boy are linked by war and radio.",
    genres: [
      "historical",
      "drama",
      "adventure"
    ],
    totalChapters: 12,
    publishedAt: "2014-05-06",
    averageRating: 4.3,
    ratingsCount: 1800000,
    price: 399,
    language: "english",
    coverImage: "https://covers.openlibrary.org/b/isbn/9781501173219-L.jpg",
    popularityScore: 26.9
  },
  {
    key: "book-thief",
    title: "The Book Thief",
    authorKey: "zusak",
    seriesKey: null,
    description: "Death narrates the story of a girl who steals books in Nazi Germany.",
    genres: [
      "historical",
      "drama",
      "young-adult"
    ],
    totalChapters: 12,
    publishedAt: "2005-03-14",
    averageRating: 4.4,
    ratingsCount: 2800000,
    price: 349,
    language: "english",
    coverImage: "https://covers.openlibrary.org/b/isbn/9780375842207-L.jpg",
    popularityScore: 28.37
  },
  {
    key: "crawdads",
    title: "Where the Crawdads Sing",
    authorKey: "owens",
    seriesKey: null,
    description: "A girl raised in the marsh becomes the suspect in a small-town murder.",
    genres: [
      "mystery",
      "romance",
      "drama"
    ],
    totalChapters: 12,
    publishedAt: "2018-08-14",
    averageRating: 4.4,
    ratingsCount: 3200000,
    price: 399,
    language: "english",
    coverImage: "https://covers.openlibrary.org/b/isbn/9780735219106-L.jpg",
    popularityScore: 28.62
  },
  {
    key: "midnight-library",
    title: "The Midnight Library",
    authorKey: "haig",
    seriesKey: null,
    description: "Between life and death, Nora Seed explores the lives she might have lived.",
    genres: [
      "fantasy",
      "drama",
      "science-fiction"
    ],
    totalChapters: 12,
    publishedAt: "2020-08-13",
    averageRating: 4.1,
    ratingsCount: 1800000,
    price: 399,
    language: "english",
    coverImage: "https://covers.openlibrary.org/b/isbn/9780525559474-L.jpg",
    popularityScore: 25.65
  },
  {
    key: "circe",
    title: "Circe",
    authorKey: "miller",
    seriesKey: null,
    description: "The witch Circe finds power and humanity on an island of exile.",
    genres: [
      "fantasy",
      "historical",
      "drama"
    ],
    totalChapters: 12,
    publishedAt: "2018-04-10",
    averageRating: 4.3,
    ratingsCount: 1400000,
    price: 399,
    language: "english",
    coverImage: "https://covers.openlibrary.org/b/isbn/9780316556361-L.jpg",
    popularityScore: 26.43
  },
  {
    key: "song-achilles",
    title: "The Song of Achilles",
    authorKey: "miller",
    seriesKey: null,
    description: "Patroclus retells the Trojan War through love for Achilles.",
    genres: [
      "romance",
      "historical",
      "drama"
    ],
    totalChapters: 12,
    publishedAt: "2011-09-20",
    averageRating: 4.4,
    ratingsCount: 1600000,
    price: 399,
    language: "english",
    coverImage: "https://covers.openlibrary.org/b/isbn/9780062060624-L.jpg",
    popularityScore: 27.3
  },
  {
    key: "hobbit",
    title: "The Hobbit",
    authorKey: "tolkien",
    seriesKey: null,
    description: "Bilbo Baggins joins dwarves on a quest to reclaim a dragon-guarded mountain.",
    genres: [
      "fantasy",
      "adventure",
      "children"
    ],
    totalChapters: 12,
    publishedAt: "1937-09-21",
    averageRating: 4.3,
    ratingsCount: 4000000,
    price: 349,
    language: "english",
    coverImage: "https://covers.openlibrary.org/b/isbn/9780547928227-L.jpg",
    popularityScore: 28.39
  }
];
