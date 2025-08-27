const Shimmer =()=>{
    return(
        <div className="shimmer-container">
            {Array(12).fill(0).map((_, i) => (
                <div className="shimmer-card" key={i}></div>
            ))}
        </div>
    );
};

export default Shimmer;