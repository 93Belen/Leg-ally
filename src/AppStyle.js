import {colors} from "./components/fonts_colors"

// 10 MOST COMMON SCREEN SIZES
// 5	2560×1440	34,152(7.41%) 1
// 1	1920×1080	104,190(22.62%) 2
// 9	1792×1120	9,494(2.06%) 3
// 6	1680×1050	19,730(4.28%) 4
// 10	1600×900	8,630(1.87%) 5
// 4	1536×864	39,606(8.60%) 6
// 3	1440×900	44,003(9.55%) 7
// 2	1366×768	51,580(11.20%) 8
// 8	1280×800	10,719(2.33%) 9
// 7	1280×720	16,364(3.55%) 10





// Made Grid for all elements in the app
export const appStyle = {
    boxSizing: 'border-box',
    background: colors.white,
    height: '100vh',
    backgroundSize: '100% 100%',
    overflowX: 'hidden',
    borderLeft: 'black solid 1px', // Decorative
    borderRight: 'black solid 1px', // Decorative
    margin: '-0.8rem 4rem',
    padding: '0rem 3rem',
    display: 'grid',
    gridTemplateColumns: '30% 35% 35%',
    gridTemplateRows: '15% 73%',
    rowGap: '6rem',
    columnGap: '0.5rem'
}

