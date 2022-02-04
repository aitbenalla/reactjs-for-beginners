// const Field = React.forwardRef(function (props, ref) {
//     return <div>
//         <input type="text" ref={this.props.forwardRef}/>
//     </div>
// })

class FieldClass extends React.Component {

    render() {
        return <div className="form-group mb-3">
            <label className="form-label" htmlFor="demo">{this.props.label}:</label>
            <input className="form-control" type="text" ref={this.props.forwardRef} id="demo"/>
        </div>
    }
}

const FieldWithRef = React.forwardRef((props, ref) => {
    return <FieldClass forwardRef={ref} {...props}/>
})

class Ref extends React.Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this)
        this.input = React.createRef()
    }

    handleClick(e)
    {
        console.log(this.input.current.value)
    }

    render()
    {
        return <div>
            <FieldWithRef ref={this.input} label="Demo"/>
            <button className="btn btn-primary" onClick={this.handleClick}>Ref Dom</button>
        </div>
    }
}

ReactDOM.render(<Ref />, document.querySelector("#app"));