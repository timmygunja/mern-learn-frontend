import "./MainGrid.css"

const MainGrid = () => {
    const prods = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    
    return(
        <div className="maingrid">
            
            {prods.map(prod => {
               return(
                    <div id={prod.key} className="product">
                        <div className="prod-pic">
                            <img src={"product.png"} />
                        </div>
                        <div className="prod-content">
                            <h1 className="prod-title">Title {prod.key}</h1>
                            <p className="prod-description">Description</p>
                            <p className="prod-price">1000 ₽</p>
                        </div>
                    </div>
               ) 
            })}
        
        </div>
    )
}

export default MainGrid