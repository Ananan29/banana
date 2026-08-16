const shelves = new Map();

const uniqueBooks = (books) => {
    const unique = [];
    const seen = new Set();
    for (const book of books || []) {
        const id = String(book.bookId);
        if (!id || seen.has(id)) continue;
        seen.add(id);
        unique.push(book);
    }
    return unique;
};

const emptyShelf = (fetchSize = 6) => ({
    books: [],
    initial: [],
    start: 0,
    nextStart: 0,
    fetchSize,
    exhausted: false,
});

const getShelf = (title) => {
    if (!shelves.has(title)) shelves.set(title, emptyShelf());
    return shelves.get(title);
};

export const getShelfBooks = (title) => {
    const books = getShelf(title).books;
    return books.length ? [...books] : null;
};

export const getShelfState = (title) => {
    const shelf = getShelf(title);
    return {
        books: [...shelf.books],
        initial: [...shelf.initial],
        start: shelf.start,
        nextStart: shelf.nextStart,
        fetchSize: shelf.fetchSize,
        exhausted: shelf.exhausted,
    };
};

export const setShelfFetchSize = (title, fetchSize) => {
    if (!Number.isInteger(fetchSize) || fetchSize <= 0) return;
    getShelf(title).fetchSize = fetchSize;
};

export const setShelfStart = (title, start) => {
    getShelf(title).start = Math.max(0, start);
};

export const seedShelfBooks = (title, books, fetchSize) => {
    const shelf = getShelf(title);
    if (Number.isInteger(fetchSize) && fetchSize > 0) {
        shelf.fetchSize = fetchSize;
    }
    const list = uniqueBooks(books);
    if (list.length === 0) {
        return shelf.books.length ? [...shelf.books] : [];
    }
    const sameInitial =
        shelf.initial.length === list.length &&
        list.length > 0 &&
        shelf.initial.every((book, index) => String(book.bookId) === String(list[index]?.bookId));

    if (sameInitial && shelf.books.length > 0) {
        return [...shelf.books];
    }

    shelf.initial = [...list];
    shelf.books = [...list];
    shelf.start = 0;
    shelf.nextStart = list.length;
    shelf.exhausted = list.length === 0 || list.length < shelf.fetchSize;
    return [...shelf.books];
};

export const mergeShelfPage = (title, page, start) => {
    const shelf = getShelf(title);
    const incoming = uniqueBooks(page);
    const atEnd = start >= shelf.books.length;

    if (atEnd) {
        const seen = new Set(shelf.books.map((book) => String(book.bookId)));
        for (const book of incoming) {
            const id = String(book.bookId);
            if (seen.has(id)) continue;
            seen.add(id);
            shelf.books.push(book);
        }
        shelf.nextStart = start + page.length;
        shelf.exhausted = page.length === 0 || page.length < shelf.fetchSize;
    } else {
        const seen = new Set(shelf.books.map((book) => String(book.bookId)));
        for (const book of incoming) {
            const id = String(book.bookId);
            if (seen.has(id)) continue;
            seen.add(id);
            shelf.books.push(book);
        }
        shelf.nextStart = Math.max(shelf.nextStart, start + page.length);
    }

    return [...shelf.books];
};

export const getShelfCursor = (title) => {
    const shelf = getShelf(title);
    return {
        start: shelf.start,
        nextStart: shelf.nextStart,
        exhausted: shelf.exhausted,
        fetchSize: shelf.fetchSize,
        initialCount: shelf.initial.length,
    };
};
