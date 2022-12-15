import classNames from 'classnames';


export default function Skeleton({times, className}) {
    const outerClassNames = classNames(
        'relative', // position the inner absolutely
        'overflow-hidden', // hide the inner if they're not overlapping
        'bg-gray-200', //background
        'rounded', // rounded corners
        'mb-2.5', // little margin on the bottom
        className
    );
    const innerClassNames = classNames(
        'animate-shimmer', // what applies the little animation we implemented
        'absolute', // we position the inner absolutely
        'inset-0', // expand to fill the outer div
        '-translate-x-full', // what will get the inner div to move of the
        // far left-hand side of the outer div
        'bg-gradient-to-r', // background is a gradient that change colors in
        // the x direction towards the right-hand side
        'from-gray-200',
        'via-white',
        'to-gray-200'
    );
    return Array(times)
        .fill(0)
        .map((_, i) => {
            return (
                <div key={i} className={outerClassNames}>
                    <div className={innerClassNames}/>
                </div>
            );
        });
}