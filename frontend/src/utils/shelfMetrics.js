const CARD_WIDTH = 180;

const paddingAndGap = (width) => {
    if (width <= 400) return { pad: 96, gap: 12 };
    if (width <= 600) return { pad: 112, gap: 14 };
    if (width <= 900) return { pad: 80, gap: 16 };
    return { pad: 112, gap: 20 };
};

export const estimateShelfFit = (width = typeof window !== "undefined" ? window.innerWidth : 1200) => {
    const { pad, gap } = paddingAndGap(width);
    const inner = Math.max(CARD_WIDTH, width - pad);
    const unit = CARD_WIDTH + gap;
    const x = Math.max(1, Math.floor((inner - CARD_WIDTH * 0.5) / unit));
    return {
        x,
        pageSize: x + 1,
        card: CARD_WIDTH,
        gap,
        unit,
        stepPx: Math.max(unit * 0.5, (x - 1) * unit + CARD_WIDTH * 0.5),
    };
};

export const measureShelfFit = (el) => {
    if (!el) return null;
    const card = el.querySelector(".BookCard") || el.querySelector(".book-card") || el.children[0];
    if (!card) return null;
    const styles = getComputedStyle(el);
    const gap = parseFloat(styles.columnGap || styles.gap) || 20;
    const padL = parseFloat(styles.paddingLeft) || 0;
    const padR = parseFloat(styles.paddingRight) || 0;
    const cardWidth = card.offsetWidth || CARD_WIDTH;
    const unit = cardWidth + gap;
    if (!unit) return null;
    const inner = Math.max(cardWidth, el.clientWidth - padL - padR);
    const x = Math.max(1, Math.floor((inner - cardWidth * 0.5) / unit));
    const desired = x * unit + cardWidth * 0.5;
    const extra = Math.max(0, inner - desired);
    return {
        el,
        x,
        pageSize: x + 1,
        card: cardWidth,
        gap,
        unit,
        padL,
        padR,
        extraPadRight: extra,
        stepPx: Math.max(unit * 0.5, (x - 1) * unit + cardWidth * 0.5),
        stepBooks: Math.max(1, x - 1),
    };
};
