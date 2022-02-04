function Alert({degret}) {
    if (degret >= 100) {
        return <div className="alert alert-success">Water Would Boil !</div>
    }

    return <div className="alert alert-info">Water Not Boil !</div>
}

const scale = {
    c: 'Celsius',
    f: 'Fahrenheit'
}

function toCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5 / 9
}

function toFahrenheit(celsius) {
    return (celsius * 9 / 5) + 32
}

function tryConvert(temperature, call) {
    const value = parseFloat(temperature)

    if (Number.isNaN(value)) {
        return '';
    }

    return (Math.round(call(value) * 100) / 100).toString()
}

class Field extends React.Component {

    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e) {
        this.props.onTemperatureChange(e.target.value)
    }

    render() {
        const {temperature} = this.props
        const name = 'scale' + this.props.scale
        const scaleName = scale[this.props.scale]
        return (
            <div className="mb-3">
                <label className="form-label" htmlFor={name}>Temperature ({scaleName}):</label>
                <input className="form-control" value={temperature} type="text" id={name} onChange={this.handleChange}/>
            </div>
        )
    }


}

class Converter extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            scale: 'c',
            temperature: 20
        }
        this.handleCelsiusChange = this.handleCelsiusChange.bind(this)
        this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this)
    }

    handleCelsiusChange(temperature) {
        this.setState({
            scale: 'c',
            temperature
        })
    }

    handleFahrenheitChange(temperature) {
        this.setState({
            scale: 'f',
            temperature
        })
    }

    render() {
        const {temperature, scale} = this.state
        const celsius = scale === 'c' ? temperature : tryConvert(temperature, toCelsius)
        const fahrenheit = scale === 'f' ? temperature : tryConvert(temperature, toFahrenheit)
        return (<div>
            <Alert degret={celsius}/>
            <Field scale="c" temperature={celsius} onTemperatureChange={this.handleCelsiusChange}/>
            <Field scale="f" temperature={fahrenheit} onTemperatureChange={this.handleFahrenheitChange}/>
        </div>)


    }
}

ReactDOM.render(<Converter/>, document.querySelector("#app"));
