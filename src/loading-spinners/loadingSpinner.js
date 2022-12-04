function  LoadingSpinner(){
    return(
        <div className="modalBackground" style={{backdropFilter: "blur(10px)"}}>
            <div className="loading-spinner">
                <div className="lds-ring">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <div style={{color:"white"}}>Loading...</div>
            </div>
        </div>
    )
}
export default LoadingSpinner