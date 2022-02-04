const PRODUCTS = [
    {id: 1, category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
    {id: 2, category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
    {id: 3, category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
    {id: 4, category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
    {id: 5, category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
    {id: 6, category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
];

function ProductRow({product}) {
    const name = product.stocked ? product.name : <span className="text-danger">{product.name}</span>
    return <tr>
        <td>{name}</td>
        <td>{product.price}</td>
    </tr>
}

function CategoryRow({category}) {
    return <tr>
        <th colSpan="2">{category}</th>
    </tr>
}

function ProductTable({products, filterText, inStockOnly}) {

    const rows = []
    let lastCategory = null

    products.forEach((product) => {

        if ((inStockOnly && !product.stocked) || product.name.indexOf(filterText) === -1) {
            return
        }

        if (product.category !== lastCategory) {
            lastCategory = product.category
            rows.push(<CategoryRow key={lastCategory} category={product.category}/>)
        }
        rows.push(<ProductRow key={product.id} product={product}/>)
    })

    return <table className="table">
        <thead>
        <tr>
            <th>Name</th>
            <th>Price</th>
        </tr>
        </thead>
        <tbody>
        {rows}
        </tbody>
    </table>
}

class SearchBar extends React.Component {

    constructor(props) {
        super(props);
        this.handleFilterTextChange = this.handleFilterTextChange.bind(this)
        this.handleInStockChange = this.handleInStockChange.bind(this)
    }

    handleFilterTextChange(e) {
        this.props.onFilterTextChange(e.target.value)
    }

    handleInStockChange(e) {
        this.props.onStockChange(e.target.checked)
    }

    render() {
        const {filterText, inStockOnly} = this.props

        return <div>
            <div className="form-group mb-1">
                <input className="form-control" value={filterText} type="text" placeholder="Filter Products"
                       onChange={this.handleFilterTextChange}/>
            </div>
            <div className="form-check">
                <input className="form-check-input" checked={inStockOnly} type="checkbox" id="stock"
                       onChange={this.handleInStockChange}/>
                <label className="form-check-label" htmlFor="stock">
                    Only in stock
                </label>
            </div>
        </div>
    }
}

class ProductList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filterText: '',
            inStockOnly: false
        }
        this.handleFilterTextChange = this.handleFilterTextChange.bind(this)
        this.handleInStockChange = this.handleInStockChange.bind(this)
    }

    handleFilterTextChange(filterText) {
        this.setState({filterText})
    }

    handleInStockChange(inStockOnly) {
        this.setState({inStockOnly})
    }

    shouldComponentUpdate(nextProps, nextState)
    {
        return nextProps.products !== this.state.products ||
               nextState.filterText !== this.state.filterText ||
               nextState.inStockOnly !== this.state.inStockOnly
    }

    render() {
        const {products} = this.props

        return <React.Fragment>
            {JSON.stringify(this.state)}
            <SearchBar
                filterText={this.state.filterText}
                inStockOnly={this.state.inStockOnly}
                onFilterTextChange={this.handleFilterTextChange}
                onStockChange={this.handleInStockChange}
            />
            <ProductTable
                products={products}
                filterText={this.state.filterText}
                inStockOnly={this.state.inStockOnly}
            />
        </React.Fragment>
    }
}

ReactDOM.render(
    <ProductList products={PRODUCTS}/>
    , document.querySelector("#app"));