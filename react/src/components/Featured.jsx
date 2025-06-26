import Promo from "./Promo";

const Featured = (props) => {
    return (
        <>
            <h5 className="card-title">Featured</h5>
            <div style={{padding: "10px"}}></div>
            <div style={{display: "flex", gap: "0px", padding: "0px"}}>
            <div className="card-container d-flex flex-row justify-content-start" style={{ gap: "0px", padding: "0px" }}/>
            {
                props.data.map((promo) => (
                    <Promo key={promo.id} data={promo} />
                ))
            }
            </div>
            <div style={{padding: "10px"}}></div>
        </>
    );
};

export default Featured;