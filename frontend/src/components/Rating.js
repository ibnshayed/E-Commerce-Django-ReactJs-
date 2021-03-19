const Rating = ({ value, text, color }) => {
    


    return (
        <div className="rating">

            {
                [1, 2, 3, 4, 5].map(num => (
                    <span className="mr-1">
                        <i style={{ color }} className={
                        value >= num
                            ? 'fas fa-star'
                            : value >= num + 0.5 - 1
                                ? 'fas fa-star-half-alt'
                                : 'far fa-star'
                        }>
                        </i>    
                    </span>
                    
                ))
            }
            <span>{text && text}</span>
            {/* <span>
                <i style={{ color }} className={
                    value >= 1
                        ? 'fas fa-star'
                        : value >= 0.5
                            ? 'fas fa-star-half-alt'
                            : 'far fa-star'
                }>
                </i>
            </span>
            <span>
                <i style={{ color }} className={
                    value >= 2
                        ? 'fas fa-star'
                        : value >= 1.5
                            ? 'fas fa-star-half-alt'
                            : 'far fa-star'
                }>
                </i>
            </span>
            <span>
                <i style={{ color }} className={
                    value >= 3
                        ? 'fas fa-star'
                        : value >= 2.5
                            ? 'fas fa-star-half-alt'
                            : 'far fa-star'
                }>
                </i>
            </span>
            <span>
                <i style={{ color }} className={
                    value >= 4
                        ? 'fas fa-star'
                        : value >= 3.5
                            ? 'fas fa-star-half-alt'
                            : 'far fa-star'
                }>
                </i>
            </span>
            <span>
                <i style={{ color }} className={
                    value >= 5
                        ? 'fas fa-star'
                        : value >= 4.5
                            ? 'fas fa-star-half-alt'
                            : 'far fa-star'
                }>
                </i>
            </span> */}
        </div>
     );
}
 
export default Rating;