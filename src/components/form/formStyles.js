import {fonts, colors} from '../fonts_colors';

export const formDiv = {
    boxSizing: 'border-box',
    gridRow: '2',
    gridColumn:'3',
    width: '100%',
    fontFamily: fonts.textLight.fontFamily,
    color: colors.black,
    fontSize: '1.4vw',
    height: '100%'
}

export const form = {
    boxSizing: 'border-box',
    borderRadius: '5%',
    display: 'grid',
    gridTemplateColumns: '55% 45%',
    gridTemplateRows: 'repeat(5, 1fr)',
    background: 'linear-gradient(115.47deg, #E4CBBC 6.83%, rgba(228, 203, 188, 0.6) 44.25%, rgba(228, 203, 188, 0.4) 95.69%)',
    backdropFilter: 'blur(90%)',
    height: '85%',
    width: '95%',
    alignItems: 'center',
    justifyItems: 'end',
    padding: '1.5rem 3.5rem'
}

export const label = {
    justifySelf: 'start',
    paddingLeft: '1rem'
}
export const input = {
    borderRadius: '2%',
    border: 'none',
    boxShadow: 'inset 0 0.05em 0.1em rgba(0, 0, 0, 0.25)',
    height: '35%',
    width: 'fit-content',
    maxWidth: '90%',
    fontSize: '1.4vw',
    textAlign: 'right',
    padding: '0.3rem',
    fontFamily: fonts.textLight.fontFamily
}

export const checkboxDiv = {
   gridRow: '4',
   gridColumn: '1/3',
   justifySelf: 'center',
   border: 'none'
}
export const checkboxInput = {
    margin: '1rem'
}