import { h, Frarment } from 'preact';

const Hr = ({color = "black", height = 2, width = "100%", margin = 0}) => {

    return (
        <div style={{
            width, 
            backgroundColor: color, 
            height,
            margin: `${margin}px auto`,
        }} />
	)
}

export default Hr;


// WEBPACK FOOTER //
// ./components/hr/index.js